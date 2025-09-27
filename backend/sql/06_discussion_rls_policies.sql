-- Row Level Security policies for Discussion tables
-- Run this in your Supabase SQL editor
-- Enable RLS on all discussion tables
ALTER TABLE
    discussion_posts ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    discussion_replies ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    discussion_moderators ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    discussion_bans ENABLE ROW LEVEL SECURITY;

-- Discussion Posts policies
-- Allow anyone to read posts
CREATE POLICY "Anyone can read discussion posts" ON discussion_posts FOR
SELECT
    USING (true);

-- Allow challenge participants to create posts
CREATE POLICY "Challenge participants can create posts" ON discussion_posts FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "ChallengeParticipant" cp
            WHERE
                cp."challengeId" = discussion_posts."challengeId"
                AND cp."userId" = auth.uid()
        )
        AND NOT EXISTS (
            SELECT
                1
            FROM
                discussion_bans db
            WHERE
                db."challengeId" = discussion_posts."challengeId"
                AND db."userId" = auth.uid()
                AND db."isActive" = true
                AND (
                    db."expiresAt" IS NULL
                    OR db."expiresAt" > NOW()
                )
        )
    );

-- Allow authors and moderators to update posts
CREATE POLICY "Authors and moderators can update posts" ON discussion_posts FOR
UPDATE
    USING (
        "authorId" = auth.uid()
        OR EXISTS (
            SELECT
                1
            FROM
                discussion_moderators dm
            WHERE
                dm."challengeId" = discussion_posts."challengeId"
                AND dm."userId" = auth.uid()
        )
        OR EXISTS (
            SELECT
                1
            FROM
                "Challenge" c
            WHERE
                c.id = discussion_posts."challengeId"
                AND c."creatorId" = auth.uid()
        )
    );

-- Allow authors and moderators to delete posts (soft delete)
CREATE POLICY "Authors and moderators can delete posts" ON discussion_posts FOR
UPDATE
    USING (
        "authorId" = auth.uid()
        OR EXISTS (
            SELECT
                1
            FROM
                discussion_moderators dm
            WHERE
                dm."challengeId" = discussion_posts."challengeId"
                AND dm."userId" = auth.uid()
        )
        OR EXISTS (
            SELECT
                1
            FROM
                "Challenge" c
            WHERE
                c.id = discussion_posts."challengeId"
                AND c."creatorId" = auth.uid()
        )
    );

-- Discussion Replies policies
-- Allow anyone to read replies
CREATE POLICY "Anyone can read discussion replies" ON discussion_replies FOR
SELECT
    USING (true);

-- Allow challenge participants to create replies
CREATE POLICY "Challenge participants can create replies" ON discussion_replies FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM
                discussion_posts dp
                JOIN "ChallengeParticipant" cp ON cp."challengeId" = dp."challengeId"
            WHERE
                dp.id = discussion_replies."postId"
                AND cp."userId" = auth.uid()
        )
        AND NOT EXISTS (
            SELECT
                1
            FROM
                discussion_posts dp
                JOIN discussion_bans db ON db."challengeId" = dp."challengeId"
            WHERE
                dp.id = discussion_replies."postId"
                AND db."userId" = auth.uid()
                AND db."isActive" = true
                AND (
                    db."expiresAt" IS NULL
                    OR db."expiresAt" > NOW()
                )
        )
    );

-- Allow authors and moderators to update replies
CREATE POLICY "Authors and moderators can update replies" ON discussion_replies FOR
UPDATE
    USING (
        "authorId" = auth.uid()
        OR EXISTS (
            SELECT
                1
            FROM
                discussion_posts dp
                JOIN discussion_moderators dm ON dm."challengeId" = dp."challengeId"
            WHERE
                dp.id = discussion_replies."postId"
                AND dm."userId" = auth.uid()
        )
        OR EXISTS (
            SELECT
                1
            FROM
                discussion_posts dp
                JOIN "Challenge" c ON c.id = dp."challengeId"
            WHERE
                dp.id = discussion_replies."postId"
                AND c."creatorId" = auth.uid()
        )
    );

-- Discussion Moderators policies
-- Allow anyone to read moderators (for permission checking)
CREATE POLICY "Anyone can read moderators" ON discussion_moderators FOR
SELECT
    USING (true);

-- Only challenge creators can manage moderators
CREATE POLICY "Challenge creators can manage moderators" ON discussion_moderators FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            "Challenge" c
        WHERE
            c.id = discussion_moderators."challengeId"
            AND c."creatorId" = auth.uid()
    )
);

-- Discussion Bans policies
-- Allow moderators and challenge creators to read bans
CREATE POLICY "Moderators can read bans" ON discussion_bans FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                discussion_moderators dm
            WHERE
                dm."challengeId" = discussion_bans."challengeId"
                AND dm."userId" = auth.uid()
        )
        OR EXISTS (
            SELECT
                1
            FROM
                "Challenge" c
            WHERE
                c.id = discussion_bans."challengeId"
                AND c."creatorId" = auth.uid()
        )
    );

-- Allow moderators and challenge creators to manage bans
CREATE POLICY "Moderators can manage bans" ON discussion_bans FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            discussion_moderators dm
        WHERE
            dm."challengeId" = discussion_bans."challengeId"
            AND dm."userId" = auth.uid()
            AND dm.role = 'ADMIN'
    )
    OR EXISTS (
        SELECT
            1
        FROM
            "Challenge" c
        WHERE
            c.id = discussion_bans."challengeId"
            AND c."creatorId" = auth.uid()
    )
);

-- Grant necessary permissions to authenticated users
GRANT
SELECT
,
INSERT
,
UPDATE
    ON discussion_posts TO authenticated;

GRANT
SELECT
,
INSERT
,
UPDATE
    ON discussion_replies TO authenticated;

GRANT
SELECT
,
INSERT
,
UPDATE
,
    DELETE ON discussion_moderators TO authenticated;

GRANT
SELECT
,
INSERT
,
UPDATE
,
    DELETE ON discussion_bans TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_discussion_posts_challenge_author ON discussion_posts("challengeId", "authorId");

CREATE INDEX IF NOT EXISTS idx_discussion_replies_post_author ON discussion_replies("postId", "authorId");

CREATE INDEX IF NOT EXISTS idx_discussion_bans_challenge_user_active ON discussion_bans("challengeId", "userId", "isActive");

CREATE INDEX IF NOT EXISTS idx_discussion_moderators_challenge_user ON discussion_moderators("challengeId", "userId");