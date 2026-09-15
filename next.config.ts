import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { SLUGS, localizeSlug, type SlugKind } from "./src/lib/slugs";

const withNextIntl = createNextIntlPlugin();

type Redirect = { source: string; destination: string; permanent: boolean };
const LOCALES = ["tr", "en", "ru"] as const;

/**
 * Kaldirilan hizmetler -> anlamca en yakin kalan hizmet (kanonik kimlik).
 *
 * Bu sayfalar canlida yayindaydi ve sitemap'te yer aliyordu, yani indekslenmis
 * olabilirler. Kaldirinca 404 vermek hem birikmis SEO degerini atar hem de
 * disaridan verilmis linkleri kirar. Kalici yonlendirme ikisini de onler.
 */
const REMOVED_SERVICES: Record<string, string> = {
  "ai-training": "how-to-do",
  "ai-chatbot": "ai-integration",
  "prompt-engineering": "ai-integration",
  // 2026-09-15: Agentic AI kaldirildi — ajan/arac kullanan AI isleri AI Entegrasyonu altinda.
  "agentic-ai": "ai-integration",
};

/**
 * Slug turu -> dil basina yol segmenti. `old`: 2026-09-15 oncesi (ru ingilizce segment, slug = kimlik).
 * `now`: src/i18n/routing.ts ile ayni.
 */
const SEGMENTS: Record<SlugKind, { old: Record<string, string>; now: Record<string, string> }> = {
  services: { old: { tr: "hizmetler", en: "services", ru: "services" }, now: { tr: "hizmetler", en: "services", ru: "uslugi" } },
  sectors: { old: { tr: "sektorler", en: "sectors", ru: "sectors" }, now: { tr: "sektorler", en: "sectors", ru: "otrasli" } },
  solutions: { old: { tr: "cozumler", en: "solutions", ru: "solutions" }, now: { tr: "cozumler", en: "solutions", ru: "resheniya" } },
  locations: { old: { tr: "web-tasarim", en: "web-design", ru: "web-design" }, now: { tr: "web-tasarim", en: "web-design", ru: "veb-dizayn" } },
};

/** ru'da ingilizce kalan statik segmentler -> Latin harf cevirisi (routing.ts ile ayni). */
const RU_SEGMENTS: Record<string, string> = {
  projects: "proekty",
  "projects-v2": "proekty-v2",
  services: "uslugi",
  pricing: "tseny",
  sectors: "otrasli",
  locations: "regiony",
  "web-design": "veb-dizayn",
  solutions: "resheniya",
  faq: "voprosy",
  about: "o-nas",
  contact: "kontakty",
  privacy: "konfidentsialnost",
  cookies: "cookie-fayly",
  terms: "usloviya-ispolzovaniya",
};

/**
 * Kaldirilan cozumler (2026-09-15, SEO agirligi azaltildi) -> ilgili sektor hub'i (kanonik kimlik).
 */
const REMOVED_SOLUTIONS: Record<string, string> = {
  "real-estate-seo": "real-estate",
  "ecommerce-seo": "e-commerce",
  "clinic-seo": "health",
};

const redirect = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

/** Kaldirilan cozumler: eski ve yeni cozum segmenti altindaki kimlik -> sektor hub'inin yerel adresi. */
function removedSolutionRedirects(): Redirect[] {
  return Object.entries(REMOVED_SOLUTIONS).flatMap(([from, sector]) =>
    LOCALES.flatMap((locale) => {
      const { old, now } = SEGMENTS.solutions;
      const destination = `/${locale}/${SEGMENTS.sectors.now[locale]}/${localizeSlug("sectors", sector, locale)}`;
      const sources = new Set([`/${locale}/${old[locale]}/${from}`, `/${locale}/${now[locale]}/${from}`]);
      return [...sources].map((source) => redirect(source, destination));
    })
  );
}

/** Kaldirilan hizmetler: eski ve yeni segment altindaki eski kimlik -> hedef hizmetin yerel adresi. */
function removedServiceRedirects(): Redirect[] {
  return Object.entries(REMOVED_SERVICES).flatMap(([from, to]) =>
    LOCALES.flatMap((locale) => {
      const { old, now } = SEGMENTS.services;
      const destination = `/${locale}/${now[locale]}/${localizeSlug("services", to, locale)}`;
      const sources = new Set([`/${locale}/${old[locale]}/${from}`, `/${locale}/${now[locale]}/${from}`]);
      return [...sources].map((source) => redirect(source, destination));
    })
  );
}

/** Eski adres (eski segment + kimlik) -> yeni adres (yeni segment + yerel slug). Degismeyenler atlanir. */
function slugRedirects(): Redirect[] {
  const out: Redirect[] = [];
  for (const kind of Object.keys(SEGMENTS) as SlugKind[]) {
    const { old, now } = SEGMENTS[kind];
    for (const id of Object.keys(SLUGS[kind])) {
      for (const locale of LOCALES) {
        const source = `/${locale}/${old[locale]}/${id}`;
        const destination = `/${locale}/${now[locale]}/${localizeSlug(kind, id, locale)}`;
        if (source !== destination) out.push(redirect(source, destination));
      }
    }
  }
  return out;
}

/** Kalan eski ru segmentleri (slug eslemesi olmayan sayfalar, liste sayfalari). En sona konur. */
function ruSegmentRedirects(): Redirect[] {
  return [
    redirect("/ru/blog/tag/:tag", "/ru/blog/teg/:tag"),
    ...Object.entries(RU_SEGMENTS).flatMap(([from, to]) => [
      redirect(`/ru/${from}`, `/ru/${to}`),
      redirect(`/ru/${from}/:path*`, `/ru/${to}/:path*`),
    ]),
  ];
}

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    // Sira onemli: ilk eslesen kural uygulanir — ozelden genele.
    return [
      ...removedServiceRedirects(),
      ...removedSolutionRedirects(),
      ...slugRedirects(),
      ...ruSegmentRedirects(),
    ];
  },
};

export default withNextIntl(nextConfig);
