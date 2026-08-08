'use client';

import { useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Etki Paneli — hizmetler sayfasindaki interaktif sonuc grafigi.
 *
 * Alti boyut tum hizmet yelpazesini kapsar: otomasyon, AI, sistem performansi,
 * SEO/GEO, donusum ve bakim yuku — yalnizca web degil.
 *
 * Iki katmanli etkilesim:
 *  1. Boyut listesinde hover (masaustu) / tap (mobil) -> grafik o boyuta gecer
 *  2. Grafik uzerinde pointer hareketi -> dikey tarama cizgisi + okuma paneli
 *
 * Pointer olaylari kullanildigi icin dokunmatik cihazlarda da calisir.
 * Rakamlar gercek musteri verisi degil, gosterge modeldir (altta not var).
 */

const CHART_W = 560;
const CHART_H = 250;
const PAD_L = 46;
const PAD_R = 18;
const PAD_T = 18;
const PAD_B = 40;

type Dimension = {
  id: string;
  /** true ise dusuk deger iyidir (sure, bakim yuku) */
  lowerIsBetter: boolean;
  /** ondalik basamak sayisi */
  decimals: number;
  us: number[];
  typical: number[];
  icon: React.ReactNode;
};

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const DIMENSIONS: Dimension[] = [
  {
    // Otomasyon / Agentic AI — elle yapilan tekrarli is
    id: 'automation',
    lowerIsBetter: true,
    decimals: 0,
    us: [40, 18, 10, 6],
    typical: [40, 38, 36, 34],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <circle cx="6" cy="6.5" r="2.4" />
        <circle cx="18" cy="6.5" r="2.4" />
        <circle cx="12" cy="18" r="2.4" />
        <path d="M8.4 6.5h7.2M7.3 8.6l3.5 7.1M16.7 8.6l-3.5 7.1" />
      </svg>
    ),
  },
  {
    // AI Entegrasyonu / Chatbot — insan dokunmadan sonuclanan talep
    id: 'ai',
    lowerIsBetter: false,
    decimals: 0,
    us: [0, 35, 55, 68],
    typical: [0, 2, 4, 6],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
        <circle cx="12" cy="12" r="1.7" />
        <path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21" />
      </svg>
    ),
  },
  {
    // Web / Web App / Cloud — yanit suresi
    id: 'performance',
    lowerIsBetter: true,
    decimals: 1,
    us: [1.4, 1.3, 1.2, 1.2],
    typical: [2.6, 2.9, 3.3, 3.8],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    // SEO & GEO
    id: 'visibility',
    lowerIsBetter: false,
    decimals: 0,
    us: [100, 145, 190, 240],
    typical: [100, 110, 124, 138],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.6-3.6M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    // Web + Google Ads
    id: 'conversion',
    lowerIsBetter: false,
    decimals: 1,
    us: [1.8, 2.4, 3.0, 3.6],
    typical: [1.8, 1.9, 2.0, 2.1],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    // Tum hizmetler — sistemi ayakta tutma yuku
    id: 'maintenance',
    lowerIsBetter: true,
    decimals: 0,
    us: [3, 2, 1, 1],
    typical: [5, 7, 9, 12],
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M12 3l7 3v5.5c0 4.2-2.9 8-7 9.5-4.1-1.5-7-5.3-7-9.5V6l7-3z" />
        <path d="M9.5 12.2l1.8 1.8 3.4-3.6" />
      </svg>
    ),
  },
];

const POINTS = 4;

