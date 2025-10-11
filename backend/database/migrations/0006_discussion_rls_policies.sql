-- migrate:up
-- Row Level Security policies for Discussion tables
-- =============================================================================

-- Enable RLS on all discussion tables
ALTER TABLE "public"."discussion_posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."discussion_replies" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."discussion_moderators" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."discussion_bans" ENABLE ROW LEVEL SECURITY;

-- Discussion Posts policies
CREATE POLICY "Anyone can read discussion posts" ON "public"."discussion_posts" FOR SELECT USING (true);
CREATE POLICY "Challenge participants can create posts" ON "public"."discussion_posts" FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM "public"."challenge_participants" cp WHERE cp."challengeId" = "discussion_posts"."challengeId" AND cp."userId" = auth.uid()) AND NOT EXISTS (SELECT 1 FROM "public"."discussion_bans" db WHERE db."challengeId" = "discussion_posts"."challengeId" AND db."userId" = auth.uid() AND db."isActive" = true AND (db."expiresAt" IS NULL OR db."expiresAt" > NOW())));
CREATE POLICY "Authors and moderators can update posts" ON "public"."discussion_posts" FOR UPDATE USING ("authorId" = auth.uid() OR EXISTS (SELECT 1 FROM "public"."discussion_moderators" dm WHERE dm."challengeId" = "discussion_posts"."challengeId" AND dm."userId" = auth.uid()) OR EXISTS (SELECT 1 FROM "public"."challenges" c WHERE c.id = "discussion_posts"."challengeId" AND c."creatorId" = auth.uid()));
CREATE POLICY "Authors and moderators can delete posts" ON "public"."discussion_posts" FOR UPDATE USING ("authorId" = auth.uid() OR EXISTS (SELECT 1 FROM "public"."discussion_moderators" dm WHERE dm."challengeId" = "discussion_posts"."challengeId" AND dm."userId" = auth.uid()) OR EXISTS (SELECT 1 FROM "public"."challenges" c WHERE c.id = "discussion_posts"."challengeId" AND c."creatorId" = auth.uid()));

-- Discussion Replies policies
CREATE POLICY "Anyone can read discussion replies" ON "public"."discussion_replies" FOR SELECT USING (true);
CREATE POLICY "Challenge participants can create replies" ON "public"."discussion_replies" FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM "public"."discussion_posts" dp JOIN "public"."challenge_participants" cp ON cp."challengeId" = dp."challengeId" WHERE dp.id = "discussion_replies"."postId" AND cp."userId" = auth.uid()) AND NOT EXISTS (SELECT 1 FROM "public"."discussion_posts" dp JOIN "public"."discussion_bans" db ON db."challengeId" = dp."challengeId" WHERE dp.id = "discussion_replies"."postId" AND db."userId" = auth.uid() AND db."isActive" = true AND (db."expiresAt" IS NULL OR db."expiresAt" > NOW())));
CREATE POLICY "Authors and moderators can update replies" ON "public"."discussion_replies" FOR UPDATE USING ("authorId" = auth.uid() OR EXISTS (SELECT 1 FROM "public"."discussion_posts" dp JOIN "public"."discussion_moderators" dm ON dm."challengeId" = dp."challengeId" WHERE dp.id = "discussion_replies"."postId" AND dm."userId" = auth.uid()) OR EXISTS (SELECT 1 FROM "public"."discussion_posts" dp JOIN "public"."challenges" c ON c.id = dp."challengeId" WHERE dp.id = "discussion_replies"."postId" AND c."creatorId" = auth.uid()));

-- Discussion Moderators policies
CREATE POLICY "Anyone can read moderators" ON "public"."discussion_moderators" FOR SELECT USING (true);
CREATE POLICY "Challenge creators can manage moderators" ON "public"."discussion_moderators" FOR ALL USING (EXISTS (SELECT 1 FROM "public"."challenges" c WHERE c.id = "discussion_moderators"."challengeId" AND c."creatorId" = auth.uid()));

