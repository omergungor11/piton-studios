'use client';

import { useEffect, useRef } from 'react';

/**
 * Kutuyu sarmalayan yilan.
 *
 * Sarmalama hissi tek katmanla olmuyor: yilanin bir bolumunun kutunun ARKASINA
 * gecmesi gerek. Bu yuzden iki ozdes kopya var — biri bolumden once (arkada),
 * biri sonra (onde). Ikisi de ayni yolda, ayni noktada, ayni acida duruyor;
 * yalnizca hangisinin gorundugu degisiyor. Konum ayni oldugu icin gecis
 * siramada bir zipla yol acmiyor, sadece derinlik degisiyor.
 *
 * Yol, kapsayicinin yuvarlatilmis dikdortgen kenari; yilan CSS Motion Path ile
 * onun uzerinde. `offset-rotate: auto` sayesinde koseleri donerken kivriliyor.
 *
 * Ilerleme bolumun ekrandan gecis oranina bagli: alttan girerken 0, ustten
 * cikarken 1 — kaydirdikca yilan kutunun etrafinda tur atiyor. Govde karesi de
 * kaydirmadan geliyor, durunca yilan da duruyor.
 */

const FRAMES = 6;
const PX_PER_FRAME = 70;

/** Yumusak gecis — sert siramanin goze carpmamasi icin */
function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/**
 * Yolun neresinde onde olmali?
 * Yol sol ustten baslar, saat yonunde gider: ust kenar → sag → alt → sol.
 * Ust kenarda arkada, alt kenarda onde; gecisler sag ve sol kenarlarda eriyor.
 */
function frontness(t: number) {
  return smoothstep(0.2, 0.4, t) * (1 - smoothstep(0.7, 0.9, t));
}

/**
 * Yilan boyu kutunun cevresine gore olcekleniyor — sabit px kucuk kutuda
 * devasa, buyuk kutuda kayip gorunuyordu. Alt/ust sinirlar asiriya kacmasin diye.
 */
const SIZE_RATIO = 0.075;
const SIZE_MIN = 190;
const SIZE_MAX = 340;

type Props = {
  children: React.ReactNode;
  /** Kose yaricapi (px) — kapsayicinin border-radius'uyla ayni olmali */
  radius?: number;
  /** Yilan boyunu elle sabitler (px); verilmezse cevreye gore hesaplanir */
  size?: number;
  /** Kac tur atsin — 1 = bolum ekrandan gecerken tam tur */
  laps?: number;
};

export default function SnakeBorder({
  children,
  radius = 28,
  size,
  laps = 1,
}: Props) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const behindRef = useRef<HTMLSpanElement | null>(null);
  const frontRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const behind = behindRef.current;
    const front = frontRef.current;
    // Olculen sey sarmalayici degil, icindeki gercek bolum — disardaki
    // margin yola karismasin
    const box = inner?.firstElementChild as HTMLElement | null;
    if (!inner || !behind || !front || !box) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layers = [behind, front];

    /** Kutunun kenarini saat yonunde dolasan yuvarlatilmis dikdortgen yolu */
    const writePath = () => {
      const w = box.offsetWidth;
      const h = box.offsetHeight;
      // Yaricap kenardan buyuk olamaz, yoksa yol kendi uzerine katlanir
      const r = Math.max(0, Math.min(radius, w / 2, h / 2));
      const d =
        `path("M ${r},0 H ${w - r} A ${r},${r} 0 0 1 ${w},${r} V ${h - r} ` +
        `A ${r},${r} 0 0 1 ${w - r},${h} H ${r} A ${r},${r} 0 0 1 0,${h - r} ` +
        `V ${r} A ${r},${r} 0 0 1 ${r},0 Z")`;

      // Yuvarlatilmis dikdortgen cevresi: duz kenarlar + kose yaylari
      const perimeter = 2 * (w + h) - 8 * r + 2 * Math.PI * r;
      const px =
        size ?? Math.min(SIZE_MAX, Math.max(SIZE_MIN, perimeter * SIZE_RATIO));

      for (const el of layers) {
        el.style.setProperty('--path', d);
        el.style.setProperty('--size', `${Math.round(px)}px`);
      }
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      // Bolum alttan girerken 0, ustten cikarken 1
      const span = vh + rect.height;
      const p = span > 0 ? Math.min(1, Math.max(0, (vh - rect.top) / span)) : 0;

      const dist = p * laps;
      // Turun neresindeyiz — onde/arkada karari tur icindeki konuma bakar
      const f = frontness(dist % 1);
      const frame = String(Math.floor(window.scrollY / PX_PER_FRAME) % FRAMES);

      for (const el of layers) {
        el.style.setProperty('--sp', dist.toFixed(4));
        el.style.setProperty('--frame', frame);
      }
      front.style.setProperty('--vis', f.toFixed(3));
      behind.style.setProperty('--vis', (1 - f).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    writePath();
    update();

    const ro = new ResizeObserver(() => {
      writePath();
      onScroll();
    });
    ro.observe(box);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [radius, laps, size]);

  return (
    <div className="snake-wrap">
      {/* Bolumden once: kutunun arkasinda kalan yari */}
      <span className="snake-border is-behind" ref={behindRef} aria-hidden="true" />
      <div className="snake-wrap-inner" ref={innerRef}>
        {children}
      </div>
      {/* Bolumden sonra: kutunun onunden gecen yari */}
      <span className="snake-border is-front" ref={frontRef} aria-hidden="true" />
    </div>
  );
}
