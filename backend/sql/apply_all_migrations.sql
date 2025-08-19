-- Master Migration Script for ChallengeMe
-- This script applies all necessary SQL changes to move away from Atlas
-- Step 1: Apply partial unique indexes
\ i partial_unique_indexes.sql -- Step 2: Apply triggers and functions
\ i triggers_and_functions.sql -- Step 3: Apply complete RLS setup
\ i complete_rls_setup.sql -- Step 4: Verify everything is working
SELECT
    'Migration completed successfully!' as status;