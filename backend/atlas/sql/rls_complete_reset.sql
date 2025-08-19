-- COMPREHENSIVE RLS POLICY RESET AND SETUP
-- This script safely removes all existing policies and creates clean new ones
-- Run this in your Supabase SQL Editor
-- First, disable RLS on all tables to prevent conflicts
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

-- Drop ALL existing policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON "public"."profiles";

DROP POLICY IF EXISTS "Users can update their own profile" ON "public"."profiles";

DROP POLICY IF EXISTS "Users can insert their own profile" ON "public"."profiles";

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON "public"."profiles";

DROP POLICY IF EXISTS "profiles_select_policy" ON "public"."profiles";

DROP POLICY IF EXISTS "profiles_insert_policy" ON "public"."profiles";

DROP POLICY IF EXISTS "profiles_update_policy" ON "public"."profiles";

DROP POLICY IF EXISTS "profiles_delete_policy" ON "public"."profiles";

DROP POLICY IF EXISTS "authenticated_users_select_profiles" ON "public"."profiles";

DROP POLICY IF EXISTS "users_insert_own_profile" ON "public"."profiles";

DROP POLICY IF EXISTS "users_update_own_profile" ON "public"."profiles";

-- Drop ALL existing policies for Team table
DROP POLICY IF EXISTS "Teams are viewable by everyone" ON "public"."Team";

DROP POLICY IF EXISTS "Users can create teams" ON "public"."Team";

DROP POLICY IF EXISTS "Team creators can update their teams" ON "public"."Team";

DROP POLICY IF EXISTS "Team creators can delete their teams" ON "public"."Team";

DROP POLICY IF EXISTS "authenticated_users_all_teams" ON "public"."Team";

-- Drop ALL existing policies for TeamMembership table
DROP POLICY IF EXISTS "Team memberships are viewable by everyone" ON "public"."TeamMembership";

DROP POLICY IF EXISTS "Users can join teams" ON "public"."TeamMembership";

DROP POLICY IF EXISTS "Users can leave teams they belong to" ON "public"."TeamMembership";

DROP POLICY IF EXISTS "authenticated_users_all_team_memberships" ON "public"."TeamMembership";

-- Drop ALL existing policies for Challenge table
DROP POLICY IF EXISTS "Challenges are viewable by everyone" ON "public"."Challenge";

DROP POLICY IF EXISTS "Users can create challenges" ON "public"."Challenge";

DROP POLICY IF EXISTS "Challenge creators can update their challenges" ON "public"."Challenge";

DROP POLICY IF EXISTS "Challenge creators can delete their challenges" ON "public"."Challenge";

DROP POLICY IF EXISTS "authenticated_users_all_challenges" ON "public"."Challenge";

-- Drop ALL existing policies for ChallengeParticipant table
DROP POLICY IF EXISTS "Challenge participants are viewable by everyone" ON "public"."ChallengeParticipant";

DROP POLICY IF EXISTS "Users can join challenges" ON "public"."ChallengeParticipant";

DROP POLICY IF EXISTS "Users can leave challenges they joined" ON "public"."ChallengeParticipant";

DROP POLICY IF EXISTS "authenticated_users_all_challenge_participants" ON "public"."ChallengeParticipant";

-- Drop ALL existing policies for Activity table
DROP POLICY IF EXISTS "Activities are viewable by everyone" ON "public"."Activity";

DROP POLICY IF EXISTS "Users can create their own activities" ON "public"."Activity";

DROP POLICY IF EXISTS "Users can update their own activities" ON "public"."Activity";

DROP POLICY IF EXISTS "Users can delete their own activities" ON "public"."Activity";

DROP POLICY IF EXISTS "authenticated_users_all_activities" ON "public"."Activity";

-- Drop ALL existing policies for Post table
DROP POLICY IF EXISTS "Posts are viewable by everyone" ON "public"."Post";

DROP POLICY IF EXISTS "Users can create posts for their activities" ON "public"."Post";

DROP POLICY IF EXISTS "Users can update their own posts" ON "public"."Post";

DROP POLICY IF EXISTS "Users can delete their own posts" ON "public"."Post";

DROP POLICY IF EXISTS "authenticated_users_all_posts" ON "public"."Post";

-- Drop ALL existing policies for Comment table
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON "public"."Comment";

DROP POLICY IF EXISTS "Users can create comments" ON "public"."Comment";

DROP POLICY IF EXISTS "Users can update their own comments" ON "public"."Comment";

DROP POLICY IF EXISTS "Users can delete their own comments" ON "public"."Comment";

DROP POLICY IF EXISTS "authenticated_users_all_comments" ON "public"."Comment";

-- Grant necessary permissions to service role for all tables
GRANT ALL ON "public"."profiles" TO service_role;

