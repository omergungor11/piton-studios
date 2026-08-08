'use client';

import { useEffect, useRef } from 'react';

/**
 * Kutunun kenarinda gezen yilan.
 *
 * NEDEN PARCALI: tek parca bir gorsel `offset-rotate: auto` ile yalnizca kendi
 * capa noktasinin tegetine gore doner — govdenin tamami o tek aciya girer, yani
 * kosede 300px'lik dumduz bir cubuk kutunun disina firlar. Bu yuzden yilan
 * dilimlere bolundu: her dilim sprite'in bir yatay parcasini gosterir ve yolun
 * kendi noktasindaki aciyi alir. Govde boylece kosede gercekten bukuluyor.
 *
 * Yilan her zaman kutunun ustunde; onde/arkada ayrimi yok.
 *
 * Ilerleme bolumun ekrandan gecis oranina bagli; govde karesi kaydirmadan.
 */

const FRAMES = 6;
const PX_PER_FRAME = 70;

/**
 * Kac dilime bolunsun. Kose yayina kac dilim dustugu belirleyici: 16'da
 * 90 derecelik donus iki adimda yapiliyordu ve govde gorunur sekilde kiriliyordu.
 */
const SEGMENTS = 36;

/**
 * Dilim araligi ile sprite dilim genisligi BIREBIR ayni olmali.
 *
 * Onceden 0.9 idi: dilimler yol uzerinde %10 sikistiriliyor ama sprite'tan
 * alinan parcalar sikistirilmiyordu, dolayisiyla komsu dilimlerin goruntu
 * icerigi birbirini tutmuyor ve duz kenarda bile ek yerleri gorunuyordu.
 * Kosedeki bosluklari bindirmeyle degil dilim sayisiyla kapatiyoruz.
 */
const SEG_STEP = 1;

/** Sprite oranlari: 1200x1350, alti kare, her kare 1200x225 */
const SPRITE_RATIO = 1350 / 1200;
const FRAME_RATIO = 225 / 1200;

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

const SEG_INDICES = Array.from({ length: SEGMENTS }, (_, i) => i);

export default function SnakeBorder({
  children,
  radius = 28,
  size,
  laps = 1,
}: Props) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const layer = layerRef.current;
    // Olculen sey sarmalayici degil, icindeki gercek bolum — disardaki
    // margin yola karismasin
    const box = inner?.firstElementChild as HTMLElement | null;
    if (!inner || !layer || !box) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const writeGeometry = () => {
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
      const len =
        size ?? Math.min(SIZE_MAX, Math.max(SIZE_MIN, perimeter * SIZE_RATIO));
      const segW = len / SEGMENTS;

      layer.style.setProperty('--path', d);
      layer.style.setProperty('--len', `${len}px`);
      layer.style.setProperty('--segw', `${segW}px`);
      layer.style.setProperty('--segh', `${len * FRAME_RATIO}px`);
      layer.style.setProperty('--spriteh', `${len * SPRITE_RATIO}px`);
      layer.style.setProperty(
        '--step',
        String(perimeter > 0 ? (segW * SEG_STEP) / perimeter : 0)
      );
    };

    let raf = 0;
    let visible = true;
    // Ayni degeri tekrar yazmak bedava degil — son yazilanlari tutup atliyoruz
    let lastSp = '';
    let lastFrame = '';

    const update = () => {
      raf = 0;
      if (!visible) return;
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      // Bolum alttan girerken 0, ustten cikarken 1
      const span = vh + rect.height;
      const p = span > 0 ? Math.min(1, Math.max(0, (vh - rect.top) / span)) : 0;

      const sp = (p * laps).toFixed(5);
      const frame = String(Math.floor(window.scrollY / PX_PER_FRAME) % FRAMES);
      if (sp !== lastSp) {
        layer.style.setProperty('--sp', sp);
        lastSp = sp;
      }
      if (frame !== lastFrame) {
        layer.style.setProperty('--frame', frame);
        lastFrame = frame;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    writeGeometry();
    update();

    const ro = new ResizeObserver(() => {
      writeGeometry();
      onScroll();
    });
    ro.observe(box);

    // Bolum ekranda degilken hesap da yazma da yok
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) onScroll();
      },
      { rootMargin: '200px' }
    );
    io.observe(box);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [radius, laps, size]);

  return (
    <div className="snake-wrap">
      <div className="snake-wrap-inner" ref={innerRef}>
        {children}
      </div>
      {/* Bolumden sonra geliyor — her zaman kutunun ustunde */}
      <span className="snake-border" ref={layerRef} aria-hidden="true">
        {SEG_INDICES.map((i) => (
          <span
            key={i}
            className="snake-seg"
            style={{ '--i': i } as React.CSSProperties}
          />
        ))}
      </span>
    </div>
  );
}
