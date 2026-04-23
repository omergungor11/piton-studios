export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  kind: string | null;
  year: string | null;
  role: string | null;
  summary: string | null;
  scope: string | null;
  collaborator: string | null;
  body: string[];
  tags: string[];
  video_url: string | null;
  thumbnail_url: string | null;
  sort_order: number;
  is_featured: boolean;
  is_published: boolean;
  project_type: 'work' | 'story';
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  thumbnail_url: string | null;
  width: number | null;
  height: number | null;
  category: string;
  tags: string[];
  project_id: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string | null;
  items: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  service: string | null;
  is_read: boolean;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  updated_at: string;
}