GRANT ALL ON "public"."Team" TO service_role;

GRANT ALL ON "public"."TeamMembership" TO service_role;

GRANT ALL ON "public"."Challenge" TO service_role;

GRANT ALL ON "public"."ChallengeParticipant" TO service_role;

GRANT ALL ON "public"."Activity" TO service_role;

GRANT ALL ON "public"."Post" TO service_role;

GRANT ALL ON "public"."Comment" TO service_role;

-- Now enable RLS on all tables
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

-- Create clean, new policies
-- Profiles policies (allow public read, users manage their own)
CREATE POLICY "profile_public_select" ON "public"."profiles" FOR
SELECT
    USING (true);

CREATE POLICY "profile_user_insert" ON "public"."profiles" FOR
INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "profile_user_update" ON "public"."profiles" FOR
UPDATE
    USING (auth.uid() = id);

CREATE POLICY "profile_user_delete" ON "public"."profiles" FOR DELETE USING (auth.uid() = id);

-- Team policies (public read, creators manage)
CREATE POLICY "team_public_select" ON "public"."Team" FOR
SELECT
    USING (true);

CREATE POLICY "team_creator_insert" ON "public"."Team" FOR
INSERT
    WITH CHECK (auth.uid() = "creatorId");

CREATE POLICY "team_creator_update" ON "public"."Team" FOR
UPDATE
    USING (auth.uid() = "creatorId");

CREATE POLICY "team_creator_delete" ON "public"."Team" FOR DELETE USING (auth.uid() = "creatorId");

-- Team membership policies (public read, users manage their own)
CREATE POLICY "team_membership_public_select" ON "public"."TeamMembership" FOR
SELECT
    USING (true);

CREATE POLICY "team_membership_user_insert" ON "public"."TeamMembership" FOR
INSERT
    WITH CHECK (auth.uid() = "userId");

CREATE POLICY "team_membership_user_delete" ON "public"."TeamMembership" FOR DELETE USING (auth.uid() = "userId");

-- Challenge policies (public read, creators manage)
CREATE POLICY "challenge_public_select" ON "public"."Challenge" FOR
SELECT
    USING (true);

CREATE POLICY "challenge_creator_insert" ON "public"."Challenge" FOR
INSERT
    WITH CHECK (auth.uid() = "creatorId");

CREATE POLICY "challenge_creator_update" ON "public"."Challenge" FOR
UPDATE
    USING (auth.uid() = "creatorId");

CREATE POLICY "challenge_creator_delete" ON "public"."Challenge" FOR DELETE USING (auth.uid() = "creatorId");

-- Challenge participant policies (public read, users manage their own)
CREATE POLICY "challenge_participant_public_select" ON "public"."ChallengeParticipant" FOR
SELECT
    USING (true);

CREATE POLICY "challenge_participant_user_insert" ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (auth.uid() = "userId");

CREATE POLICY "challenge_participant_user_delete" ON "public"."ChallengeParticipant" FOR DELETE USING (auth.uid() = "userId");

-- Activity policies (public read, users manage their own)
CREATE POLICY "activity_public_select" ON "public"."Activity" FOR
SELECT
    USING (true);

CREATE POLICY "activity_user_insert" ON "public"."Activity" FOR
INSERT
    WITH CHECK (auth.uid() = "profileId");

CREATE POLICY "activity_user_update" ON "public"."Activity" FOR
UPDATE
    USING (auth.uid() = "profileId");

CREATE POLICY "activity_user_delete" ON "public"."Activity" FOR DELETE USING (auth.uid() = "profileId");

-- Post policies (public read, users manage their own posts)
CREATE POLICY "post_public_select" ON "public"."Post" FOR
SELECT
    USING (true);

CREATE POLICY "post_user_insert" ON "public"."Post" FOR
INSERT
    WITH CHECK (auth.uid() = "profileId");

CREATE POLICY "post_user_update" ON "public"."Post" FOR
UPDATE
    USING (auth.uid() = "profileId");

CREATE POLICY "post_user_delete" ON "public"."Post" FOR DELETE USING (auth.uid() = "profileId");

-- Comment policies (public read, users manage their own)
CREATE POLICY "comment_public_select" ON "public"."Comment" FOR
SELECT
    USING (true);

CREATE POLICY "comment_user_insert" ON "public"."Comment" FOR
INSERT
    WITH CHECK (auth.uid() = "authorId");

CREATE POLICY "comment_user_update" ON "public"."Comment" FOR
UPDATE
    USING (auth.uid() = "authorId");

CREATE POLICY "comment_user_delete" ON "public"."Comment" FOR DELETE USING (auth.uid() = "authorId");

-- Verify setup completed
SELECT
    'RLS policies have been reset and recreated successfully!' as status;