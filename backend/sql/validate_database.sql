-- Database validation script
-- Run this to verify all tables, indexes, triggers, and RLS policies are properly set up

-- Check if all expected tables exist
SELECT 
    'Tables Check' as check_type,
    table_name,
    CASE 
        WHEN table_name IN (
            'profiles', 'Team', 'TeamMembership', 'Challenge', 'Milestone', 
            'MilestoneProgress', 'ChallengeParticipant', 'Activity', 'Post', 'Comment'
        ) THEN '✅ Expected'
        ELSE '⚠️ Unexpected'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check RLS status
SELECT 
    'RLS Status' as check_type,
    schemaname || '.' || tablename as table_name,
    CASE 
        WHEN rowsecurity THEN '✅ Enabled'
        ELSE '❌ Disabled'
    END as rls_status
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check policies count
SELECT 
    'Policies Count' as check_type,
    schemaname || '.' || tablename as table_name,
    COUNT(*) as policy_count
FROM pg_policies 
WHERE schemaname = 'public'
GROUP BY schemaname, tablename
ORDER BY tablename;

-- Check partial unique indexes
SELECT 
    'Partial Indexes' as check_type,
    indexname,
    CASE 
        WHEN indexname LIKE '%challengeparticipant%' THEN '✅ Found'
        ELSE '⚠️ Check needed'
    END as status
FROM pg_indexes 
WHERE schemaname = 'public' 
    AND indexname LIKE '%unique%'
ORDER BY indexname;

-- Check triggers
SELECT 
    'Triggers' as check_type,
    trigger_name,
    event_object_table,
    action_timing || ' ' || string_agg(event_manipulation, ', ') as trigger_events
FROM information_schema.triggers 
WHERE trigger_schema = 'public' OR event_object_schema = 'auth'
GROUP BY trigger_name, event_object_table, action_timing
ORDER BY trigger_name;

-- Check functions
SELECT 
    'Functions' as check_type,
    routine_name,
    routine_type,
    CASE 
        WHEN routine_name LIKE 'handle_%user%' THEN '✅ User management function'
        ELSE '⚠️ Other function'
    END as purpose
FROM information_schema.routines 
WHERE routine_schema = 'public' 
    AND routine_type = 'FUNCTION'
ORDER BY routine_name;
