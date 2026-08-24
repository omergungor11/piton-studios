/**
 * Sektorel landing sayfalarinin veri katmani.
 *
 * Metinler burada DEGIL — `messages/*.json` icindeki `sectorItems.{slug}` altinda durur
 * (anahtar sozlesmesi: title, metaTitle, metaDescription, intro, bullets.1..5,
 * painTitle, painPoints.1..3, ctaText). Bu dosya yalnizca yapiyi tutar:
 * hangi sektor hangi projelere, hizmetlere, SSS sorularina ve blog yazilarina baglanir.
 */

export interface Sector {
  /** Rota slug'i — tum dillerde ayni (projects/[slug] konvansiyonu). */
  slug: string;
  /** Kart/listede kullanilan dekoratif glif. */
  icon?: string;
  /** WORKS icindeki gercek proje slug'lari — sektorun en guclu isleri. */
  workSlugs: string[];
  /** SERVICES icindeki gercek hizmet slug'lari. */
  serviceSlugs: string[];
  /** src/lib/faq.ts FAQ_ITEMS id'leri — /faq#faq-{id} anchor'ina baglanir. */
  faqIds: string[];
  /**
   * Blog yazilarinin `translationKey` degerleri (dosya slug'lari dile gore degistigi
   * icin slug degil translationKey tutulur; sayfa getAllPosts ile dile cozer).
   */
  blogSlugs?: string[];
}

export const SECTORS: Sector[] = [
  {
    slug: "corporate",
    icon: "◳",
    workSlugs: [
      "bt-elevator",
      "arslan-group",
      "rnv-trading",
      "alp-sigorta",
      "alert-muhendislik",
      "ekh-yapi",
    ],
    serviceSlugs: ["web-design", "seo-geo", "google-ads"],
    faqIds: [
      "website-cost",
      "project-timeline",
      "seo-included",
      "multilingual",
      "after-launch-support",
    ],
    blogSlugs: ["project-process", "website-cost", "fast-website"],
  },
  {
    slug: "real-estate",
    icon: "⌂",
    workSlugs: [
      "nexos-investment",
      "pampas-investment",
      "pinnacle-yatirim",
      "arslan-estates",
      "homes-in-mediterranean",
      "emlak-sync",
    ],
    serviceSlugs: ["web-design", "web-app", "automation", "seo-geo"],
    faqIds: ["industries", "website-cost", "automation-tools", "multilingual"],
    blogSlugs: ["multilingual-site", "website-cost", "seo-to-geo"],
  },
  {
    slug: "transportation",
    icon: "➔",
    workSlugs: [
      "welcome-pickups",
      "kibris-lefkosa-taksi",
      "aydin-transfer",
      "kardesler-taxi",
      "jet-transfer-cyprus",
    ],
    serviceSlugs: ["web-design", "web-app", "google-ads"],
    faqIds: [
      "website-cost",
      "google-ads-vs-seo",
      "mobile-responsive",
      "project-timeline",
    ],
    blogSlugs: ["fast-website", "website-cost"],
  },
  {
    slug: "finance",
    icon: "◈",
    workSlugs: [
      "halas-exchange",
      "arslan-coin-center",
      "holly-trader",
      "odeme-takip-botu",
    ],
    serviceSlugs: ["web-design", "web-app", "automation"],
    faqIds: ["kvkk-gdpr", "data-storage-location", "tech-stack", "website-cost"],
    blogSlugs: ["ai-automation-roi", "website-cost"],
  },
  {
    slug: "e-commerce",
    icon: "⊞",
    workSlugs: ["ambalaj-cini", "beton-store", "boon-fresh"],
    serviceSlugs: ["web-app", "seo-geo", "google-ads", "automation"],
    faqIds: [
      "ecommerce-cost",
      "ecommerce-platform",
      "payment-integration",
      "conversion-optimization",
      "ecommerce-migration",
    ],
    blogSlugs: ["ecommerce-cro", "nextjs-vs-wordpress", "website-cost"],
  },
  {
    slug: "restaurant",
    icon: "◍",
    workSlugs: ["boon-fresh", "virginia-ice-cream"],
    serviceSlugs: ["web-design", "seo-geo", "google-ads"],
    faqIds: [
      "website-cost",
      "google-ads-vs-seo",
      "mobile-responsive",
      "seo-included",
    ],
    blogSlugs: ["fast-website", "website-cost"],
  },
  {
    slug: "tourism",
    icon: "✈",
    workSlugs: [
      "sammys-hotel",
      "welcome-pickups",
      "jet-transfer-cyprus",
      "aydin-transfer",
    ],
    serviceSlugs: ["web-design", "web-app", "seo-geo", "google-ads"],
    faqIds: [
      "multilingual",
      "website-cost",
      "google-ads-vs-seo",
      "seo-included",
    ],
    blogSlugs: ["multilingual-site", "website-cost", "seo-to-geo"],
  },
  {
    slug: "health",
    icon: "✚",
    workSlugs: ["dental-health"],
    serviceSlugs: ["web-design", "seo-geo", "google-ads"],
    faqIds: [
      "website-cost",
      "kvkk-gdpr",
      "project-timeline",
      "mobile-responsive",
    ],
    blogSlugs: ["website-cost", "project-process"],
  },
  {
    slug: "construction",
    icon: "▲",
    workSlugs: ["ekh-yapi", "beton-store", "alert-muhendislik"],
    serviceSlugs: ["web-design", "seo-geo", "google-ads"],
    faqIds: [
      "website-cost",
      "project-timeline",
      "seo-included",
      "after-launch-support",
    ],
    blogSlugs: ["website-cost", "project-process"],
  },
  {
    slug: "education",
    icon: "◆",
    // Portfoyde egitim projesi yok — bilincli olarak referanssiz sektor sayfasi.
    workSlugs: [],
    serviceSlugs: ["web-design", "web-app", "ai-integration"],
    faqIds: [
      "website-cost",
      "project-timeline",
      "multilingual",
      "after-launch-support",
    ],
    blogSlugs: ["website-cost", "project-process"],
  },
  {
    slug: "beauty",
    icon: "❋",
    // Portfoyde guzellik/bakim projesi yok — bilincli olarak referanssiz sektor sayfasi.
    workSlugs: [],
    serviceSlugs: ["web-design", "seo-geo", "google-ads"],
    faqIds: [
      "website-cost",
      "mobile-responsive",
      "seo-included",
      "project-timeline",
    ],
    blogSlugs: ["website-cost", "fast-website"],
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

export function getAllSectorSlugs(): string[] {
  return SECTORS.map((s) => s.slug);
}

/**
 * Mesaj agacindan guvenli string okuma. `sectorItems` namespace'i ceviriler
 * gelene kadar hic bulunmayabilir; getTranslations eksik namespace'te hata
 * logladigindan ham mesaj objesi uzerinden okunur (bkz. faq-content.ts deseni).
 */
export function messageString(
  messages: unknown,
  path: readonly string[]
): string | undefined {
  let node: unknown = messages;
  for (const key of path) {
    if (typeof node !== "object" || node === null) return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  return typeof node === "string" ? node : undefined;
}

/** sectorItems.{slug}.{key} kisayolu. */
export function sectorText(
  messages: unknown,
  slug: string,
  key: string
): string | undefined {
  return messageString(messages, ["sectorItems", slug, ...key.split(".")]);
}

/** Ceviri gelene kadar kullanilan son care baslik: "real-estate" -> "Real Estate". */
export function sectorFallbackTitle(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
