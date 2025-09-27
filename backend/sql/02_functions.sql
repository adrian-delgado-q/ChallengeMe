-- Supabase/SQL Migrations: Functions
-- Description: Defines all custom PL/pgSQL functions for the application,
-- including user profile creation and cached counter maintenance.
-- =============================================================================
-- Section 1: Utility Functions
-- Helper functions for generating random data.
-- -----------------------------------------------------------------------------
-- Generates a unique, random username for new users.
CREATE
OR REPLACE FUNCTION public.generate_random_username() RETURNS TEXT LANGUAGE plpgsql AS $$ DECLARE adjectives TEXT [] := ARRAY ['Swift', 'Strong', 'Fast', 'Fit', 'Bold', 'Active', 'Power', 'Elite', 'Peak', 'Max', 'Pro', 'Iron', 'Steel', 'Mighty', 'Super', 'Ultra', 'Dynamic'];

nouns TEXT [] := ARRAY ['Runner', 'Lifter', 'Fighter', 'Athlete', 'Champion', 'Warrior', 'Hero', 'Legend', 'Master', 'Crusher', 'Force', 'Machine', 'Ninja', 'Striker', 'Titan'];

candidate_username TEXT;

BEGIN LOOP candidate_username := adjectives [1 + floor(random() * array_length(adjectives, 1))] || nouns [1 + floor(random() * array_length(nouns, 1))] || floor(random() * 9000 + 1000) :: TEXT;

-- Check for uniqueness
IF NOT EXISTS (
    SELECT
        1
    FROM
        public.profiles
    WHERE
        username = candidate_username
) THEN RETURN candidate_username;

END IF;

END LOOP;

END;

$$;

-- Generates a random avatar URL using the DiceBear API.
CREATE
OR REPLACE FUNCTION public.get_random_avatar_url() RETURNS TEXT LANGUAGE plpgsql AS $$ DECLARE styles TEXT [] := ARRAY ['avataaars', 'bottts', 'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art'];

random_style TEXT;

random_seed TEXT;

BEGIN random_style := styles [1 + floor(random() * array_length(styles, 1))];

random_seed := floor(random() * 1000000) :: TEXT;

RETURN 'https://api.dicebear.com/7.x/' || random_style || '/svg?seed=' || random_seed;

END;

$$;

-- Section 2: Trigger Functions
-- Functions executed by triggers in response to database events.
-- -----------------------------------------------------------------------------
-- Creates a user profile upon new user signup in `auth.users`.
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN
INSERT INTO
    public.profiles (id, username, avatar_url)
VALUES
    (
        NEW.id,
        public.generate_random_username(),
        public.get_random_avatar_url()
    ) ON CONFLICT (id) DO NOTHING;

RETURN NEW;

EXCEPTION
WHEN OTHERS THEN RAISE WARNING 'Failed to create profile for user %: %',
NEW.id,
SQLERRM;

RETURN NEW;

END;

$$;

-- Updates the memberCount on the Team table.
-- Uses increment/decrement for better performance than COUNT(*).
CREATE
OR REPLACE FUNCTION public.update_team_member_count() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN IF (TG_OP = 'INSERT') THEN
UPDATE
    "public"."Team"
SET
    "memberCount" = "memberCount" + 1
WHERE
    id = NEW."teamId";

RETURN NEW;

ELSIF (TG_OP = 'DELETE') THEN
UPDATE
    "public"."Team"
SET
    "memberCount" = "memberCount" - 1
WHERE
    id = OLD."teamId";

RETURN OLD;

END IF;

RETURN NULL;

END;

$$;

-- Updates the participantCount on the Challenge table.
CREATE
OR REPLACE FUNCTION public.update_challenge_participant_count() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN IF (TG_OP = 'INSERT') THEN
UPDATE
    "public"."Challenge"
SET
    "participantCount" = "participantCount" + 1
WHERE
    id = NEW."challengeId";

RETURN NEW;

ELSIF (TG_OP = 'DELETE') THEN
UPDATE
    "public"."Challenge"
SET
    "participantCount" = "participantCount" - 1
WHERE
    id = OLD."challengeId";

RETURN OLD;

END IF;

RETURN NULL;

END;

$$;

-- =============================================================================
-- Section 5: Activity Validation Functions
-- Functions for enforcing activity-to-activity agreement.
-- -----------------------------------------------------------------------------
-- Validates that an activity's activity type is supported by its challenge.
CREATE
OR REPLACE FUNCTION public.validate_activity_challenge_agreement() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN -- Check if this is an INSERT or UPDATE with activityTypeId change
IF (
    TG_OP = 'INSERT'
    OR (
        TG_OP = 'UPDATE'
        AND NEW."activityTypeId" != OLD."activityTypeId"
    )
) THEN -- Get the challenge ID from the participant
DECLARE challenge_id UUID;

BEGIN
SELECT
    cp."challengeId" INTO challenge_id
FROM
    public."ChallengeParticipant" cp
WHERE
    cp.id = NEW."participantId";

-- Verify the activity type is supported by the challenge
IF NOT EXISTS (
    SELECT
        1
    FROM
        public."ChallengeActivityType" cat
    WHERE
        cat."challengeId" = challenge_id
        AND cat."activityTypeId" = NEW."activityTypeId"
) THEN RAISE EXCEPTION 'Activity type is not supported by this challenge. Only activities that match the challenge''s supported activity types can be recorded.';

END IF;

END;

END IF;

RETURN NEW;

END;

$$;