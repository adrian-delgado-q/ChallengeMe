-- migrate:up
-- Storage Buckets and RLS Setup
-- Description: Creates storage buckets and sets up RLS policies for file uploads
-- =============================================================================

-- Create storage buckets for the application
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
    ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']),
    ('images', 'images', true, 2097152, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Storage RLS Policies
CREATE POLICY "Authenticated users can upload avatar files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can view avatar files" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can update their own avatar files" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() IS NOT NULL) WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete their own avatar files" ON storage.objects FOR DELETE USING (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can upload image files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can view image files" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Users can update their own image files" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.uid() IS NOT NULL) WITH CHECK (bucket_id = 'images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete their own image files" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.uid() IS NOT NULL);

-- migrate:down

-- Drop Storage RLS Policies
DROP POLICY IF EXISTS "Authenticated users can upload avatar files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatar files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar files" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated users can upload image files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view image files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own image files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own image files" ON storage.objects;

-- Disable RLS on storage.objects
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Delete storage buckets
DELETE FROM storage.buckets WHERE id IN ('avatars', 'images');
