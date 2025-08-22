/*
  Warnings:

  - Added the required column `activityType` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activityType` to the `Milestone` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('ACTIVE', 'CLOSED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "activityType" TEXT NOT NULL,
ADD COLUMN     "distance" DOUBLE PRECISION,
ADD COLUMN     "duration" INTEGER;

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "activityTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "maxTeamSize" INTEGER,
ADD COLUMN     "participantCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ChallengeStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "activityType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "maxMembers" INTEGER,
ADD COLUMN     "memberCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sportsTypes" TEXT[];

-- CreateIndex
CREATE INDEX "idx_challenge_creator_status" ON "Challenge"("creatorId", "status");

-- CreateIndex
CREATE INDEX "idx_challenge_status" ON "Challenge"("status");
