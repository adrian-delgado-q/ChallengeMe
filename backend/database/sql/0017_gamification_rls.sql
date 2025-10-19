-- migrate:up
-- Description: Defines all RLS policies for the new gamification tables.
-- =============================================================================

-- 1. Enable RLS on all new gamification tables
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.earned_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_masteries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_logs ENABLE ROW LEVEL SECURITY;

-- 2. Policies for Badge (The master list of all possible badges)
CREATE POLICY "Badges are publicly viewable."
    ON public.badges FOR SELECT
    USING (true);

CREATE POLICY "System can manage badges."
    ON public.badges FOR ALL
    USING (true) -- This should be restricted to a service_role in production
    WITH CHECK (true);

-- 3. Policies for EarnedBadge (A user's specific trophy)
CREATE POLICY "Earned badges are publicly viewable."
    ON public.earned_badges FOR SELECT
    USING (true);

CREATE POLICY "Users can manage their own earned badges."
    ON public.earned_badges FOR ALL
    USING ( auth.uid() = profile_id )
    WITH CHECK ( auth.uid() = profile_id );

-- 4. Policies for ActivityMastery (A user's mastery level)
CREATE POLICY "Activity mastery is publicly viewable."
    ON public.activity_masteries FOR SELECT
    USING (true);

CREATE POLICY "Users can manage their own activity mastery."
    ON public.activity_masteries FOR ALL
    USING ( auth.uid() = profile_id )
    WITH CHECK ( auth.uid() = profile_id );

-- 5. Policies for XPLog (A user's private point history)
CREATE POLICY "Users can read their own XP logs."
    ON public.xp_logs FOR SELECT
    USING ( auth.uid() = profile_id );

CREATE POLICY "Users can create their own XP logs."
    ON public.xp_logs FOR INSERT
    WITH CHECK ( auth.uid() = profile_id );

-- Note: UPDATE and DELETE are intentionally omitted for xp_logs
-- to ensure it remains an append-only, auditable log.

-- migrate:down
-- Drop all policies
DROP POLICY IF EXISTS "Badges are publicly viewable." ON public.badges;
DROP POLICY IF EXISTS "System can manage badges." ON public.badges;
DROP POLICY IF EXISTS "Earned badges are publicly viewable." ON public.earned_badges;
DROP POLICY IF EXISTS "Users can manage their own earned badges." ON public.earned_badges;
DROP POLICY IF EXISTS "Activity mastery is publicly viewable." ON public.activity_masteries;
DROP POLICY IF EXISTS "Users can manage their own activity mastery." ON public.activity_masteries;
DROP POLICY IF EXISTS "Users can read their own XP logs." ON public.xp_logs;
DROP POLICY IF EXISTS "Users can create their own XP logs." ON public.xp_logs;

-- Disable RLS
ALTER TABLE public.badges DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.earned_badges DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_masteries DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_logs DISABLE ROW LEVEL SECURITY;