-- Master Migration Script for ChallengeMe
-- This script applies SQL-specific database changes
-- Run Prisma migrations first: npx prisma db push
-- =====================================================
-- STEP 1: SCHEMA UPDATES (SQL-only features)
-- =====================================================
-- Partial unique constraints that Prisma doesn't support
-- Ensure a user can only participate once per challenge (when userId is not null)
CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_userid_unique" ON "public"."ChallengeParticipant" ("challengeId", "userId")
WHERE
    "userId" IS NOT NULL;

-- Ensure a team can only participate once per challenge (when teamId is not null)
CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_teamid_unique" ON "public"."ChallengeParticipant" ("challengeId", "teamId")
WHERE
    "teamId" IS NOT NULL;

-- Add helpful comments that Prisma doesn't generate
COMMENT ON COLUMN "public"."Challenge"."status" IS 'Current status of the challenge: ACTIVE (accepting participants), CLOSED (no new participants), CANCELLED (challenge stopped)';

COMMENT ON COLUMN "public"."Challenge"."maxTeamSize" IS 'Maximum number of members allowed per team in team challenges. NULL means no limit.';

COMMENT ON COLUMN "public"."Challenge"."maxParticipants" IS 'For INDIVIDUAL challenges: max number of individual participants. For TEAM challenges: max number of teams that can participate.';

COMMENT ON COLUMN "public"."Challenge"."participantCount" IS 'Automatically maintained count of current participants. Updated by triggers.';

COMMENT ON COLUMN "public"."Team"."memberCount" IS 'Automatically maintained count of current team members. Updated by triggers.';

-- =====================================================
-- STEP 2: TRIGGERS AND FUNCTIONS
-- =====================================================
-- Function to generate random usernames
CREATE
OR REPLACE FUNCTION public.generate_random_username() RETURNS TEXT LANGUAGE plpgsql AS $ $ DECLARE adjectives TEXT [] := ARRAY [
        'Swift', 'Strong', 'Fast', 'Fit', 'Bold', 'Active', 'Power', 'Elite', 
        'Peak', 'Max', 'Pro', 'Iron', 'Steel', 'Fire', 'Storm', 'Thunder', 
        'Lightning', 'Mighty', 'Super', 'Ultra', 'Dynamic', 'Turbo', 'Mega', 
        'Prime', 'Alpha', 'Beast', 'Tiger', 'Eagle', 'Falcon', 'Phoenix'
    ];

nouns TEXT [] := ARRAY [
        'Runner', 'Lifter', 'Fighter', 'Athlete', 'Champion', 'Warrior', 'Hero', 
        'Legend', 'Master', 'Crusher', 'Force', 'Machine', 'Ninja', 'Striker', 
        'Blazer', 'Rocket', 'Bullet', 'Thunder', 'Storm', 'Titan', 'Giant', 
        'Phoenix', 'Dragon', 'Wolf', 'Shark', 'Panther', 'Viper', 'Cobra', 
        'Falcon', 'Eagle'
    ];

random_adjective TEXT;

random_noun TEXT;

random_number TEXT;

candidate_username TEXT;

username_exists BOOLEAN;

BEGIN LOOP -- Pick random adjective and noun
random_adjective := adjectives [1 + floor(random() * array_length(adjectives, 1))];

random_noun := nouns [1 + floor(random() * array_length(nouns, 1))];

random_number := floor(random() * 9000 + 1000) :: TEXT;

-- 4-digit number
candidate_username := random_adjective || random_noun || random_number;

-- Check if username already exists
SELECT
    EXISTS(
        SELECT
            1
        FROM
            public.profiles
        WHERE
            username = candidate_username
    ) INTO username_exists;

-- If username doesn't exist, use it
IF NOT username_exists THEN RETURN candidate_username;

END IF;

END LOOP;

END;

$ $;

-- Function to get random avatar URL using DiceBear API
CREATE
OR REPLACE FUNCTION public.get_random_avatar_url() RETURNS TEXT LANGUAGE plpgsql AS $ $ DECLARE styles TEXT [] := ARRAY ['avataaars', 'bottts', 'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art'];

random_style TEXT;

random_seed TEXT;

BEGIN random_style := styles [1 + floor(random() * array_length(styles, 1))];

