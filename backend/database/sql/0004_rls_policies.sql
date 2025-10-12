-- migrate:up
-- Supabase/SQL Migrations: Row-Level Security (RLS)
-- Description: Defines all RLS policies for the application tables.
-- =============================================================================
-- Section 1: Enable RLS
-- -----------------------------------------------------------------------------
ALTER TABLE "public"."activities" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."activity_types" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."challenges" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."challenge_activity_types" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."challenge_participants" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."milestones" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."milestone_progress" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."teams" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."team_memberships" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

-- Section 2: Policy Definitions
-- -----------------------------------------------------------------------------
-- Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR
SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT
WITH
    CHECK (auth.uid () = id);

CREATE POLICY "Users can update their own profile." ON "public"."profiles" FOR
UPDATE USING (auth.uid () = id);

-- Teams
CREATE POLICY "Teams are publicly viewable." ON "public"."teams" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create teams." ON "public"."teams" FOR INSERT
WITH
    CHECK (auth.uid () = "creatorId");

CREATE POLICY "Team creators can update their teams." ON "public"."teams" FOR
UPDATE USING (auth.uid () = "creatorId");

CREATE POLICY "Team creators can delete their teams." ON "public"."teams" FOR DELETE USING (auth.uid () = "creatorId");

-- Team Memberships
CREATE POLICY "Team memberships are publicly viewable." ON "public"."team_memberships" FOR
SELECT
    USING (true);

CREATE POLICY "Users can join teams or be added by creators." ON "public"."team_memberships" FOR INSERT
WITH
    CHECK (
        (auth.uid () = "userId") OR
        (
            EXISTS (
                SELECT
                    1
                FROM
                    "public"."teams"
                WHERE
                    id = "teamId" AND
                    "creatorId" = auth.uid ()
            )
        )
    );

CREATE POLICY "Users can leave teams." ON "public"."team_memberships" FOR DELETE USING (auth.uid () = "userId");

CREATE POLICY "Team creators can remove members." ON "public"."team_memberships" FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."teams"
        WHERE
            id = "teamId" AND
            "creatorId" = auth.uid ()
    )
);

-- Challenges
CREATE POLICY "Challenges are publicly viewable." ON "public"."challenges" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create challenges." ON "public"."challenges" FOR INSERT
WITH
    CHECK (auth.uid () = "creatorId");

CREATE POLICY "Challenge creators can update their challenges." ON "public"."challenges" FOR
UPDATE USING (auth.uid () = "creatorId");

CREATE POLICY "Challenge creators can delete their challenges." ON "public"."challenges" FOR DELETE USING (auth.uid () = "creatorId");

-- Challenge Participants
CREATE POLICY "Challenge participants are publicly viewable." ON "public"."challenge_participants" FOR
SELECT
    USING (true);

CREATE POLICY "Users can join challenges individually." ON "public"."challenge_participants" FOR INSERT
WITH
    CHECK (
        auth.uid () = "userId" AND
        "teamId" IS NULL
    );

CREATE POLICY "Team members can join challenges for their team." ON "public"."challenge_participants" FOR INSERT
WITH
    CHECK (
        "teamId" IS NOT NULL AND
        "userId" IS NULL AND
        EXISTS (
            SELECT
                1
            FROM
                "public"."team_memberships" tm
            WHERE
                tm."teamId" = "challenge_participants"."teamId" AND
                tm."userId" = auth.uid ()
        )
    );

CREATE POLICY "Users can leave individual challenges." ON "public"."challenge_participants" FOR DELETE USING (
    auth.uid () = "userId" AND
    "teamId" IS NULL
);

CREATE POLICY "Team members can remove their team from challenges." ON "public"."challenge_participants" FOR DELETE USING (
    "teamId" IS NOT NULL AND
    "userId" IS NULL AND
    EXISTS (
        SELECT
            1
        FROM
            "public"."team_memberships" tm
        WHERE
            tm."teamId" = "challenge_participants"."teamId" AND
            tm."userId" = auth.uid ()
    )
);

-- Activities
CREATE POLICY "Activities are publicly viewable." ON "public"."activities" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can log activities." ON "public"."activities" FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."challenge_participants"
        WHERE
            id = "participantId" AND
            "userId" = auth.uid ()
    )
);

