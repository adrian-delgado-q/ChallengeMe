-- Storage Buckets and RLS Setup
-- Description: Creates storage buckets and sets up RLS policies for file uploads
-- =============================================================================
-- Create storage buckets for the application
INSERT INTO
    storage.buckets (
        id,
        name,
        public,
        file_size_limit,
        allowed_mime_types
    )
VALUES
    (
        'avatars',
        'avatars',
        true,
        2097152,
        -- 2MB in bytes
        ARRAY ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    ),
    (
        'images',
        'images',
        true,
        2097152,
        -- 2MB in bytes
        ARRAY ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    ) ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled
DO $$ BEGIN IF NOT EXISTS (
    SELECT
        1
    FROM
        pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE
        n.nspname = 'storage'
        AND c.relname = 'objects'
        AND c.relrowsecurity = true
) THEN
ALTER TABLE
    storage.objects ENABLE ROW LEVEL SECURITY;

END IF;

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not enable RLS on storage.objects: %',
SQLERRM;

END $$;

-- Storage RLS Policies (with error handling)
-- Note: These policies may require service role permissions
DO $$ BEGIN -- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload avatar files" ON storage.objects;

DROP POLICY IF EXISTS "Anyone can view avatar files" ON storage.objects;

DROP POLICY IF EXISTS "Users can update their own avatar files" ON storage.objects;

DROP POLICY IF EXISTS "Users can delete their own avatar files" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated users can upload image files" ON storage.objects;

DROP POLICY IF EXISTS "Anyone can view image files" ON storage.objects;

DROP POLICY IF EXISTS "Users can update their own image files" ON storage.objects;

DROP POLICY IF EXISTS "Users can delete their own image files" ON storage.objects;

-- Avatar bucket policies
BEGIN CREATE POLICY "Authenticated users can upload avatar files" ON storage.objects FOR
INSERT
    WITH CHECK (
        bucket_id = 'avatars'
        AND auth.uid() IS NOT NULL
    );

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not create avatar upload policy: %',
SQLERRM;

END;

BEGIN CREATE POLICY "Anyone can view avatar files" ON storage.objects FOR
SELECT
    USING (bucket_id = 'avatars');

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not create avatar view policy: %',
SQLERRM;

END;

BEGIN CREATE POLICY "Users can update their own avatar files" ON storage.objects FOR
UPDATE
    USING (
        bucket_id = 'avatars'
        AND auth.uid() IS NOT NULL
    ) WITH CHECK (
        bucket_id = 'avatars'
        AND auth.uid() IS NOT NULL
    );

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not create avatar update policy: %',
SQLERRM;

END;

BEGIN CREATE POLICY "Users can delete their own avatar files" ON storage.objects FOR DELETE USING (
    bucket_id = 'avatars'
    AND auth.uid() IS NOT NULL
);

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not create avatar delete policy: %',
SQLERRM;

END;

-- Image bucket policies
BEGIN CREATE POLICY "Authenticated users can upload image files" ON storage.objects FOR
INSERT
    WITH CHECK (
        bucket_id = 'images'
        AND auth.uid() IS NOT NULL
    );

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not create image upload policy: %',
SQLERRM;

END;

BEGIN CREATE POLICY "Anyone can view image files" ON storage.objects FOR
SELECT
    USING (bucket_id = 'images');

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not create image view policy: %',
SQLERRM;

END;

BEGIN CREATE POLICY "Users can update their own image files" ON storage.objects FOR
UPDATE
    USING (
        bucket_id = 'images'
        AND auth.uid() IS NOT NULL
    ) WITH CHECK (
        bucket_id = 'images'
        AND auth.uid() IS NOT NULL
    );

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not create image update policy: %',
SQLERRM;

END;

BEGIN CREATE POLICY "Users can delete their own image files" ON storage.objects FOR DELETE USING (
    bucket_id = 'images'
    AND auth.uid() IS NOT NULL
);

EXCEPTION
WHEN OTHERS THEN RAISE NOTICE 'Could not create image delete policy: %',
SQLERRM;

END;

END $$;