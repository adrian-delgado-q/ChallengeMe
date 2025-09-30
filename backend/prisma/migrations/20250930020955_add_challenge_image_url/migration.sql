-- CreateEnum
CREATE TYPE "ModeratorRole" AS ENUM ('MODERATOR', 'ADMIN');

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "accessCode" TEXT;

-- CreateTable
CREATE TABLE "discussion_posts" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyCount" INTEGER NOT NULL DEFAULT 0,
    "lastReplyAt" TIMESTAMPTZ(6),

    CONSTRAINT "discussion_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion_replies" (
    "id" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "parentId" UUID,
    "authorId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discussion_replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion_moderators" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "ModeratorRole" NOT NULL DEFAULT 'MODERATOR',
    "grantedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grantedById" UUID NOT NULL,

    CONSTRAINT "discussion_moderators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discussion_bans" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "reason" TEXT,
    "bannedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(6),
    "bannedById" UUID NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "discussion_bans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "discussion_posts_challengeId_createdAt_idx" ON "discussion_posts"("challengeId", "createdAt");

-- CreateIndex
CREATE INDEX "discussion_posts_challengeId_isPinned_createdAt_idx" ON "discussion_posts"("challengeId", "isPinned", "createdAt");

-- CreateIndex
CREATE INDEX "discussion_replies_postId_createdAt_idx" ON "discussion_replies"("postId", "createdAt");

-- CreateIndex
CREATE INDEX "discussion_replies_parentId_createdAt_idx" ON "discussion_replies"("parentId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "discussion_moderators_challengeId_userId_key" ON "discussion_moderators"("challengeId", "userId");

-- CreateIndex
CREATE INDEX "discussion_bans_challengeId_isActive_idx" ON "discussion_bans"("challengeId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "discussion_bans_challengeId_userId_isActive_key" ON "discussion_bans"("challengeId", "userId", "isActive");

-- AddForeignKey
ALTER TABLE "discussion_posts" ADD CONSTRAINT "discussion_posts_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_posts" ADD CONSTRAINT "discussion_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_replies" ADD CONSTRAINT "discussion_replies_postId_fkey" FOREIGN KEY ("postId") REFERENCES "discussion_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_replies" ADD CONSTRAINT "discussion_replies_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "discussion_replies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_replies" ADD CONSTRAINT "discussion_replies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_moderators" ADD CONSTRAINT "discussion_moderators_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_moderators" ADD CONSTRAINT "discussion_moderators_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_moderators" ADD CONSTRAINT "discussion_moderators_grantedById_fkey" FOREIGN KEY ("grantedById") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_bans" ADD CONSTRAINT "discussion_bans_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_bans" ADD CONSTRAINT "discussion_bans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discussion_bans" ADD CONSTRAINT "discussion_bans_bannedById_fkey" FOREIGN KEY ("bannedById") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
