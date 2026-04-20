-- ============================================================
-- Storage Buckets
-- Run this in Supabase SQL Editor
-- ============================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('videos', 'videos', true),
  ('gallery', 'gallery', true),
  ('thumbnails', 'thumbnails', true);

-- Public read access for all buckets
CREATE POLICY "Public read videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "Public read gallery" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Public read thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'thumbnails');

-- Authenticated upload for admin
CREATE POLICY "Admin upload videos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin upload gallery" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Admin upload thumbnails" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');

-- Admin delete
CREATE POLICY "Admin delete videos" ON storage.objects
  FOR DELETE USING (bucket_id = 'videos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete gallery" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete thumbnails" ON storage.objects
  FOR DELETE USING (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');
