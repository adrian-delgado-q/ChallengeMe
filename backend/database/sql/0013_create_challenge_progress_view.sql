-- migrate:up
-- Challenge Progress View
-- =============================================================================
CREATE OR REPLACE VIEW
    challenge_progress
WITH
    (security_invoker = true) AS
SELECT
    gen_random_uuid () as id,
    a."challengeId",
    a."participantId",
    a."activityTypeId",
    SUM(a.value) as "totalValue",
    COUNT(*)::int as "activityCount",
    AVG(a.value) as "averageValue",
    MAX(a.value) as "bestValue",
    MAX(a.date) as "lastActivityDate",
    MIN(a."uploadedAt") as "createdAt",
    MAX(a."uploadedAt") as "updatedAt"
FROM
    "activities" a
WHERE
    a."challengeId" IS NOT NULL AND
    a."participantId" IS NOT NULL AND
    a."activityTypeId" IS NOT NULL
GROUP BY
    a."challengeId",
    a."participantId",
    a."activityTypeId";

COMMENT ON VIEW challenge_progress IS 'Dynamic view that calculates challenge progress aggregations from Activity data in real-time. Replaces the previous challenge_progress table.';

-- migrate:down
DROP VIEW IF EXISTS challenge_progress;