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
  /** Alan derinligi bulanikligi (px) — yakin plandaki yilan hafif odak disi */
  blur?: number;
};

const SNAKES: Snake[] = [
  // Uzak plan — kucuk, yavas kayar
  { top: 15, width: 30, x0: -34, drift: 70, flip: false, cycle: 1.15, opacity: 0.18 },
  { top: 44, width: 24, x0: 104, drift: -66, flip: true, cycle: 1.35, opacity: 0.14 },
  // Yakin plan — neredeyse ekran genisliginde, en hizli kayan, hafif odak disi
  { top: 70, width: 96, x0: -108, drift: 168, flip: false, cycle: 1.05, opacity: 0.24, blur: 3 },
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
              '--blur': `${s.blur ?? 0}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
