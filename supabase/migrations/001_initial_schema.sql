-- ============================================================
-- Piton Studios - Initial Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROJECTS
-- ============================================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT,
  kind TEXT,
  year TEXT,
  role TEXT,
  summary TEXT,
  scope TEXT,
  collaborator TEXT,
  body TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  video_url TEXT,
  thumbnail_url TEXT,
  sort_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  project_type TEXT NOT NULL DEFAULT 'work' CHECK (project_type IN ('work', 'story')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_type ON projects(project_type);
CREATE INDEX idx_projects_published ON projects(is_published);

-- ============================================================
-- 2. GALLERY / PHOTOS
-- ============================================================
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  width INT,
  height INT,
  category TEXT DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gallery_category ON gallery_items(category);
CREATE INDEX idx_gallery_project ON gallery_items(project_id);
CREATE INDEX idx_gallery_published ON gallery_items(is_published);

-- ============================================================
-- 3. SERVICES
-- ============================================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  items TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. CONTACT MESSAGES
-- ============================================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  service TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_read ON contact_messages(is_read);
CREATE INDEX idx_messages_date ON contact_messages(created_at DESC);

-- ============================================================
-- 5. SITE SETTINGS (key-value store)
-- ============================================================
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert defaults
INSERT INTO site_settings (key, value) VALUES
  ('site_name', '"Piton Studios"'),
  ('tagline', '"Independent brand, direction & motion studio"'),
  ('email', '"hi@pitonstudios.com"'),
  ('location', '"Türkiye"'),
  ('social_instagram', '"https://instagram.com/pitonstudios"'),
  ('social_vimeo', '"https://vimeo.com/pitonstudios"'),
  ('whatsapp_number', '""');

-- ============================================================
-- 6. AUTO-UPDATE TIMESTAMPS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_gallery_updated
  BEFORE UPDATE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_services_updated
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
