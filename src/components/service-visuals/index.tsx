'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

export type ArtProps = { label: string };

/**
 * Hizmet slug'i → hero sahnesi. Her sahne ayri chunk: sayfa yalnizca kendi sahnesini yukler.
 * Sahnesi olmayan hizmette hero eski duzende (ikonlu) kalir.
 */
export const SERVICE_ART: Record<string, ComponentType<ArtProps>> = {
  'web-design': dynamic(() => import('./art/web-design')),
  'custom-software': dynamic(() => import('./art/custom-software')),
  'web-app': dynamic(() => import('./art/web-app')),
  'mobile-app': dynamic(() => import('./art/mobile-app')),
  'progressive-web-app': dynamic(() => import('./art/progressive-web-app')),
  'ecommerce': dynamic(() => import('./art/ecommerce')),
  'erp-crm': dynamic(() => import('./art/erp-crm')),
  'automation': dynamic(() => import('./art/automation')),
  'whatsapp-chatbot': dynamic(() => import('./art/whatsapp-chatbot')),
  'ai-integration': dynamic(() => import('./art/ai-integration')),
  'ai-consulting': dynamic(() => import('./art/ai-consulting')),
  'data-engineering': dynamic(() => import('./art/data-engineering')),
  'cloud-ecosystem': dynamic(() => import('./art/cloud-ecosystem')),
  'google-ads': dynamic(() => import('./art/google-ads')),
  'meta-ads': dynamic(() => import('./art/meta-ads')),
  'seo-geo': dynamic(() => import('./art/seo-geo')),
  'maintenance-support': dynamic(() => import('./art/maintenance-support')),
  'how-to-do': dynamic(() => import('./art/how-to-do')),
};

export { default as ServiceFlow } from './service-flow';
export { SERVICE_FLOWS } from './flows';
