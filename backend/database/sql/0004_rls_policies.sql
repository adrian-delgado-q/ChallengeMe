-- migrate:up
-- Supabase/SQL Migrations: Row-Level Security (RLS)
-- Description: Defines all RLS policies for the application tables.
-- =============================================================================
-- Section 1: Enable RLS
-- -----------------------------------------------------------------------------
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.challenge_activity_types ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.milestone_progress ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.team_memberships ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.workout_comments ENABLE ROW LEVEL SECURITY;

-- Section 2: Policy Definitions
-- -----------------------------------------------------------------------------
-- Profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR
SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT
WITH
    CHECK (auth.uid () = id);

CREATE POLICY "Users can update their own profile." ON public.profiles FOR
UPDATE USING (auth.uid () = id);

-- Teams
CREATE POLICY "Teams are publicly viewable." ON public.teams FOR
SELECT
    USING (true);

CREATE POLICY "Users can create teams." ON public.teams FOR INSERT
WITH
    CHECK (auth.uid () = creator_id);

CREATE POLICY "Team creators can update their teams." ON public.teams FOR
UPDATE USING (auth.uid () = creator_id);

CREATE POLICY "Team creators can delete their teams." ON public.teams FOR DELETE USING (auth.uid () = creator_id);

-- Team Memberships
CREATE POLICY "Team memberships are publicly viewable." ON public.team_memberships FOR
SELECT
    USING (true);

CREATE POLICY "Users can join teams or be added by creators." ON public.team_memberships FOR INSERT
WITH
    CHECK (
        (auth.uid () = user_id) OR
        (
            EXISTS (
                SELECT
                    1
                FROM
                    public.teams
                WHERE
                    id = team_id AND
                    creator_id = auth.uid ()
            )
        )
    );

CREATE POLICY "Users can leave teams." ON public.team_memberships FOR DELETE USING (auth.uid () = user_id);

CREATE POLICY "Team creators can remove members." ON public.team_memberships FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            public.teams
        WHERE
            id = team_id AND
            creator_id = auth.uid ()
    )
);

-- Challenges
CREATE POLICY "Challenges are publicly viewable." ON public.challenges FOR
SELECT
    USING (true);

CREATE POLICY "Users can create challenges." ON public.challenges FOR INSERT
WITH
    CHECK (auth.uid () = creator_id);

CREATE POLICY "Challenge creators can update their challenges." ON public.challenges FOR
UPDATE USING (auth.uid () = creator_id);

CREATE POLICY "Challenge creators can delete their challenges." ON public.challenges FOR DELETE USING (auth.uid () = creator_id);

-- Challenge Participants
CREATE POLICY "Challenge participants are publicly viewable." ON public.challenge_participants FOR
SELECT
    USING (true);

CREATE POLICY "Users can join challenges individually." ON public.challenge_participants FOR INSERT
WITH
    CHECK (
        auth.uid () = user_id AND
        team_id IS NULL
    );

CREATE POLICY "Team members can join challenges for their team." ON public.challenge_participants FOR INSERT
WITH
    CHECK (
        team_id IS NOT NULL AND
        user_id IS NULL AND
        EXISTS (
            SELECT
                1
            FROM
                public.team_memberships tm
            WHERE
                tm.team_id = challenge_participants.team_id AND
                tm.user_id = auth.uid ()
        )
    );

CREATE POLICY "Users can leave individual challenges." ON public.challenge_participants FOR DELETE USING (
    auth.uid () = user_id AND
    team_id IS NULL
);

CREATE POLICY "Team members can remove their team from challenges." ON public.challenge_participants FOR DELETE USING (
    team_id IS NOT NULL AND
    user_id IS NULL AND
    EXISTS (
        SELECT
            1
        FROM
            public.team_memberships tm
        WHERE
            tm.team_id = challenge_participants.team_id AND
            tm.user_id = auth.uid ()
    )
);

-- Activities
CREATE POLICY "Activities are publicly viewable." ON public.activities FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can log activities." ON public.activities FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            public.challenge_participants
        WHERE
            id = participant_id AND
            user_id = auth.uid ()
    )
);

-- Posts
CREATE POLICY "Posts are publicly viewable." ON public.posts FOR
SELECT
    USING (true);

