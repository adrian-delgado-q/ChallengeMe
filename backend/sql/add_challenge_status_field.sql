-- Add status field to Challenge table for challenge management
-- This field allows challenge creators to close/reopen challenges
-- Add status enum type
CREATE TYPE "public"."ChallengeStatus" AS ENUM ('ACTIVE', 'CLOSED', 'CANCELLED');

-- Add status field to Challenge table
ALTER TABLE
    "public"."Challenge"
ADD
    COLUMN "status" "public"."ChallengeStatus" NOT NULL DEFAULT 'ACTIVE';

-- Add index for efficient status queries
CREATE INDEX "idx_challenge_status" ON "public"."Challenge"("status");

-- Add comment to clarify field usage
COMMENT ON COLUMN "public"."Challenge"."status" IS 'Current status of the challenge: ACTIVE (accepting participants), CLOSED (no new participants), CANCELLED (challenge stopped)';

-- Add composite index for creator queries with status
CREATE INDEX "idx_challenge_creator_status" ON "public"."Challenge"("creatorId", "status");