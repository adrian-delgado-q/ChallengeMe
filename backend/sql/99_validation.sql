-- Supabase/SQL Migrations: Validation Script
-- Description: Run this script after all migrations to verify that
-- the necessary database objects have been created correctly.
-- =============================================================================
-- Check if RLS is enabled on key tables
SELECT
    'RLS Check' AS check_type,
    relname AS table_name,
    CASE
        relrowsecurity
        WHEN true THEN '✅ Enabled'
        ELSE '⚠️ NOT ENABLED'
    END AS status
FROM
    pg_class
WHERE
    relkind = 'r'
    AND relnamespace = (
        SELECT
            oid
        FROM
            pg_namespace
        WHERE
            nspname = 'public'
    )
    AND relname IN (
        'profiles',
        'Team',
        'TeamMembership',
        'Challenge',
        'ChallengeParticipant',
        'Activity',
        'Post',
        'Comment' -- 'challenge_progress' removed - replaced with view
    );

-- Check that key functions exist
SELECT
    'Functions Check' AS check_type,
    routine_name,
    '✅ Found' AS status
FROM
    information_schema.routines
WHERE
    routine_schema = 'public'
    AND routine_name IN (
        'generate_random_username',
        'handle_new_user',
        'update_team_member_count',
        'update_challenge_participant_count' -- 'update_challenge_progress', 'handle_activity_delete' removed - no longer needed with view approach
    );

-- Check that key triggers exist
SELECT
    'Triggers Check' AS check_type,
    trigger_name,
    event_object_table,
    '✅ Found' AS status
FROM
    information_schema.triggers
WHERE
    trigger_schema = 'public'
    AND trigger_name IN (
        'update_team_member_count_trigger',
        'update_challenge_participant_count_trigger',
        'trg_activity_progress_upsert',
        'trg_activity_progress_delete'
    );

-- Check auth trigger separately
SELECT
    'Auth Trigger Check' AS check_type,
    trigger_name,
    '✅ Found' as status
FROM
    information_schema.triggers
WHERE
    trigger_schema = 'auth'
    AND trigger_name = 'on_auth_user_created';

-- Check partial unique indexes (SQL-specific)
SELECT
    'Partial Indexes Check' AS check_type,
    indexname,
    '✅ Found' AS status
FROM
    pg_indexes
WHERE
    schemaname = 'public'
    AND indexname IN (
        'idx_challengeparticipant_challengeid_userid_unique',
        'idx_challengeparticipant_challengeid_teamid_unique'
    );

-- Summary validation
SELECT
    'Summary' AS check_type,
    'Migration Status' AS table_name,
    '🎉 All validations completed' AS status;