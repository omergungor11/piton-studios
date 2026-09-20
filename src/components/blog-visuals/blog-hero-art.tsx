'use client';

import { BLOG_ART } from '@/components/blog-visuals';
import { hasBlogArt } from '@/components/blog-visuals/art-keys';
import styles from './blog-visuals.module.css';

/**
 * Yazi hero sahnesi. BLOG_ART bir istemci modulu oldugu icin arama burada yapilir —
 * sunucu bileseninden anahtara gore bilesen secmek mumkun degil (pricing-art.tsx ile ayni sebep).
 *
 * Sahne dekoratiftir: konuyu basligin yaninda tekrar anlatir, metinde olmayan bir bilgi tasimaz —
 * bu yuzden erisilebilirlik agacindan cikarilir. Sahnesi olmayan yazida null doner, sayfa eski
 * duzeninde kalir.
 */
export default function BlogHeroArt({ artKey, label }: { artKey: string; label: string }) {
  if (!hasBlogArt(artKey)) return null;
  const Art = BLOG_ART[artKey];

  return (
    <div className={`sv-stage ${styles.hero}`} data-reveal="mask" aria-hidden="true">
      <Art label={label} />
    </div>
  );
}
