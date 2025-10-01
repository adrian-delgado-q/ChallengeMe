CREATE OR REPLACE VIEW post_details_view AS
SELECT
    post.id,
    post."createdAt",
    post.content,
    post."imageUrl",
    post."participantId",
    cp."userId",
    p.username,
    p.avatar_url,
    cp."challengeId",
    c.title AS challenge_title
FROM
    "Post" post
JOIN
    "ChallengeParticipant" cp ON post."participantId" = cp.id
LEFT JOIN
    "profiles" p ON cp."userId" = p.id
JOIN
    "Challenge" c ON cp."challengeId" = c.id;
