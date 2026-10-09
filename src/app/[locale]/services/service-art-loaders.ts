import type { ComponentType } from 'react';

export type ServiceArtProps = { label: string };
type ServiceArtModule = { default: ComponentType<ServiceArtProps> };

/** Registry yalnizca import fonksiyonlarini tutar; sahneler viewport'a yaklasinca iner. */
export const SERVICE_ART_LOADERS: Record<string, () => Promise<ServiceArtModule>> = {
  'web-design': () => import('@/components/service-visuals/art/web-design'),
  'custom-software': () => import('@/components/service-visuals/art/custom-software'),
  'web-app': () => import('@/components/service-visuals/art/web-app'),
  'mobile-app': () => import('@/components/service-visuals/art/mobile-app'),
  'progressive-web-app': () => import('@/components/service-visuals/art/progressive-web-app'),
  ecommerce: () => import('@/components/service-visuals/art/ecommerce'),
  'erp-crm': () => import('@/components/service-visuals/art/erp-crm'),
  automation: () => import('@/components/service-visuals/art/automation'),
  'whatsapp-chatbot': () => import('@/components/service-visuals/art/whatsapp-chatbot'),
  'ai-integration': () => import('@/components/service-visuals/art/ai-integration'),
  'ai-consulting': () => import('@/components/service-visuals/art/ai-consulting'),
  'data-engineering': () => import('@/components/service-visuals/art/data-engineering'),
  'cloud-ecosystem': () => import('@/components/service-visuals/art/cloud-ecosystem'),
  'google-ads': () => import('@/components/service-visuals/art/google-ads'),
  'meta-ads': () => import('@/components/service-visuals/art/meta-ads'),
  'seo-geo': () => import('@/components/service-visuals/art/seo-geo'),
  'maintenance-support': () => import('@/components/service-visuals/art/maintenance-support'),
  'how-to-do': () => import('@/components/service-visuals/art/how-to-do'),
};

export function hasServiceArt(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(SERVICE_ART_LOADERS, slug);
}
