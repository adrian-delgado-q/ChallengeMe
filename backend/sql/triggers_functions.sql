-- Triggers and Functions for ChallengeMe
-- This file contains all custom functions and their associated triggers
-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================
-- Function to generate random usernames
CREATE
OR REPLACE FUNCTION public.generate_random_username() RETURNS TEXT LANGUAGE plpgsql AS $$ DECLARE adjectives TEXT [] := ARRAY [
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

$$;

-- Function to get random avatar URL using DiceBear API
CREATE
OR REPLACE FUNCTION public.get_random_avatar_url() RETURNS TEXT LANGUAGE plpgsql AS $$ DECLARE styles TEXT [] := ARRAY ['avataaars', 'bottts', 'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art'];

random_style TEXT;

random_seed TEXT;

BEGIN random_style := styles [1 + floor(random() * array_length(styles, 1))];

random_seed := floor(random() * 1000000) :: TEXT;

RETURN 'https://api.dicebear.com/7.x/' || random_style || '/svg?seed=' || random_seed;

END;

$$;

-- =====================================================
-- PROFILE MANAGEMENT FUNCTIONS
-- =====================================================
-- Function to handle new user signups
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$ DECLARE new_username TEXT;

new_avatar_url TEXT;

BEGIN -- Generate username and avatar
new_username := public.generate_random_username();

new_avatar_url := public.get_random_avatar_url();

-- Insert new profile
INSERT INTO
    public.profiles (id, username, avatar_url, created_at, updated_at)
VALUES
    (
        NEW.id,
        new_username,
        new_avatar_url,
        NEW.created_at,
        NEW.updated_at
    );

RETURN NEW;

END;

$$;

-- =====================================================
-- TEAM MANAGEMENT FUNCTIONS
-- =====================================================
-- Function to update team member count
CREATE
OR REPLACE FUNCTION public.update_team_member_count() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN IF TG_OP = 'INSERT' THEN
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

$$;

-- =====================================================
-- CHALLENGE MANAGEMENT FUNCTIONS
-- =====================================================
-- Function to update challenge participant count
CREATE
OR REPLACE FUNCTION public.update_challenge_participant_count() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN IF TG_OP = 'INSERT' THEN
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

$$;

-- =====================================================
-- TRIGGERS
-- =====================================================
-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER
INSERT
    ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger for team member count updates
DROP TRIGGER IF EXISTS update_team_member_count_trigger ON "public"."TeamMembership";

CREATE TRIGGER update_team_member_count_trigger
AFTER
INSERT
    OR DELETE ON "public"."TeamMembership" FOR EACH ROW EXECUTE FUNCTION public.update_team_member_count();

-- Trigger for challenge participant count updates
DROP TRIGGER IF EXISTS update_challenge_participant_count_trigger ON "public"."ChallengeParticipant";

CREATE TRIGGER update_challenge_participant_count_trigger
AFTER
INSERT
    OR DELETE ON "public"."ChallengeParticipant" FOR EACH ROW EXECUTE FUNCTION public.update_challenge_participant_count();