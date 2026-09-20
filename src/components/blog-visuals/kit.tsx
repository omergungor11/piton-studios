'use client';

/**
 * Blog sahneleri icin cizim kiti.
 *
 * Palet, cerceve ve temel parcalar hizmet sahnelerinden gelir (service-visuals/kit) — ikinci bir
 * palet tanimlanmaz, iki gorsel ailesi ayni dilde konusur. Burada yalnizca blog konularinin
 * ihtiyac duydugu ek parcalar var (karsilastirma ayraci, konusma balonu, kalkan, kure, saat...).
 *
 * Kurallar hizmet sahneleriyle ayni: sahnede kelime/rakam yok, yalnizca kit renkleri ve filtreleri;
 * hareket yalnizca `sv-flow` / `sv-pulse` / `sv-float` siniflariyla (reduced-motion'da durur) ve
 * `sv-float` `transform` niteligi tasiyan `<g>`'ye konmaz.
 */

import { C, H, useArt, Lines } from '../service-visuals/kit';

export {
  W,
  H,
  C,
  useArt,
  ArtFrame,
  Ambient,
  Floor,
  Reflection,
  Panel,
  Browser,
  Phone,
  Lines,
  Beam,
  Node,
  Cube,
  Spark,
  Bars,
} from '../service-visuals/kit';

/** Karsilastirma sahnelerinde iki tarafi ayiran dikey isik. */
export function Split({ x, top = 40, bottom = H - 40 }: { x: number; top?: number; bottom?: number }) {
  const ids = useArt();
  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={bottom} stroke={C.line} strokeWidth="0.9" strokeDasharray="3 7" />
      <circle cx={x} cy={(top + bottom) / 2} r={16} fill={C.bg} stroke={C.accent} strokeWidth="1" opacity="0.9" />
      <circle cx={x} cy={(top + bottom) / 2} r={4} fill={C.hot} filter={`url(#${ids.glow})`} />
    </g>
  );
}

/** Etiket/rozet yer tutucusu — ici metin degil, kisa bir cizgi. */
export function Chip({ x, y, w = 62, h = 20, hot = false }: { x: number; y: number; w?: number; h?: number; hot?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={hot ? C.accent : 'transparent'} fillOpacity={hot ? 0.22 : 1} stroke={hot ? C.hot : C.line} strokeWidth={hot ? 1.1 : 0.9} />
      <rect x={x + 10} y={y + h / 2 - 2} width={w - 20} height={4} rx="2" fill={hot ? C.hot : C.faint} />
    </g>
  );
}

/** Sohbet balonu. `side` kuyrugun yonu. */
export function Bubble({
  x,
  y,
  w,
  h,
  side = 'left',
  hot = false,
  rows = 2,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  side?: 'left' | 'right';
  hot?: boolean;
  rows?: number;
}) {
  const tail = side === 'left' ? `M${x + 8},${y + h} l0,10 l12,-10 Z` : `M${x + w - 8},${y + h} l0,10 l-12,-10 Z`;
  return (
    <g>
      <path d={tail} fill={hot ? C.accent : '#1C1A19'} opacity={hot ? 0.55 : 1} />
      <rect x={x} y={y} width={w} height={h} rx="10" fill={hot ? C.accent : '#1C1A19'} fillOpacity={hot ? 0.28 : 1} stroke={hot ? C.accent : C.line} strokeWidth="0.9" />
      <Lines x={x + 10} y={y + 10} w={w - 24} rows={rows} gap={9} thick={4} />
    </g>
  );
}

/** Kalkan — bakim, guvenlik, surekli izleme. */
export function Shield({ x, y, s = 48, hot = true }: { x: number; y: number; s?: number; hot?: boolean }) {
  const ids = useArt();
  const d = `M${x},${y - s} C${x + s * 0.75},${y - s * 0.8} ${x + s * 0.8},${y - s * 0.72} ${x + s * 0.8},${y - s * 0.66} L${x + s * 0.8},${y - s * 0.05} C${x + s * 0.8},${y + s * 0.6} ${x + s * 0.35},${y + s * 0.92} ${x},${y + s} C${x - s * 0.35},${y + s * 0.92} ${x - s * 0.8},${y + s * 0.6} ${x - s * 0.8},${y - s * 0.05} L${x - s * 0.8},${y - s * 0.66} C${x - s * 0.8},${y - s * 0.72} ${x - s * 0.75},${y - s * 0.8} ${x},${y - s} Z`;
  return (
    <g>
      {hot && <path d={d} fill={C.accent} opacity="0.32" filter={`url(#${ids.bloom})`} />}
      <path d={d} fill={`url(#${hot ? ids.panelHot : ids.panel})`} stroke={hot ? C.accent : C.line} strokeWidth="1.2" />
    </g>
  );
}