export default function ImpactPanel() {
  const t = useTranslations('impact');
  const [activeDim, setActiveDim] = useState(0);
  const [scrub, setScrub] = useState(POINTS - 1);
  const panelRef = useRef<HTMLElement | null>(null);

  const dim = DIMENSIONS[activeDim];
  const checkpoints = t.raw('checkpoints') as string[];
  const unit = t(`dims.${dim.id}.unit`);

  // Ortak olcek: iki seriyi de kapsayan 0-tabanli alan, tepede %15 bosluk
  const ceiling = Math.max(...dim.us, ...dim.typical) * 1.15;
  const x = (i: number) => PAD_L + (i * (CHART_W - PAD_L - PAD_R)) / (POINTS - 1);
  const y = (v: number) => CHART_H - PAD_B - (v / ceiling) * (CHART_H - PAD_T - PAD_B);

  const line = (vals: number[]) => vals.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  // Iki egri arasindaki alan = "kazanc bandi"
  const gapPath =
    `M${dim.us.map((v, i) => `${x(i)},${y(v)}`).join('L')}` +
    `L${[...dim.typical].reverse().map((v, i) => `${x(POINTS - 1 - i)},${y(v)}`).join('L')}Z`;

  const fmt = (v: number) => v.toFixed(dim.decimals).replace('.', ',');

  const usNow = dim.us[scrub];
  const typicalNow = dim.typical[scrub];
  const ratio = dim.lowerIsBetter ? typicalNow / usNow : usNow / typicalNow;

  /** Pointer x konumunu en yakin veri noktasina yuvarlar */
  const onScrub = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * CHART_W;
    const ratioX = (px - PAD_L) / (CHART_W - PAD_L - PAD_R);
    const idx = Math.round(ratioX * (POINTS - 1));
    setScrub(Math.min(POINTS - 1, Math.max(0, idx)));
  }, []);

  /** Imlec konumunu CSS degiskenine yazar — panelde takip eden isik lekesi */
  const onPanelMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = panelRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - box.left) / box.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - box.top) / box.height) * 100}%`);
  }, []);

  return (
    <section
      ref={panelRef}
      className="ip-panel glass"
      onPointerMove={onPanelMove}
      aria-labelledby="ip-title"
    >
      <div className="ip-glow" aria-hidden="true" />

      <header className="ip-head">
        <div className="ip-eyebrow">{t('eyebrow')}</div>
        <h3 className="ip-title" id="ip-title">
          {t.rich('title', { accent: (chunks) => <span className="em">{chunks}</span> })}
        </h3>
        <p className="ip-desc">{t('desc')}</p>
      </header>

      <div className="ip-body">
        {/* Boyut secici */}
        <div className="ip-dims" role="tablist" aria-label={t('dimsLabel')}>
          {DIMENSIONS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={i === activeDim}
              className={`ip-dim ${i === activeDim ? 'is-active' : ''}`}
              onPointerEnter={() => setActiveDim(i)}
              onFocus={() => setActiveDim(i)}
              onClick={() => setActiveDim(i)}
              data-cursor="hover"
            >
              <span className="ip-dim-icon">{d.icon}</span>
              <span className="ip-dim-text">
                <span className="ip-dim-label">{t(`dims.${d.id}.label`)}</span>
                <span className="ip-dim-head">{t(`dims.${d.id}.head`)}</span>
              </span>
              <span className="ip-dim-arrow" aria-hidden="true">
                {d.lowerIsBetter ? '↓' : '↑'}
              </span>
            </button>
          ))}
        </div>

        {/* Grafik */}
        <div className="ip-chart">
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="ip-svg"
            preserveAspectRatio="xMidYMid meet"
            onPointerMove={onScrub}
            // Dokunmatikte parmak kalkinca sifirlamiyoruz — okunan deger ekranda kalsin
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') setScrub(POINTS - 1);
            }}
            role="img"
            aria-label={`${t(`dims.${dim.id}.label`)} — ${t(`dims.${dim.id}.detail`)}`}
          >
            {/* Izgara */}
            {[0, 0.5, 1].map((r) => (
              <line
                key={r}
                className="ip-grid"
                x1={PAD_L}
                x2={CHART_W - PAD_R}
                y1={y(ceiling * r)}
                y2={y(ceiling * r)}
              />
            ))}

            {/* Checkpoint etiketleri */}
            {checkpoints.map((label, i) => (
              <text
                key={label + i}
                className={`ip-tick ${i === scrub ? 'is-active' : ''}`}
                x={x(i)}
                y={CHART_H - PAD_B + 22}
                textAnchor={i === 0 ? 'start' : i === POINTS - 1 ? 'end' : 'middle'}
              >
                {label}
              </text>
            ))}

            <g key={dim.id} className="ip-series">
              <path className="ip-gap" d={gapPath} />
              <polyline className="ip-line is-typical" points={line(dim.typical)} pathLength={1} />
              <polyline className="ip-line is-us" points={line(dim.us)} pathLength={1} />
              {dim.us.map((v, i) => (
                <circle
                  key={i}
                  className={`ip-dot is-us ${i === scrub ? 'is-active' : ''}`}
                  cx={x(i)}
                  cy={y(v)}
                  r={i === scrub ? 5 : 3}
                />
              ))}
              {dim.typical.map((v, i) => (
                <circle
                  key={i}
                  className={`ip-dot is-typical ${i === scrub ? 'is-active' : ''}`}
                  cx={x(i)}
                  cy={y(v)}
                  r={i === scrub ? 4 : 2.5}
                />
              ))}
            </g>

            {/* Tarama cizgisi — x niteligi yerine transform, boylece CSS ile yumusak kayar */}
            <line
              className="ip-scrub"
              x1={0}
              x2={0}
              y1={PAD_T}
              y2={CHART_H - PAD_B}
              style={{ transform: `translateX(${x(scrub)}px)` }}
            />
          </svg>

          {/* Okuma paneli */}
          <div className="ip-readout">
            <div className="ip-readout-when">{checkpoints[scrub]}</div>
            <div className="ip-readout-rows">
              <div className="ip-readout-row is-us">
                <span className="ip-swatch" aria-hidden="true" />
                <span className="ip-readout-k">{t('seriesUs')}</span>
                <span className="ip-readout-v">
                  {fmt(usNow)}
                  {unit}
                </span>
              </div>
              <div className="ip-readout-row is-typical">
                <span className="ip-swatch" aria-hidden="true" />
                <span className="ip-readout-k">{t('seriesTypical')}</span>
                <span className="ip-readout-v">
                  {fmt(typicalNow)}
                  {unit}
                </span>
              </div>
            </div>
            <div className="ip-readout-delta">
              <strong>{ratio.toFixed(1).replace('.', ',')}×</strong>
              <span>{dim.lowerIsBetter ? t('deltaLower') : t('deltaHigher')}</span>
            </div>
          </div>

          <p className="ip-detail" key={dim.id}>
            {t(`dims.${dim.id}.detail`)}
          </p>
        </div>
      </div>

      <footer className="ip-foot">
        <span className="ip-note">{t('note')}</span>
      </footer>
    </section>
  );
}
