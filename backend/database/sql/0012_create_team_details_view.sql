-- migrate:up
CREATE VIEW
    team_details_view
WITH
    (security_invoker = true) AS
SELECT
    t.id,
    t.name,
    t.description,
    t.avatar_url,
    t.is_public,
    t.max_members,
    t.creator_id,
    p.username AS creator_username,
    p.avatar_url AS creator_avatar_url,
    (
        SELECT
            COUNT(*)
        FROM
            team_memberships tm
        WHERE
            tm.team_id = t.id
    ) AS member_count
FROM
    teams t
    JOIN profiles p ON t.creator_id = p.id;

-- migrate:down
DROP VIEW IF EXISTS team_details_view;