/**
 * Ceviri sagligi raporu.
 *
 * src/lib/data.ts icindeki her proje/hizmet icin tr/en/ru cevirilerinin
 * src/messages/*.json altinda eksiksiz olup olmadigini kontrol eder.
 *
 * Bu script, `stories.cyprokey` ve `stories.salih-defterali` cevirilerinin
 * hicbir dilde bulunmadigini ortaya cikaran seydi — o sayfalar en/ru'da
 * Turkce icerik gosteriyordu. Ceviri borcunun tekrar sessizce birikmemesi
 * icin yeni icerik ekledikten sonra calistirin.
 *
 * Calistirma: pnpm content:check
 * Cikis kodu:  eksik ceviri varsa 1 (CI'da kullanilabilir)
 */
import fs from 'node:fs';
import path from 'node:path';

import { WORKS, SERVICES, STORIES } from '../src/lib/data';

const LOCALES = ['tr', 'en', 'ru'] as const;
type Locale = (typeof LOCALES)[number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Messages = Record<string, any>;

function messages(locale: Locale): Messages {
  const file = path.join(process.cwd(), 'src', 'messages', `${locale}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

type Status = 'missing' | 'draft' | 'done';

/** Zorunlu alanlarin kaci dolu? Hicbiri -> missing, hepsi -> done, arasi -> draft. */
function statusOf(entry: unknown, required: string[]): Status {
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

interface Row {
  locale: Locale;
  namespace: string;
  slug: string;
  status: Status;
}

function collect(): Row[] {
  const rows: Row[] = [];

  for (const locale of LOCALES) {
    const m = messages(locale);

    for (const work of WORKS) {
      rows.push({
        locale,
        namespace: 'works',
        slug: work.slug,
        status: statusOf(m.works?.[work.slug], ['title', 'summary', 'body']),
      });
    }
    for (const story of STORIES) {
      rows.push({
        locale,
        namespace: 'stories',
        slug: story.slug,
        status: statusOf(m.stories?.[story.slug], ['title', 'sub', 'body']),
      });
    }
    for (const service of SERVICES) {
      rows.push({
        locale,
        namespace: 'servicesList',
        slug: service.slug,
        status: statusOf(m.servicesList?.[service.slug], ['title', 'desc', 'longDesc']),
      });
    }
  }

  return rows;
}

function main() {
  const rows = collect();
  const problems = rows.filter((r) => r.status !== 'done');

  console.log('\n=== CEVIRI SAGLIGI ===\n');

  for (const locale of LOCALES) {
    const scoped = rows.filter((r) => r.locale === locale);
    const bad = scoped.filter((r) => r.status !== 'done');

    const byNs = (ns: string) => {
      const all = scoped.filter((r) => r.namespace === ns);
      const ok = all.filter((r) => r.status === 'done').length;
      return `${ns} ${ok}/${all.length}`;
    };

    console.log(
      `${locale}: ${byNs('works')}, ${byNs('stories')}, ${byNs('servicesList')}` +
        (bad.length ? `  → ${bad.length} SORUNLU` : '  ✓')
    );

    for (const row of bad) {
      console.log(`    ${row.status === 'missing' ? 'eksik' : 'kısmi'}: ${row.namespace}.${row.slug}`);
    }
  }

  console.log(`\nToplam kontrol edilen: ${rows.length}`);
  console.log(`Sorunlu: ${problems.length}`);

  if (problems.length > 0) {
    console.log('\nEksik cevirileri src/messages/{tr,en,ru}.json icine ekleyin.');
    process.exitCode = 1;
  }
}

main();
