-- Drop the existing view first to avoid column structure conflicts
DROP VIEW IF EXISTS challenge_details_view;

-- Recreate the view with all necessary columns
CREATE VIEW challenge_details_view AS
SELECT
    c.id,
    c.title,
    c.description,
    c."imageUrl",
    c."challengeType",
    c."maxParticipants",
    c."maxTeamSize",
    c."startDate",
    c."endDate",
    c."isPublic",
    c."creatorId",
    c."createdAt",
    c."expiresAt",
    c.status,
    c."accessCode",
    c.instructions,
    c."participantCount",
    p.username AS creator_username,
    p.avatar_url AS creator_avatar_url,
    (
        SELECT
            COUNT(*)
        FROM
            "ChallengeParticipant" cp
        WHERE
            cp."challengeId" = c.id
    ) AS participant_count
FROM
    "Challenge" c
    JOIN "profiles" p ON c."creatorId" = p.id;