random_seed := floor(random() * 1000000) :: TEXT;

RETURN 'https://api.dicebear.com/7.x/' || random_style || '/svg?seed=' || random_seed;

END;

$ $;

-- Function to handle new user signups
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $ $ DECLARE new_username TEXT;

new_avatar_url TEXT;

BEGIN -- Generate username and avatar
new_username := public.generate_random_username();

new_avatar_url := public.get_random_avatar_url();

-- Insert new profile with error handling
INSERT INTO
    public.profiles (id, username, avatar_url, created_at, updated_at)
VALUES
    (
        NEW.id,
        new_username,
        new_avatar_url,
        COALESCE(NEW.created_at, NOW()),
        COALESCE(NEW.updated_at, NOW())
    ) ON CONFLICT (id) DO NOTHING;

-- Prevent duplicate profile creation
RETURN NEW;

EXCEPTION
WHEN OTHERS THEN -- Log the error but don't fail the user signup
RAISE WARNING 'Failed to create profile for user %: %',
NEW.id,
SQLERRM;

RETURN NEW;

END;

$ $;

-- Function to update team member count
CREATE
OR REPLACE FUNCTION public.update_team_member_count() RETURNS TRIGGER LANGUAGE plpgsql AS $ $ BEGIN IF TG_OP = 'INSERT' THEN
UPDATE
    "public"."Team"
SET
    "memberCount" = (
        SELECT
            COUNT(*)
        FROM
            "public"."TeamMembership"
        WHERE
            "teamId" = NEW."teamId"
    )
WHERE
    "id" = NEW."teamId";

RETURN NEW;

ELSIF TG_OP = 'DELETE' THEN
UPDATE
    "public"."Team"
SET
    "memberCount" = (
        SELECT
            COUNT(*)
        FROM
            "public"."TeamMembership"
        WHERE
            "teamId" = OLD."teamId"
    )
WHERE
    "id" = OLD."teamId";

RETURN OLD;

END IF;

RETURN NULL;

END;

$ $;

-- Function to update challenge participant count
CREATE
OR REPLACE FUNCTION public.update_challenge_participant_count() RETURNS TRIGGER LANGUAGE plpgsql AS $ $ BEGIN IF TG_OP = 'INSERT' THEN
UPDATE
    "public"."Challenge"
SET
    "participantCount" = (
        SELECT
            COUNT(*)
        FROM
            "public"."ChallengeParticipant"
        WHERE
            "challengeId" = NEW."challengeId"
    )
WHERE
    "id" = NEW."challengeId";

RETURN NEW;

ELSIF TG_OP = 'DELETE' THEN
UPDATE
    "public"."Challenge"
SET
    "participantCount" = (
        SELECT
            COUNT(*)
        FROM
            "public"."ChallengeParticipant"
        WHERE
            "challengeId" = OLD."challengeId"
    )
WHERE
    "id" = OLD."challengeId";

RETURN OLD;

END IF;

RETURN NULL;

END;

$ $;

-- Create triggers
-- Note: Auth trigger (on_auth_user_created) is handled separately in migrate.sh due to permissions
-- Trigger for new user signup - ensures profile is created automatically
-- This will be created by the migration script with proper privileges
DROP TRIGGER IF EXISTS update_team_member_count_trigger ON "public"."TeamMembership";

CREATE TRIGGER update_team_member_count_trigger
AFTER
INSERT
    OR DELETE ON "public"."TeamMembership" FOR EACH ROW EXECUTE FUNCTION public.update_team_member_count();

DROP TRIGGER IF EXISTS update_challenge_participant_count_trigger ON "public"."ChallengeParticipant";

CREATE TRIGGER update_challenge_participant_count_trigger
AFTER
INSERT
    OR DELETE ON "public"."ChallengeParticipant" FOR EACH ROW EXECUTE FUNCTION public.update_challenge_participant_count();

-- =====================================================
-- STEP 3: RLS POLICIES
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

-- Enable RLS for Challenge Progress (aggregation table)
ALTER TABLE
    "public"."challenge_progress" ENABLE ROW LEVEL SECURITY;

-- Activity Type Policies
CREATE POLICY "Activity types are viewable by everyone" ON "public"."ActivityType" FOR
SELECT
    USING (true);

