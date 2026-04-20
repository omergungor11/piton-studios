-- ============================================================
-- Row Level Security Policies
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PUBLIC READ (anon users can see published content)
-- ============================================================

CREATE POLICY "Public read published projects"
  ON projects FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public read published gallery"
  ON gallery_items FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public read published services"
  ON services FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public read site settings"
  ON site_settings FOR SELECT
  USING (true);

-- ============================================================
-- PUBLIC INSERT (contact form)
-- ============================================================

CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- ADMIN FULL ACCESS (authenticated users)
-- ============================================================

-- Projects
CREATE POLICY "Admin full access projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Gallery
CREATE POLICY "Admin full access gallery"
  ON gallery_items FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Services
CREATE POLICY "Admin full access services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Contact messages (admin can read/update/delete)
CREATE POLICY "Admin read contact messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update contact messages"
  ON contact_messages FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin delete contact messages"
  ON contact_messages FOR DELETE
  USING (auth.role() = 'authenticated');

-- Site settings
CREATE POLICY "Admin update site settings"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
