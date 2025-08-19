-- WORKING RLS FIX FOR CHALLENGEME
-- This script resolves "permission denied for schema public" errors
-- Run these commands in your Supabase SQL Editor
-- =============================================================================
-- STEP 1: CLEAN SLATE - Remove all existing policies that might conflict
-- =============================================================================
-- Drop all existing policies on all tables
DO $ $ DECLARE r RECORD;

BEGIN -- Drop all policies on all tables
FOR r IN (
    SELECT
        schemaname,
        tablename,
        policyname
    FROM
        pg_policies
    WHERE
        schemaname = 'public'
) LOOP EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON "' || r.schemaname || '"."' || r.tablename || '"';

END LOOP;

END $ $;

-- =============================================================================
-- STEP 2: DISABLE RLS TEMPORARILY to prevent conflicts during setup
-- =============================================================================
ALTER TABLE
    "public"."profiles" DISABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Team" DISABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."TeamMembership" DISABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Challenge" DISABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."ChallengeParticipant" DISABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Activity" DISABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Post" DISABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Comment" DISABLE ROW LEVEL SECURITY;

-- =============================================================================
-- STEP 3: GRANT NECESSARY PERMISSIONS TO SERVICE ROLE
-- =============================================================================
-- These grants are crucial for triggers and functions to work
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Grant permissions to authenticated users
GRANT
SELECT
,
INSERT
,
UPDATE
,
    DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant permissions to anon users (for public data)
GRANT
SELECT
    ON ALL TABLES IN SCHEMA public TO anon;

-- =============================================================================
-- STEP 4: ENABLE RLS ON ALL TABLES
-- =============================================================================
ALTER TABLE
    "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Team" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."TeamMembership" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Challenge" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."ChallengeParticipant" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Activity" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Post" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Comment" ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- STEP 5: CREATE COMPREHENSIVE RLS POLICIES
-- =============================================================================
-- PROFILES TABLE POLICIES
-- Allow everyone to read profiles (for display purposes)
CREATE POLICY "profiles_select_all" ON "public"."profiles" FOR
SELECT
    USING (true);

-- Allow users to insert their own profile
CREATE POLICY "profiles_insert_own" ON "public"."profiles" FOR
INSERT
    WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "profiles_update_own" ON "public"."profiles" FOR
UPDATE
    USING (auth.uid() = id);

-- Allow users to delete their own profile
CREATE POLICY "profiles_delete_own" ON "public"."profiles" FOR DELETE USING (auth.uid() = id);

-- TEAM TABLE POLICIES
-- Allow everyone to view teams
CREATE POLICY "teams_select_all" ON "public"."Team" FOR
SELECT
    USING (true);

-- Allow authenticated users to create teams
CREATE POLICY "teams_insert_authenticated" ON "public"."Team" FOR
INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Allow team creators to update their teams
CREATE POLICY "teams_update_creator" ON "public"."Team" FOR
UPDATE
    USING (auth.uid() = "creatorId");

-- Allow team creators to delete their teams
CREATE POLICY "teams_delete_creator" ON "public"."Team" FOR DELETE USING (auth.uid() = "creatorId");

-- TEAM MEMBERSHIP POLICIES
-- Allow everyone to view team memberships
CREATE POLICY "team_memberships_select_all" ON "public"."TeamMembership" FOR
SELECT
    USING (true);

-- Allow users to join teams
CREATE POLICY "team_memberships_insert_own" ON "public"."TeamMembership" FOR
INSERT
    WITH CHECK (auth.uid() = "userId");

-- Allow users to leave teams they belong to
CREATE POLICY "team_memberships_delete_own" ON "public"."TeamMembership" FOR DELETE USING (auth.uid() = "userId");

-- CHALLENGE TABLE POLICIES (THIS IS THE MAIN FIX)
-- Allow everyone to view challenges (CRITICAL for your error)
CREATE POLICY "challenges_select_all" ON "public"."Challenge" FOR
SELECT
    USING (true);

-- Allow authenticated users to create challenges
CREATE POLICY "challenges_insert_authenticated" ON "public"."Challenge" FOR
INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Allow challenge creators to update their challenges
CREATE POLICY "challenges_update_creator" ON "public"."Challenge" FOR
UPDATE
    USING (auth.uid() = "creatorId");

-- Allow challenge creators to delete their challenges
CREATE POLICY "challenges_delete_creator" ON "public"."Challenge" FOR DELETE USING (auth.uid() = "creatorId");