CREATE POLICY "Challenge participants can create, update, and delete posts." ON public.posts FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            public.challenge_participants
        WHERE
            id = participant_id AND
            user_id = auth.uid ()
    )
);

-- Comments
CREATE POLICY "Comments are publicly viewable." ON public.comments FOR
SELECT
    USING (true);

CREATE POLICY "Users can create comments." ON public.comments FOR INSERT
WITH
    CHECK (auth.uid () = author_id);

CREATE POLICY "Users can update their own comments." ON public.comments FOR
UPDATE USING (auth.uid () = author_id);

CREATE POLICY "Users can delete their own comments." ON public.comments FOR DELETE USING (auth.uid () = author_id);

-- Activity Types
CREATE POLICY "Activity types are publicly viewable." ON public.activity_types FOR
SELECT
    USING (true);

CREATE POLICY "System can manage activity types." ON public.activity_types FOR ALL USING (true)
WITH
    CHECK (true);

-- Challenge Activity Types
CREATE POLICY "Challenge activity types are publicly viewable." ON public.challenge_activity_types FOR
SELECT
    USING (true);

CREATE POLICY "Challenge creators can manage activity types." ON public.challenge_activity_types FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                public.challenges
            WHERE
                id = challenge_id AND
                creator_id = auth.uid ()
        )
    );

CREATE POLICY "Challenge creators can update activity types." ON public.challenge_activity_types FOR
UPDATE USING (
    EXISTS (
        SELECT
            1
        FROM
            public.challenges
        WHERE
            id = challenge_id AND
            creator_id = auth.uid ()
    )
);

CREATE POLICY "Challenge creators can delete activity types." ON public.challenge_activity_types FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            public.challenges
        WHERE
            id = challenge_id AND
            creator_id = auth.uid ()
    )
);

-- Milestones
CREATE POLICY "Milestones are publicly viewable." ON public.milestones FOR
SELECT
    USING (true);

CREATE POLICY "Challenge creators can create milestones." ON public.milestones FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                public.challenges
            WHERE
                id = challenge_id AND
                creator_id = auth.uid ()
        )
    );

CREATE POLICY "Challenge creators can update milestones." ON public.milestones FOR
UPDATE USING (
    EXISTS (
        SELECT
            1
        FROM
            public.challenges
        WHERE
            id = challenge_id AND
            creator_id = auth.uid ()
    )
);

CREATE POLICY "Challenge creators can delete milestones." ON public.milestones FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            public.challenges
        WHERE
            id = challenge_id AND
            creator_id = auth.uid ()
    )
);

-- Milestone Progress
CREATE POLICY "Milestone progress is publicly viewable." ON public.milestone_progress FOR
SELECT
    USING (true);

CREATE POLICY "Participants can create their milestone progress." ON public.milestone_progress FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                public.challenge_participants
            WHERE
                id = participant_id AND
                user_id = auth.uid ()
        )
    );

CREATE POLICY "Participants can update their milestone progress." ON public.milestone_progress FOR
UPDATE USING (
    EXISTS (
        SELECT
            1
        FROM
            public.challenge_participants
        WHERE
            id = participant_id AND
            user_id = auth.uid ()
    )
);

CREATE POLICY "System can manage milestone progress." ON public.milestone_progress FOR ALL USING (true)
WITH
    CHECK (true);

-- Workouts
CREATE POLICY "Users can view their own or team workouts." ON public.workouts FOR
SELECT
    USING (
        (creator_id = auth.uid ()) OR
        (
            team_id IS NOT NULL AND
            EXISTS (
                SELECT
                    1
                FROM
                    public.team_memberships tm
                WHERE
                    tm.team_id = workouts.team_id AND
                    tm.user_id = auth.uid ()
            )
        )
    );

CREATE POLICY "Users can create workouts." ON public.workouts FOR INSERT
WITH
    CHECK (auth.uid () = creator_id);

CREATE POLICY "Users can update their own workouts." ON public.workouts FOR
UPDATE USING (auth.uid () = creator_id);

CREATE POLICY "Users can delete their own workouts." ON public.workouts FOR DELETE USING (auth.uid () = creator_id);

-- Workout Exercises
CREATE POLICY "Users can view exercises for accessible workouts." ON public.workout_exercises FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                public.workouts w
            WHERE
                w.id = workout_exercises.workout_id
        )
    );

