'use client';

import { createContext, useContext, useId, type ReactNode } from 'react';

/**
 * Hizmet sahneleri icin cizim kiti (plan: piton-plans/service-visuals-plan.md).
 *
 * Tum sahneler 640x400 viewBox'ta, koyu zeminde, tek vurgu rengiyle cizilir. Sahneler YALNIZCA bu
 * dosyadaki renkleri, filtreleri ve parcalari kullanir — tutarlilik buradan gelir. Sahnede kelime
 * olmaz (dil bagimsiz); metin yerine `Lines` yer tutucu cizgileri kullanilir.
 * Hareket yalnizca CSS siniflariyla (sv-flow, sv-pulse, sv-float) — reduced-motion'da durur.
 */

export const W = 640;
export const H = 400;

export const C = {
  bg: '#0A0A0A',
  bg2: '#151414',
  ink: '#F2EFE9',
  muted: 'rgba(242,239,233,0.55)',
  faint: 'rgba(242,239,233,0.12)',
  line: 'rgba(242,239,233,0.24)',
  accent: '#D33A3E',
  hot: '#FF6A5E',
  deep: '#6E1418',
} as const;

type Ids = Record<'bg' | 'spot' | 'accent' | 'panel' | 'panelHot' | 'glow' | 'bloom' | 'floorMask' | 'floorFade' | 'vignette', string>;

const IdsContext = createContext<Ids | null>(null);

/** Parcalarin gradient/filtre kimliklerine erisimi. Ayni sayfada birden fazla sahne olabilir: kimlikler benzersiz. */
export function useArt(): Ids {
  const ids = useContext(IdsContext);
  if (!ids) throw new Error('useArt: ArtFrame disinda kullanildi');
  return ids;
}

export function ArtFrame({ label, children }: { label: string; children: ReactNode }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `sv${uid}${name}`;
  const ids: Ids = {
    bg: id('bg'),
    spot: id('spot'),
    accent: id('accent'),
    panel: id('panel'),
    panelHot: id('panelHot'),
    glow: id('glow'),
    bloom: id('bloom'),
    floorMask: id('floorMask'),
    floorFade: id('floorFade'),
    vignette: id('vignette'),
  };

  return (
    <svg className="sv-art" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={ids.bg} cx="55%" cy="30%" r="80%">
          <stop offset="0" stopColor="#1B1918" />
          <stop offset="1" stopColor={C.bg} />
        </radialGradient>
        <radialGradient id={ids.spot}>
          <stop offset="0" stopColor={C.accent} stopOpacity="0.42" />
          <stop offset="0.45" stopColor={C.accent} stopOpacity="0.12" />
          <stop offset="1" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ids.accent} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.hot} />
          <stop offset="0.55" stopColor={C.accent} />
          <stop offset="1" stopColor={C.deep} />
        </linearGradient>
        <linearGradient id={ids.panel} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.09" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={ids.panelHot} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.accent} stopOpacity="0.28" />
          <stop offset="1" stopColor={C.accent} stopOpacity="0.04" />
        </linearGradient>
        <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={ids.bloom} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <linearGradient id={ids.floorFade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
        </linearGradient>
        <mask id={ids.floorMask}>
          <rect width={W} height={H} fill={`url(#${ids.floorFade})`} />
        </mask>
        <radialGradient id={ids.vignette} cx="50%" cy="45%" r="75%">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.65" />
        </radialGradient>
      </defs>
      <IdsContext.Provider value={ids}>
        <rect width={W} height={H} fill={`url(#${ids.bg})`} />
        {children}
        <rect width={W} height={H} fill={`url(#${ids.vignette})`} pointerEvents="none" />
      </IdsContext.Provider>
    </svg>
  );
}

/** Kirmizi ortam isigi — sahnenin odak noktasinin arkasina. */
export function Ambient({ cx, cy, r = 220 }: { cx: number; cy: number; r?: number }) {
  const ids = useArt();
  return <circle cx={cx} cy={cy} r={r} fill={`url(#${ids.spot})`} />;
}

