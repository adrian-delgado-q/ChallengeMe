-- RLS Policies for Database Views
-- This file creates proper access control for database views in Supabase
-- Views inherit RLS from their underlying tables, but we need to grant proper permissions
-- =============================================================================
-- Grant necessary permissions to authenticated users for all views
GRANT
SELECT
    ON activity_details_view TO authenticated;

GRANT
SELECT
    ON challenge_details_view TO authenticated;

GRANT
SELECT
    ON discussion_post_details_view TO authenticated;

GRANT
SELECT
    ON discussion_reply_details_view TO authenticated;

GRANT
SELECT
    ON post_details_view TO authenticated;

GRANT
SELECT
    ON team_details_view TO authenticated;
