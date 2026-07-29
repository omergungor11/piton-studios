import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import { WORKS, SERVICES, STORIES } from '@/lib/data';
import { locales } from '@/i18n/config';
import type {
  Locale,
  ProjectContent,
  ServiceContent,
  TranslationHealth,
} from './types';

/**
 * Statik kaynak: data.ts + src/messages/*.json
 * Sprint 5'te data.ts kaldirilana kadar varsayilan kaynak budur.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

const cache = new Map<Locale, Messages>();

function messages(locale: Locale): Messages {
  const hit = cache.get(locale);
  if (hit) return hit;
  const file = path.join(process.cwd(), 'src', 'messages', `${locale}.json`);
  const parsed = JSON.parse(fs.readFileSync(file, 'utf8')) as Messages;
  cache.set(locale, parsed);
  return parsed;
}

function statusOf(entry: unknown, required: string[]): TranslationHealth['status'] {
  if (!entry || typeof entry !== 'object') return 'missing';
  const obj = entry as Record<string, unknown>;
  const filled = required.filter((key) => {
    const value = obj[key];
    if (Array.isArray(value)) return value.length > 0;
    return typeof value === 'string' && value.trim().length > 0;
  });
  if (filled.length === 0) return 'missing';
  return filled.length === required.length ? 'done' : 'draft';
}

export function listProjects(locale: Locale): ProjectContent[] {
  const m = messages(locale);

  const works: ProjectContent[] = WORKS.map((w, i) => {
    const t = m.works?.[w.slug];
    return {
      slug: w.slug,
      number: w.n,
      type: 'work',
      title: t?.title ?? w.title,
      summary: t?.summary ?? w.summary,
      body: Array.isArray(t?.body) ? t.body : w.body,
      scope: w.scope,
      role: t?.role ?? w.role,
      kind: t?.kind ?? w.kind,
      year: w.year,
      client: w.client,
      collaborator: w.collaborator,
      externalUrl: w.url,
      tags: w.tags,
      image: w.image,
      previews: w.previews,
      isFeatured: i < 6,
      sortOrder: i,
    };
  });

  const stories: ProjectContent[] = STORIES.map((s, i) => {
    const t = m.stories?.[s.slug];
    return {
      slug: s.slug,
      number: s.no,
      type: 'story',
      title: t?.title ?? s.title,
      summary: t?.sub ?? s.sub,
      body: Array.isArray(t?.body) ? t.body : s.body,
      scope: '',
      role: t?.role ?? s.role,
      kind: '',
      year: s.year,
      client: s.client ?? '',
      tags: s.tags,
      image: s.image,
      isFeatured: false,
      sortOrder: WORKS.length + i,
    };
  });

  return [...works, ...stories];
}

export function getProject(locale: Locale, slug: string): ProjectContent | undefined {
  return listProjects(locale).find((p) => p.slug === slug);
}

export function listServices(locale: Locale): ServiceContent[] {
  const m = messages(locale);

  return SERVICES.map((s, i) => {
    const t = m.servicesList?.[s.slug];
    return {
      slug: s.slug,
      number: s.n,
      category: s.cat,
      title: t?.title ?? s.title,
      description: t?.desc ?? s.desc,
      longDescription: t?.longDesc ?? s.longDesc,
      items: Array.isArray(t?.items) ? t.items : s.items,
      features: Array.isArray(t?.features) ? t.features : s.features,
      process: Array.isArray(t?.process) ? t.process : s.process,
      stats: Array.isArray(t?.stats) ? t.stats : s.stats,
      faq: Array.isArray(t?.faq) ? t.faq : s.faq,
      tools: s.tools,
      relatedServices: s.relatedServices,
      sortOrder: i,
    };
  });
}

export function getService(locale: Locale, slug: string): ServiceContent | undefined {
  return listServices(locale).find((s) => s.slug === slug);
}

/** Eksik/kismi cevirileri raporlar — admin panelindeki rozetlerin kaynagi. */
export function translationHealth(): TranslationHealth[] {
  const out: TranslationHealth[] = [];

  for (const locale of locales) {
    const m = messages(locale);

    for (const w of WORKS) {
      out.push({
        locale,
        entity: 'project',
        slug: w.slug,
        status: statusOf(m.works?.[w.slug], ['title', 'summary', 'body']),
      });
    }
    for (const s of STORIES) {
      out.push({
        locale,
        entity: 'project',
        slug: s.slug,
        status: statusOf(m.stories?.[s.slug], ['title', 'sub', 'body']),
      });
    }
    for (const s of SERVICES) {
      out.push({
        locale,
        entity: 'service',
        slug: s.slug,
        status: statusOf(m.servicesList?.[s.slug], ['title', 'desc', 'longDesc']),
      });
    }
  }

  return out;
}
