import type { Locale } from '@/i18n/config';

export type ContentSource = 'static' | 'db';

export interface ProjectContent {
  slug: string;
  number: string;
  type: 'work' | 'story';
  title: string;
  /** work: summary, story: sub */
  summary: string;
  body: string[];
  scope: string;
  role: string;
  kind: string;
  year: string;
  client: string;
  collaborator?: string;
  externalUrl?: string;
  tags: string[];
  image: string;
  previews?: { desktop?: string; mobile?: string };
  isFeatured: boolean;
  sortOrder: number;
}

export interface ServiceContent {
  slug: string;
  number: string;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  items: string[];
  features: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  faq: { q: string; a: string }[];
  tools: string[];
  relatedServices: string[];
  sortOrder: number;
}

export interface TranslationHealth {
  locale: Locale;
  entity: 'project' | 'service';
  slug: string;
  status: 'missing' | 'draft' | 'done';
}

export type { Locale };