/** Perspektif zemin izgarasi; `horizon` ufuk cizgisinin y degeri. */
export function Floor({ horizon = 270, vx = W / 2 }: { horizon?: number; vx?: number }) {
  const ids = useArt();
  // Ufuktaki kacis noktasindan zemine yayilan cizgiler; alt kenarda esit aralikli.
  const verticals = Array.from({ length: 17 }, (_, i) => vx + (i - 8) * 120);
  const rows = [0, 10, 24, 44, 72, 110];
  return (
    <g mask={`url(#${ids.floorMask})`} stroke={C.line} strokeWidth="0.8" opacity="0.55">
      {verticals.map((x) => (
        <line key={x} x1={vx} y1={horizon} x2={x} y2={H} />
      ))}
      {rows.map((d) => (
        <line key={d} x1="0" y1={horizon + d} x2={W} y2={horizon + d} />
      ))}
    </g>
  );
}

/** Nesnenin zemine dusen kirmizi yansimasi. */
export function Reflection({ cx, cy, rx = 120, ry = 16, opacity = 0.5 }: { cx: number; cy: number; rx?: number; ry?: number; opacity?: number }) {
  const ids = useArt();
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={C.accent} opacity={opacity} filter={`url(#${ids.bloom})`} />;
}

/** Cam panel. `hot` kirmizi cerceve ve ic isik verir. */
export function Panel({
  x,
  y,
  w,
  h,
  r = 10,
  hot = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  hot?: boolean;
  children?: ReactNode;
}) {
  const ids = useArt();
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={C.bg2} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={r}
        fill={`url(#${hot ? ids.panelHot : ids.panel})`}
        stroke={hot ? C.accent : C.line}
        strokeOpacity={hot ? 0.85 : 1}
        strokeWidth={hot ? 1.2 : 0.9}
      />
      {children}
    </g>
  );
}

/** Tarayici penceresi: panel + ust cubuk ve uc nokta. Icerik (children) pencere koordinatlarinda. */
export function Browser({ x, y, w, h, hot = false, children }: { x: number; y: number; w: number; h: number; hot?: boolean; children?: ReactNode }) {
  return (
    <Panel x={x} y={y} w={w} h={h} hot={hot}>
      <line x1={x} y1={y + 20} x2={x + w} y2={y + 20} stroke={C.line} strokeWidth="0.8" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 12 + i * 10} cy={y + 10} r="2.6" fill={i === 0 ? C.accent : C.faint} />
      ))}
      <rect x={x + w * 0.32} y={y + 6} width={w * 0.36} height="8" rx="4" fill={C.faint} />
      {children}
    </Panel>
  );
}

/** Telefon cercevesi. */
export function Phone({ x, y, w = 96, h = 180, hot = false, children }: { x: number; y: number; w?: number; h?: number; hot?: boolean; children?: ReactNode }) {
  return (
    <Panel x={x} y={y} w={w} h={h} r={16} hot={hot}>
      <rect x={x + w / 2 - 14} y={y + 7} width="28" height="5" rx="2.5" fill={C.faint} />
      {children}
    </Panel>
  );
}

/** Metin yer tutucusu: farkli uzunlukta yuvarlatilmis cizgiler (deterministik). */
export function Lines({ x, y, w, rows = 3, gap = 9, thick = 4, accentFirst = false }: { x: number; y: number; w: number; rows?: number; gap?: number; thick?: number; accentFirst?: boolean }) {
  const widths = [1, 0.82, 0.93, 0.64, 0.88, 0.72, 0.5];
  return (
    <g>
      {Array.from({ length: rows }, (_, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * gap}
          width={w * widths[i % widths.length]}
          height={thick}
          rx={thick / 2}
          fill={accentFirst && i === 0 ? C.accent : C.faint}
        />
      ))}
    </g>
  );
}

/**
 * Isik cizgisi: alttaki genis parlama + ustte akan kesikli cizgi (CSS `sv-flow`).
 * `d` SVG path verisi. `delay` saniye cinsinden animasyon gecikmesi.
 */
