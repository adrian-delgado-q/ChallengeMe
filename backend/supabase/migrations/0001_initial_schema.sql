-- ChallengeMe Supabase Schema
--
-- This script creates the tables and RLS policies for the social fitness app.
-- The 'users' table is managed by Supabase Auth, so we only reference it.
--
-- Note: Before running, ensure the 'uuid-ossp' extension is enabled in your Supabase project.
-- You can do this in the Supabase Dashboard under Database -> Extensions.

-- -----------------------------------------------------------------------------
-- 1. TABLES
-- -----------------------------------------------------------------------------

-- 🔸 challenges
-- Stores all challenge information.
CREATE TABLE public.challenges (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    creator_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    activity_type text NOT NULL, -- e.g., 'running', 'biking', 'stair-climbing'
    goal_type text NOT NULL,     -- e.g., 'distance', 'time', 'reps'
    goal_value double precision NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    is_public boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT challenges_pkey PRIMARY KEY (id)
);

-- 🔸 challenge_participants
-- A join table linking users to the challenges they've joined.
CREATE TABLE public.challenge_participants (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    joined_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT challenge_participants_pkey PRIMARY KEY (id),
    CONSTRAINT user_challenge_unique UNIQUE (user_id, challenge_id) -- Ensures a user can only join a challenge once
);

-- 🔸 activities
-- Stores individual activity records logged by users for specific challenges.
CREATE TABLE public.activities (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    activity_type text NOT NULL,
    source text NOT NULL DEFAULT 'manual', -- e.g., 'manual', 'strava', 'garmin'
    distance_km double precision,
    duration_min double precision,
    steps integer,
    elevation_gain double precision,
    notes text,
    "date" date NOT NULL,
    uploaded_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT activities_pkey PRIMARY KEY (id)
);

-- 🔸 connected_accounts
-- Stores OAuth tokens for third-party integrations like Strava, Garmin, etc.
-- IMPORTANT: Encrypt tokens before storing. Supabase has extensions like 'pgsodium' for this.
CREATE TABLE public.connected_accounts (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider text NOT NULL, -- e.g., 'strava', 'fitbit'
    access_token text NOT NULL, -- MUST BE ENCRYPTED
    refresh_token text,       -- MUST BE ENCRYPTED
    expires_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT connected_accounts_pkey PRIMARY KEY (id),
    CONSTRAINT user_provider_unique UNIQUE (user_id, provider)
);

-- 🔸 posts
-- Stores user-generated posts within a challenge's community feed.
CREATE TABLE public.posts (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    content text,
    image_url text, -- URL pointing to a file in S3/Supabase Storage
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT posts_pkey PRIMARY KEY (id)
);

-- 🔸 comments
-- Stores comments on posts.
CREATE TABLE public.comments (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    content text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT comments_pkey PRIMARY KEY (id)
);

-- 🔸 notifications
-- Stores notifications for users (e.g., new comment, challenge invite).
CREATE TABLE public.notifications (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    "type" text NOT NULL, -- e.g., 'new_comment', 'post_like'
    "data" jsonb,         -- e.g., { "post_id": "...", "commenter_name": "..." }
    read boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT notifications_pkey PRIMARY KEY (id)
);


-- -----------------------------------------------------------------------------
-- 2. ROW-LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
-- This is crucial for security. By default, no one can access tables until policies are created.

-- Helper function to get current user's ID
CREATE OR REPLACE FUNCTION auth.current_user_id()
RETURNS uuid
LANGUAGE sql
STABLE
AS $$
  SELECT nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::uuid;
$$;


-- 🔸 RLS for 'challenges' table
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to challenges"
ON public.challenges FOR SELECT USING (is_public = true);

CREATE POLICY "Allow users to read their own private challenges"
ON public.challenges FOR SELECT USING (auth.current_user_id() = creator_id);

CREATE POLICY "Allow authenticated users to create challenges"
ON public.challenges FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow creators to update their own challenges"
ON public.challenges FOR UPDATE USING (auth.current_user_id() = creator_id);

CREATE POLICY "Allow creators to delete their own challenges"
ON public.challenges FOR DELETE USING (auth.current_user_id() = creator_id);

-- 🔸 RLS for 'challenge_participants' table
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to see participants of challenges they are in"
ON public.challenge_participants FOR SELECT USING (
  challenge_id IN (
    SELECT id FROM public.challenges WHERE is_public = true
  )
  OR
  challenge_id IN (
    SELECT challenge_id FROM public.challenge_participants WHERE user_id = auth.current_user_id()
  )
);

CREATE POLICY "Allow users to join/leave challenges"
ON public.challenge_participants FOR ALL USING (auth.current_user_id() = user_id);

-- 🔸 RLS for 'activities' table
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to manage their own activities"
ON public.activities FOR ALL USING (auth.current_user_id() = user_id);


-- 🔸 RLS for 'posts' and 'comments'
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to see posts/comments in challenges they participate in"
ON public.posts FOR SELECT USING (
  challenge_id IN (SELECT challenge_id FROM public.challenge_participants WHERE user_id = auth.current_user_id())
);
CREATE POLICY "Allow users to see posts/comments in challenges they participate in"
ON public.comments FOR SELECT USING (
  post_id IN (SELECT id from public.posts WHERE challenge_id IN (SELECT challenge_id FROM public.challenge_participants WHERE user_id = auth.current_user_id()))
);

CREATE POLICY "Allow users to create posts/comments in challenges they participate in"
ON public.posts FOR INSERT WITH CHECK (
  auth.current_user_id() = user_id AND
  challenge_id IN (SELECT challenge_id FROM public.challenge_participants WHERE user_id = auth.current_user_id())
);
CREATE POLICY "Allow users to create posts/comments in challenges they participate in"
ON public.comments FOR INSERT WITH CHECK (
  auth.current_user_id() = user_id AND
  post_id IN (SELECT id from public.posts WHERE challenge_id IN (SELECT challenge_id FROM public.challenge_participants WHERE user_id = auth.current_user_id()))
);

CREATE POLICY "Allow users to delete their own posts/comments"
ON public.posts FOR DELETE USING (auth.current_user_id() = user_id);

CREATE POLICY "Allow users to delete their own posts/comments"
ON public.comments FOR DELETE USING (auth.current_user_id() = user_id);


-- 🔸 RLS for 'connected_accounts' and 'notifications'
ALTER TABLE public.connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own connected accounts and notifications"
ON public.connected_accounts FOR ALL USING (auth.current_user_id() = user_id);

CREATE POLICY "Users can manage their own connected accounts and notifications"
ON public.notifications FOR ALL USING (auth.current_user_id() = user_id);