/** Meridyenli kure — cok dillilik, uluslararasi erisim. */
export function Globe({ cx, cy, r = 54 }: { cx: number; cy: number; r?: number }) {
  const ids = useArt();
  const rings = [0.34, 0.68];
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.9" />
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.34} fill="none" stroke={C.line} strokeWidth="0.8" />
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke={C.line} strokeWidth="0.8" />
      {rings.map((k) => (
        <g key={k}>
          <ellipse cx={cx} cy={cy} rx={r * k} ry={r} fill="none" stroke={C.line} strokeWidth="0.8" />
        </g>
      ))}
      <ellipse cx={cx} cy={cy} rx={r * 0.02} ry={r} fill="none" stroke={C.line} strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={r} fill={C.accent} opacity="0.06" />
    </g>
  );
}

/** Saat kadrani — sure, gecikme, zaman kazanci. `hand` 0..1 arasinda yelkovan konumu. */
export function Clock({ cx, cy, r = 26, hand = 0.18, hot = false }: { cx: number; cy: number; r?: number; hand?: number; hot?: boolean }) {
  const a = hand * Math.PI * 2 - Math.PI / 2;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.bg2} stroke={hot ? C.accent : C.line} strokeWidth="1.1" />
      {Array.from({ length: 12 }, (_, i) => {
        const t = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx + Math.cos(t) * (r - 5)}
            y1={cy + Math.sin(t) * (r - 5)}
            x2={cx + Math.cos(t) * (r - 2)}
            y2={cy + Math.sin(t) * (r - 2)}
            stroke={C.faint}
            strokeWidth="1.2"
          />
        );
      })}
      <line x1={cx} y1={cy} x2={cx + Math.cos(a) * (r - 8)} y2={cy + Math.sin(a) * (r - 8)} stroke={hot ? C.hot : C.ink} strokeWidth="1.8" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx} y2={cy - r * 0.42} stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="2" fill={hot ? C.hot : C.ink} />
    </g>
  );
}

/** Yarim daire gosterge (hiz, saglik, performans). `value` 0..1. */
export function Gauge({ cx, cy, r = 54, value = 0.8 }: { cx: number; cy: number; r?: number; value?: number }) {
  const ids = useArt();
  const arc = (from: number, to: number) => {
    const a0 = Math.PI * (1 + from);
    const a1 = Math.PI * (1 + to);
    const large = to - from > 0.5 ? 1 : 0;
    return `M${cx + Math.cos(a0) * r},${cy + Math.sin(a0) * r} A${r},${r} 0 ${large} 1 ${cx + Math.cos(a1) * r},${cy + Math.sin(a1) * r}`;
  };
  const needle = Math.PI * (1 + value);
  return (
    <g fill="none" strokeLinecap="round">
      <path d={arc(0, 1)} stroke={C.faint} strokeWidth="10" />
      <path d={arc(0, value)} stroke={C.accent} strokeWidth="10" filter={`url(#${ids.glow})`} />
      <line x1={cx} y1={cy} x2={cx + Math.cos(needle) * (r - 12)} y2={cy + Math.sin(needle) * (r - 12)} stroke={C.ink} strokeWidth="2.4" />
      <circle cx={cx} cy={cy} r="4.5" fill={C.ink} stroke={C.bg} strokeWidth="1.4" />
    </g>
  );
}

