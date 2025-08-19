-- Partial Unique Indexes for ChallengeMe
-- This file replaces the Atlas partial_unique_indexes.sql

-- Ensure a user can only participate once per challenge (when userId is not null)
CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_userid_unique"
ON "public"."ChallengeParticipant" ("challengeId", "userId")
WHERE "userId" IS NOT NULL;

-- Ensure a team can only participate once per challenge (when teamId is not null)
CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_teamid_unique"
ON "public"."ChallengeParticipant" ("challengeId", "teamId")
WHERE "teamId" IS NOT NULL;
