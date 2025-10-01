-- RLS Policies for Database Views
-- This file creates proper access control for database views in Supabase
-- Views inherit RLS from their underlying tables, but we need to grant proper permissions
-- =============================================================================

-- Grant necessary permissions to authenticated users for all views
GRANT SELECT ON activity_details_view TO authenticated;
GRANT SELECT ON challenge_details_view TO authenticated; 
GRANT SELECT ON discussion_post_details_view TO authenticated;
GRANT SELECT ON discussion_reply_details_view TO authenticated;
GRANT SELECT ON post_details_view TO authenticated;
GRANT SELECT ON team_details_view TO authenticated;

-- Grant permissions to anon users for public content
-- This allows unauthenticated users to view public challenges and activities
GRANT SELECT ON activity_details_view TO anon;
GRANT SELECT ON challenge_details_view TO anon;
GRANT SELECT ON discussion_post_details_view TO anon; 
GRANT SELECT ON discussion_reply_details_view TO anon;
GRANT SELECT ON post_details_view TO anon;
GRANT SELECT ON team_details_view TO anon;

-- Since views inherit RLS from underlying tables, we need to ensure
-- the underlying tables have proper RLS policies that will filter the view results.
-- The RLS policies on Challenge, Activity, etc. tables will automatically
-- filter the view results based on user permissions.
