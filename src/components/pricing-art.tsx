'use client';

import { SERVICE_ART } from '@/components/service-visuals';

/**
 * Fiyat kartindaki hero sahnesi — hizmet sayfalarindaki SVG sahnelerin aynisi.
 * SERVICE_ART bir istemci modulu oldugu icin arama burada yapilir; sunucu
 * bileseninden slug'a gore bilesen secmek mumkun degil.
 */
export default function PricingArt({ slug, label }: { slug: string; label: string }) {
  const Art = SERVICE_ART[slug];
  if (!Art) return null;

  return (
    <div className="sv-stage pricing-art" data-reveal="mask">
      <Art label={label} />
    </div>
  );
}
