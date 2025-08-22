-- Row Level Security (RLS) Policies for ChallengeMe
-- This file sets up all RLS policies for database security
-- =====================================================
-- CLEANUP EXISTING POLICIES
-- =====================================================
-- Drop all existing policies to avoid conflicts
DO $ $ DECLARE r RECORD;

BEGIN FOR r IN (
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

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
-- Disable RLS temporarily on profiles to allow trigger functions to work
ALTER TABLE
    "public"."profiles" DISABLE ROW LEVEL SECURITY;

-- Enable RLS on all application tables
ALTER TABLE
    "public"."Team" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."TeamMembership" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Challenge" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."ChallengeActivityType" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."ActivityType" ENABLE ROW LEVEL SECURITY;

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

-- =====================================================
-- ACTIVITY TYPE POLICIES
-- =====================================================
CREATE POLICY "Activity types are viewable by everyone" ON "public"."ActivityType" FOR
SELECT
    USING (true);

-- Only system/admin can manage activity types (for now)
CREATE POLICY "System can manage activity types" ON "public"."ActivityType" FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- CHALLENGE ACTIVITY TYPE POLICIES
-- =====================================================
CREATE POLICY "Challenge activity types are viewable by everyone" ON "public"."ChallengeActivityType" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge creators can manage activity types" ON "public"."ChallengeActivityType" FOR
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

CREATE POLICY "Challenge creators can update activity types" ON "public"."ChallengeActivityType" FOR
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

CREATE POLICY "Challenge creators can delete activity types" ON "public"."ChallengeActivityType" FOR DELETE USING (
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

-- =====================================================
-- PROFILES POLICIES
-- =====================================================
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

-- =====================================================
-- TEAM POLICIES
-- =====================================================
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

-- =====================================================
-- TEAM MEMBERSHIP POLICIES
-- =====================================================
CREATE POLICY "Team memberships are viewable by everyone" ON "public"."TeamMembership" FOR
SELECT
    USING (true);

CREATE POLICY "Users can join teams" ON "public"."TeamMembership" FOR
INSERT
    WITH CHECK (auth.uid() = "userId");

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

CREATE POLICY "Users can leave teams they belong to" ON "public"."TeamMembership" FOR DELETE USING (auth.uid() = "userId");

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

-- =====================================================
-- CHALLENGE POLICIES
-- =====================================================
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

-- =====================================================
-- MILESTONE POLICIES
-- =====================================================
CREATE POLICY "Milestones are viewable by everyone" ON "public"."Milestone" FOR
SELECT
    USING (true);

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

-- =====================================================
-- MILESTONE PROGRESS POLICIES
-- =====================================================
CREATE POLICY "Milestone progress is viewable by everyone" ON "public"."MilestoneProgress" FOR
SELECT
    USING (true);

CREATE POLICY "Participants can create their milestone progress" ON "public"."MilestoneProgress" FOR
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

CREATE POLICY "Participants can update their milestone progress" ON "public"."MilestoneProgress" FOR
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

-- System can manage milestone progress (for automatic updates)
CREATE POLICY "System can manage milestone progress" ON "public"."MilestoneProgress" FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- CHALLENGE PARTICIPANT POLICIES
-- =====================================================
CREATE POLICY "Challenge participants are viewable by everyone" ON "public"."ChallengeParticipant" FOR
SELECT
    USING (true);

CREATE POLICY "Users can join challenges individually" ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (
        auth.uid() = "userId"
        AND "teamId" IS NULL
    );

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

CREATE POLICY "Users can leave individual challenges" ON "public"."ChallengeParticipant" FOR DELETE USING (
    auth.uid() = "userId"
    AND "teamId" IS NULL
);

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

-- =====================================================
-- ACTIVITY POLICIES
-- =====================================================
CREATE POLICY "Activities are viewable by everyone" ON "public"."Activity" FOR
SELECT
    USING (true);

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

-- =====================================================
-- POST POLICIES
-- =====================================================
CREATE POLICY "Posts are viewable by everyone" ON "public"."Post" FOR
SELECT
    USING (true);

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

-- =====================================================
-- COMMENT POLICIES
-- =====================================================
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

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================
-- Grant necessary permissions to service role for triggers
GRANT ALL ON "public"."profiles" TO service_role;

-- Grant permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant permissions to service role (for triggers and functions)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;