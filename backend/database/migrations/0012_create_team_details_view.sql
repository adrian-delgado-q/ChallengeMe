-- migrate:up
CREATE VIEW team_details_view WITH (security_invoker = true) AS
SELECT
    t.id,
    t.name,
    t.description,
    t."avatarUrl",
    t."isPublic",
    t."maxMembers",
    t."creatorId",
    p.username AS creator_username,
    p.avatar_url AS creator_avatar_url,
    (
        SELECT
            COUNT(*)
        FROM
            "team_memberships" tm
        WHERE
            tm."teamId" = t.id
    ) AS member_count
FROM
    "teams" t
    JOIN "profiles" p ON t."creatorId" = p.id;

-- migrate:down
DROP VIEW IF EXISTS team_details_view;
