-- Row Level Security (RLS) Setup for ChallengeMe
-- Run these SQL commands in your Supabase SQL Editor
-- IMPORTANT: First, let's drop any existing policies that might conflict
DROP POLICY IF EXISTS "Users can view their own profile" ON "public"."profiles";

DROP POLICY IF EXISTS "Users can update their own profile" ON "public"."profiles";

DROP POLICY IF EXISTS "Users can insert their own profile" ON "public"."profiles";

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON "public"."profiles";

-- Disable RLS temporarily on profiles to allow trigger functions to work
ALTER TABLE
    "public"."profiles" DISABLE ROW LEVEL SECURITY;

-- Enable RLS on other tables
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

-- Re-enable RLS on profiles AFTER ensuring triggers work
ALTER TABLE
    "public"."profiles" ENABLE ROW LEVEL SECURITY;

-- Profiles policies (SIMPLIFIED - everyone can read, users can manage their own)
CREATE POLICY "Public profiles are viewable by everyone" ON "public"."profiles" FOR
SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile" ON "public"."profiles" FOR
INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON "public"."profiles" FOR
UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON "public"."profiles" FOR DELETE USING (auth.uid() = id);

-- Grant necessary permissions to the service role for triggers
GRANT ALL ON "public"."profiles" TO service_role;

-- Team policies
CREATE POLICY "Teams are viewable by everyone" ON "public"."Team" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create teams" ON "public"."Team" FOR
INSERT
    WITH CHECK (auth.uid() = "creatorId");

CREATE POLICY "Team creators can update their teams" ON "public"."Team" FOR
UPDATE
    USING (auth.uid() = "creatorId");

CREATE POLICY "Team creators can delete their teams" ON "public"."Team" FOR DELETE USING (auth.uid() = "creatorId");

-- Team membership policies
CREATE POLICY "Team memberships are viewable by everyone" ON "public"."TeamMembership" FOR
SELECT
    USING (true);

CREATE POLICY "Users can join teams" ON "public"."TeamMembership" FOR
INSERT
    WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can leave teams they belong to" ON "public"."TeamMembership" FOR DELETE USING (auth.uid() = "userId");

-- Challenge policies
CREATE POLICY "Challenges are viewable by everyone" ON "public"."Challenge" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create challenges" ON "public"."Challenge" FOR
INSERT
    WITH CHECK (auth.uid() = "creatorId");

CREATE POLICY "Challenge creators can update their challenges" ON "public"."Challenge" FOR
UPDATE
    USING (auth.uid() = "creatorId");

CREATE POLICY "Challenge creators can delete their challenges" ON "public"."Challenge" FOR DELETE USING (auth.uid() = "creatorId");

-- Challenge participant policies
CREATE POLICY "Challenge participants are viewable by everyone" ON "public"."ChallengeParticipant" FOR
SELECT
    USING (true);

CREATE POLICY "Users can join challenges" ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (auth.uid() = "userId");

CREATE POLICY "Users can leave challenges they joined" ON "public"."ChallengeParticipant" FOR DELETE USING (auth.uid() = "userId");

-- Activity policies
CREATE POLICY "Activities are viewable by everyone" ON "public"."Activity" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create their own activities" ON "public"."Activity" FOR
INSERT
    WITH CHECK (auth.uid() = "profileId");

CREATE POLICY "Users can update their own activities" ON "public"."Activity" FOR
UPDATE
    USING (auth.uid() = "profileId");

CREATE POLICY "Users can delete their own activities" ON "public"."Activity" FOR DELETE USING (auth.uid() = "profileId");

-- Post policies (Note: Posts use participantId, not authorId)
CREATE POLICY "Posts are viewable by everyone" ON "public"."Post" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create posts for their activities" ON "public"."Post" FOR
INSERT
    WITH CHECK (auth.uid() = "profileId");

CREATE POLICY "Users can update their own posts" ON "public"."Post" FOR
UPDATE
    USING (auth.uid() = "profileId");

CREATE POLICY "Users can delete their own posts" ON "public"."Post" FOR DELETE USING (auth.uid() = "profileId");

-- Comment policies (Comments DO have authorId)
CREATE POLICY "Comments are viewable by everyone" ON "public"."Comment" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create comments" ON "public"."Comment" FOR
INSERT
    WITH CHECK (auth.uid() = "authorId");

CREATE POLICY "Users can update their own comments" ON "public"."Comment" FOR
UPDATE
    USING (auth.uid() = "authorId");

CREATE POLICY "Users can delete their own comments" ON "public"."Comment" FOR DELETE USING (auth.uid() = "authorId");