-- Supabase/SQL Migrations: Schema Enhancements
-- Description: Contains schema modifications that cannot be handled by Prisma,
-- such as partial unique constraints and column comments for documentation.
-- =============================================================================
-- Section 1: Partial Unique Constraints
-- Ensures data integrity where Prisma's unique constraints are insufficient.
-- -----------------------------------------------------------------------------
-- A user can only participate once per challenge.
CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_userid_unique" ON "public"."ChallengeParticipant" ("challengeId", "userId")
WHERE
    "userId" IS NOT NULL;

-- A team can only participate once per challenge.
CREATE UNIQUE INDEX IF NOT EXISTS "idx_challengeparticipant_challengeid_teamid_unique" ON "public"."ChallengeParticipant" ("challengeId", "teamId")
WHERE
    "teamId" IS NOT NULL;

-- Section 2: Documentation Comments
-- Adds descriptive comments to table columns for clarity.
-- -----------------------------------------------------------------------------
COMMENT ON COLUMN "public"."Challenge"."status" IS 'Current status of the challenge: ACTIVE, CLOSED, or CANCELLED.';

COMMENT ON COLUMN "public"."Challenge"."maxTeamSize" IS 'Maximum number of members allowed per team. NULL means no limit.';

COMMENT ON COLUMN "public"."Challenge"."maxParticipants" IS 'Max number of individuals for INDIVIDUAL challenges, or max number of teams for TEAM challenges.';

COMMENT ON COLUMN "public"."Challenge"."participantCount" IS 'Cached count of current participants, updated by triggers.';

COMMENT ON COLUMN "public"."Team"."memberCount" IS 'Cached count of current team members, updated by triggers.';