-- Modify "users" table
-- ALTER TABLE "auth"."users" DROP CONSTRAINT "users_pkey";
-- Drop index "idx_challengeparticipant_challengeid_teamid_unique" from table: "ChallengeParticipant"
DROP INDEX "public"."idx_challengeparticipant_challengeid_teamid_unique";
-- Drop index "idx_challengeparticipant_challengeid_userid_unique" from table: "ChallengeParticipant"
DROP INDEX "public"."idx_challengeparticipant_challengeid_userid_unique";
-- Create index "idx_challengeparticipant_challengeid_teamid_unique" to table: "ChallengeParticipant"
CREATE INDEX "idx_challengeparticipant_challengeid_teamid_unique" ON "public"."ChallengeParticipant" ("challengeId", "teamId");
-- Create index "idx_challengeparticipant_challengeid_userid_unique" to table: "ChallengeParticipant"
CREATE INDEX "idx_challengeparticipant_challengeid_userid_unique" ON "public"."ChallengeParticipant" ("challengeId", "userId");
-- Modify "handle_new_user" function
CREATE OR REPLACE FUNCTION "public"."handle_new_user" () RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
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
-- Modify "handle_updated_user" function
CREATE OR REPLACE FUNCTION "public"."handle_updated_user" () RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
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
