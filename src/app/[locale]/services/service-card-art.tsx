'use client';

import { useEffect, useRef, useState } from 'react';
import { SERVICE_ART } from '@/components/service-visuals';
import styles from './services-list.module.css';

/**
 * Hizmet kartindaki kucuk sahne. SERVICE_ART istemci modulu oldugu icin arama burada yapilir
 * (bkz. components/pricing-art.tsx).
 *
 * 18 sahnenin hepsi ayni anda inmesin diye chunk yalnizca kart ekrana yaklasinca render edilir;
 * kutu oranli oldugu icin yukleme sirasinda duzen kaymaz. Kart basliginin/aciklamasinin yaninda
 * sahne dekoratiftir — aria-hidden; `label` yine de gecilir (sahnenin kendi aria-label'i icin).
 */

/** Filtre degistiginde kart yeniden bagladiginda sahne bastan beklemesin. */
const loaded = new Set<string>();

export default function ServiceCardArt({ slug, label }: { slug: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(() => loaded.has(slug));

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
          loaded.add(slug);
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, slug]);

  const Art = SERVICE_ART[slug];
  if (!Art) return null;

  return (
    <div ref={ref} className={styles.stage} aria-hidden="true">
      {show ? <Art label={label} /> : null}
    </div>
  );
}
