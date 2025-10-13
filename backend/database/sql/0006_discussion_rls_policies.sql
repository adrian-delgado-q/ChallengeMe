-- migrate:up
-- Row Level Security policies for Discussion tables
-- =============================================================================
-- Enable RLS on all discussion tables
ALTER TABLE public.discussion_posts ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.discussion_moderators ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.discussion_bans ENABLE ROW LEVEL SECURITY;

-- Discussion Posts policies
CREATE POLICY "Anyone can read discussion posts" ON public.discussion_posts FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can create posts" ON public.discussion_posts FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                public.challenge_participants cp
            WHERE
                cp.challenge_id = discussion_posts.challenge_id AND
                cp.user_id = auth.uid ()
        ) AND
        NOT EXISTS (
            SELECT
                1
            FROM
                public.discussion_bans db
            WHERE
                db.challenge_id = discussion_posts.challenge_id AND
                db.user_id = auth.uid () AND
                db.is_active = true AND
                (
                    db.expires_at IS NULL OR
                    db.expires_at > NOW()
                )
        )
    );

CREATE POLICY "Authors and moderators can update posts" ON public.discussion_posts FOR
UPDATE USING (
    author_id = auth.uid () OR
    EXISTS (
        SELECT
            1
        FROM
            public.discussion_moderators dm
        WHERE
            dm.challenge_id = discussion_posts.challenge_id AND
            dm.user_id = auth.uid ()
    ) OR
    EXISTS (
        SELECT
            1
        FROM
            public.challenges c
        WHERE
            c.id = discussion_posts.challenge_id AND
            c.creator_id = auth.uid ()
    )
);

CREATE POLICY "Authors and moderators can delete posts" ON public.discussion_posts FOR
UPDATE USING (
    author_id = auth.uid () OR
    EXISTS (
        SELECT
            1
        FROM
            public.discussion_moderators dm
        WHERE
            dm.challenge_id = discussion_posts.challenge_id AND
            dm.user_id = auth.uid ()
    ) OR
    EXISTS (
        SELECT
            1
        FROM
            public.challenges c
        WHERE
            c.id = discussion_posts.challenge_id AND
            c.creator_id = auth.uid ()
    )
);

-- Discussion Replies policies
CREATE POLICY "Anyone can read discussion replies" ON public.discussion_replies FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can create replies" ON public.discussion_replies FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                public.discussion_posts dp
                JOIN public.challenge_participants cp ON cp.challenge_id = dp.challenge_id
            WHERE
                dp.id = discussion_replies.post_id AND
                cp.user_id = auth.uid ()
        ) AND
        NOT EXISTS (
            SELECT
                1
            FROM
                public.discussion_posts dp
                JOIN public.discussion_bans db ON db.challenge_id = dp.challenge_id
            WHERE
                dp.id = discussion_replies.post_id AND
                db.user_id = auth.uid () AND
                db.is_active = true AND
                (
                    db.expires_at IS NULL OR
                    db.expires_at > NOW()
                )
        )
    );

CREATE POLICY "Authors and moderators can update replies" ON public.discussion_replies FOR
UPDATE USING (
    author_id = auth.uid () OR
    EXISTS (
        SELECT
            1
        FROM
            public.discussion_posts dp
            JOIN public.discussion_moderators dm ON dm.challenge_id = dp.challenge_id
        WHERE
            dp.id = discussion_replies.post_id AND
            dm.user_id = auth.uid ()
    ) OR
    EXISTS (
        SELECT
            1
        FROM
            public.discussion_posts dp
            JOIN public.challenges c ON c.id = dp.challenge_id
        WHERE
            dp.id = discussion_replies.post_id AND
            c.creator_id = auth.uid ()
    )
);

-- Discussion Moderators policies
CREATE POLICY "Anyone can read moderators" ON public.discussion_moderators FOR
SELECT
    USING (true);

CREATE POLICY "Challenge creators can manage moderators" ON public.discussion_moderators FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            public.challenges c
        WHERE
            c.id = discussion_moderators.challenge_id AND
            c.creator_id = auth.uid ()
    )
);

