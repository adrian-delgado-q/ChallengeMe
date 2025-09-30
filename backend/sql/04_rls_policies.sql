-- Supabase/SQL Migrations: Row-Level Security (RLS) - FIXED VERSION
-- Description: Defines all RLS policies for the application tables with proper fallbacks.
-- It starts by cleaning up existing policies and enabling RLS with public access fallbacks.
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

-- Section 2: Policy Definitions with Public Access Fallbacks
-- Define access policies for each table with proper public access where needed.
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

-- Teams - Allow public read access for basic functionality
CREATE POLICY "Teams are publicly viewable." ON "public"."Team" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create teams." ON "public"."Team" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN auth.uid() = "creatorId"
            ELSE false
        END
    );

CREATE POLICY "Team creators can update their teams." ON "public"."Team" FOR
UPDATE
    USING (
        CASE
            WHEN auth.uid() IS NOT NULL THEN auth.uid() = "creatorId"
            ELSE false
        END
    );

CREATE POLICY "Team creators can delete their teams." ON "public"."Team" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN auth.uid() = "creatorId"
        ELSE false
    END
);

-- Team Memberships - Allow public read access for team composition
CREATE POLICY "Team memberships are publicly viewable." ON "public"."TeamMembership" FOR
SELECT
    USING (true);

CREATE POLICY "Users can join teams or be added by creators." ON "public"."TeamMembership" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN (auth.uid() = "userId")
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
            ELSE false
        END
    );

CREATE POLICY "Users can leave teams." ON "public"."TeamMembership" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN auth.uid() = "userId"
        ELSE false
    END
);

CREATE POLICY "Team creators can remove members." ON "public"."TeamMembership" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN EXISTS (
            SELECT
                1
            FROM
                "public"."Team"
            WHERE
                id = "teamId"
                AND "creatorId" = auth.uid()
        )
        ELSE false
    END
);

-- Challenges - CRITICAL: Allow public read access to challenges
CREATE POLICY "Challenges are publicly viewable." ON "public"."Challenge" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create challenges." ON "public"."Challenge" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN auth.uid() = "creatorId"
            ELSE false
        END
    );

CREATE POLICY "Challenge creators can update their challenges." ON "public"."Challenge" FOR
UPDATE
    USING (
        CASE
            WHEN auth.uid() IS NOT NULL THEN auth.uid() = "creatorId"
            ELSE false
        END
    );

CREATE POLICY "Challenge creators can delete their challenges." ON "public"."Challenge" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN auth.uid() = "creatorId"
        ELSE false
    END
);

-- Challenge Participants - Allow public read access for leaderboards
CREATE POLICY "Challenge participants are publicly viewable." ON "public"."ChallengeParticipant" FOR
SELECT
    USING (true);

CREATE POLICY "Users can join challenges individually." ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN auth.uid() = "userId"
            AND "teamId" IS NULL
            ELSE false
        END
    );

CREATE POLICY "Team members can join challenges for their team." ON "public"."ChallengeParticipant" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN "teamId" IS NOT NULL
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
            ELSE false
        END
    );

CREATE POLICY "Users can leave individual challenges." ON "public"."ChallengeParticipant" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN auth.uid() = "userId"
        AND "teamId" IS NULL
        ELSE false
    END
);

CREATE POLICY "Team members can remove their team from challenges." ON "public"."ChallengeParticipant" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN "teamId" IS NOT NULL
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
        ELSE false
    END
);

-- Activities - Allow public read access for activity feeds
CREATE POLICY "Activities are publicly viewable." ON "public"."Activity" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can log activities." ON "public"."Activity" FOR ALL USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant"
            WHERE
                id = "participantId"
                AND "userId" = auth.uid()
        )
        ELSE false
    END
);

-- Posts - Allow public read access for social features
CREATE POLICY "Posts are publicly viewable." ON "public"."Post" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can create, update, and delete posts." ON "public"."Post" FOR ALL USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant"
            WHERE
                id = "participantId"
                AND "userId" = auth.uid()
        )
        ELSE false
    END
);

-- Comments - Allow public read access for discussions
CREATE POLICY "Comments are publicly viewable." ON "public"."Comment" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create comments." ON "public"."Comment" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN auth.uid() = "authorId"
            ELSE false
        END
    );

CREATE POLICY "Users can update their own comments." ON "public"."Comment" FOR
UPDATE
    USING (
        CASE
            WHEN auth.uid() IS NOT NULL THEN auth.uid() = "authorId"
            ELSE false
        END
    );

CREATE POLICY "Users can delete their own comments." ON "public"."Comment" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN auth.uid() = "authorId"
        ELSE false
    END
);

-- Activity Types - Allow public read access for challenge configuration
CREATE POLICY "Activity types are publicly viewable." ON "public"."ActivityType" FOR
SELECT
    USING (true);

