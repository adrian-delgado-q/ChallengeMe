-- migrate:up
CREATE VIEW
    post_details_view
WITH
    (security_invoker = true) AS
SELECT
    post.id,
    post.created_at,
    post.content,
    post.image_url,
    post.participant_id,
    cp.user_id,
    p.username,
    p.avatar_url,
    cp.challenge_id,
    c.title AS challenge_title
FROM
    posts post
    JOIN challenge_participants cp ON post.participant_id = cp.id
    LEFT JOIN profiles p ON cp.user_id = p.id
    JOIN challenges c ON cp.challenge_id = c.id;

-- migrate:down
DROP VIEW IF EXISTS post_details_view;