-- Posts
CREATE POLICY "Posts are publicly viewable." ON "public"."posts" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can create, update, and delete posts." ON "public"."posts" FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."challenge_participants"
        WHERE
            id = "participantId" AND
            "userId" = auth.uid ()
    )
);

-- Comments
CREATE POLICY "Comments are publicly viewable." ON "public"."comments" FOR
SELECT
    USING (true);

CREATE POLICY "Users can create comments." ON "public"."comments" FOR INSERT
WITH
    CHECK (auth.uid () = "authorId");

CREATE POLICY "Users can update their own comments." ON "public"."comments" FOR
UPDATE USING (auth.uid () = "authorId");

CREATE POLICY "Users can delete their own comments." ON "public"."comments" FOR DELETE USING (auth.uid () = "authorId");

-- Activity Types
CREATE POLICY "Activity types are publicly viewable." ON "public"."activity_types" FOR
SELECT
    USING (true);

CREATE POLICY "System can manage activity types." ON "public"."activity_types" FOR ALL USING (true)
WITH
    CHECK (true);

-- Challenge Activity Types
CREATE POLICY "Challenge activity types are publicly viewable." ON "public"."challenge_activity_types" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge creators can manage activity types." ON "public"."challenge_activity_types" FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "public"."challenges"
            WHERE
                id = "challengeId" AND
                "creatorId" = auth.uid ()
        )
    );

CREATE POLICY "Challenge creators can update activity types." ON "public"."challenge_activity_types" FOR
UPDATE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."challenges"
        WHERE
            id = "challengeId" AND
            "creatorId" = auth.uid ()
    )
);

CREATE POLICY "Challenge creators can delete activity types." ON "public"."challenge_activity_types" FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."challenges"
        WHERE
            id = "challengeId" AND
            "creatorId" = auth.uid ()
    )
);

-- Milestones
CREATE POLICY "Milestones are publicly viewable." ON "public"."milestones" FOR
SELECT
    USING (true);

CREATE POLICY "Challenge creators can create milestones." ON "public"."milestones" FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "public"."challenges"
            WHERE
                id = "challengeId" AND
                "creatorId" = auth.uid ()
        )
    );

CREATE POLICY "Challenge creators can update milestones." ON "public"."milestones" FOR
UPDATE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."challenges"
        WHERE
            id = "challengeId" AND
            "creatorId" = auth.uid ()
    )
);

CREATE POLICY "Challenge creators can delete milestones." ON "public"."milestones" FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."challenges"
        WHERE
            id = "challengeId" AND
            "creatorId" = auth.uid ()
    )
);

-- Milestone Progress
CREATE POLICY "Milestone progress is publicly viewable." ON "public"."milestone_progress" FOR
SELECT
    USING (true);

CREATE POLICY "Participants can create their milestone progress." ON "public"."milestone_progress" FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                "public"."challenge_participants"
            WHERE
                id = "participantId" AND
                "userId" = auth.uid ()
        )
    );

CREATE POLICY "Participants can update their milestone progress." ON "public"."milestone_progress" FOR
UPDATE USING (
    EXISTS (
        SELECT
            1
        FROM
            "public"."challenge_participants"
        WHERE
            id = "participantId" AND
            "userId" = auth.uid ()
    )
);

CREATE POLICY "System can manage milestone progress." ON "public"."milestone_progress" FOR ALL USING (true)
WITH
    CHECK (true);

-- Service role bypass
CREATE POLICY "Service role bypass for challenges." ON "public"."challenges" FOR ALL USING (
    current_setting('request.jwt.claims', true)::json ->> 'role' = 'service_role'
)
WITH
    CHECK (
        current_setting('request.jwt.claims', true)::json ->> 'role' = 'service_role'
    );

-- migrate:down
-- Drop all policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON "public"."profiles";

DROP POLICY IF EXISTS "Users can insert their own profile." ON "public"."profiles";

DROP POLICY IF EXISTS "Users can update their own profile." ON "public"."profiles";

