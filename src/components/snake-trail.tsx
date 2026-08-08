'use client';

import { useEffect, useRef } from 'react';

/**
 * Arka planda sayfa boyunca surunen yilanlar.
 *
 * Hareketin tamami kaydirmaya bagli — hicbiri kendi kendine oynamiyor:
 *  - yatay konum kaydirma ilerlemesiyle suzuluyor (parallaks)
 *  - govde karesi de kaydirma miktarindan hesaplaniyor, durunca yilan da donuyor
 *
 * Kare ve konum React state'i yerine dogrudan DOM'a CSS degiskeni olarak
 * yaziliyor; boylece scroll basina yeniden render olmuyor.
 *
 * Dekoratif: `aria-hidden`, tiklama gecirmez, 1000px altinda ve hareket
 * azaltma tercihinde tamamen kapali (CSS tarafinda).
 */

/** Sprite'taki kare sayisi */
const FRAMES = 6;

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
  /** Bir kare ilerlemek icin gereken kaydirma (px) — buyuk deger daha tembel govde */
  pxPerFrame: number;
  opacity: number;
  /** Alan derinligi bulanikligi (px) — yakin plandaki yilan hafif odak disi */
  blur?: number;
};

const SNAKES: Snake[] = [
  // Orta plan — biraz one alindi
  { top: 15, width: 48, x0: -52, drift: 100, flip: false, pxPerFrame: 78, opacity: 0.21, blur: 1 },
  // Uzak plan — kucuk, en yavas kayan
  { top: 44, width: 24, x0: 104, drift: -66, flip: true, pxPerFrame: 62, opacity: 0.14 },
  // Yakin plan — neredeyse ekran genisliginde, en hizli kayan, hafif odak disi
  { top: 70, width: 96, x0: -108, drift: 168, flip: false, pxPerFrame: 112, opacity: 0.24, blur: 3 },
];

export default function SnakeTrail() {
  const ref = useRef<HTMLDivElement | null>(null);
  const snakeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // 0-1 arasi kaydirma ilerlemesi; CSS bunu her yilanin drift'iyle carpiyor
      el.style.setProperty('--p', (max > 0 ? y / max : 0).toFixed(4));

      // Govde karesi: asagi kaydirinca ilerler, yukari kaydirinca geri sarar
      for (let i = 0; i < SNAKES.length; i++) {
        const node = snakeRefs.current[i];
        if (!node) continue;
        node.style.setProperty(
          '--frame',
          String(Math.floor(y / SNAKES[i].pxPerFrame) % FRAMES)
        );
      }
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
          ref={(node) => {
            snakeRefs.current[i] = node;
          }}
          style={
            {
              '--top': `${s.top}%`,
              '--w': `${s.width}vw`,
              '--x0': `${s.x0}vw`,
              '--drift': `${s.drift}vw`,
              '--sx': s.flip ? -1 : 1,
              '--o': s.opacity,
              '--blur': `${s.blur ?? 0}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