CREATE POLICY "Workout creators can add exercises." ON public.workout_exercises FOR INSERT
WITH
    CHECK (
        EXISTS (
            SELECT
                1
            FROM
                public.workouts
            WHERE
                id = workout_id AND
                creator_id = auth.uid ()
        )
    );

CREATE POLICY "Workout creators can update exercises." ON public.workout_exercises FOR
UPDATE USING (
    EXISTS (
        SELECT
            1
        FROM
            public.workouts
        WHERE
            id = workout_id AND
            creator_id = auth.uid ()
    )
);

CREATE POLICY "Workout creators can delete exercises." ON public.workout_exercises FOR DELETE USING (
    EXISTS (
        SELECT
            1
        FROM
            public.workouts
        WHERE
            id = workout_id AND
            creator_id = auth.uid ()
    )
);

-- Workout Sessions
CREATE POLICY "Users can view their own workout sessions." ON public.workout_sessions FOR
SELECT
    USING (profile_id = auth.uid ());

CREATE POLICY "Users can create workout sessions for themselves." ON public.workout_sessions FOR INSERT
WITH
    CHECK (profile_id = auth.uid ());

CREATE POLICY "Users can update their own workout sessions." ON public.workout_sessions FOR
UPDATE USING (profile_id = auth.uid ());

CREATE POLICY "Users can delete their own workout sessions." ON public.workout_sessions FOR DELETE USING (profile_id = auth.uid ());

-- Workout Comments
CREATE POLICY "Users can view comments for accessible workouts." ON public.workout_comments FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                public.workouts w
            WHERE
                w.id = workout_comments.workout_id
        )
    );

CREATE POLICY "Users can create workout comments on accessible workouts." ON public.workout_comments FOR INSERT
WITH
    CHECK (
        (auth.uid () = author_id) AND
        (
            EXISTS (
                SELECT
                    1
                FROM
                    public.workouts w
                WHERE
                    w.id = workout_comments.workout_id
            )
        )
    );

CREATE POLICY "Users can update their own workout comments." ON public.workout_comments FOR
UPDATE USING (auth.uid () = author_id);

CREATE POLICY "Users can delete their own workout comments." ON public.workout_comments FOR DELETE USING (auth.uid () = author_id);

-- Service role bypass
CREATE POLICY "Service role bypass for challenges." ON public.challenges FOR ALL USING (
    current_setting('request.jwt.claims', true)::json ->> 'role' = 'service_role'
)
WITH
    CHECK (
        current_setting('request.jwt.claims', true)::json ->> 'role' = 'service_role'
    );

CREATE POLICY "Service role bypass for workouts." ON public.workouts FOR ALL USING (
    current_setting('request.jwt.claims', true)::json ->> 'role' = 'service_role'
)
WITH
    CHECK (
        current_setting('request.jwt.claims', true)::json ->> 'role' = 'service_role'
    );

-- migrate:down
-- Drop all policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;

DROP POLICY IF EXISTS "Teams are publicly viewable." ON public.teams;

DROP POLICY IF EXISTS "Users can create teams." ON public.teams;

DROP POLICY IF EXISTS "Team creators can update their teams." ON public.teams;

DROP POLICY IF EXISTS "Team creators can delete their teams." ON public.teams;

DROP POLICY IF EXISTS "Team memberships are publicly viewable." ON public.team_memberships;

DROP POLICY IF EXISTS "Users can join teams or be added by creators." ON public.team_memberships;

DROP POLICY IF EXISTS "Users can leave teams." ON public.team_memberships;

DROP POLICY IF EXISTS "Team creators can remove members." ON public.team_memberships;

DROP POLICY IF EXISTS "Challenges are publicly viewable." ON public.challenges;

DROP POLICY IF EXISTS "Users can create challenges." ON public.challenges;

DROP POLICY IF EXISTS "Challenge creators can update their challenges." ON public.challenges;

DROP POLICY IF EXISTS "Challenge creators can delete their challenges." ON public.challenges;

DROP POLICY IF EXISTS "Challenge participants are publicly viewable." ON public.challenge_participants;

DROP POLICY IF EXISTS "Users can join challenges individually." ON public.challenge_participants;

DROP POLICY IF EXISTS "Team members can join challenges for their team." ON public.challenge_participants;

DROP POLICY IF EXISTS "Users can leave individual challenges." ON public.challenge_participants;

