/**
 * Icerik gocu: src/lib/data.ts + src/messages/{tr,en,ru}.json  ->  Neon Postgres
 *
 * Idempotent: slug bazinda upsert eder, tekrar tekrar calistirilabilir.
 * Calistirma:  pnpm content:migrate
 *              pnpm content:migrate --dry   (DB'ye yazmadan ne olacagini gosterir)
 */
import 'dotenv/config';
import { config } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { count } from 'drizzle-orm';

import { WORKS, SERVICES, STORIES } from '../src/lib/data';
import * as schema from '../src/lib/db/schema';

config({ path: '.env.local' });

const LOCALES = ['tr', 'en', 'ru'] as const;
type Locale = (typeof LOCALES)[number];

const DRY = process.argv.includes('--dry');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

function loadMessages(): Record<Locale, Messages> {
  const out = {} as Record<Locale, Messages>;
  for (const locale of LOCALES) {
    const file = path.join(process.cwd(), 'src', 'messages', `${locale}.json`);
    out[locale] = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return out;
}

/** Ceviri var mi, kismi mi, hic yok mu — panelde rozet olarak gorunecek. */
function statusOf(entry: unknown, required: string[]): 'missing' | 'draft' | 'done' {
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

async function main() {
  const messages = loadMessages();

  if (!process.env.DATABASE_URL && !DRY) {
    throw new Error(
      'DATABASE_URL tanimli degil.\n' +
        '1) neon.com uzerinde proje olusturun\n' +
        '2) Baglanti dizesini .env.local icine DATABASE_URL olarak ekleyin\n' +
        '3) pnpm db:migrate ile semayi olusturun\n' +
        '4) Bu script i tekrar calistirin\n\n' +
        'Sadece ne olacagini gormek icin: pnpm content:migrate --dry'
    );
  }

  const db = DRY
    ? null
    : drizzle(neon(process.env.DATABASE_URL as string), { schema });

  const stats = {
    projects: 0,
    projectTranslations: 0,
    services: 0,
    serviceTranslations: 0,
    missing: [] as string[],
    partial: [] as string[],
  };

  // ---------- Projeler: WORKS + STORIES ----------
  const allProjects = [
    ...WORKS.map((w, i) => ({ kind: 'work' as const, item: w, order: i })),
    ...STORIES.map((s, i) => ({ kind: 'story' as const, item: s, order: WORKS.length + i })),
  ];

  for (const { kind, item, order } of allProjects) {
    const slug = item.slug;

    const row = {
      slug,
      number: 'n' in item ? item.n : item.no,
      type: kind,
      year: item.year,
      client: item.client ?? null,
      kindKey: 'kind' in item ? item.kind : null,
      roleKey: item.role,
      collaborator: 'collaborator' in item ? (item.collaborator ?? null) : null,
      externalUrl: 'url' in item ? (item.url ?? null) : null,
      tags: item.tags ?? [],
      imageFile: item.image ?? null,
      previews: 'previews' in item ? (item.previews ?? null) : null,
      sortOrder: order,
      isFeatured: kind === 'work' && order < 6,
      isPublished: true,
      updatedAt: new Date(),
    };

    let projectId: string | undefined;

    if (db) {
      const [saved] = await db
        .insert(schema.projects)
        .values(row)
        .onConflictDoUpdate({ target: schema.projects.slug, set: row })
        .returning({ id: schema.projects.id });
      projectId = saved.id;
    }
    stats.projects++;

    const namespace = kind === 'work' ? 'works' : 'stories';
    const requiredKeys = kind === 'work' ? ['title', 'summary', 'body'] : ['title', 'sub', 'body'];

    for (const locale of LOCALES) {
      const t = messages[locale][namespace]?.[slug];
      const status = statusOf(t, requiredKeys);

      if (status === 'missing') stats.missing.push(`${locale}/${namespace}/${slug}`);
      else if (status === 'draft') stats.partial.push(`${locale}/${namespace}/${slug}`);

      // data.ts degerleri Turkce sabitler — ceviri yoksa gorunur fallback.
      const fallbackSummary = kind === 'work' ? item.summary : item.sub;

      const translation = {
        locale,
        title: t?.title ?? item.title,
        summary: t?.summary ?? t?.sub ?? fallbackSummary ?? null,
        scope: 'scope' in item ? (item.scope ?? null) : null,
        role: t?.role ?? item.role ?? null,
        kind: t?.kind ?? ('kind' in item ? item.kind : null),
        body: Array.isArray(t?.body) ? t.body : (item.body ?? []),
        status,
        updatedAt: new Date(),
      };

      if (db && projectId) {
        await db
          .insert(schema.projectTranslations)
          .values({ projectId, ...translation })
          .onConflictDoUpdate({
            target: [schema.projectTranslations.projectId, schema.projectTranslations.locale],
            set: translation,
          });
      }
      stats.projectTranslations++;
    }
  }

  // ---------- Hizmetler ----------
  for (const [index, service] of SERVICES.entries()) {
    const row = {
      slug: service.slug,
      number: service.n,
      category: service.cat,
      tools: service.tools ?? [],
      relatedServices: service.relatedServices ?? [],
      sortOrder: index,
      isPublished: true,
      updatedAt: new Date(),
    };

    let serviceId: string | undefined;

    if (db) {
      const [saved] = await db
        .insert(schema.services)
        .values(row)
        .onConflictDoUpdate({ target: schema.services.slug, set: row })
        .returning({ id: schema.services.id });
      serviceId = saved.id;
    }
    stats.services++;

    for (const locale of LOCALES) {
      const t = messages[locale].servicesList?.[service.slug];
      const status = statusOf(t, ['title', 'desc', 'longDesc']);

      if (status === 'missing') stats.missing.push(`${locale}/servicesList/${service.slug}`);
      else if (status === 'draft') stats.partial.push(`${locale}/servicesList/${service.slug}`);

      const translation = {
        locale,
        title: t?.title ?? service.title,
        description: t?.desc ?? service.desc,
        longDescription: t?.longDesc ?? service.longDesc ?? null,
        items: Array.isArray(t?.items) ? t.items : (service.items ?? []),
        features: Array.isArray(t?.features) ? t.features : (service.features ?? []),
        process: Array.isArray(t?.process) ? t.process : (service.process ?? []),
        stats: Array.isArray(t?.stats) ? t.stats : (service.stats ?? []),
        faq: Array.isArray(t?.faq) ? t.faq : (service.faq ?? []),
        status,
        updatedAt: new Date(),
      };

      if (db && serviceId) {
        await db
          .insert(schema.serviceTranslations)
          .values({ serviceId, ...translation })
          .onConflictDoUpdate({
            target: [schema.serviceTranslations.serviceId, schema.serviceTranslations.locale],
            set: translation,
          });
      }
      stats.serviceTranslations++;
    }
  }

  // ---------- Rapor ----------
  const mode = DRY ? 'KURU CALISMA (DB yazilmadi)' : 'GOC TAMAMLANDI';
  console.log(`\n=== ${mode} ===`);
  console.log(`Proje:            ${stats.projects}`);
  console.log(`Proje cevirisi:   ${stats.projectTranslations}`);
  console.log(`Hizmet:           ${stats.services}`);
  console.log(`Hizmet cevirisi:  ${stats.serviceTranslations}`);
  console.log(`\nEksik ceviri:     ${stats.missing.length}`);
  console.log(`Kismi ceviri:     ${stats.partial.length}`);

  if (stats.missing.length) {
    console.log('\n--- Eksik ---');
    for (const key of stats.missing.slice(0, 40)) console.log(`  ${key}`);
    if (stats.missing.length > 40) console.log(`  ... +${stats.missing.length - 40} tane daha`);
  }
  if (stats.partial.length) {
    console.log('\n--- Kismi ---');
    for (const key of stats.partial.slice(0, 40)) console.log(`  ${key}`);
    if (stats.partial.length > 40) console.log(`  ... +${stats.partial.length - 40} tane daha`);
  }

  if (db) {
    // Yazilan satirlari geri okuyup sayarak gocu dogrula.
    const [projectRows, translationRows, serviceRows] = await Promise.all([
      db.select({ count: count() }).from(schema.projects),
      db.select({ count: count() }).from(schema.projectTranslations),
      db.select({ count: count() }).from(schema.services),
    ]);
    console.log('\n--- DB dogrulama ---');
    console.log(`projects:             ${projectRows[0].count}`);
    console.log(`project_translations: ${translationRows[0].count}`);
    console.log(`services:             ${serviceRows[0].count}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\nGOC BASARISIZ:\n', error);
    process.exit(1);
  });

export { statusOf };
