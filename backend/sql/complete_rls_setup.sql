-- Complete Row Level Security (RLS) Setup for ChallengeMe
-- This file sets up RLS policies for all tables in the Prisma schema
-- First, drop any existing policies to avoid conflicts
DO $ $ DECLARE r RECORD;

BEGIN -- Drop all existing policies on all tables
FOR r IN (
    SELECT
        schemaname,
        tablename,
        policyname
    FROM
        pg_policies
    WHERE
        schemaname = 'public'
) LOOP EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON "' || r.schemaname || '"."' || r.tablename || '";';

END LOOP;

END $ $;

-- Disable RLS temporarily on profiles to allow trigger functions to work
ALTER TABLE
    "public"."profiles" DISABLE ROW LEVEL SECURITY;

-- Enable RLS on all tables
ALTER TABLE
    "public"."Team" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."TeamMembership" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Challenge" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Milestone" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."MilestoneProgress" ENABLE ROW LEVEL SECURITY;

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

-- =============================================================================
-- PROFILES POLICIES
-- =============================================================================
-- Public profiles are viewable by everyone
CREATE POLICY "Public profiles are viewable by everyone" ON "public"."profiles" FOR
SELECT
    USING (true);

-- Users can insert their own profile (needed for triggers)
CREATE POLICY "Users can insert their own profile" ON "public"."profiles" FOR
INSERT
    WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON "public"."profiles" FOR
UPDATE
    USING (auth.uid() = id);

-- Users can delete their own profile
CREATE POLICY "Users can delete their own profile" ON "public"."profiles" FOR DELETE USING (auth.uid() = id);

-- Grant necessary permissions to service role for triggers
GRANT ALL ON "public"."profiles" TO service_role;

-- =============================================================================
-- TEAM POLICIES
-- =============================================================================
-- Teams are viewable by everyone
CREATE POLICY "Teams are viewable by everyone" ON "public"."Team" FOR
SELECT
    USING (true);

-- Users can create teams
CREATE POLICY "Users can create teams" ON "public"."Team" FOR
INSERT
    WITH CHECK (auth.uid() = "creatorId");

-- Team creators can update their teams
CREATE POLICY "Team creators can update their teams" ON "public"."Team" FOR
UPDATE
    USING (auth.uid() = "creatorId");

-- Team creators can delete their teams
CREATE POLICY "Team creators can delete their teams" ON "public"."Team" FOR DELETE USING (auth.uid() = "creatorId");

-- =============================================================================
-- TEAM MEMBERSHIP POLICIES
-- =============================================================================
-- Team memberships are viewable by everyone
CREATE POLICY "Team memberships are viewable by everyone" ON "public"."TeamMembership" FOR
SELECT
    USING (true);

-- Users can join teams (create membership for themselves)
CREATE POLICY "Users can join teams" ON "public"."TeamMembership" FOR
INSERT
    WITH CHECK (auth.uid() = "userId");

-- Team creators can add members to their teams
CREATE POLICY "Team creators can manage memberships" ON "public"."TeamMembership" FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "public"."Team"
            WHERE
                id = "teamId"
                AND "creatorId" = auth.uid()
        )
    );

-- Users can leave teams they belong to
CREATE POLICY "Users can leave teams they belong to" ON "public"."TeamMembership" FOR DELETE USING (auth.uid() = "userId");

-- Team creators can remove members from their teams
CREATE POLICY "Team creators can remove members" ON "public"."TeamMembership" FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."Team"
        WHERE
            id = "teamId"
            AND "creatorId" = auth.uid()
    )
);

-- =============================================================================
-- CHALLENGE POLICIES
-- =============================================================================
-- Challenges are viewable by everyone
CREATE POLICY "Challenges are viewable by everyone" ON "public"."Challenge" FOR
SELECT
    USING (true);

-- Users can create challenges
CREATE POLICY "Users can create challenges" ON "public"."Challenge" FOR
INSERT
    WITH CHECK (auth.uid() = "creatorId");

-- Challenge creators can update their challenges
CREATE POLICY "Challenge creators can update their challenges" ON "public"."Challenge" FOR
UPDATE
    USING (auth.uid() = "creatorId");

-- Challenge creators can delete their challenges
CREATE POLICY "Challenge creators can delete their challenges" ON "public"."Challenge" FOR DELETE USING (auth.uid() = "creatorId");

-- =============================================================================
-- MILESTONE POLICIES
-- =============================================================================
-- Milestones are viewable by everyone
CREATE POLICY "Milestones are viewable by everyone" ON "public"."Milestone" FOR
SELECT
    USING (true);

-- Challenge creators can create milestones for their challenges
CREATE POLICY "Challenge creators can create milestones" ON "public"."Milestone" FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "public"."Challenge"
            WHERE
                id = "challengeId"
                AND "creatorId" = auth.uid()
        )
    );

-- Challenge creators can update milestones for their challenges
CREATE POLICY "Challenge creators can update milestones" ON "public"."Milestone" FOR
UPDATE
    USING (
        EXISTS (
            SELECT
                1
            FROM
                "public"."Challenge"
            WHERE
                id = "challengeId"
                AND "creatorId" = auth.uid()
        )
    );

-- Challenge creators can delete milestones for their challenges
CREATE POLICY "Challenge creators can delete milestones" ON "public"."Milestone" FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."Challenge"
        WHERE
            id = "challengeId"
            AND "creatorId" = auth.uid()
    )
);

