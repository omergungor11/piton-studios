'use client';

import { useEffect, useRef } from 'react';

/**
 * Arka planda sayfa boyunca surunen yilanlar.
 *
 * Uc yilan farkli yukseklik, olcek ve yonde duruyor. Kare animasyonu CSS
 * sprite ile (6 kare, steps(6)); yatay konum kaydirma ilerlemesine bagli —
 * asagi indikce yilanlar yana suzuluyor. Her yilanin parallaks katsayisi
 * farkli, boylece derinlik hissi olusuyor.
 *
 * Dekoratif: `aria-hidden`, tiklama gecirmez, 1000px altinda ve hareket
 * azaltma tercihinde tamamen kapali (CSS tarafinda).
 */

type Snake = {
  /** Sayfa yuksekligine gore dikey konum (%) */
  top: number;
  /** Genislik, viewport genisligine gore (vw) */
  width: number;
  /** Baslangic yatay konumu (vw) — ekran disindan girsin */
  x0: number;
  /** Kaydirmaya tepki katsayisi — buyudukce daha cok kayar */
  drift: number;
  /** true ise sola bakar (gorsel yatay cevrilir) */
  flip: boolean;
  /** Kare dongusu suresi (sn) — hepsi ayni ritimde olmasin */
  cycle: number;
  opacity: number;
};

const SNAKES: Snake[] = [
  { top: 16, width: 34, x0: -38, drift: 78, flip: false, cycle: 0.78, opacity: 0.1 },
  { top: 47, width: 26, x0: 104, drift: -74, flip: true, cycle: 0.92, opacity: 0.075 },
  { top: 76, width: 42, x0: -46, drift: 92, flip: false, cycle: 0.7, opacity: 0.085 },
];

export default function SnakeTrail() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // 0-1 arasi kaydirma ilerlemesi; CSS bunu her yilanin drift'iyle carpiyor
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      // rAF ile bogulur — scroll basina tek yazma
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="snake-trail" ref={ref} aria-hidden="true">
      {SNAKES.map((s, i) => (
        <span
          key={i}
          className="snake"
          style={
            {
              '--top': `${s.top}%`,
              '--w': `${s.width}vw`,
              '--x0': `${s.x0}vw`,
              '--drift': `${s.drift}vw`,
              '--sx': s.flip ? -1 : 1,
              '--cycle': `${s.cycle}s`,
              '--o': s.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
