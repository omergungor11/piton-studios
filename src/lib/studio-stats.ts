import { WORKS, type Work } from '@/lib/data';

/**
 * Hakkinda sayfasindaki rakamlar burada, WORKS'ten turetiliyor.
 *
 * Sayfada elle yazilmis sayi birakmayin: proje eklendiginde/cikarildiginda
 * burasi kendiliginden guncellenir. Modul seviyesinde hesaplandigi icin
 * maliyeti build aninda, calisma aninda degil.
 */

/** Studyonun kurulus yili — WORKS'ten turetilemez, tek elle girilen deger. */
export const FOUNDED_YEAR = 2021;

/** `kind` alani "Disiplin · Sektor" bicimindedir; ilk parca disiplindir. */
export function disciplineOf(kind: string): string {
  return kind.split('·')[0].trim();
}

/**
 * Calisma alanlari.
 *
 * `kind` alanindaki disiplin tek basina yaniltici: kayitlarin 32'si "Web Design"
 * oldugu icin studyo yalnizca site yapiyormus gibi gorunuyor. Oysa ayni isin
 * icinde otomasyon, entegrasyon, cok dillilik de var. Bu yuzden alanlar
 * ORTUSMELI: bir proje birden fazla alana girebilir.
 *
 * Alan siralamasi sabit ve elle verilmis — proje sayisina gore siralamak
 * yine web'i one atardi, oysa bunlar esit agirlikta uzmanlik alanlari.
 */
export type AreaKey =
  | 'web'
  | 'product'
  | 'ai'
  | 'automation'
  | 'commerce'
  | 'growth';

type AreaRule = {
  /** `kind` alanindaki disiplinler (ilk parca) */
  disciplines: string[];
  /** `tags` icinde bunlardan biri gecerse alan sayilir */
  tags: string[];
};

const AREA_RULES: Record<AreaKey, AreaRule> = {
  web: {
    disciplines: ['Web Design', 'Web App'],
    tags: ['Responsive', 'Landing Page', 'Portfolio', 'Corporate', 'CMS',
           'WordPress', 'Personal Brand', 'Interactive', '3D', 'Animation'],
  },
  product: {
    disciplines: ['Web App', 'SaaS', 'Simulation'],
    tags: ['SaaS', 'Platform', 'Full-Stack', 'Next.js', 'Node.js', 'Booking',
           'Trading', 'Fintech', 'Developer Tool'],
  },
  ai: {
    disciplines: ['AI / ML'],
    tags: ['Python', 'AI', 'Computer Vision', 'Deep Learning'],
  },
  automation: {
    disciplines: ['Automation'],
    tags: ['Automation', 'Backend', 'Data'],
  },
  commerce: {
    disciplines: ['E-commerce'],
    tags: ['E-commerce'],
  },
  growth: {
    disciplines: [],
    tags: ['SEO', 'Multi-language'],
  },
};

export const AREA_KEYS = Object.keys(AREA_RULES) as AreaKey[];

/** Bir proje verilen alana giriyor mu? */
export function isInArea(work: Work, area: AreaKey): boolean {
  const rule = AREA_RULES[area];
  const discipline = disciplineOf(work.kind);
  if (rule.disciplines.includes(discipline)) return true;
  return (work.tags ?? []).some((tag) => rule.tags.includes(tag));
}

/** Alandaki projeler — filtre ve ornek listeleri icin */
export function worksInArea(area: AreaKey) {
  return WORKS.filter((w) => isInArea(w, area));
}

export type Bucket = {
  key: string;
  count: number;
  /** En kalabalik gruba gore 0-1 arasi oran — cubuk genisligi icin */
  ratio: number;
  /** O gruba dusen projeler, yeniden eskiye */
  slugs: string[];
};

function bucketize(pairs: { key: string; slug: string }[]): Bucket[] {
  const map = new Map<string, string[]>();
  for (const { key, slug } of pairs) {
    const list = map.get(key);
    if (list) list.push(slug);
    else map.set(key, [slug]);
  }
  const rows = [...map.entries()]
    .map(([key, slugs]) => ({ key, count: slugs.length, ratio: 0, slugs }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
  const top = rows[0]?.count ?? 1;
  for (const r of rows) r.ratio = r.count / top;
  return rows;
}

/** Disiplin dagilimi — Web Design, Web App, AI / ML, Automation, SaaS ... */
export const DISCIPLINES: Bucket[] = bucketize(
  WORKS.map((w) => ({ key: disciplineOf(w.kind), slug: w.slug }))
);

/** Yetenek/teknoloji dagilimi — `tags` alanindan */
export const CAPABILITIES: Bucket[] = bucketize(
  WORKS.flatMap((w) => (w.tags ?? []).map((tag) => ({ key: tag, slug: w.slug })))
);

export type YearEntry = {
  year: number;
  count: number;
  /** O yilin disiplin dagilimi, coktan aza */
  disciplines: { key: string; count: number }[];
  /** Vitrine cikacak birkac proje */
  highlights: string[];
};

/**
 * Kurulus yilindan bugune kesintisiz yil seridi. Proje kaydi olmayan yillar
 * da (2021, 2023) seride kalir — bosluk atlamak zaman algisini bozar.
 */
export const TIMELINE: YearEntry[] = (() => {
  const years = WORKS.map((w) => Number(w.year)).filter((y) => Number.isFinite(y));
  const last = Math.max(FOUNDED_YEAR, ...years);
  const out: YearEntry[] = [];
  for (let year = FOUNDED_YEAR; year <= last; year++) {
    const inYear = WORKS.filter((w) => Number(w.year) === year);
    const byDiscipline = bucketize(
      inYear.map((w) => ({ key: disciplineOf(w.kind), slug: w.slug }))
    );
    out.push({
      year,
      count: inYear.length,
      disciplines: byDiscipline.map(({ key, count }) => ({ key, count })),
      // Onizlemesi olanlar once — detay sayfasinda gosterecek gorseli var demektir
      highlights: [...inYear]
        .sort((a, b) => Number(Boolean(b.previews?.desktop)) - Number(Boolean(a.previews?.desktop)))
        .slice(0, 3)
        .map((w) => w.slug),
    });
  }
  return out;
})();

/**
 * Kendi urunlerimizde `client` alani studyonun adidir — musteri sayimina girmemeli.
 * Bu ad data.ts'te degisirse burasi da guncellenmeli.
 */
const SELF_CLIENT = 'Piton Studios';

export const STUDIO = {
  projects: WORKS.length,
  disciplines: DISCIPLINES.length,
  /** Tekil musteri — kendi urunlerimiz haric */
  clients: new Set(WORKS.map((w) => w.client).filter((c) => c !== SELF_CLIENT)).size,
  /** Studyonun kendi urunleri */
  selfBuilt: WORKS.filter((w) => w.client === SELF_CLIENT).length,
  /** Kurulustan bu yana gecen yil — verideki en son yila gore */
  years: Math.max(...TIMELINE.map((t) => t.year)) - FOUNDED_YEAR + 1,
} as const;

/** slug -> baslik, cevirisi yoksa yedek olarak kullanilir */
export const TITLE_BY_SLUG: Record<string, string> = Object.fromEntries(
  WORKS.map((w) => [w.slug, w.title])
);
