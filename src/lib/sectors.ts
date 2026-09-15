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
    workSlugs: ["bt-elevator", "arslan-group", "rnv-trading", "alp-sigorta", "alert-muhendislik", "ekh-yapi"],
    serviceSlugs: ["web-design", "custom-software", "erp-crm", "automation", "ai-integration", "seo-geo", "maintenance-support"],
    faqIds: ["website-cost", "tech-stack", "automation-tools", "ai-use-cases", "after-launch-support"],
    blogSlugs: ["project-process", "ai-automation-roi", "website-cost"],
  },
  {
    slug: "real-estate",
    icon: "⌂",
    workSlugs: ["nexos-investment", "pampas-investment", "pinnacle-yatirim", "arslan-estates", "homes-in-mediterranean", "emlak-sync"],
    serviceSlugs: ["web-design", "web-app", "automation", "whatsapp-chatbot", "seo-geo", "maintenance-support"],
    faqIds: ["industries", "website-cost", "automation-tools", "multilingual", "tech-stack"],
    blogSlugs: ["multilingual-site", "seo-to-geo", "website-cost"],
  },
  {
    slug: "transportation",
    icon: "➔",
    workSlugs: ["welcome-pickups", "kibris-lefkosa-taksi", "aydin-transfer", "kardesler-taxi", "jet-transfer-cyprus"],
    serviceSlugs: ["web-design", "web-app", "whatsapp-chatbot", "automation", "google-ads", "seo-geo"],
    faqIds: ["website-cost", "google-ads-vs-seo", "mobile-responsive", "automation-tools", "project-timeline"],
    blogSlugs: ["fast-website", "website-cost", "ai-automation-roi"],
  },
  {
    slug: "finance",
    icon: "◈",
    workSlugs: ["halas-exchange", "arslan-coin-center", "holly-trader", "odeme-takip-botu"],
    serviceSlugs: ["web-design", "web-app", "automation", "data-engineering", "whatsapp-chatbot", "seo-geo"],
    faqIds: ["kvkk-gdpr", "data-storage-location", "tech-stack", "website-cost", "automation-tools"],
    blogSlugs: ["ai-automation-roi", "website-cost"],
  },
  {
    slug: "e-commerce",
    icon: "⊞",
    workSlugs: ["ambalaj-cini", "beton-store", "boon-fresh"],
    serviceSlugs: ["ecommerce", "web-design", "google-ads", "meta-ads", "automation", "seo-geo"],
    faqIds: ["ecommerce-cost", "ecommerce-platform", "payment-integration", "conversion-optimization", "marketplace-integration"],
    blogSlugs: ["ecommerce-cro", "nextjs-vs-wordpress", "website-cost"],
  },
  {
    slug: "restaurant",
    icon: "◍",
    workSlugs: ["boon-fresh", "virginia-ice-cream"],
    serviceSlugs: ["web-design", "ecommerce", "automation", "whatsapp-chatbot", "seo-geo", "google-ads", "maintenance-support"],
    faqIds: ["website-cost", "chatbot-on-site", "automation-tools", "google-ads-vs-seo", "seo-included"],
    blogSlugs: ["website-cost", "fast-website", "ai-automation-roi"],
  },
  {
    slug: "tourism",
    icon: "✈",
    workSlugs: ["sammys-hotel", "welcome-pickups", "jet-transfer-cyprus", "aydin-transfer"],
    serviceSlugs: ["web-design", "web-app", "whatsapp-chatbot", "seo-geo", "google-ads", "maintenance-support"],
    faqIds: ["multilingual", "website-cost", "chatbot-on-site", "google-ads-vs-seo", "seo-included"],
    blogSlugs: ["multilingual-site", "website-cost", "seo-to-geo"],
  },
  {
    slug: "health",
    icon: "✚",
    workSlugs: ["dental-health"],
    serviceSlugs: ["web-design", "seo-geo", "whatsapp-chatbot", "automation", "google-ads", "maintenance-support"],
    faqIds: ["kvkk-gdpr", "chatbot-on-site", "automation-tools", "website-cost", "mobile-responsive"],
    blogSlugs: ["website-cost", "project-process"],
  },
  {
    slug: "construction",
    icon: "▲",
    workSlugs: ["ekh-yapi", "beton-store", "alert-muhendislik"],
    serviceSlugs: ["web-design", "ecommerce", "erp-crm", "custom-software", "seo-geo", "google-ads", "maintenance-support"],
    faqIds: ["website-cost", "ecommerce-cost", "automation-tools", "project-timeline", "after-launch-support"],
    blogSlugs: ["website-cost", "project-process", "ecommerce-cro"],
  },
  {
    slug: "engineering",
    icon: "⚙",
    workSlugs: ["alert-muhendislik", "bt-elevator"],
    serviceSlugs: ["web-design", "custom-software", "automation", "ai-integration", "seo-geo", "maintenance-support"],
    faqIds: ["website-cost", "tech-stack", "automation-tools", "ai-use-cases", "multilingual"],
    blogSlugs: ["website-cost", "ai-automation-roi", "project-process"],
  },
  {
    slug: "industry",
    icon: "⬡",
    workSlugs: ["fur-crm", "ambalaj-cini", "bt-elevator"],
    serviceSlugs: ["web-design", "erp-crm", "ecommerce", "automation", "whatsapp-chatbot", "ai-integration", "seo-geo"],
    faqIds: ["website-cost", "tech-stack", "automation-tools", "marketplace-integration", "ai-use-cases"],
    blogSlugs: ["b2b-landing-page-lead-generation", "ai-automation-roi", "website-cost"],
  },
  {
    slug: "education",
    icon: "◆",
    workSlugs: [],
    serviceSlugs: ["web-design", "web-app", "automation", "whatsapp-chatbot", "ai-integration", "seo-geo"],
    faqIds: ["website-cost", "cms-and-editing", "chatbot-on-site", "automation-tools", "multilingual"],
    blogSlugs: ["website-cost", "project-process", "accessible-web-design-forms"],
  },
  {
    slug: "beauty",
    icon: "❋",
    workSlugs: [],
    serviceSlugs: ["web-design", "whatsapp-chatbot", "automation", "seo-geo", "meta-ads", "google-ads"],
    faqIds: ["website-cost", "mobile-responsive", "chatbot-on-site", "automation-tools", "seo-included"],
    blogSlugs: ["website-cost", "fast-website", "google-ads-vs-seo"],
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