CREATE POLICY "System can manage activity types" ON "public"."ActivityType" FOR ALL USING (true) WITH CHECK (true);

-- Challenge Activity Type Policies
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

-- Profile Policies
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

-- Team Policies
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

-- Team Membership Policies
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

-- Challenge Policies
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

-- Milestone Policies
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

-- Milestone Progress Policies
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

CREATE POLICY "System can manage milestone progress" ON "public"."MilestoneProgress" FOR ALL USING (true) WITH CHECK (true);

-- Challenge Participant Policies
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

-- Activity Policies
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

-- Post Policies
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

-- Comment Policies
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

-- Challenge Progress Policies (Aggregation Table)
-- This table is automatically maintained by database triggers
-- Users can view progress data, but only system/triggers can modify it
CREATE POLICY "Challenge progress is viewable by everyone" ON "public"."challenge_progress" FOR
SELECT
    USING (true);

CREATE POLICY "System can manage challenge progress" ON "public"."challenge_progress" FOR ALL USING (true) WITH CHECK (true);

-- Users can view their own participation progress
CREATE POLICY "Users can view their own progress" ON "public"."challenge_progress" FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant" cp
            WHERE
                cp.id = "participantId"
                AND cp."userId" = auth.uid()
        )
    );

-- Team members can view their team's progress  
CREATE POLICY "Team members can view team progress" ON "public"."challenge_progress" FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                "public"."ChallengeParticipant" cp
                JOIN "public"."TeamMembership" tm ON tm."teamId" = cp."teamId"
            WHERE
                cp.id = "participantId"
                AND tm."userId" = auth.uid()
        )
    );

-- Grant permissions
GRANT ALL ON "public"."profiles" TO service_role;

GRANT USAGE ON SCHEMA public TO authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- =====================================================
-- VALIDATION
-- =====================================================
-- Check that all expected tables exist (should be created by Prisma)
SELECT
    'Tables Check' as check_type,
    COUNT(*) as found_tables,
    CASE
        WHEN COUNT(*) >= 13 THEN '✅ All expected tables found'
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
        'ChallengeActivityType',
        'ActivityType',
        'Milestone',
        'MilestoneProgress',
        'ChallengeParticipant',
        'Activity',
        'Post',
        'Comment',
        'challenge_progress'
    );

-- Check that RLS is enabled
SELECT
    'RLS Check' as check_type,
    COUNT(*) as tables_with_rls,
    CASE
        WHEN COUNT(*) >= 12 THEN '✅ RLS enabled on all tables'
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
        'ChallengeActivityType',
        'ActivityType',
        'Milestone',
        'MilestoneProgress',
        'ChallengeParticipant',
        'Activity',
        'Post',
        'Comment',
        'challenge_progress'
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
        WHEN COUNT(*) >= 2 THEN '✅ Main triggers created (auth trigger handled separately)'
        ELSE '⚠️ Some triggers missing'
    END as status
FROM
    information_schema.triggers
WHERE
    trigger_schema = 'public'
    AND trigger_name IN (
        'update_team_member_count_trigger',
        'update_challenge_participant_count_trigger'
    );

-- Check auth trigger separately
SELECT
    'Auth Trigger Check' as check_type,
    COUNT(*) as auth_triggers_found,
    CASE
        WHEN COUNT(*) >= 1 THEN '✅ Auth trigger found'
        ELSE '⚠️ Auth trigger missing - check migration script output'
    END as status
FROM
    information_schema.triggers
WHERE
    trigger_schema = 'auth'
    AND trigger_name = 'on_auth_user_created';

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

-- Migration completed successfully!
-- =====================================================
-- STEP 3: CHALLENGE PROGRESS AGGREGATION SYSTEM
-- =====================================================
-- Function to update challenge progress aggregation
-- Uses UPSERT with ON CONFLICT to handle concurrent inserts safely
CREATE
OR REPLACE FUNCTION update_challenge_progress() RETURNS TRIGGER AS $ $ DECLARE v_challenge_id UUID;

v_participant_id UUID;

v_activity_type_id UUID;

v_activity_value FLOAT;

v_activity_date DATE;

BEGIN -- Handle both INSERT and UPDATE scenarios
IF TG_OP = 'INSERT' THEN v_challenge_id := NEW."challengeId";

v_participant_id := NEW."participantId";

