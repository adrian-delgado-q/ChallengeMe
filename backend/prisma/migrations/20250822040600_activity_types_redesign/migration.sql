/*
  Warnings:

  - You are about to drop the column `activityType` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `calories` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `pace` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `activityTypes` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `activityType` on the `Milestone` table. All the data in the column will be lost.
  - You are about to drop the column `valueType` on the `Milestone` table. All the data in the column will be lost.
  - Added the required column `activityTypeId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activityTypeId` to the `Milestone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "activityType",
DROP COLUMN "calories",
DROP COLUMN "distance",
DROP COLUMN "duration",
DROP COLUMN "pace",
DROP COLUMN "repetitions",
DROP COLUMN "sets",
DROP COLUMN "weight",
ADD COLUMN     "activityTypeId" UUID NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "activityTypes";

-- AlterTable
ALTER TABLE "Milestone" DROP COLUMN "activityType",
DROP COLUMN "valueType",
ADD COLUMN     "activityTypeId" UUID NOT NULL,
ALTER COLUMN "targetValue" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ChallengeActivityType" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "activityTypeId" UUID NOT NULL,

    CONSTRAINT "ChallengeActivityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityType" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "unitLabel" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeActivityType_challengeId_activityTypeId_key" ON "ChallengeActivityType"("challengeId", "activityTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityType_name_key" ON "ActivityType"("name");

-- AddForeignKey
ALTER TABLE "ChallengeActivityType" ADD CONSTRAINT "ChallengeActivityType_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeActivityType" ADD CONSTRAINT "ChallengeActivityType_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
