-- Drop the existing view first to avoid column structure conflicts
DROP VIEW IF EXISTS challenge_progress;

-- Challenge Progress View
-- This view dynamically calculates challenge progress from the Activity table
-- Replacing the aggregated challenge_progress table with real-time calculations
-- =============================================================================
-- Create the challenge_progress view that aggregates activity data on-demand
CREATE
OR REPLACE VIEW challenge_progress WITH (security_invoker = true) AS
SELECT
    gen_random_uuid() as id,
    a."challengeId",
    a."participantId",
    a."activityTypeId",
    SUM(a.value) as "totalValue",
    COUNT(*) :: int as "activityCount",
    AVG(a.value) as "averageValue",
    MAX(a.value) as "bestValue",
    MAX(a.date) as "lastActivityDate",
    MIN(a."uploadedAt") as "createdAt",
    MAX(a."uploadedAt") as "updatedAt"
FROM
    "Activity" a
WHERE
    a."challengeId" IS NOT NULL
    AND a."participantId" IS NOT NULL
    AND a."activityTypeId" IS NOT NULL
GROUP BY
    a."challengeId",
    a."participantId",
    a."activityTypeId";

-- Add comment for documentation
COMMENT ON VIEW challenge_progress IS 'Dynamic view that calculates challenge progress aggregations from Activity data in real-time. Replaces the previous challenge_progress table.';

-- Grant permissions to authenticated users only
GRANT
SELECT
    ON challenge_progress TO authenticated;

-- Ensure no access for anonymous users
REVOKE ALL PRIVILEGES ON challenge_progress
FROM
    anon;