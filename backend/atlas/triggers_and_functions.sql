-- Create schemas if they don't already exist
-- Supabase usually creates these, so IF NOT EXISTS is good practice.
CREATE SCHEMA IF NOT EXISTS "public";
CREATE SCHEMA IF NOT EXISTS "auth";

-- create user table in auth schema if it doesn't exist
CREATE TABLE IF NOT EXISTS "auth"."users" (
  "id" uuid NOT NULL
);
-- Functions (public schema)
--------------------------------------------------------------------------------

-- Function: handle_new_user
CREATE OR REPLACE FUNCTION "public"."handle_new_user"()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'avatar_url', -- Sync avatar_url on creation
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$;

-- Function: handle_updated_user
CREATE OR REPLACE FUNCTION "public"."handle_updated_user"()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET
    username = NEW.raw_user_meta_data->>'username',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url', -- Sync avatar_url on update
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- Function: handle_delete_user
CREATE OR REPLACE FUNCTION "public"."handle_delete_user"()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.profiles WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

-- Indexes (public.ChallengeParticipant)
--------------------------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_userid_unique"
ON "public"."ChallengeParticipant" ("challengeId", "userId")
WHERE "userId" IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_teamid_unique"
ON "public"."ChallengeParticipant" ("challengeId", "teamId")
WHERE "teamId" IS NOT NULL;


-- Trigger: on_auth_user_created
CREATE TRIGGER "on_auth_user_created"
AFTER INSERT ON "auth"."users"
FOR EACH ROW
EXECUTE FUNCTION "public"."handle_new_user"();

-- Trigger: on_auth_user_updated
CREATE TRIGGER "on_auth_user_updated"
AFTER UPDATE ON "auth"."users"
FOR EACH ROW
EXECUTE FUNCTION "public"."handle_updated_user"();

-- Trigger: on_auth_user_deleted
CREATE TRIGGER "on_auth_user_deleted"
AFTER DELETE ON "auth"."users"
FOR EACH ROW
EXECUTE FUNCTION "public"."handle_delete_user"();