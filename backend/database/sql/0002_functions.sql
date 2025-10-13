-- migrate:up
-- Supabase/SQL Migrations: Functions
-- Description: Defines all custom PL/pgSQL functions for the application,
-- including user profile creation and cached counter maintenance.
-- =============================================================================
-- Section 1: Utility Functions
-- Helper functions for generating random data.
-- -----------------------------------------------------------------------------
-- Generates a unique, random username for new users.
CREATE OR
REPLACE FUNCTION public.generate_random_username () RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    adjectives TEXT[] := ARRAY['Swift', 'Strong', 'Fast', 'Fit', 'Bold', 'Active', 'Power', 'Elite', 'Peak', 'Max', 'Pro', 'Iron', 'Steel', 'Mighty', 'Super', 'Ultra', 'Dynamic'];
    nouns TEXT[] := ARRAY['Runner', 'Lifter', 'Fighter', 'Athlete', 'Champion', 'Warrior', 'Hero', 'Legend', 'Master', 'Crusher', 'Force', 'Machine', 'Ninja', 'Striker', 'Titan'];
    candidate_username TEXT;
BEGIN
    LOOP
        candidate_username := adjectives[1 + floor(random() * array_length(adjectives, 1))] || nouns[1 + floor(random() * array_length(nouns, 1))] || floor(random() * 9000 + 1000)::TEXT;
        -- Check for uniqueness
        IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE username = candidate_username) THEN
            RETURN candidate_username;
        END IF;
    END LOOP;
END;
$$;

-- Generates a random avatar URL using the DiceBear API.
CREATE OR
REPLACE FUNCTION public.get_random_avatar_url () RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
    styles TEXT[] := ARRAY['avataaars', 'bottts', 'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art'];
    random_style TEXT;
    random_seed TEXT;
BEGIN
    random_style := styles[1 + floor(random() * array_length(styles, 1))];
    random_seed := floor(random() * 1000000)::TEXT;
    RETURN 'https://api.dicebear.com/7.x/' || random_style || '/svg?seed=' || random_seed;
END;
$$;

-- Section 2: Trigger Functions
-- Functions executed by triggers in response to database events.
-- -----------------------------------------------------------------------------
-- Creates a user profile upon new user signup in `auth.users`.
CREATE OR
REPLACE FUNCTION public.handle_new_user () RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, avatar_url, created_at, updated_at)
    VALUES (NEW.id, public.generate_random_username(), public.get_random_avatar_url(), NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$;

-- Updates the memberCount on the Team table.
CREATE OR
REPLACE FUNCTION public.update_team_member_count () RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE "public"."teams" SET "memberCount" = "memberCount" + 1 WHERE id = NEW."teamId";
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE "public"."teams" SET "memberCount" = "memberCount" - 1 WHERE id = OLD."teamId";
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Updates the participantCount on the Challenge table.
CREATE OR
REPLACE FUNCTION public.update_challenge_participant_count () RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE "public"."challenges" SET "participantCount" = "participantCount" + 1 WHERE id = NEW."challengeId";
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        IF EXISTS (SELECT 1 FROM "public"."challenges" WHERE id = OLD."challengeId") THEN
            UPDATE "public"."challenges" SET "participantCount" = "participantCount" - 1 WHERE id = OLD."challengeId";
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Validates that an activity's activity type is supported by its challenge.
CREATE OR
REPLACE FUNCTION public.validate_activity_challenge_agreement () RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    -- Only run the validation if the activity is being linked to a challenge.
    IF NEW."challengeId" IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1
            FROM public.challenge_activity_types cat
            WHERE cat."challengeId" = NEW."challengeId"
              AND cat."activityTypeId" = NEW."activityTypeId"
        ) THEN
            RAISE EXCEPTION 'Activity type is not supported by this challenge. Only activities that match the challenge''s supported activity types can be recorded.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

-- migrate:down
DROP FUNCTION IF EXISTS public.generate_random_username ();

DROP FUNCTION IF EXISTS public.get_random_avatar_url ();

DROP FUNCTION IF EXISTS public.handle_new_user ();

DROP FUNCTION IF EXISTS public.update_team_member_count ();

DROP FUNCTION IF EXISTS public.update_challenge_participant_count ();

DROP FUNCTION IF EXISTS public.validate_activity_challenge_agreement ();