DROP POLICY IF EXISTS "Teams are publicly viewable." ON "public"."teams";

DROP POLICY IF EXISTS "Users can create teams." ON "public"."teams";

DROP POLICY IF EXISTS "Team creators can update their teams." ON "public"."teams";

DROP POLICY IF EXISTS "Team creators can delete their teams." ON "public"."teams";

DROP POLICY IF EXISTS "Team memberships are publicly viewable." ON "public"."team_memberships";

DROP POLICY IF EXISTS "Users can join teams or be added by creators." ON "public"."team_memberships";

DROP POLICY IF EXISTS "Users can leave teams." ON "public"."team_memberships";

DROP POLICY IF EXISTS "Team creators can remove members." ON "public"."team_memberships";

DROP POLICY IF EXISTS "Challenges are publicly viewable." ON "public"."challenges";

DROP POLICY IF EXISTS "Users can create challenges." ON "public"."challenges";

DROP POLICY IF EXISTS "Challenge creators can update their challenges." ON "public"."challenges";

DROP POLICY IF EXISTS "Challenge creators can delete their challenges." ON "public"."challenges";

DROP POLICY IF EXISTS "Challenge participants are publicly viewable." ON "public"."challenge_participants";

DROP POLICY IF EXISTS "Users can join challenges individually." ON "public"."challenge_participants";

DROP POLICY IF EXISTS "Team members can join challenges for their team." ON "public"."challenge_participants";

DROP POLICY IF EXISTS "Users can leave individual challenges." ON "public"."challenge_participants";

DROP POLICY IF EXISTS "Team members can remove their team from challenges." ON "public"."challenge_participants";

DROP POLICY IF EXISTS "Activities are publicly viewable." ON "public"."activities";

DROP POLICY IF EXISTS "Challenge participants can log activities." ON "public"."activities";

DROP POLICY IF EXISTS "Posts are publicly viewable." ON "public"."posts";

DROP POLICY IF EXISTS "Challenge participants can create, update, and delete posts." ON "public"."posts";

DROP POLICY IF EXISTS "Comments are publicly viewable." ON "public"."comments";

DROP POLICY IF EXISTS "Users can create comments." ON "public"."comments";

DROP POLICY IF EXISTS "Users can update their own comments." ON "public"."comments";

DROP POLICY IF EXISTS "Users can delete their own comments." ON "public"."comments";

DROP POLICY IF EXISTS "Activity types are publicly viewable." ON "public"."activity_types";

DROP POLICY IF EXISTS "System can manage activity types." ON "public"."activity_types";

DROP POLICY IF EXISTS "Challenge activity types are publicly viewable." ON "public"."challenge_activity_types";

DROP POLICY IF EXISTS "Challenge creators can manage activity types." ON "public"."challenge_activity_types";

DROP POLICY IF EXISTS "Challenge creators can update activity types." ON "public"."challenge_activity_types";

DROP POLICY IF EXISTS "Challenge creators can delete activity types." ON "public"."challenge_activity_types";

DROP POLICY IF EXISTS "Milestones are publicly viewable." ON "public"."milestones";

DROP POLICY IF EXISTS "Challenge creators can create milestones." ON "public"."milestones";

DROP POLICY IF EXISTS "Challenge creators can update milestones." ON "public"."milestones";

DROP POLICY IF EXISTS "Challenge creators can delete milestones." ON "public"."milestones";

DROP POLICY IF EXISTS "Milestone progress is publicly viewable." ON "public"."milestone_progress";

DROP POLICY IF EXISTS "Participants can create their milestone progress." ON "public"."milestone_progress";

DROP POLICY IF EXISTS "Participants can update their milestone progress." ON "public"."milestone_progress";

DROP POLICY IF EXISTS "System can manage milestone progress." ON "public"."milestone_progress";

DROP POLICY IF EXISTS "Service role bypass for challenges." ON "public"."challenges";

-- Disable RLS
ALTER TABLE "public"."activities" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."activity_types" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."challenges" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."challenge_activity_types" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."challenge_participants" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."comments" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."milestones" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."milestone_progress" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."posts" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."teams" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."team_memberships" DISABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" DISABLE ROW LEVEL SECURITY;