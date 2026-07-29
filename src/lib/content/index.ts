import 'server-only';

import * as staticSource from './static-source';
import * as dbSource from './db-source';
import type {
  ContentSource,
  Locale,
  ProjectContent,
  ServiceContent,
  TranslationHealth,
} from './types';

/**
 * Icerik erisim katmani — tek giris noktasi.
 *
 * CONTENT_SOURCE=static (varsayilan)  -> data.ts + messages/*.json
 * CONTENT_SOURCE=db                   -> Neon Postgres
 *
 * Kademeli gecis icin: goc dogrulanana kadar statik kaynak calisir, bayrak
 * cevrilerek DB'ye gecilir, sorun cikarsa aninda geri alinir. Sprint 5'te
 * statik kaynak kaldirilip bayrak sadelestirilecek.
 */

export function contentSource(): ContentSource {
  return process.env.CONTENT_SOURCE === 'db' ? 'db' : 'static';
}

export async function listProjects(locale: Locale): Promise<ProjectContent[]> {
  return contentSource() === 'db'
    ? dbSource.listProjects(locale)
    : staticSource.listProjects(locale);
}

export async function getProject(
  locale: Locale,
  slug: string
): Promise<ProjectContent | undefined> {
  return contentSource() === 'db'
    ? dbSource.getProject(locale, slug)
    : staticSource.getProject(locale, slug);
}

export async function listServices(locale: Locale): Promise<ServiceContent[]> {
  return contentSource() === 'db'
    ? dbSource.listServices(locale)
    : staticSource.listServices(locale);
}

export async function getService(
  locale: Locale,
  slug: string
): Promise<ServiceContent | undefined> {
  return contentSource() === 'db'
    ? dbSource.getService(locale, slug)
    : staticSource.getService(locale, slug);
}

export async function translationHealth(): Promise<TranslationHealth[]> {
  return contentSource() === 'db'
    ? dbSource.translationHealth()
    : staticSource.translationHealth();
}

/** Panel ozetinde gosterilecek toplu sayim. */
export async function translationSummary() {
  const rows = await translationHealth();
  const byLocale = new Map<string, { missing: number; draft: number; done: number }>();

  for (const row of rows) {
    const bucket = byLocale.get(row.locale) ?? { missing: 0, draft: 0, done: 0 };
    bucket[row.status]++;
    byLocale.set(row.locale, bucket);
  }

  return {
    total: rows.length,
    incomplete: rows.filter((r) => r.status !== 'done').length,
    byLocale: Object.fromEntries(byLocale),
  };
}

export type { ContentSource, ProjectContent, ServiceContent, TranslationHealth, Locale };
