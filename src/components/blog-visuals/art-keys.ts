/**
 * Hero sahnesi olan yazilarin `translationKey` listesi — sunucudan okunabilsin diye ayri dosya.
 * `BLOG_ART` bir istemci modulu ('use client' + next/dynamic), bu yuzden blog listesi gibi
 * sunucu bilesenleri ondan "bu yazinin sahnesi var mi" sorusunu soramaz.
 *
 * index.tsx'teki `BLOG_ART` bu listeye gore tiplenir: buraya anahtar eklenip sahne eklenmezse
 * (veya tersi) derleme hata verir, iki liste birbirinden kayamaz.
 */
export const BLOG_ART_KEYS = [
  'accessible-web-design-forms',
  'agency-vs-freelancer',
  'ai-automation-roi',
  'ai-impact-on-web-design-and-coding',
  'b2b-landing-page-lead-generation',
  'chatgpt-ads',
  'ecommerce-cro',
  'erp-vs-excel',
  'eu-ai-act-transparency',
  'fast-website',
  'google-ads-ai-max-migration',
  'google-ads-vs-seo',
  'google-ai-content-quality',
  'google-ai-search-controls',
  'multilingual-site',
  'nextjs-vs-wordpress',
  'november-sales-readiness',
  'project-process',
  'pwa-vs-native-app',
  'seo-to-geo',
  'shared-ai-training-control',
  'shopify-vs-custom-ecommerce',
  'site-builder-vs-professional-website',
  'soft-navigation-core-web-vitals',
  'turkiye-accessibility-circular',
  'turkiye-ai-action-plan',
  'website-cost',
  'website-maintenance',
  'website-redesign-seo-migration',
  'whatsapp-business-api',
  'whatsapp-service-message-pricing',
] as const;

export type BlogArtKey = (typeof BLOG_ART_KEYS)[number];

export function hasBlogArt(key: string): key is BlogArtKey {
  return (BLOG_ART_KEYS as readonly string[]).includes(key);
}
