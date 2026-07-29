/**
 * Ters gocu: Neon Postgres  ->  data.ts + messages/{tr,en,ru}.json formati
 *
 * GUVENLIK VALFI. DB tarafinda bir sorun cikarsa (Neon limiti, yanlis migration,
 * veri kaybi) siteyi tek komutla statik moda geri dondurmeyi mumkun kilar.
 *
 * Calistirma:  pnpm content:export
 *              pnpm content:export --out=./yedek   (varsayilan: ./content-export)
 *
 * Uretilen dosyalar dogrudan src/ uzerine YAZILMAZ; once cikti dizinine yazilir,
 * karsilastirdiktan sonra elle tasinir.
 */
import 'dotenv/config';
import { config } from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { asc } from 'drizzle-orm';

import * as schema from '../src/lib/db/schema';

config({ path: '.env.local' });

const LOCALES = ['tr', 'en', 'ru'] as const;
type Locale = (typeof LOCALES)[number];

const outArg = process.argv.find((a) => a.startsWith('--out='));
const OUT_DIR = path.resolve(outArg ? outArg.slice('--out='.length) : './content-export');

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL tanimli degil — disa aktarim icin DB baglantisi gerekli.');
  }

  const db = drizzle(neon(process.env.DATABASE_URL), { schema });

  const [projects, projectTranslations, services, serviceTranslations] = await Promise.all([
    db.select().from(schema.projects).orderBy(asc(schema.projects.sortOrder)),
    db.select().from(schema.projectTranslations),
    db.select().from(schema.services).orderBy(asc(schema.services.sortOrder)),
    db.select().from(schema.serviceTranslations),
  ]);

  if (projects.length === 0) {
    throw new Error('projects tablosu bos — disa aktarilacak icerik yok. Once pnpm content:migrate.');
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // ---------- data.ts ----------
  const works = projects.filter((p) => p.type === 'work');
  const stories = projects.filter((p) => p.type === 'story');

  const trOf = (projectId: string, locale: Locale) =>
    projectTranslations.find((t) => t.projectId === projectId && t.locale === locale);

  const worksLiteral = works.map((p) => {
    const tr = trOf(p.id, 'tr');
    return {
      n: p.number ?? '',
      slug: p.slug,
      title: tr?.title ?? p.slug,
      client: p.client ?? '',
      kind: p.kindKey ?? '',
      year: p.year ?? '',
      role: p.roleKey ?? '',
      tags: p.tags,
      image: p.imageFile ?? '',
      summary: tr?.summary ?? '',
      body: tr?.body ?? [],
      scope: tr?.scope ?? '',
      ...(p.collaborator ? { collaborator: p.collaborator } : {}),
      ...(p.externalUrl ? { url: p.externalUrl } : {}),
      ...(p.previews ? { previews: p.previews } : {}),
    };
  });

  const storiesLiteral = stories.map((p) => {
    const tr = trOf(p.id, 'tr');
    return {
      no: p.number ?? '',
      slug: p.slug,
      title: tr?.title ?? p.slug,
      sub: tr?.summary ?? '',
      year: p.year ?? '',
      role: p.roleKey ?? '',
      tags: p.tags,
      image: p.imageFile ?? '',
      body: tr?.body ?? [],
      ...(p.client ? { client: p.client } : {}),
    };
  });

  const svcTrOf = (serviceId: string, locale: Locale) =>
    serviceTranslations.find((t) => t.serviceId === serviceId && t.locale === locale);

  const servicesLiteral = services.map((s) => {
    const tr = svcTrOf(s.id, 'tr');
    return {
      n: s.number ?? '',
      slug: s.slug,
      title: tr?.title ?? s.slug,
      cat: s.category ?? '',
      desc: tr?.description ?? '',
      items: tr?.items ?? [],
      longDesc: tr?.longDescription ?? '',
      features: tr?.features ?? [],
      process: tr?.process ?? [],
      stats: tr?.stats ?? [],
      faq: tr?.faq ?? [],
      tools: s.tools,
      relatedServices: s.relatedServices,
    };
  });

  const dataTs = `// Bu dosya scripts/export-content.ts tarafindan uretildi.
// Kaynak: Neon Postgres. Elle duzenlemeyin — degisiklikler admin panelden yapilmali.

import type { Work, Service, Story } from '@/lib/data';

export const WORKS: Work[] = ${JSON.stringify(worksLiteral, null, 2)};

export const SERVICES: Service[] = ${JSON.stringify(servicesLiteral, null, 2)};

export const STORIES: Story[] = ${JSON.stringify(storiesLiteral, null, 2)};
`;

  fs.writeFileSync(path.join(OUT_DIR, 'data.generated.ts'), dataTs, 'utf8');

  // ---------- messages/{locale}.json parcalari ----------
  for (const locale of LOCALES) {
    const worksNs: Record<string, unknown> = {};
    for (const p of works) {
      const t = trOf(p.id, locale);
      if (!t) continue;
      worksNs[p.slug] = {
        title: t.title,
        summary: t.summary ?? '',
        body: t.body,
        ...(t.kind ? { kind: t.kind } : {}),
        ...(t.role ? { role: t.role } : {}),
      };
    }

    const storiesNs: Record<string, unknown> = {};
    for (const p of stories) {
      const t = trOf(p.id, locale);
      if (!t) continue;
      storiesNs[p.slug] = {
        title: t.title,
        sub: t.summary ?? '',
        body: t.body,
        ...(t.role ? { role: t.role } : {}),
      };
    }

    const servicesNs: Record<string, unknown> = {};
    for (const s of services) {
      const t = svcTrOf(s.id, locale);
      if (!t) continue;
      servicesNs[s.slug] = {
        title: t.title,
        desc: t.description ?? '',
        longDesc: t.longDescription ?? '',
        items: t.items,
        features: t.features,
        process: t.process,
        faq: t.faq,
        stats: t.stats,
      };
    }

    const payload = { works: worksNs, stories: storiesNs, servicesList: servicesNs };
    fs.writeFileSync(
      path.join(OUT_DIR, `${locale}.partial.json`),
      `${JSON.stringify(payload, null, 2)}\n`,
      'utf8'
    );
  }

  // ---------- Eksik ceviri raporu ----------
  const missing = projectTranslations
    .filter((t) => t.status !== 'done')
    .map((t) => {
      const project = projects.find((p) => p.id === t.projectId);
      return `${t.locale}/${project?.slug ?? t.projectId} (${t.status})`;
    })
    .sort();

  fs.writeFileSync(
    path.join(OUT_DIR, 'missing-translations.txt'),
    missing.length ? `${missing.join('\n')}\n` : 'Eksik ceviri yok.\n',
    'utf8'
  );

  console.log(`\n=== DISA AKTARIM TAMAM ===`);
  console.log(`Cikti dizini:  ${OUT_DIR}`);
  console.log(`Proje (work):  ${works.length}`);
  console.log(`Proje (story): ${stories.length}`);
  console.log(`Hizmet:        ${services.length}`);
  console.log(`Eksik ceviri:  ${missing.length}`);
  console.log('\nUretilen dosyalar:');
  console.log('  data.generated.ts');
  for (const locale of LOCALES) console.log(`  ${locale}.partial.json`);
  console.log('  missing-translations.txt');
  console.log('\nBu dosyalar src/ uzerine otomatik yazilmadi — karsilastirip elle tasiyin.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\nDISA AKTARIM BASARISIZ:\n', error);
    process.exit(1);
  });
