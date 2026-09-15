/**
 * Sehir/bolge landing sayfalari (`/web-tasarim/[slug]`). Metinler
 * `messages/*.json` → `locationItems.{slug}` (sozlesme: src/lib/landing.ts).
 *
 * Projesi olmayan sehirlerde metin uzaktan hizmeti durustce anlatir —
 * yerel ofis, yerel musteri veya rakam uydurulmaz.
 */
import type { LandingEntry } from "@/lib/landing";

export interface Location extends LandingEntry {
  region: "cyprus" | "turkey";
}

export const LOCATIONS: Location[] = [
  { slug: "kktc", region: "cyprus", workSlugs: ["gel-gez-gor", "pampas-investment", "pinnacle-yatirim", "halas-exchange", "jet-transfer-cyprus", "sammys-hotel"], serviceSlugs: ["web-design", "web-app", "seo-geo", "google-ads"], faqIds: ["website-cost", "remote-work", "international-clients", "multilingual"], blogKeys: ["multilingual-site", "website-cost", "seo-to-geo"] },
  { slug: "lefkosa", region: "cyprus", workSlugs: ["kibris-lefkosa-taksi", "arslan-group", "arslan-coin-center", "all-pro-cyprus"], serviceSlugs: ["web-design", "seo-geo", "google-ads"], faqIds: ["website-cost", "remote-work", "project-timeline", "mobile-responsive"], blogKeys: ["website-cost", "fast-website", "project-process"] },
  { slug: "bilecik", region: "turkey", workSlugs: ["ambalaj-cini", "dolmus-kontrol"], serviceSlugs: ["web-design", "web-app", "automation", "seo-geo"], faqIds: ["website-cost", "project-timeline", "after-launch-support", "seo-included"], blogKeys: ["website-cost", "project-process"] },
  { slug: "eskisehir", region: "turkey", workSlugs: ["bt-elevator"], serviceSlugs: ["web-design", "seo-geo", "google-ads"], faqIds: ["website-cost", "seo-included", "project-timeline", "remote-work"], blogKeys: ["website-cost", "seo-to-geo"] },
  { slug: "bursa", region: "turkey", workSlugs: [], serviceSlugs: ["web-design", "web-app", "seo-geo"], faqIds: ["website-cost", "remote-work", "project-timeline", "google-ads-vs-seo"], blogKeys: ["website-cost", "nextjs-vs-wordpress"] },
  { slug: "istanbul", region: "turkey", workSlugs: ["nexos-investment", "fur-crm", "arslan-group", "ambalaj-cini", "alp-sigorta"], serviceSlugs: ["web-design", "web-app", "seo-geo", "automation"], faqIds: ["website-cost", "project-timeline", "tech-stack", "remote-work", "industries"], blogKeys: ["website-cost", "project-process", "seo-to-geo"] },
  { slug: "kutahya", region: "turkey", workSlugs: ["velis-ltd", "ambalaj-cini", "bt-elevator"], serviceSlugs: ["web-design", "seo-geo", "google-ads"], faqIds: ["website-cost", "project-timeline", "seo-included", "after-launch-support"], blogKeys: ["website-cost", "project-process", "fast-website"] },
  { slug: "antalya", region: "turkey", workSlugs: ["sammys-hotel", "welcome-pickups", "aydin-transfer", "jet-transfer-cyprus"], serviceSlugs: ["web-design", "web-app", "seo-geo", "google-ads"], faqIds: ["multilingual", "website-cost", "google-ads-vs-seo", "seo-included"], blogKeys: ["multilingual-site", "website-cost", "seo-to-geo"] },
  { slug: "izmit", region: "turkey", workSlugs: ["alert-muhendislik", "ekh-yapi", "rnv-trading", "beton-store"], serviceSlugs: ["web-design", "web-app", "seo-geo", "google-ads"], faqIds: ["website-cost", "project-timeline", "industries", "seo-included"], blogKeys: ["website-cost", "project-process", "fast-website"] },
  { slug: "izmir", region: "turkey", workSlugs: ["ambalaj-cini", "boon-fresh", "virginia-ice-cream", "dental-health"], serviceSlugs: ["web-design", "web-app", "seo-geo", "google-ads"], faqIds: ["website-cost", "mobile-responsive", "seo-included", "google-ads-vs-seo"], blogKeys: ["website-cost", "ecommerce-cro", "fast-website"] },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((l) => l.slug);
}