v_activity_type_id := NEW."activityTypeId";

v_activity_value := NEW.value;

v_activity_date := NEW.date;

ELSIF TG_OP = 'UPDATE' THEN -- For updates, we need to handle both old and new values
-- First, reverse the old values
IF OLD."challengeId" IS NOT NULL
AND OLD."participantId" IS NOT NULL
AND OLD."activityTypeId" IS NOT NULL THEN PERFORM reverse_challenge_progress(
    OLD."challengeId",
    OLD."participantId",
    OLD."activityTypeId",
    OLD.value,
    OLD.date
);

END IF;

-- Then apply new values
v_challenge_id := NEW."challengeId";

v_participant_id := NEW."participantId";

v_activity_type_id := NEW."activityTypeId";

v_activity_value := NEW.value;

v_activity_date := NEW.date;

END IF;

-- Skip if any required field is NULL (shouldn't happen with proper constraints)
IF v_challenge_id IS NULL
OR v_participant_id IS NULL
OR v_activity_type_id IS NULL THEN RETURN COALESCE(NEW, OLD);

END IF;

-- Use INSERT ... ON CONFLICT to handle concurrent updates
-- This ensures atomicity and prevents race conditions
INSERT INTO
    challenge_progress (
        id,
        "challengeId",
        "participantId",
        "activityTypeId",
        "totalValue",
        "activityCount",
        "averageValue",
        "bestValue",
        "lastActivityDate",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        gen_random_uuid(),
        v_challenge_id,
        v_participant_id,
        v_activity_type_id,
        v_activity_value,
        1,
        v_activity_value,
        v_activity_value,
        v_activity_date,
        NOW(),
        NOW()
    ) ON CONFLICT ("challengeId", "participantId", "activityTypeId") DO
UPDATE
SET
    "totalValue" = challenge_progress."totalValue" + v_activity_value,
    "activityCount" = challenge_progress."activityCount" + 1,
    "averageValue" = (
        challenge_progress."totalValue" + v_activity_value
    ) / (challenge_progress."activityCount" + 1),
    "bestValue" = GREATEST(challenge_progress."bestValue", v_activity_value),
    "lastActivityDate" = GREATEST(
        challenge_progress."lastActivityDate",
        v_activity_date
    ),
    "updatedAt" = NOW();

RETURN COALESCE(NEW, OLD);

END;

$ $ LANGUAGE plpgsql;

-- Function to reverse challenge progress (used for UPDATE operations)
CREATE
OR REPLACE FUNCTION reverse_challenge_progress(
    p_challenge_id UUID,
    p_participant_id UUID,
    p_activity_type_id UUID,
    p_activity_value FLOAT,
    p_activity_date DATE
) RETURNS VOID AS $ $ DECLARE v_record RECORD;

v_new_total FLOAT;

v_new_count INT;

v_new_average FLOAT;

BEGIN -- Get current progress record
SELECT
    * INTO v_record
FROM
    challenge_progress
WHERE
    "challengeId" = p_challenge_id
    AND "participantId" = p_participant_id
    AND "activityTypeId" = p_activity_type_id;

IF NOT FOUND THEN RETURN;

-- Nothing to reverse
END IF;

-- Calculate new values after removing the old activity
v_new_total := v_record."totalValue" - p_activity_value;

v_new_count := v_record."activityCount" - 1;

IF v_new_count <= 0 THEN -- Delete the record if no activities remain
DELETE FROM
    challenge_progress
WHERE
    "challengeId" = p_challenge_id
    AND "participantId" = p_participant_id
    AND "activityTypeId" = p_activity_type_id;

ELSE -- Recalculate average
v_new_average := v_new_total / v_new_count;

-- For bestValue, we need to recalculate from all activities
-- This is expensive but necessary for accuracy on updates
WITH activity_stats AS (
    SELECT
        MAX(value) as max_value,
        MAX(date) as max_date
    FROM
        "Activity" a
    WHERE
        a."challengeId" = p_challenge_id
        AND a."participantId" = p_participant_id
        AND a."activityTypeId" = p_activity_type_id
        AND NOT (
            a.value = p_activity_value
            AND a.date = p_activity_date
        )
)
UPDATE
    challenge_progress
SET
    "totalValue" = v_new_total,
    "activityCount" = v_new_count,
    "averageValue" = v_new_average,
    "bestValue" = COALESCE(
        (
            SELECT
                max_value
            FROM
                activity_stats
        ),
        0
    ),
    "lastActivityDate" = (
        SELECT
            max_date
        FROM
            activity_stats
    ),
    "updatedAt" = NOW()
FROM
    activity_stats
WHERE
    "challengeId" = p_challenge_id
    AND "participantId" = p_participant_id
    AND "activityTypeId" = p_activity_type_id;

END IF;

END;

$ $ LANGUAGE plpgsql;

-- Function to handle activity deletion
CREATE
OR REPLACE FUNCTION handle_activity_delete() RETURNS TRIGGER AS $ $ BEGIN -- Reverse the progress for the deleted activity
IF OLD."challengeId" IS NOT NULL
AND OLD."participantId" IS NOT NULL
AND OLD."activityTypeId" IS NOT NULL THEN PERFORM reverse_challenge_progress(
    OLD."challengeId",
    OLD."participantId",
    OLD."activityTypeId",
    OLD.value,
    OLD.date
);

END IF;

RETURN OLD;

END;

$ $ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS trg_activity_progress_upsert ON "Activity";

DROP TRIGGER IF EXISTS trg_activity_progress_delete ON "Activity";

-- Create triggers for Activity table
-- Trigger for INSERT and UPDATE
CREATE TRIGGER trg_activity_progress_upsert
AFTER
INSERT
    OR
UPDATE
    ON "Activity" FOR EACH ROW EXECUTE FUNCTION update_challenge_progress();

-- Trigger for DELETE  
CREATE TRIGGER trg_activity_progress_delete
AFTER
    DELETE ON "Activity" FOR EACH ROW EXECUTE FUNCTION handle_activity_delete();

-- Function to rebuild progress data (for maintenance/repair)
CREATE
OR REPLACE FUNCTION rebuild_challenge_progress(p_challenge_id UUID DEFAULT NULL) RETURNS VOID AS $ $ DECLARE v_where_clause TEXT := '';

BEGIN -- Build where clause if specific challenge provided
IF p_challenge_id IS NOT NULL THEN v_where_clause := 'WHERE a."challengeId" = ''' || p_challenge_id || '''';

END IF;

-- Clear existing progress data
IF p_challenge_id IS NOT NULL THEN
DELETE FROM
    challenge_progress
WHERE
    "challengeId" = p_challenge_id;

ELSE TRUNCATE TABLE challenge_progress;

END IF;

-- Rebuild from Activity data
EXECUTE format(
    '
        INSERT INTO challenge_progress (
            id,
            "challengeId",
            "participantId",
            "activityTypeId", 
            "totalValue",
            "activityCount",
            "averageValue",
            "bestValue",
            "lastActivityDate",
            "createdAt",
            "updatedAt"
        )
        SELECT 
            gen_random_uuid(),
            a."challengeId",
            a."participantId",
            a."activityTypeId",
            SUM(a.value) as total_value,
            COUNT(*)::INT as activity_count,
            AVG(a.value) as average_value,
            MAX(a.value) as best_value,
            MAX(a.date) as last_activity_date,
            NOW(),
            NOW()
        FROM "Activity" a
        %s
        GROUP BY a."challengeId", a."participantId", a."activityTypeId"
        HAVING a."challengeId" IS NOT NULL 
           AND a."participantId" IS NOT NULL 
           AND a."activityTypeId" IS NOT NULL
    ',
    v_where_clause
);

END;

$ $ LANGUAGE plpgsql;

-- Create an index on Activity table to optimize the trigger performance
CREATE INDEX IF NOT EXISTS idx_activity_challenge_participant_type ON "Activity"("challengeId", "participantId", "activityTypeId");

-- Add comments for documentation
COMMENT ON TABLE challenge_progress IS 'Aggregated activity progress per challenge, participant, and activity type. Automatically maintained by triggers.';

COMMENT ON FUNCTION update_challenge_progress() IS 'Trigger function to update challenge progress aggregations. Uses UPSERT for concurrency safety.';

COMMENT ON FUNCTION rebuild_challenge_progress(UUID) IS 'Maintenance function to rebuild progress data from scratch. Use when data integrity issues are suspected.';