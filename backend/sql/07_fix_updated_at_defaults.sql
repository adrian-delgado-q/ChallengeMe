-- Fix default values for updatedAt columns in discussion tables
-- Run this in your Supabase SQL editor if you're still having timestamp issues
-- Fix discussion_posts table
ALTER TABLE
    discussion_posts
ALTER COLUMN
    "updatedAt"
SET
    DEFAULT NOW();

-- Fix discussion_replies table  
ALTER TABLE
    discussion_replies
ALTER COLUMN
    "updatedAt"
SET
    DEFAULT NOW();

-- Ensure any existing records have updatedAt values
UPDATE
    discussion_posts
SET
    "updatedAt" = "createdAt"
WHERE
    "updatedAt" IS NULL;

UPDATE
    discussion_replies
SET
    "updatedAt" = "createdAt"
WHERE
    "updatedAt" IS NULL;