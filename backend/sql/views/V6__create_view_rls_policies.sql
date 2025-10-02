-- RLS Policies for Database Views
-- This file creates proper access control for database views in Supabase
-- Views inherit RLS from their underlying tables, but we need to grant proper permissions
-- IMPORTANT: Only authenticated users can access views, no anonymous access allowed
-- =============================================================================
-- Grant necessary permissions to authenticated users ONLY for all views
-- Anonymous users are explicitly excluded for security
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

GRANT
SELECT
    ON challenge_progress TO authenticated;

-- Ensure no access is granted to anonymous users
-- Revoke any existing permissions for anon users
REVOKE ALL PRIVILEGES ON activity_details_view
FROM
    anon;

REVOKE ALL PRIVILEGES ON challenge_details_view
FROM
    anon;

REVOKE ALL PRIVILEGES ON discussion_post_details_view
FROM
    anon;

REVOKE ALL PRIVILEGES ON discussion_reply_details_view
FROM
    anon;

REVOKE ALL PRIVILEGES ON post_details_view
FROM
    anon;

REVOKE ALL PRIVILEGES ON team_details_view
FROM
    anon;

REVOKE ALL PRIVILEGES ON challenge_progress
FROM
    anon;