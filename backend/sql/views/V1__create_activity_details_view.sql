-- Drop the existing view first to avoid column structure conflicts
DROP VIEW IF EXISTS activity_details_view;

-- Recreate the view with all necessary columns
CREATE VIEW activity_details_view AS
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
    "Activity" a
JOIN
    "ChallengeParticipant" cp ON a."participantId" = cp.id
LEFT JOIN
    "profiles" p ON cp."userId" = p.id
LEFT JOIN
    "Team" t ON cp."teamId" = t.id
JOIN
    "Challenge" c ON cp."challengeId" = c.id
JOIN
    "ActivityType" atp ON a."activityTypeId" = atp.id;
