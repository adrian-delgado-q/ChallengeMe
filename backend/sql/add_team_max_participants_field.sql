-- Add maxTeamSize field to Challenge table for team challenges
-- This field specifies the maximum number of members allowed per team in a team challenge
ALTER TABLE
    "public"."Challenge"
ADD
    COLUMN "maxTeamSize" INTEGER;

-- Add comment to clarify the field usage
COMMENT ON COLUMN "public"."Challenge"."maxTeamSize" IS 'Maximum number of members allowed per team in team challenges. NULL means no limit.';

-- Add comment to clarify maxParticipants usage
COMMENT ON COLUMN "public"."Challenge"."maxParticipants" IS 'For INDIVIDUAL challenges: max number of individual participants. For TEAM challenges: max number of teams that can participate.';