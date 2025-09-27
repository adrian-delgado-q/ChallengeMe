-- Supabase/SQL Migrations: Triggers
-- Description: Creates all triggers for the application. This script should
-- be run after `02_functions.sql` to ensure functions exist.
-- =============================================================================
-- Drop existing triggers to ensure a clean slate.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP TRIGGER IF EXISTS update_team_member_count_trigger ON "public"."TeamMembership";

DROP TRIGGER IF EXISTS update_challenge_participant_count_trigger ON "public"."ChallengeParticipant";

-- Trigger: Create a profile when a new user signs up.
CREATE TRIGGER on_auth_user_created
AFTER
INSERT
    ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Update team member count when membership changes.
CREATE TRIGGER update_team_member_count_trigger
AFTER
INSERT
    OR DELETE ON "public"."TeamMembership" FOR EACH ROW EXECUTE FUNCTION public.update_team_member_count();

-- Trigger: Update challenge participant count when participation changes.
CREATE TRIGGER update_challenge_participant_count_trigger
AFTER
INSERT
    OR DELETE ON "public"."ChallengeParticipant" FOR EACH ROW EXECUTE FUNCTION public.update_challenge_participant_count();

-- Trigger: Validate activity type is supported by challenge when creating/updating activities.
CREATE TRIGGER validate_activity_challenge_agreement_trigger BEFORE
INSERT
    OR
UPDATE
    ON "public"."Activity" FOR EACH ROW EXECUTE FUNCTION public.validate_activity_challenge_agreement();