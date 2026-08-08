'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Yilan scrollbar — sag kenardaki dikey ray uzerinde surunen yilan.
 *
 * Tarayicinin kendi cubugu gizlendigi icin bu gercek bir scrollbar olmali,
 * sadece gosterge degil: yilan surukleniyor, raya tiklaninca oraya atliyor.
 * Yilan sprite'i yatay cizilmis (bas sagda); 90 derece cevrilince bas asagi
 * bakiyor — asagi kaydirdikca gittigi yone bakmis oluyor.
 *
 * Sayfa kaydirilamayacak kadar kisaysa katman hic gorunmez. Dokunmatik
 * cihazlarda ve hareket azaltma tercihinde CSS tarafinda kapali.
 */

/** Yilanin ray uzerindeki uzunlugu (px) — dondurulmus haliyle yukseklik */
const THUMB = 150;

export default function SnakeScroll() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(false);

  const read = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setScrollable(max > 40);
    setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        read();
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Icerik yuksekligi degistiginde (sekme acilmasi, gorsel yuklenmesi) yeniden olc
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [read]);

  /** Ray uzerindeki y konumunu sayfa kaydirmasina cevirir */
  const scrollToPointer = useCallback((clientY: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const box = rail.getBoundingClientRect();
    // Yilanin kendi boyu kadar alan gezinme disinda kalir
    const usable = box.height - THUMB;
    const p = usable > 0 ? (clientY - box.top - THUMB / 2) / usable : 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: Math.min(1, Math.max(0, p)) * max, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      e.preventDefault();
      scrollToPointer(e.clientY);
    };
    const onUp = () => {
      dragRef.current = false;
      document.body.classList.remove('is-snake-dragging');
    };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [scrollToPointer]);

  // Tarayici cubugunu ancak yilan gercekten devredeyken gizliyoruz. Isaret kok
  // elemanda; JS calismazsa ya da bilesen cikarsa varsayilan cubuk geri gelir.
  useEffect(() => {
    const root = document.documentElement;
    if (scrollable) root.classList.add('has-snake-scroll');
    else root.classList.remove('has-snake-scroll');
    return () => root.classList.remove('has-snake-scroll');
  }, [scrollable]);

  if (!scrollable) return null;

  return (
    <div
      className="snake-scroll"
      ref={railRef}
      // Raya tiklayinca oraya atlar; yilanin uzerinden baslarsa surukleme moduna gecer
      onPointerDown={(e) => {
        dragRef.current = true;
        document.body.classList.add('is-snake-dragging');
        scrollToPointer(e.clientY);
      }}
      role="scrollbar"
      aria-label="Sayfa kaydirma"
      aria-orientation="vertical"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={-1}
    >
      <span className="snake-scroll-rail" aria-hidden="true" />
      <span
        className="snake-scroll-thumb"
        aria-hidden="true"
        style={
          {
            '--p': progress,
            '--thumb': `${THUMB}px`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
