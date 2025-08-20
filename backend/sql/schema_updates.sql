-- Schema Updates for ChallengeMe
-- This file contains schema modifications that cannot be handled by Prisma
-- Most schema definitions (enums, fields, basic indexes) are now in schema.prisma
-- =====================================================
-- PARTIAL UNIQUE CONSTRAINTS
-- =====================================================
-- Prisma doesn't support conditional unique constraints, so we handle these in SQL
-- Ensure a user can only participate once per challenge (when userId is not null)
CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_userid_unique" ON "public"."ChallengeParticipant" ("challengeId", "userId")
WHERE
    "userId" IS NOT NULL;

-- Ensure a team can only participate once per challenge (when teamId is not null)
CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_teamid_unique" ON "public"."ChallengeParticipant" ("challengeId", "teamId")
WHERE
    "teamId" IS NOT NULL;

-- =====================================================
-- DOCUMENTATION COMMENTS
-- =====================================================
-- Add helpful comments that Prisma doesn't generate
COMMENT ON COLUMN "public"."Challenge"."status" IS 'Current status of the challenge: ACTIVE (accepting participants), CLOSED (no new participants), CANCELLED (challenge stopped)';

COMMENT ON COLUMN "public"."Challenge"."maxTeamSize" IS 'Maximum number of members allowed per team in team challenges. NULL means no limit.';

COMMENT ON COLUMN "public"."Challenge"."maxParticipants" IS 'For INDIVIDUAL challenges: max number of individual participants. For TEAM challenges: max number of teams that can participate.';

COMMENT ON COLUMN "public"."Challenge"."participantCount" IS 'Automatically maintained count of current participants. Updated by triggers.';

COMMENT ON COLUMN "public"."Team"."memberCount" IS 'Automatically maintained count of current team members. Updated by triggers.';