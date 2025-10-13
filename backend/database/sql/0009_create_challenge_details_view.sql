-- migrate:up
CREATE VIEW
    challenge_details_view
WITH
    (security_invoker = true) AS
SELECT
    c.id,
    c.title,
    c.description,
    c.image_url,
    c.challenge_type,
    c.max_participants,
    c.max_team_size,
    c.start_date,
    c.end_date,
    c.is_public,
    c.creator_id,
    c.created_at,
    c.expires_at,
    c.status,
    c.access_code,
    c.instructions,
    p.username AS creator_username,
    p.avatar_url AS creator_avatar_url,
    (
        SELECT
            COUNT(*)
        FROM
            challenge_participants cp
        WHERE
            cp.challenge_id = c.id
    ) AS participant_count
FROM
    challenges c
    JOIN profiles p ON c.creator_id = p.id;

-- migrate:down
DROP VIEW IF EXISTS challenge_details_view;