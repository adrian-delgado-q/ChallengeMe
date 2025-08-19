-- Update existing users with random usernames and avatars
-- This migration can be run safely multiple times
-- Function to update existing users without usernames (run once)
CREATE
OR REPLACE FUNCTION public.update_existing_users_with_random_usernames() RETURNS INTEGER LANGUAGE plpgsql AS $$ DECLARE updated_count INTEGER := 0;

profile_record RECORD;

BEGIN -- Update profiles that have null or empty usernames
FOR profile_record IN
SELECT
    id
FROM
    public.profiles
WHERE
    username IS NULL
    OR username = ''
    OR username = 'Unknown User' LOOP
UPDATE
    public.profiles
SET
    username = generate_random_username(),
    avatar_url = COALESCE(avatar_url, get_random_avatar()),
    updated_at = NOW()
WHERE
    id = profile_record.id;

updated_count := updated_count + 1;

END LOOP;

RETURN updated_count;

END;

$$;

-- Run the update function once to fix existing users
SELECT
    public.update_existing_users_with_random_usernames() AS users_updated;

-- Drop the temporary function after use
DROP FUNCTION public.update_existing_users_with_random_usernames();