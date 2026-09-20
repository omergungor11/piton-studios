'use client';

import { useEffect, useRef, useState } from 'react';
import { BLOG_ART } from '@/components/blog-visuals';
import { hasBlogArt } from '@/components/blog-visuals/art-keys';
import styles from './blog-visuals.module.css';

/**
 * Blog listesindeki kart gorseli — yazinin hero sahnesinin kucuk hali.
 * BLOG_ART istemci modulu oldugu icin arama burada yapilir (bkz. blog-hero-art.tsx).
 *
 * Sayfa basina 10 kart var; sahneler ayni anda inmesin diye chunk yalnizca kart ekrana
 * yaklasinca render edilir. Kutu oranli oldugu icin yukleme sirasinda duzen kaymaz.
 * Kartta zaten baslik ve aciklama oldugundan sahne dekoratiftir.
 */
const loaded = new Set<string>();

export default function BlogCardArt({ artKey, label }: { artKey: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(() => loaded.has(artKey));

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      const id = requestAnimationFrame(() => setShow(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loaded.add(artKey);
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, artKey]);

  if (!hasBlogArt(artKey)) return null;
  const Art = BLOG_ART[artKey];

  return (
    <div ref={ref} className={`sv-stage ${styles.cardStage}`} aria-hidden="true">
      {show ? <Art label={label} /> : null}
    </div>
  );
}