-- Discussion Bans policies
CREATE POLICY "Moderators can read bans" ON "public"."discussion_bans" FOR SELECT USING (EXISTS (SELECT 1 FROM "public"."discussion_moderators" dm WHERE dm."challengeId" = "discussion_bans"."challengeId" AND dm."userId" = auth.uid()) OR EXISTS (SELECT 1 FROM "public"."challenges" c WHERE c.id = "discussion_bans"."challengeId" AND c."creatorId" = auth.uid()));
CREATE POLICY "Moderators can manage bans" ON "public"."discussion_bans" FOR ALL USING (EXISTS (SELECT 1 FROM "public"."discussion_moderators" dm WHERE dm."challengeId" = "discussion_bans"."challengeId" AND dm."userId" = auth.uid() AND dm.role = 'ADMIN') OR EXISTS (SELECT 1 FROM "public"."challenges" c WHERE c.id = "discussion_bans"."challengeId" AND c."creatorId" = auth.uid()));

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON "public"."discussion_posts" TO authenticated;
GRANT SELECT, INSERT, UPDATE ON "public"."discussion_replies" TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON "public"."discussion_moderators" TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON "public"."discussion_bans" TO authenticated;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_discussion_posts_challenge_author ON "public"."discussion_posts"("challengeId", "authorId");
CREATE INDEX IF NOT EXISTS idx_discussion_replies_post_author ON "public"."discussion_replies"("postId", "authorId");
CREATE INDEX IF NOT EXISTS idx_discussion_bans_challenge_user_active ON "public"."discussion_bans"("challengeId", "userId", "isActive");
CREATE INDEX IF NOT EXISTS idx_discussion_moderators_challenge_user ON "public"."discussion_moderators"("challengeId", "userId");

-- migrate:down

-- Drop indexes
DROP INDEX IF EXISTS idx_discussion_posts_challenge_author;
DROP INDEX IF EXISTS idx_discussion_replies_post_author;
DROP INDEX IF EXISTS idx_discussion_bans_challenge_user_active;
DROP INDEX IF EXISTS idx_discussion_moderators_challenge_user;

-- Revoke permissions
REVOKE SELECT, INSERT, UPDATE ON "public"."discussion_posts" FROM authenticated;
REVOKE SELECT, INSERT, UPDATE ON "public"."discussion_replies" FROM authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON "public"."discussion_moderators" FROM authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON "public"."discussion_bans" FROM authenticated;

-- Drop Discussion Bans policies
DROP POLICY IF EXISTS "Moderators can read bans" ON "public"."discussion_bans";
DROP POLICY IF EXISTS "Moderators can manage bans" ON "public"."discussion_bans";

-- Drop Discussion Moderators policies
DROP POLICY IF EXISTS "Anyone can read moderators" ON "public"."discussion_moderators";
DROP POLICY IF EXISTS "Challenge creators can manage moderators" ON "public"."discussion_moderators";

-- Drop Discussion Replies policies
DROP POLICY IF EXISTS "Anyone can read discussion replies" ON "public"."discussion_replies";
DROP POLICY IF EXISTS "Challenge participants can create replies" ON "public"."discussion_replies";
DROP POLICY IF EXISTS "Authors and moderators can update replies" ON "public"."discussion_replies";

-- Drop Discussion Posts policies
DROP POLICY IF EXISTS "Anyone can read discussion posts" ON "public"."discussion_posts";
DROP POLICY IF EXISTS "Challenge participants can create posts" ON "public"."discussion_posts";
DROP POLICY IF EXISTS "Authors and moderators can update posts" ON "public"."discussion_posts";
DROP POLICY IF EXISTS "Authors and moderators can delete posts" ON "public"."discussion_posts";

-- Disable RLS on all discussion tables
ALTER TABLE "public"."discussion_posts" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."discussion_replies" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."discussion_moderators" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."discussion_bans" DISABLE ROW LEVEL SECURITY;
