/**
 * SSS (FAQ) sayfasinin kanonik yapisi.
 *
 * Metinler burada DEGIL — `src/messages/{tr,en,ru}.json` icindeki `faqItems`
 * namespace'inde tutulur. Burada yalnizca degismeyen yapi var: kategori sirasi,
 * soru id'leri ve ilgili ic linkler.
 *
 * `id` alanlari **kalici anchor**tir (`#faq-{id}`). Bir soru silinmedikce id'si
 * asla degistirilmez — LLM'ler ve harici siteler bu adreslere atif yapar.
 *
 * Plan: piton-plans/faq-page-plan.md
 */

/** Sayfanin gorunur "son guncelleme" tarihi; JSON-LD `dateModified` ile ayni. */
export const FAQ_UPDATED = '2026-08-14';

export interface FaqCategory {
  /** messages.faqPage.categories.<id> anahtari */
  id: string;
  /** Gorsel numara — "01", "02" ... */
  n: string;
}

export interface FaqItem {
  /** Kalici anchor id — messages.faqItems.<id> anahtari */
  id: string;
  /** Ait oldugu kategori id'si */
  cat: string;
  /** Ilgili hizmet slug'lari — SERVICES icindeki slug'lar */
  services?: string[];
  /** Ilgili blog yazilari — frontmatter `translationKey` degerleri */
  posts?: string[];
  /** Sayfa basindaki "en cok sorulanlar" seridinde gosterilir */
  featured?: boolean;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { id: 'studio', n: '01' },
  { id: 'services', n: '02' },
  { id: 'pricing', n: '03' },
  { id: 'process', n: '04' },
  { id: 'tech', n: '05' },
  { id: 'seo', n: '06' },
  { id: 'ai', n: '07' },
  { id: 'ecommerce', n: '08' },
  { id: 'mobile', n: '09' },
  { id: 'support', n: '10' },
  { id: 'legal', n: '11' },
  { id: 'working', n: '12' },
];