CREATE POLICY "System can manage activity types." ON "public"."ActivityType" FOR ALL USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN true
        ELSE false
    END
) WITH CHECK (
    CASE
        WHEN auth.uid() IS NOT NULL THEN true
        ELSE false
    END
);

-- Challenge Activity Types - Allow public read access
CREATE POLICY "Challenge activity types are publicly viewable." ON "public"."ChallengeActivityType" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge creators can manage activity types." ON "public"."ChallengeActivityType" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN EXISTS (
                SELECT
                    1
                FROM
                    "public"."Challenge"
                WHERE
                    id = "challengeId"
                    AND "creatorId" = auth.uid()
            )
            ELSE false
        END
    );

CREATE POLICY "Challenge creators can update activity types." ON "public"."ChallengeActivityType" FOR
UPDATE
    USING (
        CASE
            WHEN auth.uid() IS NOT NULL THEN EXISTS (
                SELECT
                    1
                FROM
                    "public"."Challenge"
                WHERE
                    id = "challengeId"
                    AND "creatorId" = auth.uid()
            )
            ELSE false
        END
    );

CREATE POLICY "Challenge creators can delete activity types." ON "public"."ChallengeActivityType" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN EXISTS (
            SELECT
                1
            FROM
                "public"."Challenge"
            WHERE
                id = "challengeId"
                AND "creatorId" = auth.uid()
        )
        ELSE false
    END
);

-- Milestones - Allow public read access for challenge structure
CREATE POLICY "Milestones are publicly viewable." ON "public"."Milestone" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge creators can create milestones." ON "public"."Milestone" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN EXISTS (
                SELECT
                    1
                FROM
                    "public"."Challenge"
                WHERE
                    id = "challengeId"
                    AND "creatorId" = auth.uid()
            )
            ELSE false
        END
    );

CREATE POLICY "Challenge creators can update milestones." ON "public"."Milestone" FOR
UPDATE
    USING (
        CASE
            WHEN auth.uid() IS NOT NULL THEN EXISTS (
                SELECT
                    1
                FROM
                    "public"."Challenge"
                WHERE
                    id = "challengeId"
                    AND "creatorId" = auth.uid()
            )
            ELSE false
        END
    );

CREATE POLICY "Challenge creators can delete milestones." ON "public"."Milestone" FOR DELETE USING (
    CASE
        WHEN auth.uid() IS NOT NULL THEN EXISTS (
            SELECT
                1
            FROM
                "public"."Challenge"
            WHERE
                id = "challengeId"
                AND "creatorId" = auth.uid()
        )
        ELSE false
    END
);

-- Milestone Progress - Allow public read access for progress tracking
CREATE POLICY "Milestone progress is publicly viewable." ON "public"."MilestoneProgress" FOR
SELECT
    USING (true);

CREATE POLICY "Participants can create their milestone progress." ON "public"."MilestoneProgress" FOR
INSERT
    WITH CHECK (
        CASE
            WHEN auth.uid() IS NOT NULL THEN EXISTS (
                SELECT
                    1
                FROM
                    "public"."ChallengeParticipant"
                WHERE
                    id = "participantId"
                    AND "userId" = auth.uid()
            )
            ELSE false
        END
    );

CREATE POLICY "Participants can update their milestone progress." ON "public"."MilestoneProgress" FOR
UPDATE
    USING (
        CASE
            WHEN auth.uid() IS NOT NULL THEN EXISTS (
                SELECT
                    1
                FROM
                    "public"."ChallengeParticipant"
                WHERE
                    id = "participantId"
                    AND "userId" = auth.uid()
            )
            ELSE false
        END
    );

CREATE POLICY "System can manage milestone progress." ON "public"."MilestoneProgress" FOR ALL USING (true) WITH CHECK (true);

-- Challenge Progress (Aggregation Table) - Allow public read access for leaderboards
CREATE POLICY "Challenge progress is publicly viewable." ON "public"."challenge_progress" FOR
SELECT
    USING (true);

CREATE POLICY "System can manage challenge progress." ON "public"."challenge_progress" FOR ALL USING (true) WITH CHECK (true);

-- Add additional emergency bypass policy for service role
-- This ensures that even if auth fails, service operations can still work
CREATE POLICY "Service role bypass for challenges." ON "public"."Challenge" FOR ALL USING (
    current_setting('request.jwt.claims', true) :: json ->> 'role' = 'service_role'
) WITH CHECK (
    current_setting('request.jwt.claims', true) :: json ->> 'role' = 'service_role'
);

-- CRITICAL: Grant schema usage permissions first
-- This is essential for anon and authenticated roles to access any tables
GRANT USAGE ON SCHEMA public TO anon,
authenticated;

-- Final verification: Grant necessary permissions to authenticated and anon roles
GRANT
SELECT
    ON ALL TABLES IN SCHEMA public TO authenticated,
    anon;

GRANT
INSERT
,
UPDATE
,
    DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- Ensure sequences are accessible
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated,
anon;

-- Refresh the schema cache
NOTIFY pgrst,
'reload schema';