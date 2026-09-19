'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * Donusum olaylari (Vercel Web Analytics, cerezsiz). Sitedeki tum WhatsApp, telefon ve e-posta
 * linklerini tek bir belge dinleyicisiyle yakalar — link nerede olursa olsun (menu, footer,
 * hizmet CTA'si, MDX icerigi) ayrica isaretlemek gerekmez. Form gonderimi `contact.tsx`'te izlenir.
 *
 * Olaya kisisel veri yazilmaz: yalnizca olay adi ve tiklandigi sayfanin yolu.
 * Not: Vercel'de ozel olaylar Pro planda raporlanir.
 */
const RULES: { event: string; match: (href: string) => boolean }[] = [
  { event: 'whatsapp_click', match: (href) => href.includes('wa.me/') || href.includes('whatsapp.com/') },
  { event: 'phone_click', match: (href) => href.startsWith('tel:') },
  { event: 'email_click', match: (href) => href.startsWith('mailto:') },
];

export default function ConversionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      const href = link?.getAttribute('href');
      if (!href) return;
      const rule = RULES.find((r) => r.match(href));
      if (rule) track(rule.event, { path: window.location.pathname });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