export function Beam({ d, delay = 0, width = 1.6, faint = false }: { d: string; delay?: number; width?: number; faint?: boolean }) {
  const ids = useArt();
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={C.accent} strokeWidth={width * 3} opacity={faint ? 0.15 : 0.35} filter={`url(#${ids.glow})`} />
      <path d={d} stroke={C.accent} strokeWidth={width} opacity={faint ? 0.4 : 0.75} />
      <path d={d} className="sv-flow" stroke={C.hot} strokeWidth={width} style={{ animationDelay: `${delay}s` }} />
    </g>
  );
}

/** Baglanti noktasi; `hot` parlar ve nabiz atar. */
export function Node({ x, y, r = 5, hot = false }: { x: number; y: number; r?: number; hot?: boolean }) {
  const ids = useArt();
  return (
    <g>
      {hot && <circle className="sv-pulse" cx={x} cy={y} r={r * 1.6} fill="none" stroke={C.hot} strokeWidth="1" />}
      <circle cx={x} cy={y} r={r * 1.7} fill={C.bg} stroke={hot ? C.accent : C.line} strokeWidth="1" />
      <circle cx={x} cy={y} r={r * 0.75} fill={hot ? C.hot : C.muted} filter={hot ? `url(#${ids.glow})` : undefined} />
    </g>
  );
}

/** Izometrik kup (modul, blok, paket). (x, y) ust yuzun on kosesi. */
export function Cube({ x, y, s = 40, hot = false }: { x: number; y: number; s?: number; hot?: boolean }) {
  const ids = useArt();
  const dx = s * 0.866;
  const dy = s * 0.5;
  const top = `M${x},${y} L${x + dx},${y - dy} L${x},${y - 2 * dy} L${x - dx},${y - dy} Z`;
  const left = `M${x},${y} L${x - dx},${y - dy} L${x - dx},${y - dy + s} L${x},${y + s} Z`;
  const right = `M${x},${y} L${x + dx},${y - dy} L${x + dx},${y - dy + s} L${x},${y + s} Z`;
  return (
    <g stroke={hot ? C.hot : C.line} strokeWidth="0.9" strokeLinejoin="round">
      {hot && <path d={`${top} ${left} ${right}`} fill={C.accent} opacity="0.35" filter={`url(#${ids.bloom})`} stroke="none" />}
      <path d={left} fill={hot ? C.deep : '#121111'} />
      <path d={right} fill={hot ? C.accent : '#1C1A19'} fillOpacity={hot ? 0.75 : 1} />
      <path d={top} fill={hot ? C.hot : '#2A2826'} fillOpacity={hot ? 0.85 : 1} />
    </g>
  );
}

/** Olceksiz trend cizgisi (grafik hissi, rakam yok). `points` 0..1 araliginda y degerleri. */
export function Spark({ x, y, w, h, points, fill = true }: { x: number; y: number; w: number; h: number; points: number[]; fill?: boolean }) {
  const ids = useArt();
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => `${x + i * step},${y + h - p * h}`);
  const line = `M${coords.join(' L')}`;
  return (
    <g>
      {fill && <path d={`${line} L${x + w},${y + h} L${x},${y + h} Z`} fill={`url(#${ids.panelHot})`} />}
      <path d={line} fill="none" stroke={C.hot} strokeWidth="1.8" strokeLinejoin="round" filter={`url(#${ids.glow})`} />
    </g>
  );
}

/** Cubuk grafik (olceksiz). `values` 0..1. `hotIndex` vurgulu cubuk. */
export function Bars({ x, y, w, h, values, hotIndex = -1 }: { x: number; y: number; w: number; h: number; values: number[]; hotIndex?: number }) {
  const bw = w / values.length;
  return (
    <g>
      {values.map((v, i) => (
        <rect
          key={i}
          x={x + i * bw + bw * 0.18}
          y={y + h - v * h}
          width={bw * 0.64}
          height={v * h}
          rx="2"
          fill={i === hotIndex ? C.accent : C.faint}
        />
      ))}
    </g>
  );
}