/** Alisveris sepeti. */
export function Cart({ x, y, s = 30, hot = true }: { x: number; y: number; s?: number; hot?: boolean }) {
  const color = hot ? C.hot : C.muted;
  return (
    <g fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${x - s * 0.5},${y - s * 0.5} l${s * 0.22},0 l${s * 0.2},${s * 0.9} l${s * 0.86},0 l${s * 0.24},-${s * 0.62} l-${s * 0.98},0`} />
      <circle cx={x + s * 0.06} cy={y + s * 0.66} r={s * 0.11} />
      <circle cx={x + s * 0.62} cy={y + s * 0.66} r={s * 0.11} />
    </g>
  );
}

/** Onay isareti — karsilanan kosul. */
export function Check({ x, y, s = 14, hot = true }: { x: number; y: number; s?: number; hot?: boolean }) {
  return (
    <path
      d={`M${x - s * 0.4},${y} l${s * 0.28},${s * 0.34} l${s * 0.56},-${s * 0.66}`}
      fill="none"
      stroke={hot ? C.hot : C.muted}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** Carpi — karsilanmayan kosul, kirik baglanti. */
export function Cross({ x, y, s = 12 }: { x: number; y: number; s?: number }) {
  return (
    <g stroke={C.muted} strokeWidth="1.8" strokeLinecap="round" opacity="0.7">
      <line x1={x - s * 0.36} y1={y - s * 0.36} x2={x + s * 0.36} y2={y + s * 0.36} />
      <line x1={x + s * 0.36} y1={y - s * 0.36} x2={x - s * 0.36} y2={y + s * 0.36} />
    </g>
  );
}

/** Ok ucu — yon belirten baglantilarda `Beam` ile birlikte. `angle` derece. */
export function Arrow({ x, y, angle = 0, s = 9, hot = true }: { x: number; y: number; angle?: number; s?: number; hot?: boolean }) {
  return (
    <path
      d={`M${-s * 0.5},${-s * 0.55} L${s * 0.6},0 L${-s * 0.5},${s * 0.55} Z`}
      transform={`translate(${x} ${y}) rotate(${angle})`}
      fill={hot ? C.hot : C.muted}
    />
  );
}

/** Hucre izgarasi (elektronik tablo, bilesen kataloğu). `hot` indeksleri vurgulanir. */
export function Grid({
  x,
  y,
  cols,
  rows,
  cell = 22,
  gap = 4,
  hot = [],
}: {
  x: number;
  y: number;
  cols: number;
  rows: number;
  cell?: number;
  gap?: number;
  hot?: number[];
}) {
  return (
    <g>
      {Array.from({ length: cols * rows }, (_, i) => {
        const isHot = hot.includes(i);
        return (
          <rect
            key={i}
            x={x + (i % cols) * (cell + gap)}
            y={y + Math.floor(i / cols) * (cell + gap)}
            width={cell}
            height={cell}
            rx="3"
            fill={isHot ? C.accent : '#FFFFFF'}
            fillOpacity={isHot ? 0.28 : 0.04}
            stroke={isHot ? C.accent : C.line}
            strokeWidth="0.7"
          />
        );
      })}
    </g>
  );
}

/** Ust uste yigilmis plakalar (eklenti yigini, katmanli maliyet). Ustten alta dogru cizilir. */
export function Stack({
  x,
  y,
  w,
  count,
  gap = 13,
  skew = 0,
  hotIndex = -1,
}: {
  x: number;
  y: number;
  w: number;
  count: number;
  gap?: number;
  skew?: number;
  hotIndex?: number;
}) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const hot = i === hotIndex;
        return (
          <rect
            key={i}
            x={x + i * skew}
            y={y + i * gap}
            width={w}
            height={gap - 3}
            rx="3"
            fill={hot ? C.accent : '#FFFFFF'}
            fillOpacity={hot ? 0.3 : 0.05}
            stroke={hot ? C.accent : C.line}
            strokeWidth="0.8"
          />
        );
      })}
    </g>
  );
}

/** Belge/sayfa karti — URL, icerik parcasi, teklif dosyasi. */
export function Doc({ x, y, w = 64, h = 84, hot = false, rows = 4 }: { x: number; y: number; w?: number; h?: number; hot?: boolean; rows?: number }) {
  const fold = 14;
  const d = `M${x},${y + 4} a4,4 0 0 1 4,-4 h${w - fold - 4} l${fold},${fold} v${h - fold - 4} a4,4 0 0 1 -4,4 h${-(w - 4)} a4,4 0 0 1 -4,-4 Z`;
  return (
    <g>
      <path d={d} fill={C.bg2} stroke={hot ? C.accent : C.line} strokeWidth="0.9" />
      <path d={`M${x + w - fold},${y} v${fold} h${fold}`} fill="none" stroke={hot ? C.accent : C.line} strokeWidth="0.9" />
      <Lines x={x + 10} y={y + 26} w={w - 22} rows={rows} gap={9} thick={3} accentFirst={hot} />
    </g>
  );
}
