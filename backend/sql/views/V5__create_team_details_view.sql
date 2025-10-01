-- Drop the existing view first to avoid column structure conflicts
DROP VIEW IF EXISTS team_details_view;

-- Recreate the view with all necessary columns
CREATE VIEW team_details_view AS
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
    (SELECT COUNT(*) FROM "TeamMembership" tm WHERE tm."teamId" = t.id) AS member_count
FROM
    "Team" t
JOIN
    "profiles" p ON t."creatorId" = p.id;
