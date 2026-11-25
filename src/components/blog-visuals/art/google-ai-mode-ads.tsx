'use client';

import { Ambient, ArtFrame, Beam, Browser, Bubble, C, Floor, Globe, Lines, Reflection, Spark, useArt } from '../kit';

/**
 * Google AI Mode reklamlari — solda uzun bir kullanici sorusu (sohbet balonu). Ortada yapay zeka yanitini gosteren
 * tarayici: ustte ve altta soluk reklam kartlari (AI Overviews cevresindeki yerlesim), yanitin icinde parlayan sponsorlu
 * kart. Sagda kure ve uzerinde ulke dugumleri; bazilari parliyor (reklamlarin acildigi pazarlar), digerleri soluk.
 */
export default function GoogleAiModeAdsArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={300} cy={190} r={270} />
      <Floor horizon={322} vx={300} />
      <Reflection cx={300} cy={338} rx={190} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

const NODES: Array<[number, number, boolean]> = [
  [516, 150, true],
  [548, 176, true],
  [578, 140, false],
  [530, 214, true],
  [566, 236, false],
  [596, 196, true],
  [508, 186, false],
];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Uzun kullanici sorusu */}
      <Bubble x={20} y={128} w={118} h={66} side="left" rows={4} />
      <Beam d="M138 170 C 156 170, 160 190, 176 190" delay={0.1} />

      {/* Yapay zeka yaniti */}
      <rect x={176} y={56} width={258} height={268} rx="14" fill={C.accent} opacity="0.08" filter={`url(#${ids.bloom})`} />
      <Browser x={176} y={56} w={258} h={268} hot>
        {/* Ust reklam karti (yanitin ustu) */}
        <rect x={192} y={88} width={226} height={30} rx="6" fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
        <rect x={200} y={96} width={14} height={14} rx="3" fill={C.faint} />
        <Lines x={222} y={97} w={150} rows={2} gap={8} thick={3} />

        {/* Yanit paneli */}
        <rect x={192} y={128} width={226} height={136} rx="8" fill={`url(#${ids.panel})`} stroke={C.accent} strokeWidth="0.9" />
        <circle className="sv-pulse" cx={206} cy={142} r={5} fill={C.hot} />
        <Lines x={218} y={139} w={180} rows={3} gap={9} thick={4} />
        {/* Yanitin icindeki sponsorlu kart */}
        <rect x={204} y={176} width={202} height={74} rx="7" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="1" />
        <rect x={214} y={186} width={46} height={46} rx="6" fill={C.accent} fillOpacity="0.25" stroke={C.hot} strokeWidth="0.8" />
        <Lines x={270} y={190} w={110} rows={3} gap={10} thick={4} accentFirst />
        <rect x={270} y={232} width={28} height={8} rx="4" fill={C.hot} opacity="0.8" />
        <rect x={378} y={184} width={20} height={8} rx="4" fill={C.accent} opacity="0.6" />

        {/* Alt reklam karti (yanitin alti) */}
        <rect x={192} y={274} width={226} height={30} rx="6" fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
        <rect x={200} y={282} width={14} height={14} rx="3" fill={C.faint} />
        <Lines x={222} y={283} w={150} rows={2} gap={8} thick={3} />
      </Browser>

      {/* Kure ve pazarlar */}
      <Beam d="M434 190 C 456 190, 464 186, 488 186" delay={0.6} />
      <Globe cx={552} cy={188} r={66} />
      {NODES.map(([x, y, hot], i) => (
        <circle
          key={i}
          className={hot ? 'sv-pulse' : undefined}
          cx={x}
          cy={y}
          r={hot ? 5 : 3.5}
          fill={hot ? C.hot : C.faint}
          style={hot ? { animationDelay: `${i * 0.25}s` } : undefined}
        />
      ))}

      {/* Buyume cizgisi */}
      <g className="sv-float">
        <rect x={494} y={60} width={116} height={52} rx="10" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.9" />
        <Spark x={504} y={68} w={96} h={36} points={[0.1, 0.12, 0.2, 0.45, 0.7, 0.85]} />
      </g>
    </g>
  );
}