-- =============================================================================
-- MILESTONE PROGRESS POLICIES
-- =============================================================================
-- Milestone progress is viewable by everyone
CREATE POLICY "Milestone progress is viewable by everyone" ON "public"."MilestoneProgress" FOR
SELECT
    USING (true);

-- Participants can update their own milestone progress
CREATE POLICY "Participants can update their milestone progress" ON "public"."MilestoneProgress" FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant"
            WHERE
                id = "participantId"
                AND "userId" = auth.uid()
        )
    );

-- Participants can update their own milestone progress
CREATE POLICY "Participants can update their own milestone progress" ON "public"."MilestoneProgress" FOR
UPDATE
    USING (
        EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant"
            WHERE
                id = "participantId"
                AND "userId" = auth.uid()
        )
    );

-- System can create/update milestone progress (for automatic updates)
CREATE POLICY "System can manage milestone progress" ON "public"."MilestoneProgress" FOR ALL USING (true) WITH CHECK (true);

-- =============================================================================
-- CHALLENGE PARTICIPANT POLICIES
-- =============================================================================
-- Challenge participants are viewable by everyone
CREATE POLICY "Challenge participants are viewable by everyone" ON "public"."ChallengeParticipant" FOR
SELECT
    USING (true);

-- Users can join challenges as individuals
CREATE POLICY "Users can join challenges individually" ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (
        auth.uid() = "userId"
        AND "teamId" IS NULL
    );

-- Team members can join challenges as teams (if they belong to the team)
CREATE POLICY "Team members can join challenges as teams" ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (
        "teamId" IS NOT NULL
        AND "userId" IS NULL
        AND EXISTS (
            SELECT
                1
            FROM
                "public"."TeamMembership"
            WHERE
                "teamId" = "ChallengeParticipant"."teamId"
                AND "userId" = auth.uid()
        )
    );

-- Users can leave challenges they joined individually
CREATE POLICY "Users can leave individual challenges" ON "public"."ChallengeParticipant" FOR DELETE USING (
    auth.uid() = "userId"
    AND "teamId" IS NULL
);

-- Team members can remove their team from challenges
CREATE POLICY "Team members can remove teams from challenges" ON "public"."ChallengeParticipant" FOR DELETE USING (
    "teamId" IS NOT NULL
    AND "userId" IS NULL
    AND EXISTS (
        SELECT
            1
        FROM
            "public"."TeamMembership"
        WHERE
            "teamId" = "ChallengeParticipant"."teamId"
            AND "userId" = auth.uid()
    )
);

-- =============================================================================
-- ACTIVITY POLICIES
-- =============================================================================
-- Activities are viewable by everyone
CREATE POLICY "Activities are viewable by everyone" ON "public"."Activity" FOR
SELECT
    USING (true);

-- Users can create activities for their own participations
CREATE POLICY "Users can create their own activities" ON "public"."Activity" FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant"
            WHERE
                id = "participantId"
                AND "userId" = auth.uid()
        )
    );

-- Users can update their own activities
CREATE POLICY "Users can update their own activities" ON "public"."Activity" FOR
UPDATE
    USING (
        EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant"
            WHERE
                id = "participantId"
                AND "userId" = auth.uid()
        )
    );

-- Users can delete their own activities
CREATE POLICY "Users can delete their own activities" ON "public"."Activity" FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."ChallengeParticipant"
        WHERE
            id = "participantId"
            AND "userId" = auth.uid()
    )
);

-- =============================================================================
-- POST POLICIES
-- =============================================================================
-- Posts are viewable by everyone
CREATE POLICY "Posts are viewable by everyone" ON "public"."Post" FOR
SELECT
    USING (true);

-- Users can create posts for their own participations
CREATE POLICY "Users can create posts for their participations" ON "public"."Post" FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant"
            WHERE
                id = "participantId"
                AND "userId" = auth.uid()
        )
    );

-- Users can update their own posts
CREATE POLICY "Users can update their own posts" ON "public"."Post" FOR
UPDATE
    USING (
        EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant"
            WHERE
                id = "participantId"
                AND "userId" = auth.uid()
        )
    );

-- Users can delete their own posts
CREATE POLICY "Users can delete their own posts" ON "public"."Post" FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."ChallengeParticipant"
        WHERE
            id = "participantId"
            AND "userId" = auth.uid()
    )
);

-- =============================================================================
-- COMMENT POLICIES
-- =============================================================================
-- Comments are viewable by everyone
CREATE POLICY "Comments are viewable by everyone" ON "public"."Comment" FOR
SELECT
    USING (true);

-- Users can create comments
CREATE POLICY "Users can create comments" ON "public"."Comment" FOR
INSERT
    WITH CHECK (auth.uid() = "authorId");

-- Users can update their own comments
CREATE POLICY "Users can update their own comments" ON "public"."Comment" FOR
UPDATE
    USING (auth.uid() = "authorId");

-- Users can delete their own comments
CREATE POLICY "Users can delete their own comments" ON "public"."Comment" FOR DELETE USING (auth.uid() = "authorId");

-- =============================================================================
-- GRANT PERMISSIONS
-- =============================================================================
-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant permissions to service role (for triggers and functions)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;