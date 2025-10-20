-- migrate:up
-- Description: Implements the workout ecosystem RLS policies for workout_programs, user_follows, and updates the workouts table policies.

-- 1. Enable RLS for new tables
ALTER TABLE public.workout_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

-- 2. Create policies for workout_programs
CREATE POLICY "Users can view workout_programs based on visibility." ON public.workout_programs
  FOR SELECT
  USING (
    (visibility = 'PUBLIC') OR
    (creator_id = auth.uid()) OR
    (visibility = 'FOLLOWERS_ONLY' AND EXISTS (
      SELECT 1 FROM public.user_follows
      WHERE follower_id = auth.uid() AND following_id = creator_id
    ))
  );

CREATE POLICY "Users can create, update, and delete their own workout_programs." ON public.workout_programs
  FOR ALL
  USING ( creator_id = auth.uid() )
  WITH CHECK ( creator_id = auth.uid() );

-- 3. Create policies for user_follows
CREATE POLICY "Users can view all user_follows." ON public.user_follows
  FOR SELECT
  USING (true);

CREATE POLICY "Users can follow other users." ON public.user_follows
  FOR INSERT
  WITH CHECK ( follower_id = auth.uid() );

CREATE POLICY "Users can unfollow other users." ON public.user_follows
  FOR DELETE
  USING ( follower_id = auth.uid() );

-- 4. Drop the existing SELECT policy for workouts.
DROP POLICY IF EXISTS "Users can view their own or team workouts." ON public.workouts;

-- 5. Create the new SELECT policy for workouts with visibility rules.
CREATE POLICY "Users can view workouts based on visibility." ON public.workouts
  FOR SELECT
  USING (
    (visibility = 'PUBLIC') OR
    (creator_id = auth.uid()) OR
    (team_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.team_memberships tm
      WHERE tm.team_id = workouts.team_id AND tm.user_id = auth.uid()
    )) OR
    (visibility = 'FOLLOWERS_ONLY' AND EXISTS (
      SELECT 1 FROM public.user_follows
      WHERE follower_id = auth.uid() AND following_id = workouts.creator_id
    ))
  );

-- migrate:down
-- Description: Reverts the workout ecosystem RLS policies.

-- 1. Drop new policies
DROP POLICY IF EXISTS "Users can view workouts based on visibility." ON public.workouts;
DROP POLICY IF EXISTS "Users can unfollow other users." ON public.user_follows;
DROP POLICY IF EXISTS "Users can follow other users." ON public.user_follows;
DROP POLICY IF EXISTS "Users can view all user_follows." ON public.user_follows;
DROP POLICY IF EXISTS "Users can create, update, and delete their own workout_programs." ON public.workout_programs;
DROP POLICY IF EXISTS "Users can view workout_programs based on visibility." ON public.workout_programs;

-- 2. Re-create original workouts SELECT policy
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

-- 3. Disable RLS for new tables
ALTER TABLE public.user_follows DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_programs DISABLE ROW LEVEL SECURITY;