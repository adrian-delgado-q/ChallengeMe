-- migrate:up
CREATE VIEW post_details_view WITH (security_invoker = true) AS
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
    "posts" post
    JOIN "challenge_participants" cp ON post."participantId" = cp.id
    LEFT JOIN "profiles" p ON cp."userId" = p.id
    JOIN "challenges" c ON cp."challengeId" = c.id;

-- migrate:down
DROP VIEW IF EXISTS post_details_view;