-- Discussion Bans policies
CREATE POLICY "Moderators can read bans" ON public.discussion_bans FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                public.discussion_moderators dm
            WHERE
                dm.challenge_id = discussion_bans.challenge_id AND
                dm.user_id = auth.uid ()
        ) OR
        EXISTS (
            SELECT
                1
            FROM
                public.challenges c
            WHERE
                c.id = discussion_bans.challenge_id AND
                c.creator_id = auth.uid ()
        )
    );

CREATE POLICY "Moderators can manage bans" ON public.discussion_bans FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            public.discussion_moderators dm
        WHERE
            dm.challenge_id = discussion_bans.challenge_id AND
            dm.user_id = auth.uid () AND
            dm.role = 'ADMIN'
    ) OR
    EXISTS (
        SELECT
            1
        FROM
            public.challenges c
        WHERE
            c.id = discussion_bans.challenge_id AND
            c.creator_id = auth.uid ()
    )
);

-- Grant necessary permissions
GRANT
SELECT
,
    INSERT,
UPDATE ON public.discussion_posts TO authenticated;

GRANT
SELECT
,
    INSERT,
UPDATE ON public.discussion_replies TO authenticated;

GRANT
SELECT
,
    INSERT,
UPDATE,
DELETE ON public.discussion_moderators TO authenticated;

GRANT
SELECT
,
    INSERT,
UPDATE,
DELETE ON public.discussion_bans TO authenticated;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_discussion_posts_challenge_author ON public.discussion_posts (challenge_id, author_id);

CREATE INDEX IF NOT EXISTS idx_discussion_replies_post_author ON public.discussion_replies (post_id, author_id);

CREATE INDEX IF NOT EXISTS idx_discussion_bans_challenge_user_active ON public.discussion_bans (challenge_id, user_id, is_active);

CREATE INDEX IF NOT EXISTS idx_discussion_moderators_challenge_user ON public.discussion_moderators (challenge_id, user_id);

-- migrate:down
-- Drop indexes
DROP INDEX IF EXISTS idx_discussion_posts_challenge_author;

DROP INDEX IF EXISTS idx_discussion_replies_post_author;

DROP INDEX IF EXISTS idx_discussion_bans_challenge_user_active;

DROP INDEX IF EXISTS idx_discussion_moderators_challenge_user;

-- Revoke permissions
REVOKE
SELECT
,
    INSERT,
UPDATE ON public.discussion_posts
FROM
    authenticated;

REVOKE
SELECT
,
    INSERT,
UPDATE ON public.discussion_replies
FROM
    authenticated;

REVOKE
SELECT
,
    INSERT,
UPDATE,
DELETE ON public.discussion_moderators
FROM
    authenticated;

REVOKE
SELECT
,
    INSERT,
UPDATE,
DELETE ON public.discussion_bans
FROM
    authenticated;

-- Drop Discussion Bans policies
DROP POLICY IF EXISTS "Moderators can read bans" ON public.discussion_bans;

DROP POLICY IF EXISTS "Moderators can manage bans" ON public.discussion_bans;

-- Drop Discussion Moderators policies
DROP POLICY IF EXISTS "Anyone can read moderators" ON public.discussion_moderators;

DROP POLICY IF EXISTS "Challenge creators can manage moderators" ON public.discussion_moderators;

-- Drop Discussion Replies policies
DROP POLICY IF EXISTS "Anyone can read discussion replies" ON public.discussion_replies;

DROP POLICY IF EXISTS "Challenge participants can create replies" ON public.discussion_replies;

DROP POLICY IF EXISTS "Authors and moderators can update replies" ON public.discussion_replies;

-- Drop Discussion Posts policies
DROP POLICY IF EXISTS "Anyone can read discussion posts" ON public.discussion_posts;

DROP POLICY IF EXISTS "Challenge participants can create posts" ON public.discussion_posts;

DROP POLICY IF EXISTS "Authors and moderators can update posts" ON public.discussion_posts;

DROP POLICY IF EXISTS "Authors and moderators can delete posts" ON public.discussion_posts;

-- Disable RLS on all discussion tables
ALTER TABLE public.discussion_posts DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.discussion_replies DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.discussion_moderators DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.discussion_bans DISABLE ROW LEVEL SECURITY;