export const FAQ_ITEMS: FaqItem[] = [
  // ── 01 studio ────────────────────────────────────────────
  { id: 'what-is-piton-studios', cat: 'studio', featured: true },
  { id: 'where-are-you-located', cat: 'studio' },
  { id: 'team-size', cat: 'studio' },
  { id: 'why-choose-you', cat: 'studio' },
  { id: 'saiber-partnership', cat: 'studio' },
  { id: 'portfolio-proof', cat: 'studio' },

  // ── 02 services ──────────────────────────────────────────
  { id: 'services-overview', cat: 'services', featured: true },
  { id: 'small-projects', cat: 'services' },
  { id: 'redesign-existing-site', cat: 'services', services: ['web-design'] },
  { id: 'branding-and-design', cat: 'services', services: ['web-design'] },
  { id: 'content-and-copy', cat: 'services', services: ['seo-geo'] },
  { id: 'white-label', cat: 'services' },
  { id: 'industries', cat: 'services' },

  // ── 03 pricing ───────────────────────────────────────────
  { id: 'website-cost', cat: 'pricing', featured: true, services: ['web-design'], posts: ['website-cost'] },
  { id: 'pricing-model', cat: 'pricing' },
  { id: 'whats-included-in-price', cat: 'pricing' },
  { id: 'payment-schedule', cat: 'pricing' },
  { id: 'ecommerce-cost', cat: 'pricing', services: ['web-app'], posts: ['website-cost', 'ecommerce-cro'] },
  { id: 'ai-automation-cost', cat: 'pricing', services: ['automation', 'ai-integration'], posts: ['ai-automation-roi'] },
  { id: 'running-costs', cat: 'pricing', services: ['cloud-ecosystem'] },
  { id: 'budget-too-low', cat: 'pricing', posts: ['website-cost'] },

  // ── 04 process ───────────────────────────────────────────
  { id: 'how-project-starts', cat: 'process', featured: true, posts: ['project-process'] },
  { id: 'project-timeline', cat: 'process', posts: ['project-process'] },
  { id: 'discovery-phase', cat: 'process', posts: ['project-process'] },
  { id: 'revisions', cat: 'process', services: ['web-design'] },
  { id: 'client-involvement', cat: 'process' },
  { id: 'project-communication', cat: 'process' },
  { id: 'launch-checklist', cat: 'process', posts: ['fast-website'] },

  // ── 05 tech ──────────────────────────────────────────────
  { id: 'tech-stack', cat: 'tech', featured: true, services: ['web-app'] },
  { id: 'nextjs-vs-wordpress', cat: 'tech', services: ['web-design', 'web-app'], posts: ['nextjs-vs-wordpress'] },
  { id: 'cms-and-editing', cat: 'tech', services: ['web-app'] },
  { id: 'hosting-and-deployment', cat: 'tech', services: ['cloud-ecosystem'] },
  { id: 'performance', cat: 'tech', posts: ['fast-website'] },
  { id: 'accessibility', cat: 'tech', services: ['web-design'] },
  { id: 'multilingual', cat: 'tech', services: ['web-design'], posts: ['multilingual-site'] },

  // ── 06 seo ───────────────────────────────────────────────
  { id: 'seo-included', cat: 'seo', services: ['seo-geo'] },
  { id: 'what-is-geo', cat: 'seo', featured: true, services: ['seo-geo'], posts: ['seo-to-geo'] },
  { id: 'llm-visibility', cat: 'seo', services: ['seo-geo'], posts: ['seo-to-geo'] },
  { id: 'seo-timeline', cat: 'seo', services: ['seo-geo'] },
  { id: 'structured-data', cat: 'seo', services: ['seo-geo'], posts: ['seo-to-geo'] },
  { id: 'migration-seo', cat: 'seo', services: ['seo-geo'] },
  { id: 'google-ads-vs-seo', cat: 'seo', services: ['google-ads', 'seo-geo'] },

  // ── 07 ai ────────────────────────────────────────────────
  { id: 'ai-use-cases', cat: 'ai', featured: true, services: ['ai-integration', 'ai-consulting'], posts: ['ai-automation-roi'] },
  { id: 'chatbot-on-site', cat: 'ai', services: ['ai-integration'] },
  { id: 'which-llm', cat: 'ai', services: ['ai-integration', 'agentic-ai'] },
  { id: 'ai-data-privacy', cat: 'ai', services: ['ai-integration'] },
  { id: 'hallucination', cat: 'ai', services: ['ai-integration', 'agentic-ai'] },
  { id: 'automation-tools', cat: 'ai', services: ['automation'] },
  { id: 'ai-roi', cat: 'ai', services: ['ai-consulting'], posts: ['ai-automation-roi'] },

  // ── 08 ecommerce ─────────────────────────────────────────
  { id: 'ecommerce-platform', cat: 'ecommerce', services: ['web-app'], posts: ['nextjs-vs-wordpress'] },
  { id: 'payment-integration', cat: 'ecommerce', services: ['web-app'] },
  { id: 'marketplace-integration', cat: 'ecommerce', services: ['automation'] },
  { id: 'conversion-optimization', cat: 'ecommerce', services: ['seo-geo'], posts: ['ecommerce-cro'] },
  { id: 'ecommerce-migration', cat: 'ecommerce', services: ['web-app'], posts: ['ecommerce-cro'] },

  // ── 09 mobile ────────────────────────────────────────────
  { id: 'native-vs-pwa', cat: 'mobile', services: ['progressive-web-app'] },
  { id: 'app-store-publishing', cat: 'mobile', services: ['progressive-web-app'] },
  { id: 'mobile-responsive', cat: 'mobile', services: ['web-design'], posts: ['fast-website'] },
  { id: 'offline-support', cat: 'mobile', services: ['progressive-web-app'] },

  // ── 10 support ───────────────────────────────────────────
  { id: 'after-launch-support', cat: 'support', featured: true },
  { id: 'maintenance-packages', cat: 'support' },
  { id: 'bug-warranty', cat: 'support' },
  { id: 'response-time', cat: 'support' },
  { id: 'backups-and-uptime', cat: 'support', services: ['cloud-ecosystem'] },
  { id: 'security-updates', cat: 'support', services: ['cloud-ecosystem'] },

  // ── 11 legal ─────────────────────────────────────────────
  { id: 'who-owns-the-code', cat: 'legal', featured: true },
  { id: 'contract-and-nda', cat: 'legal' },
  { id: 'kvkk-gdpr', cat: 'legal', services: ['data-engineering'] },
  { id: 'data-storage-location', cat: 'legal', services: ['cloud-ecosystem', 'data-engineering'] },
  { id: 'portfolio-usage', cat: 'legal' },
  { id: 'exit-and-handover', cat: 'legal' },

  // ── 12 working ───────────────────────────────────────────
  { id: 'remote-work', cat: 'working' },
  { id: 'languages-spoken', cat: 'working' },
  { id: 'contact-channels', cat: 'working', featured: true },
  { id: 'response-to-inquiry', cat: 'working' },
  { id: 'international-clients', cat: 'working' },
];

/** Bir kategorinin sorularini sirayla dondurur. */
export function getFaqByCategory(cat: string): FaqItem[] {
  return FAQ_ITEMS.filter((item) => item.cat === cat);
}

/** Sayfa basindaki one cikan sorular. */
export function getFeaturedFaq(): FaqItem[] {
  return FAQ_ITEMS.filter((item) => item.featured);
}

/** Toplam soru sayisi — arayuzde ve metadata'da kullanilir. */
export const FAQ_COUNT = FAQ_ITEMS.length;
