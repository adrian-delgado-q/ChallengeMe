-- migrate:up
CREATE VIEW
    activity_details_view
WITH
    (security_invoker = true) AS
SELECT
    a.id,
    a.participant_id,
    a.activity_type_id,
    a.value,
    a.notes,
    a.date,
    a.uploaded_at,
    atp.name AS activity_type_name,
    atp.category AS activity_type_category,
    atp.unit AS activity_type_unit,
    atp.unit_label AS activity_type_unit_label,
    p.id AS user_id,
    p.username,
    p.avatar_url,
    t.id AS team_id,
    t.name AS team_name,
    c.id AS challenge_id,
    c.title AS challenge_title
FROM
    activities a
    JOIN challenge_participants cp ON a.participant_id = cp.id
    LEFT JOIN profiles p ON cp.user_id = p.id
    LEFT JOIN teams t ON cp.team_id = t.id
    JOIN challenges c ON cp.challenge_id = c.id
    JOIN activity_types atp ON a.activity_type_id = atp.id;

-- migrate:down
DROP VIEW IF EXISTS activity_details_view;