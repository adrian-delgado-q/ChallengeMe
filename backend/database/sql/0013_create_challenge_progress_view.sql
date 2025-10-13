-- migrate:up
-- Challenge Progress View
-- =============================================================================
CREATE OR REPLACE VIEW
    challenge_progress
WITH
    (security_invoker = true) AS
SELECT
    gen_random_uuid () as id,
    a.challenge_id,
    a.participant_id,
    a.activity_type_id,
    SUM(a.value) as total_value,
    COUNT(*)::int as activity_count,
    AVG(a.value) as average_value,
    MAX(a.value) as best_value,
    MAX(a.date) as last_activity_date,
    MIN(a.uploaded_at) as created_at,
    MAX(a.uploaded_at) as updated_at
FROM
    activities a
WHERE
    a.challenge_id IS NOT NULL AND
    a.participant_id IS NOT NULL AND
    a.activity_type_id IS NOT NULL
GROUP BY
    a.challenge_id,
    a.participant_id,
    a.activity_type_id;

COMMENT ON VIEW challenge_progress IS 'Dynamic view that calculates challenge progress aggregations from Activity data in real-time. Replaces the previous challenge_progress table.';

-- migrate:down
DROP VIEW IF EXISTS challenge_progress;