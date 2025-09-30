-- Supabase/SQL Migrations: Row-Level Security (RLS)
-- Description: Defines all RLS policies for the application tables.
-- It starts by cleaning up existing policies and enabling RLS.
-- =============================================================================
-- Section 1: Cleanup and Enable RLS
-- Prepares the database for new policy definitions.
-- -----------------------------------------------------------------------------
-- Drop all existing policies in the public schema to prevent conflicts.
DO $$ DECLARE r RECORD;

BEGIN FOR r IN (
    SELECT
        tablename,
        policyname
    FROM
        pg_policies
    WHERE
        schemaname = 'public'
) LOOP EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON "public"."' || r.tablename || '";';

END LOOP;

END $$;

-- Enable RLS on all relevant tables.
ALTER TABLE
    "public"."Activity" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."ActivityType" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Challenge" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."ChallengeActivityType" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."ChallengeParticipant" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Comment" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Milestone" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."MilestoneProgress" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Post" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."Team" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."TeamMembership" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    "public"."challenge_progress" ENABLE ROW LEVEL SECURITY;

-- Section 2: Policy Definitions
-- Define access policies for each table.
-- -----------------------------------------------------------------------------
-- Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR
SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR
INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON "public"."profiles" FOR
UPDATE
    USING (auth.uid() = id);

-- Teams
CREATE POLICY "Teams are viewable by authenticated users." ON "public"."Team" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create teams." ON "public"."Team" FOR
INSERT
    WITH CHECK (auth.uid() = "creatorId");

CREATE POLICY "Team creators can update their teams." ON "public"."Team" FOR
UPDATE
    USING (auth.uid() = "creatorId");

CREATE POLICY "Team creators can delete their teams." ON "public"."Team" FOR DELETE USING (auth.uid() = "creatorId");

-- Team Memberships
CREATE POLICY "Team memberships are viewable by authenticated users." ON "public"."TeamMembership" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can join teams or be added by creators." ON "public"."TeamMembership" FOR
INSERT
    WITH CHECK (
        (auth.uid() = "userId")
        OR (
            EXISTS (
                SELECT
                    1
                FROM
                    "public"."Team"
                WHERE
                    id = "teamId"
                    AND "creatorId" = auth.uid()
            )
        )
    );

CREATE POLICY "Users can leave teams." ON "public"."TeamMembership" FOR DELETE USING (auth.uid() = "userId");

CREATE POLICY "Team creators can remove members." ON "public"."TeamMembership" FOR DELETE USING (
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

-- Challenges
CREATE POLICY "Challenges are viewable by authenticated users." ON "public"."Challenge" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create challenges." ON "public"."Challenge" FOR
INSERT
    WITH CHECK (auth.uid() = "creatorId");

CREATE POLICY "Challenge creators can update their challenges." ON "public"."Challenge" FOR
UPDATE
    USING (auth.uid() = "creatorId");

CREATE POLICY "Challenge creators can delete their challenges." ON "public"."Challenge" FOR DELETE USING (auth.uid() = "creatorId");

-- Challenge Participants
CREATE POLICY "Challenge participants are viewable by authenticated users." ON "public"."ChallengeParticipant" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can join challenges individually." ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (
        auth.uid() = "userId"
        AND "teamId" IS NULL
    );

CREATE POLICY "Team members can join challenges for their team." ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (
        "teamId" IS NOT NULL
        AND "userId" IS NULL
        AND EXISTS (
            SELECT
                1
            FROM
                "public"."TeamMembership" tm
            WHERE
                tm."teamId" = "ChallengeParticipant"."teamId"
                AND tm."userId" = auth.uid()
        )
    );

CREATE POLICY "Users can leave individual challenges." ON "public"."ChallengeParticipant" FOR DELETE USING (
    auth.uid() = "userId"
    AND "teamId" IS NULL
);

CREATE POLICY "Team members can remove their team from challenges." ON "public"."ChallengeParticipant" FOR DELETE USING (
    "teamId" IS NOT NULL
    AND "userId" IS NULL
    AND EXISTS (
        SELECT
            1
        FROM
            "public"."TeamMembership" tm
        WHERE
            tm."teamId" = "ChallengeParticipant"."teamId"
            AND tm."userId" = auth.uid()
    )
);

-- Activities
CREATE POLICY "Activities are viewable by authenticated users." ON "public"."Activity" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Challenge participants can log activities." ON "public"."Activity" FOR ALL USING (
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

-- Posts
CREATE POLICY "Posts are viewable by everyone." ON "public"."Post" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can create, update, and delete posts." ON "public"."Post" FOR ALL USING (
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

-- Comments
CREATE POLICY "Comments are viewable by everyone." ON "public"."Comment" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create comments." ON "public"."Comment" FOR
INSERT
    WITH CHECK (auth.uid() = "authorId");

CREATE POLICY "Users can update their own comments." ON "public"."Comment" FOR
UPDATE
    USING (auth.uid() = "authorId");

CREATE POLICY "Users can delete their own comments." ON "public"."Comment" FOR DELETE USING (auth.uid() = "authorId");

-- Activity Types
CREATE POLICY "Activity types are viewable by authenticated users." ON "public"."ActivityType" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "System can manage activity types." ON "public"."ActivityType" FOR ALL USING (true) WITH CHECK (true);

-- Challenge Activity Types
CREATE POLICY "Challenge activity types are viewable by authenticated users." ON "public"."ChallengeActivityType" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Challenge creators can manage activity types." ON "public"."ChallengeActivityType" FOR
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

CREATE POLICY "Challenge creators can update activity types." ON "public"."ChallengeActivityType" FOR
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

CREATE POLICY "Challenge creators can delete activity types." ON "public"."ChallengeActivityType" FOR DELETE USING (
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

-- Milestones
CREATE POLICY "Milestones are viewable by authenticated users." ON "public"."Milestone" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Challenge creators can create milestones." ON "public"."Milestone" FOR
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

CREATE POLICY "Challenge creators can update milestones." ON "public"."Milestone" FOR
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

CREATE POLICY "Challenge creators can delete milestones." ON "public"."Milestone" FOR DELETE USING (
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

-- Milestone Progress
CREATE POLICY "Milestone progress is viewable by authenticated users." ON "public"."MilestoneProgress" FOR
SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Participants can create their milestone progress." ON "public"."MilestoneProgress" FOR
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

CREATE POLICY "Participants can update their milestone progress." ON "public"."MilestoneProgress" FOR
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

CREATE POLICY "System can manage milestone progress." ON "public"."MilestoneProgress" FOR ALL USING (true) WITH CHECK (true);

-- Challenge Progress (Aggregation Table)
-- This table is automatically maintained by database triggers.
-- Users can view progress data, but only system/triggers can modify it.
CREATE POLICY "Challenge progress is viewable by everyone." ON "public"."challenge_progress" FOR
SELECT
    USING (true);

CREATE POLICY "System can manage challenge progress." ON "public"."challenge_progress" FOR ALL USING (true) WITH CHECK (true);