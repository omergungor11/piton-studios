/**
 * Hizmet x sektor cozum sayfalari (`/cozumler/[slug]`). Metinler
 * `messages/*.json` → `solutionItems.{slug}` (sozlesme: src/lib/landing.ts).
 *
 * Sektor sayfasi "<sektor> web sitesi" niyetini hedefler; cozum sayfasi o sektordeki
 * tek bir hizmetin daha dar niyetini (ornegin "emlak SEO") — ayni metni tekrar etmez.
 */
import type { LandingEntry } from "@/lib/landing";

export interface Solution extends Omit<LandingEntry, "serviceSlugs"> {
  serviceSlug: string;
  sectorSlug: string;
}

type Links = Pick<Solution, "workSlugs" | "faqIds" | "blogKeys">;

const s = (
  slug: string,
  serviceSlug: string,
  sectorSlug: string,
  links: Links = { workSlugs: [], faqIds: [], blogKeys: [] }
): Solution => ({ slug, serviceSlug, sectorSlug, ...links });

export const SOLUTIONS: Solution[] = [
  s("real-estate-listing-software", "web-app", "real-estate", { workSlugs: ["nexos-investment", "emlak-sync"], faqIds: ["tech-stack", "automation-tools", "website-cost", "multilingual"], blogKeys: ["website-cost", "multilingual-site", "nextjs-vs-wordpress"] }),
  s("real-estate-seo", "seo-geo", "real-estate", { workSlugs: ["arslan-estates", "homes-in-mediterranean"], faqIds: ["what-is-geo", "structured-data", "multilingual", "seo-timeline"], blogKeys: ["seo-to-geo", "multilingual-site"] }),
  s("transfer-booking-system", "web-app", "transportation", { workSlugs: ["jet-transfer-cyprus", "aydin-transfer", "kibris-lefkosa-taksi", "kardesler-taxi", "welcome-pickups"], faqIds: ["tech-stack", "website-cost", "mobile-responsive", "project-timeline"], blogKeys: ["fast-website", "website-cost"] }),
  s("hotel-booking-website", "web-design", "tourism", { workSlugs: ["sammys-hotel"], faqIds: ["multilingual", "website-cost", "seo-included", "project-timeline"], blogKeys: ["website-cost", "fast-website"] }),
  s("ecommerce-seo", "seo-geo", "e-commerce", { workSlugs: ["beton-store", "boon-fresh"], faqIds: ["conversion-optimization", "ecommerce-platform", "what-is-geo", "structured-data"], blogKeys: ["ecommerce-cro", "seo-to-geo"] }),
  s("ecommerce-automation", "automation", "e-commerce", { workSlugs: ["ambalaj-cini", "emlak-sync"], faqIds: ["marketplace-integration", "automation-tools", "ai-automation-cost", "website-cost"], blogKeys: ["ai-automation-roi", "ecommerce-cro"] }),
  s("restaurant-google-ads", "google-ads", "restaurant", { workSlugs: ["boon-fresh", "virginia-ice-cream"], faqIds: ["google-ads-vs-seo", "website-cost", "mobile-responsive", "seo-included"], blogKeys: ["fast-website", "website-cost"] }),
  s("finance-automation", "automation", "finance", { workSlugs: ["odeme-takip-botu", "holly-trader"], faqIds: ["automation-tools", "ai-automation-cost", "kvkk-gdpr", "data-storage-location"], blogKeys: ["ai-automation-roi", "website-cost"] }),
  s("clinic-seo", "seo-geo", "health", { workSlugs: ["dental-health"], faqIds: ["seo-included", "what-is-geo", "structured-data", "kvkk-gdpr"], blogKeys: ["seo-to-geo", "project-process"] }),
  s("corporate-ai-assistant", "ai-integration", "corporate", { workSlugs: ["contentflow-ai", "bt-elevator", "arslan-group"], faqIds: ["ai-use-cases", "chatbot-on-site", "ai-data-privacy", "hallucination", "which-llm"], blogKeys: ["ai-automation-roi", "ai-impact-on-web-design-and-coding"] }),
  s("education-platform", "web-app", "education", { workSlugs: ["nexos-investment", "social-pro"], faqIds: ["tech-stack", "cms-and-editing", "project-timeline", "multilingual"], blogKeys: ["website-cost", "project-process"] }),
  s("beauty-appointment-system", "web-app", "beauty", { workSlugs: ["welcome-pickups", "jet-transfer-cyprus"], faqIds: ["website-cost", "mobile-responsive", "project-timeline", "tech-stack"], blogKeys: ["website-cost", "fast-website"] }),
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((x) => x.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return SOLUTIONS.map((x) => x.slug);
}

export function getSolutionsBySector(sectorSlug: string): Solution[] {
  return SOLUTIONS.filter((x) => x.sectorSlug === sectorSlug);
}

export function getSolutionsByService(serviceSlug: string): Solution[] {
  return SOLUTIONS.filter((x) => x.serviceSlug === serviceSlug);
}

/** Projeye atif yapan cozumler — vaka/proje sayfasindan cozume ic link icin. */
export function getSolutionsByWork(workSlug: string): Solution[] {
  return SOLUTIONS.filter((x) => x.workSlugs.includes(workSlug));
}

/** Footer "Kesfet" satirinda gosterilen one cikan cozumler (kisa adlar: messages → common.solutionsShort). */
export const FOOTER_SOLUTIONS = [
  "real-estate-listing-software",
  "transfer-booking-system",
  "ecommerce-seo",
  "clinic-seo",
  "finance-automation",
  "corporate-ai-assistant",
] as const;
