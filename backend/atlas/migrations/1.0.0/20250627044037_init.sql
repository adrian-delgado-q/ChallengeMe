-- Add new schema named "auth"
CREATE SCHEMA "auth";

CREATE TABLE "auth"."users" (
  "id" uuid NOT NULL,
  PRIMARY KEY ("id")
);

-- Create "profiles" table
CREATE TABLE "public"."profiles" (
  "id" uuid NOT NULL,
  "username" text NULL,
  "avatar_url" text NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz NOT NULL,
  PRIMARY KEY ("id")
);

-- Create index "profiles_username_key" to table: "profiles"
CREATE UNIQUE INDEX "profiles_username_key" ON "public"."profiles" ("username");

-- Create "handle_updated_user" function
CREATE FUNCTION "public"."handle_updated_user" () RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN
UPDATE
  public.profiles
SET
  username = NEW.raw_user_meta_data ->> 'username',
  avatar_url = NEW.raw_user_meta_data ->> 'avatar_url',
  -- Sync avatar_url on update
  updated_at = NOW()
WHERE
  id = NEW.id;

RETURN NEW;

END;

$$;

-- Create enum type "ChallengeParticipantType"
CREATE TYPE "public"."ChallengeParticipantType" AS ENUM ('INDIVIDUAL', 'TEAM');

-- Create "users" table
-- Create trigger "on_auth_user_updated"
CREATE TRIGGER "on_auth_user_updated"
AFTER
UPDATE
  ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_user"();

-- Create enum type "TeamRole"
CREATE TYPE "public"."TeamRole" AS ENUM ('ADMIN', 'MEMBER');

-- Create "handle_new_user" function
CREATE FUNCTION "public"."handle_new_user" () RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN
INSERT INTO
  public.profiles (id, username, avatar_url, created_at, updated_at)
VALUES
  (
    NEW.id,
    NEW.raw_user_meta_data ->> 'username',
    NEW.raw_user_meta_data ->> 'avatar_url',
    -- Sync avatar_url on creation
    NOW(),
    NOW()
  );

RETURN NEW;

END;

$$;

-- Create trigger "on_auth_user_created"
CREATE TRIGGER "on_auth_user_created"
AFTER
INSERT
  ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();

-- Create "handle_delete_user" function
CREATE FUNCTION "public"."handle_delete_user" () RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN
DELETE FROM
  public.profiles
WHERE
  id = OLD.id;

RETURN OLD;

END;

$$;

-- Create trigger "on_auth_user_deleted"
CREATE TRIGGER "on_auth_user_deleted"
AFTER
  DELETE ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_delete_user"();

-- Create "Challenge" table
CREATE TABLE "public"."Challenge" (
  "id" uuid NOT NULL,
  "creatorId" uuid NOT NULL,
  "title" text NOT NULL,
  "description" text NULL,
  "challengeType" "public"."ChallengeParticipantType" NOT NULL DEFAULT 'INDIVIDUAL',
  "maxParticipants" integer NULL,
  "startDate" date NOT NULL,
  "endDate" date NOT NULL,
  "isPublic" boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" timestamptz NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "Challenge_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."profiles" ("id") ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Create "Team" table
CREATE TABLE "public"."Team" (
  "id" uuid NOT NULL,
  "creatorId" uuid NOT NULL,
  "name" text NOT NULL,
  "description" text NULL,
  "avatarUrl" text NULL,
  "isPublic" boolean NOT NULL DEFAULT true,
  "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" timestamptz NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "Team_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."profiles" ("id") ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Create "ChallengeParticipant" table
CREATE TABLE "public"."ChallengeParticipant" (
  "id" uuid NOT NULL,
  "challengeId" uuid NOT NULL,
  "userId" uuid NULL,
  "teamId" uuid NULL,
  "joinedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "ChallengeParticipant_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "public"."Challenge" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "ChallengeParticipant_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "ChallengeParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profiles" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create index "idx_challengeparticipant_challengeid_teamid_unique" to table: "ChallengeParticipant"
CREATE UNIQUE INDEX "idx_challengeparticipant_challengeid_teamid_unique" ON "public"."ChallengeParticipant" ("challengeId", "teamId")
WHERE
  ("teamId" IS NOT NULL);

-- Create index "idx_challengeparticipant_challengeid_userid_unique" to table: "ChallengeParticipant"
CREATE UNIQUE INDEX "idx_challengeparticipant_challengeid_userid_unique" ON "public"."ChallengeParticipant" ("challengeId", "userId")
WHERE
  ("userId" IS NOT NULL);

-- Create "Activity" table
CREATE TABLE "public"."Activity" (
  "id" uuid NOT NULL,
  "participantId" uuid NOT NULL,
  "notes" text NULL,
  "date" date NOT NULL,
  "uploadedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "profileId" uuid NULL,
  "challengeId" uuid NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "Activity_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "public"."Challenge" ("id") ON UPDATE CASCADE ON DELETE
  SET
    NULL,
    CONSTRAINT "Activity_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."ChallengeParticipant" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "Activity_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles" ("id") ON UPDATE CASCADE ON DELETE
  SET
    NULL
);

-- Create "Post" table
CREATE TABLE "public"."Post" (
  "id" uuid NOT NULL,
  "participantId" uuid NOT NULL,
  "content" text NULL,
  "imageUrl" text NULL,
  "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "profileId" uuid NULL,
  "challengeId" uuid NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "Post_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "public"."Challenge" ("id") ON UPDATE CASCADE ON DELETE
  SET
    NULL,
    CONSTRAINT "Post_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."ChallengeParticipant" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT "Post_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."profiles" ("id") ON UPDATE CASCADE ON DELETE
  SET
    NULL
);

-- Create "Comment" table
CREATE TABLE "public"."Comment" (
  "id" uuid NOT NULL,
  "authorId" uuid NOT NULL,
  "postId" uuid NOT NULL,
  "content" text NULL,
  "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."profiles" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create "TeamMembership" table
CREATE TABLE "public"."TeamMembership" (
  "id" uuid NOT NULL,
  "teamId" uuid NOT NULL,
  "userId" uuid NOT NULL,
  "role" "public"."TeamRole" NOT NULL DEFAULT 'MEMBER',
  "joinedAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" timestamptz NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "TeamMembership_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT "TeamMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."profiles" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create index "TeamMembership_teamId_userId_key" to table: "TeamMembership"
CREATE UNIQUE INDEX "TeamMembership_teamId_userId_key" ON "public"."TeamMembership" ("teamId", "userId");