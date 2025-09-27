-- Supabase/SQL Migrations: Challenge Progress Aggregation
-- Description: A real-time aggregation system for challenge activities.
-- It uses triggers to maintain the `challenge_progress` summary table.
-- =============================================================================
-- Section 1: Functions
-- Core logic for updating, reversing, and rebuilding progress data.
-- -----------------------------------------------------------------------------
-- Upserts progress data when an activity is inserted or updated.
CREATE
OR REPLACE FUNCTION public.update_challenge_progress() RETURNS TRIGGER LANGUAGE plpgsql AS $$ DECLARE v_challenge_id UUID;

v_participant_id UUID;

v_activity_type_id UUID;

v_value FLOAT;

v_date DATE;

BEGIN IF (TG_OP = 'UPDATE') THEN -- Reverse the old values before applying the new ones.
PERFORM public.reverse_challenge_progress(
    OLD."challengeId",
    OLD."participantId",
    OLD."activityTypeId",
    OLD.value
);

END IF;

-- Get values from the new or updated row.
v_challenge_id := NEW."challengeId";

v_participant_id := NEW."participantId";

v_activity_type_id := NEW."activityTypeId";

v_value := NEW.value;

v_date := NEW.date;

-- Perform the UPSERT.
INSERT INTO
    public.challenge_progress (
        "challengeId",
        "participantId",
        "activityTypeId",
        "totalValue",
        "activityCount",
        "bestValue",
        "lastActivityDate"
    )
VALUES
    (
        v_challenge_id,
        v_participant_id,
        v_activity_type_id,
        v_value,
        1,
        v_value,
        v_date
    ) ON CONFLICT ("challengeId", "participantId", "activityTypeId") DO
UPDATE
SET
    "totalValue" = challenge_progress."totalValue" + EXCLUDED."totalValue",
    "activityCount" = challenge_progress."activityCount" + 1,
    "bestValue" = GREATEST(
        challenge_progress."bestValue",
        EXCLUDED."bestValue"
    ),
    "lastActivityDate" = GREATEST(
        challenge_progress."lastActivityDate",
        EXCLUDED."lastActivityDate"
    ),
    "updatedAt" = NOW();

RETURN NEW;

END;

$$;

-- Reverses progress data when an activity is updated or deleted.
CREATE
OR REPLACE FUNCTION public.reverse_challenge_progress(
    p_challenge_id UUID,
    p_participant_id UUID,
    p_activity_type_id UUID,
    p_value FLOAT
) RETURNS VOID LANGUAGE plpgsql AS $$ DECLARE v_new_count INT;

BEGIN
UPDATE
    public.challenge_progress
SET
    "totalValue" = "totalValue" - p_value,
    "activityCount" = "activityCount" - 1,
    "updatedAt" = NOW()
WHERE
    "challengeId" = p_challenge_id
    AND "participantId" = p_participant_id
    AND "activityTypeId" = p_activity_type_id RETURNING "activityCount" INTO v_new_count;

-- If no activities are left, delete the summary row.
IF v_new_count <= 0 THEN
DELETE FROM
    public.challenge_progress
WHERE
    "challengeId" = p_challenge_id
    AND "participantId" = p_participant_id
    AND "activityTypeId" = p_activity_type_id;

ELSE -- Recalculate bestValue (this is the expensive but necessary part).
UPDATE
    public.challenge_progress
SET
    "bestValue" = (
        SELECT
            MAX(value)
        FROM
            "public"."Activity"
        WHERE
            "challengeId" = p_challenge_id
            AND "participantId" = p_participant_id
            AND "activityTypeId" = p_activity_type_id
    )
WHERE
    "challengeId" = p_challenge_id
    AND "participantId" = p_participant_id
    AND "activityTypeId" = p_activity_type_id;

END IF;

END;

$$;

-- Handles the DELETE trigger on the Activity table.
CREATE
OR REPLACE FUNCTION public.handle_activity_delete() RETURNS TRIGGER LANGUAGE plpgsql AS $$ BEGIN PERFORM public.reverse_challenge_progress(
    OLD."challengeId",
    OLD."participantId",
    OLD."activityTypeId",
    OLD.value
);

RETURN OLD;

END;

$$;

-- Function to rebuild progress data (for maintenance/repair).
CREATE
OR REPLACE FUNCTION public.rebuild_challenge_progress(p_challenge_id UUID DEFAULT NULL) RETURNS VOID LANGUAGE plpgsql AS $$ BEGIN -- Clear existing progress data for the specific challenge or all.
IF p_challenge_id IS NOT NULL THEN
DELETE FROM
    public.challenge_progress
WHERE
    "challengeId" = p_challenge_id;

ELSE TRUNCATE TABLE public.challenge_progress;

END IF;

-- Rebuild from Activity data.
INSERT INTO
    public.challenge_progress (
        id,
        "challengeId",
        "participantId",
        "activityTypeId",
        "totalValue",
        "activityCount",
        "bestValue",
        "lastActivityDate",
        "createdAt",
        "updatedAt"
    )
SELECT
    gen_random_uuid(),
    a."challengeId",
    a."participantId",
    a."activityTypeId",
    SUM(a.value),
    COUNT(*) :: INT,
    MAX(a.value),
    MAX(a.date),
    NOW(),
    NOW()
FROM
    "public"."Activity" a
WHERE
    (
        p_challenge_id IS NULL
        OR a."challengeId" = p_challenge_id
    )
    AND a."challengeId" IS NOT NULL
    AND a."participantId" IS NOT NULL
    AND a."activityTypeId" IS NOT NULL
GROUP BY
    a."challengeId",
    a."participantId",
    a."activityTypeId";

END;

$$;

-- Section 2: Triggers & Indexes
-- Connects functions to table events and adds performance indexes.
-- -----------------------------------------------------------------------------
-- Drop existing triggers to ensure a clean slate.
DROP TRIGGER IF EXISTS trg_activity_progress_upsert ON "public"."Activity";

DROP TRIGGER IF EXISTS trg_activity_progress_delete ON "public"."Activity";

-- Trigger for INSERT or UPDATE on the Activity table.
CREATE TRIGGER trg_activity_progress_upsert
AFTER
INSERT
    OR
UPDATE
    ON "public"."Activity" FOR EACH ROW EXECUTE FUNCTION public.update_challenge_progress();

-- Trigger for DELETE on the Activity table.
CREATE TRIGGER trg_activity_progress_delete
AFTER
    DELETE ON "public"."Activity" FOR EACH ROW EXECUTE FUNCTION public.handle_activity_delete();

-- Index to optimize trigger performance.
CREATE INDEX IF NOT EXISTS idx_activity_challenge_participant_type ON "public"."Activity"("challengeId", "participantId", "activityTypeId");

-- Section 3: Documentation
-- Add helpful comments for the aggregation system.
-- -----------------------------------------------------------------------------
COMMENT ON TABLE public.challenge_progress IS 'Aggregated activity progress per challenge, participant, and activity type. Automatically maintained by triggers.';

COMMENT ON FUNCTION public.update_challenge_progress() IS 'Trigger function to update challenge progress aggregations. Uses UPSERT for concurrency safety.';

COMMENT ON FUNCTION public.rebuild_challenge_progress(UUID) IS 'Maintenance function to rebuild progress data from scratch. Use when data integrity issues are suspected.';