-- CHALLENGE PARTICIPANT POLICIES
-- Allow everyone to view challenge participants
CREATE POLICY "challenge_participants_select_all" ON "public"."ChallengeParticipant" FOR
SELECT
    USING (true);

-- Allow users to join challenges
CREATE POLICY "challenge_participants_insert_own" ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (auth.uid() = "userId");

-- Allow users to update their own participation
CREATE POLICY "challenge_participants_update_own" ON "public"."ChallengeParticipant" FOR
UPDATE
    USING (auth.uid() = "userId");

-- Allow users to leave challenges they joined
CREATE POLICY "challenge_participants_delete_own" ON "public"."ChallengeParticipant" FOR DELETE USING (auth.uid() = "userId");

-- ACTIVITY TABLE POLICIES
-- Allow everyone to view activities
CREATE POLICY "activities_select_all" ON "public"."Activity" FOR
SELECT
    USING (true);

-- Allow users to create their own activities
CREATE POLICY "activities_insert_own" ON "public"."Activity" FOR
INSERT
    WITH CHECK (auth.uid() = "profileId");

-- Allow users to update their own activities
CREATE POLICY "activities_update_own" ON "public"."Activity" FOR
UPDATE
    USING (auth.uid() = "profileId");

-- Allow users to delete their own activities
CREATE POLICY "activities_delete_own" ON "public"."Activity" FOR DELETE USING (auth.uid() = "profileId");

-- POST TABLE POLICIES
-- Allow everyone to view posts
CREATE POLICY "posts_select_all" ON "public"."Post" FOR
SELECT
    USING (true);

-- Allow users to create posts for their activities
CREATE POLICY "posts_insert_own" ON "public"."Post" FOR
INSERT
    WITH CHECK (auth.uid() = "profileId");

-- Allow users to update their own posts
CREATE POLICY "posts_update_own" ON "public"."Post" FOR
UPDATE
    USING (auth.uid() = "profileId");

-- Allow users to delete their own posts
CREATE POLICY "posts_delete_own" ON "public"."Post" FOR DELETE USING (auth.uid() = "profileId");

-- COMMENT TABLE POLICIES
-- Allow everyone to view comments
CREATE POLICY "comments_select_all" ON "public"."Comment" FOR
SELECT
    USING (true);

-- Allow authenticated users to create comments
CREATE POLICY "comments_insert_authenticated" ON "public"."Comment" FOR
INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Allow users to update their own comments
CREATE POLICY "comments_update_own" ON "public"."Comment" FOR
UPDATE
    USING (auth.uid() = "authorId");

-- Allow users to delete their own comments
CREATE POLICY "comments_delete_own" ON "public"."Comment" FOR DELETE USING (auth.uid() = "authorId");

-- =============================================================================
-- STEP 6: ADDITIONAL SAFETY MEASURES
-- =============================================================================
-- Ensure the auth schema has proper permissions
GRANT USAGE ON SCHEMA auth TO authenticated,
anon;

GRANT
SELECT
    ON auth.users TO authenticated;

-- Create a function to help with debugging
CREATE
OR REPLACE FUNCTION public.check_rls_policies() RETURNS TABLE(table_name text, policy_count bigint) LANGUAGE sql SECURITY DEFINER AS $ $
SELECT
    schemaname || '.' || tablename as table_name,
    COUNT(*) as policy_count
FROM
    pg_policies
WHERE
    schemaname = 'public'
GROUP BY
    schemaname,
    tablename
ORDER BY
    table_name;

$ $;

-- Grant execute permission on the debug function
GRANT EXECUTE ON FUNCTION public.check_rls_policies() TO authenticated;

-- =============================================================================
-- VERIFICATION QUERIES (Run these after the main script)
-- =============================================================================
-- You can run these queries to verify the setup worked:
-- SELECT * FROM public.check_rls_policies();
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
-- =============================================================================
-- COMPLETION MESSAGE
-- =============================================================================
DO $ $ BEGIN RAISE NOTICE 'RLS setup completed successfully!';

RAISE NOTICE 'All tables now have proper policies that allow:';

RAISE NOTICE '1. Public read access to all data';

RAISE NOTICE '2. Authenticated users can create/modify their own data';

RAISE NOTICE '3. Service role has full access for triggers';

RAISE NOTICE '';

RAISE NOTICE 'The "permission denied for schema public" error should now be resolved.';

END $ $;