-- Triggers and Functions for ChallengeMe
-- This file replaces the Atlas HCL triggers_and_functions.hcl
-- Function to generate random username
CREATE
OR REPLACE FUNCTION public.generate_random_username() RETURNS TEXT LANGUAGE plpgsql AS $$ DECLARE adjectives TEXT [] := ARRAY ['Swift', 'Strong', 'Fast', 'Fit', 'Bold', 'Active', 'Power', 'Elite', 'Peak', 'Max', 'Pro', 'Iron', 'Steel', 'Fire', 'Storm', 'Thunder', 'Lightning', 'Mighty', 'Super', 'Ultra', 'Dynamic', 'Turbo', 'Mega', 'Prime', 'Alpha', 'Beast', 'Tiger', 'Eagle', 'Falcon', 'Phoenix'];

nouns TEXT [] := ARRAY ['Runner', 'Lifter', 'Fighter', 'Athlete', 'Champion', 'Warrior', 'Hero', 'Legend', 'Master', 'Crusher', 'Force', 'Machine', 'Ninja', 'Striker', 'Blazer', 'Rocket', 'Bullet', 'Thunder', 'Storm', 'Titan', 'Giant', 'Phoenix', 'Dragon', 'Wolf', 'Shark', 'Panther', 'Viper', 'Cobra', 'Falcon', 'Eagle'];

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
OR REPLACE FUNCTION public.get_random_avatar() RETURNS TEXT LANGUAGE plpgsql AS $$ DECLARE avatar_styles TEXT [] := ARRAY ['adventurer', 'adventurer-neutral', 'avataaars', 'big-ears', 'big-ears-neutral', 'big-smile', 'bottts', 'croodles', 'croodles-neutral', 'fun-emoji', 'icons', 'identicon', 'initials', 'lorelei', 'lorelei-neutral', 'micah', 'miniavs', 'open-peeps', 'personas', 'pixel-art', 'pixel-art-neutral', 'shapes', 'thumbs'];

random_style TEXT;

random_seed TEXT;

BEGIN random_style := avatar_styles [1 + floor(random() * array_length(avatar_styles, 1))];

-- Generate a random seed using timestamp and random
random_seed := md5(random() :: text || clock_timestamp() :: text);

RETURN 'https://api.dicebear.com/7.x/' || random_style || '/svg?seed=' || random_seed;

END;

$$;

-- Function to handle new user creation
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$ DECLARE user_username TEXT;

user_avatar_url TEXT;

BEGIN -- Use provided username or generate random one
user_username := COALESCE(
    NEW.raw_user_meta_data ->> 'username',
    generate_random_username()
);

-- Use provided avatar or generate random one
user_avatar_url := COALESCE(
    NEW.raw_user_meta_data ->> 'avatar_url',
    get_random_avatar()
);

INSERT INTO
    public.profiles (id, username, avatar_url, created_at, updated_at)
VALUES
    (
        NEW.id,
        user_username,
        user_avatar_url,
        NOW(),
        NOW()
    );

RETURN NEW;

END;

$$;

-- Function to handle user updates
CREATE
OR REPLACE FUNCTION public.handle_updated_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN
UPDATE
    public.profiles
SET
    username = NEW.raw_user_meta_data ->> 'username',
    avatar_url = NEW.raw_user_meta_data ->> 'avatar_url',
    updated_at = NOW()
WHERE
    id = NEW.id;

RETURN NEW;

END;

$$;

-- Function to handle user deletion
CREATE
OR REPLACE FUNCTION public.handle_delete_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN
DELETE FROM
    public.profiles
WHERE
    id = OLD.id;

RETURN OLD;

END;

$$;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;

-- Create triggers
CREATE TRIGGER on_auth_user_created
AFTER
INSERT
    ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_updated
AFTER
UPDATE
    ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_updated_user();

CREATE TRIGGER on_auth_user_deleted
AFTER
    DELETE ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_delete_user();