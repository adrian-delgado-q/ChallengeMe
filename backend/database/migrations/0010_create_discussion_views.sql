-- migrate:up
CREATE VIEW discussion_post_details_view WITH (security_invoker = true) AS
SELECT
    dp.id,
    dp."challengeId",
    dp."authorId",
    dp.content,
    dp."createdAt",
    dp."updatedAt",
    dp."isPinned",
    dp."isDeleted",
    dp."replyCount",
    dp."lastReplyAt",
    p.username AS author_username,
    p.avatar_url AS author_avatar_url
FROM
    discussion_posts dp
    JOIN profiles p ON dp."authorId" = p.id;

CREATE VIEW discussion_reply_details_view WITH (security_invoker = true) AS
SELECT
    dr.id,
    dr."postId",
    dr."parentId",
    dr."authorId",
    dr.content,
    dr."createdAt",
    dr."updatedAt",
    dr."isDeleted",
    p.username AS author_username,
    p.avatar_url AS author_avatar_url
FROM
    discussion_replies dr
    JOIN profiles p ON dr."authorId" = p.id;

-- migrate:down
DROP VIEW IF EXISTS discussion_post_details_view;
DROP VIEW IF EXISTS discussion_reply_details_view;
