'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Cart, Clock, Floor, Panel, Reflection, Spark, useArt } from '../kit';

/**
 * Kasim core update'i ve Kara Cuma — ortada arama sonuclari penceresi; satirlar yer degistiriyor ve
 * uzerinden nabiz gibi bir dalga geciyor. Solda yayilma suresini gosteren saat, sagda alisveris sepeti ve
 * izlenen trafik grafigi. Hepsi ayni zemin uzerinde, ayni haftalara sikismis.
 */
export default function GoogleNovember2026CoreUpdateArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={260} />
      <Floor horizon={320} vx={320} />
      <Reflection cx={320} cy={336} rx={170} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

const ROWS = [
  { y: 132, w: 116, hot: false, float: false },
  { y: 168, w: 132, hot: true, float: true },
  { y: 204, w: 98, hot: false, float: false },
  { y: 240, w: 124, hot: false, float: true },
];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Yayilma suresi */}
      <Panel x={36} y={110} w={124} h={124}>
        <Clock cx={98} cy={172} r={38} hand={0.36} hot />
      </Panel>
      <Beam d="M160 172 C 190 172, 200 172, 222 172" delay={0.2} />

      {/* Arama sonuclari: satirlar yer degistiriyor */}
      <rect x={222} y={84} width={196} height={212} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Browser x={222} y={84} w={196} h={212} hot>
        <rect x={238} y={114} width={164} height={10} rx="5" fill={C.faint} />
        {ROWS.map((r) => {
          const row = (
            <g>
              <rect x={238} y={r.y + 10} width={20} height={20} rx="4" fill={r.hot ? `url(#${ids.panelHot})` : C.bg} stroke={r.hot ? C.hot : C.line} strokeWidth="0.9" />
              <rect x={266} y={r.y + 12} width={r.w} height={6} rx="3" fill={r.hot ? C.hot : C.muted} opacity={r.hot ? 0.85 : 0.6} />
              <rect x={266} y={r.y + 24} width={r.w - 30} height={4} rx="2" fill={C.faint} />
            </g>
          );
          return r.float ? (
            <g key={r.y} className="sv-float">
              {row}
            </g>
          ) : (
            <g key={r.y}>{row}</g>
          );
        })}
        <path
          className="sv-flow"
          d="M226 236 C 262 196, 290 268, 322 226 S 380 192, 414 232"
          fill="none"
          stroke={C.accent}
          strokeWidth="1.8"
          strokeDasharray="6 6"
          strokeLinecap="round"
          opacity="0.8"
        />
      </Browser>

      {/* Kara Cuma: sepet + trafik grafigi */}
      <Beam d="M418 172 C 440 172, 446 160, 466 156" delay={0.9} />
      <g className="sv-float">
        <Panel x={466} y={96} w={140} h={150}>
          <circle cx={536} cy={136} r={24} fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
          <Cart x={530} y={130} s={26} />
          <line x1={480} y1={226} x2={592} y2={226} stroke={C.line} strokeWidth="0.8" />
          <Spark x={480} y={176} w={112} h={46} points={[0.3, 0.34, 0.32, 0.5, 0.42, 0.7, 0.9]} />
        </Panel>
      </g>
      <circle className="sv-pulse" cx={600} cy={102} r={9} fill={C.hot} opacity="0.85" />
    </g>
  );
}
