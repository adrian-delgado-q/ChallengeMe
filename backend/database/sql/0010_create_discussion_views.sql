-- migrate:up
CREATE VIEW
    discussion_post_details_view
WITH
    (security_invoker = true) AS
SELECT
    dp.*,
    p.username AS author_username,
    p.avatar_url AS author_avatar_url
FROM
    discussion_posts dp
    JOIN profiles p ON dp.author_id = p.id;

CREATE VIEW
    discussion_reply_details_view
WITH
    (security_invoker = true) AS
SELECT
    dr.*,
    p.username AS author_username,
    p.avatar_url AS author_avatar_url
FROM
    discussion_replies dr
    JOIN profiles p ON dr.author_id = p.id;

-- migrate:down
DROP VIEW IF EXISTS discussion_post_details_view;

DROP VIEW IF EXISTS discussion_reply_details_view;