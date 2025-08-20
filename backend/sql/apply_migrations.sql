-- Master Migration Script for ChallengeMe
-- This script applies SQL-specific database changes
-- Run Prisma migrations first: npx prisma db push
\ echo 'Starting ChallengeMe SQL migrations...' \ echo 'Note: Make sure you have run "npx prisma db push" first!' -- =====================================================
-- STEP 1: SCHEMA UPDATES (SQL-only features)
-- =====================================================
\ echo 'Step 1: Applying SQL-specific schema updates...' \ i schema_updates.sql -- =====================================================
-- STEP 2: TRIGGERS AND FUNCTIONS
-- =====================================================
\ echo 'Step 2: Setting up triggers and functions...' \ i triggers_functions.sql -- =====================================================
-- STEP 3: RLS POLICIES
-- =====================================================
\ echo 'Step 3: Applying Row Level Security policies...' \ i rls_policies.sql -- =====================================================
-- VALIDATION
-- =====================================================
\ echo 'Step 4: Validating migration...' -- Check that all expected tables exist (should be created by Prisma)
SELECT
    'Tables Check' as check_type,
    COUNT(*) as found_tables,
    CASE
        WHEN COUNT(*) >= 10 THEN '✅ All expected tables found'
        ELSE '⚠️ Missing some tables'
    END as status
FROM
    information_schema.tables
WHERE
    table_schema = 'public'
    AND table_name IN (
        'profiles',
        'Team',
        'TeamMembership',
        'Challenge',
        'Milestone',
        'MilestoneProgress',
        'ChallengeParticipant',
        'Activity',
        'Post',
        'Comment'
    );

-- Check that RLS is enabled
SELECT
    'RLS Check' as check_type,
    COUNT(*) as tables_with_rls,
    CASE
        WHEN COUNT(*) >= 9 THEN '✅ RLS enabled on all tables'
        ELSE '⚠️ RLS not enabled on some tables'
    END as status
FROM
    information_schema.tables t
    JOIN pg_class c ON c.relname = t.table_name
WHERE
    t.table_schema = 'public'
    AND t.table_name IN (
        'Team',
        'TeamMembership',
        'Challenge',
        'Milestone',
        'MilestoneProgress',
        'ChallengeParticipant',
        'Activity',
        'Post',
        'Comment'
    )
    AND c.relrowsecurity = true;

-- Check that functions exist
SELECT
    'Functions Check' as check_type,
    COUNT(*) as functions_found,
    CASE
        WHEN COUNT(*) >= 5 THEN '✅ All functions created'
        ELSE '⚠️ Some functions missing'
    END as status
FROM
    information_schema.routines
WHERE
    routine_schema = 'public'
    AND routine_name IN (
        'generate_random_username',
        'get_random_avatar_url',
        'handle_new_user',
        'update_team_member_count',
        'update_challenge_participant_count'
    );

-- Check that triggers exist
SELECT
    'Triggers Check' as check_type,
    COUNT(*) as triggers_found,
    CASE
        WHEN COUNT(*) >= 3 THEN '✅ All triggers created'
        ELSE '⚠️ Some triggers missing'
    END as status
FROM
    information_schema.triggers
WHERE
    trigger_schema = 'public'
    AND trigger_name IN (
        'on_auth_user_created',
        'update_team_member_count_trigger',
        'update_challenge_participant_count_trigger'
    );

-- Check partial unique indexes (SQL-specific)
SELECT
    'Partial Indexes Check' as check_type,
    COUNT(*) as indexes_found,
    CASE
        WHEN COUNT(*) >= 2 THEN '✅ Partial unique indexes created'
        ELSE '⚠️ Some partial indexes missing'
    END as status
FROM
    pg_indexes
WHERE
    schemaname = 'public'
    AND indexname IN (
        'idx_challengeparticipant_challengeid_userid_unique',
        'idx_challengeparticipant_challengeid_teamid_unique'
    );

\ echo '' \ echo '🎉 SQL migration completed successfully!' \ echo 'Your database now has:' \ echo '  • Schema managed by Prisma' \ echo '  • Advanced SQL features (triggers, RLS, constraints)' \ echo '  • Full ChallengeMe functionality ready!'