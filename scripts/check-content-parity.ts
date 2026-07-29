/**
 * Denklik kontrolu: statik kaynak (data.ts + messages) ile DB kaynagi ayni ciktiyi
 * veriyor mu? Goc dogru yapildi mi sorusunun kanitidir.
 *
 * DATABASE_URL yoksa yalnizca statik tarafi raporlar (ceviri sagligi ozeti) —
 * boylece DB kurulmadan once de calisir.
 *
 * Calistirma: pnpm content:check
 */
import 'dotenv/config';
import { config } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { asc, eq } from 'drizzle-orm';

import { WORKS, SERVICES, STORIES } from '../src/lib/data';
import * as schema from '../src/lib/db/schema';

config({ path: '.env.local' });

const LOCALES = ['tr', 'en', 'ru'] as const;
type Locale = (typeof LOCALES)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

function messages(locale: Locale): Messages {
  const file = path.join(process.cwd(), 'src', 'messages', `${locale}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function staticProject(locale: Locale, slug: string) {
  const m = messages(locale);
  const work = WORKS.find((w) => w.slug === slug);
  if (work) {
    const t = m.works?.[slug];
    return {
      title: t?.title ?? work.title,
      summary: t?.summary ?? work.summary,
      body: Array.isArray(t?.body) ? t.body : work.body,
      tags: work.tags,
      year: work.year,
    };
  }
  const story = STORIES.find((s) => s.slug === slug);
  if (!story) return undefined;
  const t = m.stories?.[slug];
  return {
    title: t?.title ?? story.title,
    summary: t?.sub ?? story.sub,
    body: Array.isArray(t?.body) ? t.body : story.body,
    tags: story.tags,
    year: story.year,
  };
}

function staticService(locale: Locale, slug: string) {
  const m = messages(locale);
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return undefined;
  const t = m.servicesList?.[slug];
  return {
    title: t?.title ?? service.title,
    description: t?.desc ?? service.desc,
    faqCount: (Array.isArray(t?.faq) ? t.faq : service.faq).length,
  };
}

function reportStaticHealth() {
  console.log('\n=== STATIK KAYNAK — CEVIRI SAGLIGI ===');
  let totalMissing = 0;

  for (const locale of LOCALES) {
    const m = messages(locale);
    const missingWorks = WORKS.filter((w) => !m.works?.[w.slug]?.title);
    const missingStories = STORIES.filter((s) => !m.stories?.[s.slug]?.title);
    const missingServices = SERVICES.filter((s) => !m.servicesList?.[s.slug]?.title);
    const missing = missingWorks.length + missingStories.length + missingServices.length;
    totalMissing += missing;

    console.log(
      `${locale}: works ${WORKS.length - missingWorks.length}/${WORKS.length}, ` +
        `stories ${STORIES.length - missingStories.length}/${STORIES.length}, ` +
        `services ${SERVICES.length - missingServices.length}/${SERVICES.length}` +
        (missing ? `  → ${missing} EKSIK` : '  ✓')
    );

    for (const w of missingWorks) console.log(`    eksik: works.${w.slug}`);
    for (const s of missingStories) console.log(`    eksik: stories.${s.slug}`);
    for (const s of missingServices) console.log(`    eksik: servicesList.${s.slug}`);
  }

  console.log(`\nToplam eksik ceviri: ${totalMissing}`);
  return totalMissing;
}

async function comparWithDb() {
  const db = drizzle(neon(process.env.DATABASE_URL as string), { schema });

  const projectRows = await db
    .select({ project: schema.projects, translation: schema.projectTranslations })
    .from(schema.projects)
    .innerJoin(
      schema.projectTranslations,
      eq(schema.projectTranslations.projectId, schema.projects.id)
    )
    .orderBy(asc(schema.projects.sortOrder));

  const serviceRows = await db
    .select({ service: schema.services, translation: schema.serviceTranslations })
    .from(schema.services)
    .innerJoin(
      schema.serviceTranslations,
      eq(schema.serviceTranslations.serviceId, schema.services.id)
    )
    .orderBy(asc(schema.services.sortOrder));

  const diffs: string[] = [];

  for (const { project, translation } of projectRows) {
    const locale = translation.locale as Locale;
    const expected = staticProject(locale, project.slug);
    if (!expected) {
      diffs.push(`${locale}/${project.slug}: DB'de var, statik kaynakta yok`);
      continue;
    }
    if (expected.title !== translation.title) {
      diffs.push(
        `${locale}/${project.slug} title: statik="${expected.title}" db="${translation.title}"`
      );
    }
    if ((expected.summary ?? '') !== (translation.summary ?? '')) {
      diffs.push(`${locale}/${project.slug} summary farkli`);
    }
    if (expected.body.length !== translation.body.length) {
      diffs.push(
        `${locale}/${project.slug} body paragraf sayisi: statik=${expected.body.length} db=${translation.body.length}`
      );
    }
    if (expected.tags.join(',') !== project.tags.join(',')) {
      diffs.push(`${locale}/${project.slug} tags farkli`);
    }
  }

  for (const { service, translation } of serviceRows) {
    const locale = translation.locale as Locale;
    const expected = staticService(locale, service.slug);
    if (!expected) {
      diffs.push(`${locale}/${service.slug}: DB'de var, statik kaynakta yok`);
      continue;
    }
    if (expected.title !== translation.title) {
      diffs.push(
        `${locale}/${service.slug} title: statik="${expected.title}" db="${translation.title}"`
      );
    }
    if ((expected.description ?? '') !== (translation.description ?? '')) {
      diffs.push(`${locale}/${service.slug} description farkli`);
    }
    if (expected.faqCount !== (translation.faq?.length ?? 0)) {
      diffs.push(
        `${locale}/${service.slug} faq sayisi: statik=${expected.faqCount} db=${translation.faq?.length ?? 0}`
      );
    }
  }

  // Statikte olup DB'de olmayanlar
  const dbSlugs = new Set(projectRows.map((r) => r.project.slug));
  for (const w of WORKS) if (!dbSlugs.has(w.slug)) diffs.push(`${w.slug}: statik kaynakta var, DB'de yok`);
  for (const s of STORIES) if (!dbSlugs.has(s.slug)) diffs.push(`${s.slug}: statik kaynakta var, DB'de yok`);

  console.log('\n=== STATIK ↔ DB DENKLIK ===');
  console.log(`Karsilastirilan proje cevirisi:  ${projectRows.length}`);
  console.log(`Karsilastirilan hizmet cevirisi: ${serviceRows.length}`);

  if (diffs.length === 0) {
    console.log('\n✓ Fark yok — goc birebir. CONTENT_SOURCE=db guvenle acilabilir.');
    return 0;
  }

  console.log(`\n✗ ${diffs.length} fark bulundu:`);
  for (const diff of diffs.slice(0, 50)) console.log(`  ${diff}`);
  if (diffs.length > 50) console.log(`  ... +${diffs.length - 50} tane daha`);
  return diffs.length;
}

async function main() {
  reportStaticHealth();

  if (!process.env.DATABASE_URL) {
    console.log('\nDATABASE_URL yok — DB karsilastirmasi atlandi.');
    console.log('Neon kurulduktan sonra: pnpm db:migrate && pnpm content:migrate && pnpm content:check');
    return;
  }

  const diffCount = await comparWithDb();
  if (diffCount > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error('\nKONTROL BASARISIZ:\n', error);
  process.exit(1);
});
