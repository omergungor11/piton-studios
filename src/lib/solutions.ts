/**
 * Hizmet x sektor cozum sayfalari (`/cozumler/[slug]`). Metinler
 * `messages/*.json` → `solutionItems.{slug}` (sozlesme: src/lib/landing.ts).
 *
 * Sektor sayfasi o sektorun tum hizmetlerini gosteren hub'dir; cozum sayfasi tek bir hizmetin
 * o sektordeki benzersiz sorununu anlatir (ornegin "insaat ERP", "klinik WhatsApp randevu") —
 * birbirine benzeyen varyasyonlar eklenmez. URL'ler dile gore: src/lib/slugs.ts.
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
  s("transfer-booking-system", "web-app", "transportation", { workSlugs: ["jet-transfer-cyprus", "aydin-transfer", "kibris-lefkosa-taksi", "kardesler-taxi", "welcome-pickups"], faqIds: ["tech-stack", "website-cost", "mobile-responsive", "project-timeline"], blogKeys: ["fast-website", "website-cost"] }),
  s("hotel-booking-website", "web-design", "tourism", { workSlugs: ["sammys-hotel"], faqIds: ["multilingual", "website-cost", "seo-included", "project-timeline"], blogKeys: ["website-cost", "fast-website"] }),
  s("ecommerce-automation", "automation", "e-commerce", { workSlugs: ["ambalaj-cini", "emlak-sync"], faqIds: ["marketplace-integration", "automation-tools", "ai-automation-cost", "website-cost"], blogKeys: ["ai-automation-roi", "ecommerce-cro"] }),
  s("restaurant-google-ads", "google-ads", "restaurant", { workSlugs: ["boon-fresh", "virginia-ice-cream"], faqIds: ["google-ads-vs-seo", "website-cost", "mobile-responsive", "seo-included"], blogKeys: ["fast-website", "website-cost"] }),
  s("finance-automation", "automation", "finance", { workSlugs: ["odeme-takip-botu", "holly-trader"], faqIds: ["automation-tools", "ai-automation-cost", "kvkk-gdpr", "data-storage-location"], blogKeys: ["ai-automation-roi", "website-cost"] }),
  s("corporate-ai-assistant", "ai-integration", "corporate", { workSlugs: ["contentflow-ai", "bt-elevator", "arslan-group"], faqIds: ["ai-use-cases", "chatbot-on-site", "ai-data-privacy", "hallucination", "which-llm"], blogKeys: ["ai-automation-roi", "ai-impact-on-web-design-and-coding"] }),
  s("education-platform", "web-app", "education", { workSlugs: ["nexos-investment", "social-pro"], faqIds: ["tech-stack", "cms-and-editing", "project-timeline", "multilingual"], blogKeys: ["website-cost", "project-process"] }),
  s("beauty-appointment-system", "web-app", "beauty", { workSlugs: ["welcome-pickups", "jet-transfer-cyprus"], faqIds: ["website-cost", "mobile-responsive", "project-timeline", "tech-stack"], blogKeys: ["website-cost", "fast-website"] }),
  s("whatsapp-sales-bot", "whatsapp-chatbot", "e-commerce", { workSlugs: ["gel-gez-gor", "ambalaj-cini"], faqIds: ["chatbot-on-site", "ai-data-privacy", "marketplace-integration", "ecommerce-platform"], blogKeys: ["ai-automation-roi", "ecommerce-cro"] }),
  s("clinic-whatsapp-appointments", "whatsapp-chatbot", "health", { workSlugs: ["dental-health", "gel-gez-gor"], faqIds: ["kvkk-gdpr", "chatbot-on-site", "ai-data-privacy", "website-cost"], blogKeys: ["ai-automation-roi", "project-process"] }),
  s("real-estate-meta-ads", "meta-ads", "real-estate", { workSlugs: ["nexos-investment", "pinnacle-yatirim", "ambalaj-cini"], faqIds: ["google-ads-vs-seo", "multilingual", "industries", "website-cost"], blogKeys: ["multilingual-site", "website-cost"] }),
  s("engineering-quote-portal", "custom-software", "engineering", { workSlugs: ["nexos-investment", "odeme-takip-botu", "alert-muhendislik"], faqIds: ["tech-stack", "who-owns-the-code", "cms-and-editing", "project-timeline"], blogKeys: ["website-cost", "project-process"] }),
  s("finance-customer-portal", "custom-software", "finance", { workSlugs: ["odeme-takip-botu", "halas-exchange", "nexos-investment"], faqIds: ["kvkk-gdpr", "data-storage-location", "who-owns-the-code", "tech-stack"], blogKeys: ["ai-automation-roi", "website-cost"] }),
  s("hotel-maintenance-care", "maintenance-support", "tourism", { workSlugs: ["sammys-hotel", "jet-transfer-cyprus"], faqIds: ["after-launch-support", "backups-and-uptime", "maintenance-packages", "response-time"], blogKeys: ["fast-website", "website-cost"] }),
  s("real-estate-crm", "erp-crm", "real-estate", { workSlugs: ["nexos-investment", "emlak-sync", "fur-crm"], faqIds: ["tech-stack", "automation-tools", "data-storage-location", "website-cost"], blogKeys: ["ai-automation-roi", "website-cost"] }),
  s("construction-erp", "erp-crm", "construction", { workSlugs: ["fur-crm", "ambalaj-cini", "velis-ltd"], faqIds: ["tech-stack", "website-cost", "project-timeline", "who-owns-the-code"], blogKeys: ["website-cost", "project-process"] }),
  s("manufacturing-erp", "erp-crm", "industry", { workSlugs: ["fur-crm", "ambalaj-cini"], faqIds: ["tech-stack", "automation-tools", "website-cost", "who-owns-the-code"], blogKeys: ["ai-automation-roi", "website-cost"] }),
  s("b2b-dealer-portal", "ecommerce", "industry", { workSlugs: ["fur-crm", "ambalaj-cini"], faqIds: ["ecommerce-platform", "payment-integration", "marketplace-integration", "website-cost"], blogKeys: ["shopify-vs-custom-ecommerce", "b2b-landing-page-lead-generation"] }),
  s("restaurant-qr-ordering", "custom-software", "restaurant", { workSlugs: ["boon-fresh", "ambalaj-cini"], faqIds: ["website-cost", "mobile-responsive", "tech-stack", "project-timeline"], blogKeys: ["fast-website", "website-cost"] }),
  s("transfer-driver-app", "mobile-app", "transportation", { workSlugs: ["jet-transfer-cyprus", "aydin-transfer", "welcome-pickups"], faqIds: ["native-vs-pwa", "app-store-publishing", "mobile-responsive", "website-cost"], blogKeys: ["pwa-vs-native-app", "website-cost"] }),
  s("ecommerce-meta-ads", "meta-ads", "e-commerce", { workSlugs: ["ambalaj-cini"], faqIds: ["google-ads-vs-seo", "conversion-optimization", "website-cost", "ecommerce-platform"], blogKeys: ["ecommerce-cro", "google-ads-vs-seo"] }),
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
