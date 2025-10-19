-- migrate:up
-- Description: Defines all RLS policies for the new notification tables.
-- =============================================================================

-- 1. Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

-- 2. Policies for notifications
CREATE POLICY "Users can read their own notifications"
    ON public.notifications FOR SELECT
    USING ( auth.uid() = profile_id );

CREATE POLICY "Users can update their own notifications (e.g., mark as read)"
    ON public.notifications FOR UPDATE
    USING ( auth.uid() = profile_id )
    WITH CHECK ( auth.uid() = profile_id );

-- 3. Policies for notification_preferences
CREATE POLICY "Users can manage their own notification preferences"
    ON public.notification_preferences FOR ALL
    USING ( auth.uid() = profile_id )
    WITH CHECK ( auth.uid() = profile_id );

-- 4. Policies for push_subscriptions
CREATE POLICY "Users can manage their own push subscriptions"
    ON public.push_subscriptions FOR ALL
    USING ( auth.uid() = profile_id )
    WITH CHECK ( auth.uid() = profile_id );

-- migrate:down
DROP POLICY IF EXISTS "Users can manage their own push subscriptions" ON public.push_subscriptions;
DROP POLICY IF EXISTS "Users can manage their own notification preferences" ON public.notification_preferences;
DROP POLICY IF EXISTS "Users can update their own notifications (e.g., mark as read)" ON public.notifications;
DROP POLICY IF EXISTS "Users can read their own notifications" ON public.notifications;

ALTER TABLE public.push_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;
