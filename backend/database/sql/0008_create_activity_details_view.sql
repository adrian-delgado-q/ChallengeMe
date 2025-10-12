-- migrate:up
CREATE VIEW
    activity_details_view
WITH
    (security_invoker = true) AS
SELECT
    a.id,
    a."participantId",
    a."activityTypeId",
    a.value,
    a.notes,
    a.date,
    a."uploadedAt",
    atp.name AS activity_type_name,
    atp.category AS activity_type_category,
    atp.unit AS activity_type_unit,
    atp."unitLabel" AS activity_type_unit_label,
    p.id AS user_id,
    p.username,
    p.avatar_url,
    t.id AS team_id,
    t.name AS team_name,
    c.id AS challenge_id,
    c.title AS challenge_title
FROM
    "activities" a
    JOIN "challenge_participants" cp ON a."participantId" = cp.id
    LEFT JOIN "profiles" p ON cp."userId" = p.id
    LEFT JOIN "teams" t ON cp."teamId" = t.id
    JOIN "challenges" c ON cp."challengeId" = c.id
    JOIN "activity_types" atp ON a."activityTypeId" = atp.id;

-- migrate:down
DROP VIEW IF EXISTS activity_details_view;