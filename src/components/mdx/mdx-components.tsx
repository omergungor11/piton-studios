import type { ReactNode } from 'react';
import NextLink from 'next/link';

/**
 * MDX icinde kullanilabilen component'ler.
 * Hepsi server component — state yok, hook yok. Renkler tema degiskenlerinden
 * gelir, boylece acik/koyu temada ayni bilesenler calisir.
 */

/* ---------------------------------------------------------------- Callout */

type CalloutType = 'info' | 'tip' | 'warn' | 'key';

const CALLOUT_MARK: Record<CalloutType, string> = {
  info: 'i',
  tip: '+',
  warn: '!',
  key: '*',
};

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className={`mdx-callout mdx-callout-${type}`}>
      <span className="mdx-callout-mark" aria-hidden="true">
        {CALLOUT_MARK[type]}
      </span>
      <div className="mdx-callout-body">
        {title && <p className="mdx-callout-title">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

/* --------------------------------------------------------- Key takeaways */

/**
 * Yazinin ozeti — hem okuyucu hem de dil modelleri icin tek yerde toplanmis
 * cikarim listesi. Yazinin basina konur.
 */
export function KeyTakeaways({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mdx-takeaways" aria-label={title}>
      <p className="mdx-takeaways-title">{title}</p>
      <ul className="mdx-takeaways-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------- Stat grid */

export function StatGrid({
  items,
}: {
  items: { value: string; label: string; note?: string }[];
}) {
  return (
    <div className="mdx-stats">
      {items.map((s, i) => (
        <div className="mdx-stat" key={i}>
          <span className="mdx-stat-value">{s.value}</span>
          <span className="mdx-stat-label">{s.label}</span>
          {s.note && <span className="mdx-stat-note">{s.note}</span>}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- Bar chart */

type Bar = { label: string; value: number; note?: string; highlight?: boolean };

/**
 * Yatay cubuk grafik. CSS genislikleriyle cizilir — ekran okuyucular icin
 * altta ayni veriyi tasiyan bir tablo da render edilir (gorsel olarak gizli).
 */
export function BarChart({
  title,
  caption,
  unit = '',
  data,
  max,
}: {
  title: string;
  caption?: string;
  unit?: string;
  data: Bar[];
  max?: number;
}) {
  // Verilen max, veriden kucukse cubuklar cerceveyi tasardi — tavan her zaman veriyi kapsar.
  const ceiling = Math.max(max ?? 0, ...data.map((d) => d.value));

  return (
    <figure className="mdx-chart">
      <figcaption className="mdx-chart-head">
        <span className="mdx-chart-title">{title}</span>
        {caption && <span className="mdx-chart-caption">{caption}</span>}
      </figcaption>

      <div className="mdx-bars">
        {data.map((d, i) => {
          const pct = ceiling > 0 ? Math.max(1.5, (d.value / ceiling) * 100) : 0;
          return (
            <div className={`mdx-bar-row${d.highlight ? ' is-highlight' : ''}`} key={i}>
              <span className="mdx-bar-label">{d.label}</span>
              <span className="mdx-bar-track">
                <span className="mdx-bar-fill" style={{ width: `${pct}%` }} />
              </span>
              <span className="mdx-bar-value">
                {d.value.toLocaleString('tr-TR')}
                {unit}
                {d.note && <em className="mdx-bar-note">{d.note}</em>}
              </span>
            </div>
          );
        })}
      </div>
    </figure>
  );
}

/* ----------------------------------------------------------- Trend chart */

type Series = { name: string; points: number[]; muted?: boolean };

const W = 720;
const H = 280;
const PAD_X = 46;
const PAD_TOP = 18;
const PAD_BOTTOM = 42;

/**
 * Cok serili cizgi grafik (inline SVG). Sabit viewBox + %100 genislik ile
 * responsive; renkler tema degiskenlerinden gelir.
 */
export function TrendChart({
  title,
  caption,
  labels,
  series,
  unit = '',
  max,
}: {
  title: string;
  caption?: string;
  labels: string[];
  series: Series[];
  unit?: string;
  max?: number;
}) {
  const all = series.flatMap((s) => s.points);
  // Verilen max, seriden kucukse cizgi grafigin disina tasardi — tavan her zaman veriyi kapsar.
  const ceiling = Math.max(max ?? 0, Math.ceil(Math.max(...all) * 1.15));
  const plotW = W - PAD_X * 2;
  const plotH = H - PAD_TOP - PAD_BOTTOM;

  const x = (i: number) =>
    PAD_X + (labels.length > 1 ? (i / (labels.length - 1)) * plotW : plotW / 2);
  const y = (v: number) => PAD_TOP + plotH - (ceiling > 0 ? (v / ceiling) * plotH : 0);

  const gridValues = [0, 0.25, 0.5, 0.75, 1].map((r) => Math.round(ceiling * r));

  return (
    <figure className="mdx-chart">
      <figcaption className="mdx-chart-head">
        <span className="mdx-chart-title">{title}</span>
        {caption && <span className="mdx-chart-caption">{caption}</span>}
      </figcaption>

      <div className="mdx-legend">
        {series.map((s, i) => (
          <span className={`mdx-legend-item${s.muted ? ' is-muted' : ''}`} key={i}>
            <span className="mdx-legend-swatch" aria-hidden="true" />
            {s.name}
          </span>
        ))}
      </div>

      <svg
        className="mdx-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={caption ? `${title} — ${caption}` : title}
        preserveAspectRatio="xMidYMid meet"
      >
        {gridValues.map((v, i) => (
          <g key={i}>
            <line
              x1={PAD_X}
              x2={W - PAD_X}
              y1={y(v)}
              y2={y(v)}
              className="mdx-svg-grid"
            />
            <text x={PAD_X - 10} y={y(v) + 4} className="mdx-svg-tick" textAnchor="end">
              {v}
              {unit}
            </text>
          </g>
        ))}

        {labels.map((label, i) => (
          <text
            key={label + i}
            x={x(i)}
            y={H - PAD_BOTTOM + 22}
            className="mdx-svg-tick"
            textAnchor="middle"
          >
            {label}
          </text>
        ))}

        {series.map((s, si) => (
          <g key={si} className={s.muted ? 'mdx-svg-serie is-muted' : 'mdx-svg-serie'}>
            <polyline
              className="mdx-svg-line"
              points={s.points.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
            />
            {s.points.map((v, i) => (
              <circle key={i} cx={x(i)} cy={y(v)} r={3.5} className="mdx-svg-dot" />
            ))}
          </g>
        ))}
      </svg>
    </figure>
  );
}

/* ----------------------------------------------------------------- Links */

/**
 * Markdown baglantilari: site ici olanlar next/link ile client-side gezinir,
 * disari acilanlar yeni sekmede ve rel korumasiyla acilir.
 */
function MdxLink({ href = '', children, ...rest }: React.ComponentProps<'a'>) {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      <NextLink href={href} data-cursor="hover" {...rest}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="hover" {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: MdxLink,
  Callout,
  KeyTakeaways,
  StatGrid,
  BarChart,
  TrendChart,
};
