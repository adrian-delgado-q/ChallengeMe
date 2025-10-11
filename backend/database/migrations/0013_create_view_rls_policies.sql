-- migrate:up
-- RLS Policies for Database Views
-- =============================================================================

-- Grant necessary permissions to authenticated users ONLY for all views
GRANT SELECT ON activity_details_view TO authenticated;
GRANT SELECT ON challenge_details_view TO authenticated;
GRANT SELECT ON discussion_post_details_view TO authenticated;
GRANT SELECT ON discussion_reply_details_view TO authenticated;
GRANT SELECT ON post_details_view TO authenticated;
GRANT SELECT ON team_details_view TO authenticated;
GRANT SELECT ON challenge_progress TO authenticated;

-- Revoke any existing permissions for anon users
REVOKE ALL PRIVILEGES ON activity_details_view FROM anon;
REVOKE ALL PRIVILEGES ON challenge_details_view FROM anon;
REVOKE ALL PRIVILEGES ON discussion_post_details_view FROM anon;
REVOKE ALL PRIVILEGES ON discussion_reply_details_view FROM anon;
REVOKE ALL PRIVILEGES ON post_details_view FROM anon;
REVOKE ALL PRIVILEGES ON team_details_view FROM anon;
REVOKE ALL PRIVILEGES ON challenge_progress FROM anon;

-- migrate:down

-- Revoke permissions from authenticated users
REVOKE SELECT ON activity_details_view FROM authenticated;
REVOKE SELECT ON challenge_details_view FROM authenticated;
REVOKE SELECT ON discussion_post_details_view FROM authenticated;
REVOKE SELECT ON discussion_reply_details_view FROM authenticated;
REVOKE SELECT ON post_details_view FROM authenticated;
REVOKE SELECT ON team_details_view FROM authenticated;
REVOKE SELECT ON challenge_progress FROM authenticated;
