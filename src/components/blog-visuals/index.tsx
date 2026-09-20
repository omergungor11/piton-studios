'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

import type { BlogArtKey } from './art-keys';

export type ArtProps = { label: string };

/**
 * Yazinin `translationKey`'i → hero sahnesi. Sahneler dil bagimsizdir (kelime icermezler),
 * bu yuzden tr/en/ru ayni sahneyi paylasir. Her sahne `next/dynamic` ile ayri chunk:
 * bir yazi sayfasi yalnizca kendi sahnesini indirir. Sahnesi olmayan yazi eski duzende kalir.
 */
export const BLOG_ART: Record<BlogArtKey, ComponentType<ArtProps>> = {
  'accessible-web-design-forms': dynamic(() => import('./art/accessible-web-design-forms')),
  'agency-vs-freelancer': dynamic(() => import('./art/agency-vs-freelancer')),
  'ai-automation-roi': dynamic(() => import('./art/ai-automation-roi')),
  'ai-impact-on-web-design-and-coding': dynamic(() => import('./art/ai-impact-on-web-design-and-coding')),
  'b2b-landing-page-lead-generation': dynamic(() => import('./art/b2b-landing-page-lead-generation')),
  'ecommerce-cro': dynamic(() => import('./art/ecommerce-cro')),
  'erp-vs-excel': dynamic(() => import('./art/erp-vs-excel')),
  'fast-website': dynamic(() => import('./art/fast-website')),
  'google-ads-vs-seo': dynamic(() => import('./art/google-ads-vs-seo')),
  'multilingual-site': dynamic(() => import('./art/multilingual-site')),
  'nextjs-vs-wordpress': dynamic(() => import('./art/nextjs-vs-wordpress')),
  'project-process': dynamic(() => import('./art/project-process')),
  'pwa-vs-native-app': dynamic(() => import('./art/pwa-vs-native-app')),
  'seo-to-geo': dynamic(() => import('./art/seo-to-geo')),
  'shopify-vs-custom-ecommerce': dynamic(() => import('./art/shopify-vs-custom-ecommerce')),
  'site-builder-vs-professional-website': dynamic(() => import('./art/site-builder-vs-professional-website')),
  'website-cost': dynamic(() => import('./art/website-cost')),
  'website-maintenance': dynamic(() => import('./art/website-maintenance')),
  'website-redesign-seo-migration': dynamic(() => import('./art/website-redesign-seo-migration')),
  'whatsapp-business-api': dynamic(() => import('./art/whatsapp-business-api')),
};

/**
 * Yazi govdesinde `<BlogFigure name="…" />` ile kullanilan ikinci sema.
 * Yalnizca semasi anlam tasiyan konularda var — her yaziya zorlanmaz.
 */
export const BLOG_FIGURES: Record<string, ComponentType<ArtProps>> = {
  'accessible-web-design-forms': dynamic(() => import('./art/accessible-web-design-forms-figure')),
  'ai-automation-roi': dynamic(() => import('./art/ai-automation-roi-figure')),
  'b2b-landing-page-lead-generation': dynamic(() => import('./art/b2b-landing-page-lead-generation-figure')),
  'ecommerce-cro': dynamic(() => import('./art/ecommerce-cro-figure')),
  'fast-website': dynamic(() => import('./art/fast-website-figure')),
  'multilingual-site': dynamic(() => import('./art/multilingual-site-figure')),
  'nextjs-vs-wordpress': dynamic(() => import('./art/nextjs-vs-wordpress-figure')),
  'website-redesign-seo-migration': dynamic(() => import('./art/website-redesign-seo-migration-figure')),
  'whatsapp-business-api': dynamic(() => import('./art/whatsapp-business-api-figure')),
};
