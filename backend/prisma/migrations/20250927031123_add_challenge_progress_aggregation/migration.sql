-- CreateTable
CREATE TABLE "challenge_progress" (
    "id" UUID NOT NULL,
    "challengeId" UUID NOT NULL,
    "participantId" UUID NOT NULL,
    "activityTypeId" UUID NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "activityCount" INTEGER NOT NULL DEFAULT 0,
    "averageValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "bestValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastActivityDate" DATE,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "challenge_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_challenge_progress_challenge_activity" ON "challenge_progress"("challengeId", "activityTypeId");

-- CreateIndex
CREATE INDEX "idx_challenge_progress_participant_challenge" ON "challenge_progress"("participantId", "challengeId");

-- CreateIndex
CREATE INDEX "idx_challenge_progress_leaderboard" ON "challenge_progress"("challengeId", "totalValue");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_progress_challengeId_participantId_activityTypeId_key" ON "challenge_progress"("challengeId", "participantId", "activityTypeId");

-- AddForeignKey
ALTER TABLE "challenge_progress" ADD CONSTRAINT "challenge_progress_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_progress" ADD CONSTRAINT "challenge_progress_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "ChallengeParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_progress" ADD CONSTRAINT "challenge_progress_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
