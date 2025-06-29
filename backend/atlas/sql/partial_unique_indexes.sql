-- Create schemas if they don't already exist
-- partial unique indexes as raw SQL migrations (since Prisma and Atlas HCL do not support partial unique indexes natively).
-- Indexes (public.ChallengeParticipant)
--------------------------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_userid_unique"
ON "public"."ChallengeParticipant" ("challengeId", "userId")
WHERE "userId" IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_teamid_unique"
ON "public"."ChallengeParticipant" ("challengeId", "teamId")
WHERE "teamId" IS NOT NULL;