DROP POLICY IF EXISTS "Team members can remove their team from challenges." ON public.challenge_participants;

DROP POLICY IF EXISTS "Activities are publicly viewable." ON public.activities;

DROP POLICY IF EXISTS "Challenge participants can log activities." ON public.activities;

DROP POLICY IF EXISTS "Posts are publicly viewable." ON public.posts;

DROP POLICY IF EXISTS "Challenge participants can create, update, and delete posts." ON public.posts;

DROP POLICY IF EXISTS "Comments are publicly viewable." ON public.comments;

DROP POLICY IF EXISTS "Users can create comments." ON public.comments;

DROP POLICY IF EXISTS "Users can update their own comments." ON public.comments;

DROP POLICY IF EXISTS "Users can delete their own comments." ON public.comments;

DROP POLICY IF EXISTS "Activity types are publicly viewable." ON public.activity_types;

DROP POLICY IF EXISTS "System can manage activity types." ON public.activity_types;

DROP POLICY IF EXISTS "Challenge activity types are publicly viewable." ON public.challenge_activity_types;

DROP POLICY IF EXISTS "Challenge creators can manage activity types." ON public.challenge_activity_types;

DROP POLICY IF EXISTS "Challenge creators can update activity types." ON public.challenge_activity_types;

DROP POLICY IF EXISTS "Challenge creators can delete activity types." ON public.challenge_activity_types;

DROP POLICY IF EXISTS "Milestones are publicly viewable." ON public.milestones;

DROP POLICY IF EXISTS "Challenge creators can create milestones." ON public.milestones;

DROP POLICY IF EXISTS "Challenge creators can update milestones." ON public.milestones;

DROP POLICY IF EXISTS "Challenge creators can delete milestones." ON public.milestones;

DROP POLICY IF EXISTS "Milestone progress is publicly viewable." ON public.milestone_progress;

DROP POLICY IF EXISTS "Participants can create their milestone progress." ON public.milestone_progress;

DROP POLICY IF EXISTS "Participants can update their milestone progress." ON public.milestone_progress;

DROP POLICY IF EXISTS "System can manage milestone progress." ON public.milestone_progress;

DROP POLICY IF EXISTS "Service role bypass for challenges." ON public.challenges;

DROP POLICY IF EXISTS "Service role bypass for workouts." ON public.workouts;

-- Workout Policies
DROP POLICY IF EXISTS "Users can view their own or team workouts." ON public.workouts;

DROP POLICY IF EXISTS "Users can create workouts." ON public.workouts;

DROP POLICY IF EXISTS "Users can update their own workouts." ON public.workouts;

DROP POLICY IF EXISTS "Users can delete their own workouts." ON public.workouts;

DROP POLICY IF EXISTS "Users can view exercises for accessible workouts." ON public.workout_exercises;

DROP POLICY IF EXISTS "Workout creators can add exercises." ON public.workout_exercises;

DROP POLICY IF EXISTS "Workout creators can update exercises." ON public.workout_exercises;

DROP POLICY IF EXISTS "Workout creators can delete exercises." ON public.workout_exercises;

DROP POLICY IF EXISTS "Users can view their own workout sessions." ON public.workout_sessions;

DROP POLICY IF EXISTS "Users can create workout sessions for themselves." ON public.workout_sessions;

DROP POLICY IF EXISTS "Users can update their own workout sessions." ON public.workout_sessions;

DROP POLICY IF EXISTS "Users can delete their own workout sessions." ON public.workout_sessions;

DROP POLICY IF EXISTS "Users can view comments for accessible workouts." ON public.workout_comments;

DROP POLICY IF EXISTS "Users can create workout comments on accessible workouts." ON public.workout_comments;

DROP POLICY IF EXISTS "Users can update their own workout comments." ON public.workout_comments;

DROP POLICY IF EXISTS "Users can delete their own workout comments." ON public.workout_comments;

-- Disable RLS
ALTER TABLE public.activities DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.activity_types DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.challenges DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.challenge_activity_types DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.challenge_participants DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.milestones DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.milestone_progress DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.teams DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.team_memberships DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.workouts DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.workout_exercises DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.workout_sessions DISABLE ROW LEVEL SECURITY;

ALTER TABLE public.workout_comments DISABLE ROW LEVEL SECURITY;