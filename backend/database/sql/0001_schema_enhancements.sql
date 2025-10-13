-- migrate:up
-- Supabase/SQL Migrations: Schema Enhancements
-- Description: Contains schema modifications that cannot be handled by Prisma,
-- such as partial unique constraints and column comments for documentation.
-- =============================================================================
-- Section 1: Partial Unique Constraints
-- Ensures data integrity where Prisma's unique constraints are insufficient.
-- -----------------------------------------------------------------------------
-- A user can only participate once per challenge.
CREATE UNIQUE INDEX IF NOT EXISTS idx_challengeparticipant_challengeid_userid_unique ON public.challenge_participants (challenge_id, user_id)
WHERE
    user_id IS NOT NULL;

-- A team can only participate once per challenge.
CREATE UNIQUE INDEX IF NOT EXISTS idx_challengeparticipant_challengeid_teamid_unique ON public.challenge_participants (challenge_id, team_id)
WHERE
    team_id IS NOT NULL;

-- Section 2: Documentation Comments
-- Adds descriptive comments to table columns for clarity.
-- -----------------------------------------------------------------------------
COMMENT ON COLUMN public.challenges.status IS 'Current status of the challenge: ACTIVE, CLOSED, or CANCELLED.';

COMMENT ON COLUMN public.challenges.max_team_size IS 'Maximum number of members allowed per team. NULL means no limit.';

COMMENT ON COLUMN public.challenges.max_participants IS 'Max number of individuals for INDIVIDUAL challenges, or max number of teams for TEAM challenges.';

COMMENT ON COLUMN public.challenges.participant_count IS 'Cached count of current participants, updated by triggers.';

COMMENT ON COLUMN public.teams.member_count IS 'Cached count of current team members, updated by triggers.';

-- migrate:down
-- Revert Partial Unique Constraints
DROP INDEX IF EXISTS idx_challengeparticipant_challengeid_userid_unique;

DROP INDEX IF EXISTS idx_challengeparticipant_challengeid_teamid_unique;

-- Revert Documentation Comments
COMMENT ON COLUMN public.challenges.status IS NULL;

COMMENT ON COLUMN public.challenges.max_team_size IS NULL;

COMMENT ON COLUMN public.challenges.max_participants IS NULL;

COMMENT ON COLUMN public.challenges.participant_count IS NULL;

COMMENT ON COLUMN public.teams.member_count IS NULL;