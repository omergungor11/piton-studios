'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Cart, Check, Clock, Cross, Doc, Floor, Grid, Lines, Reflection, useArt } from '../kit';

/**
 * Kagit faturanin sonu — solda soluk, kesik cizgili bir kagit fatura carpi ile isaretli. Ortada bir e-ticaret sitesi:
 * sepet, siparis satirlari ve parlayan bir dijital fatura belgesi; siparisten faturaya isik akiyor. Sagda belgeler
 * onay isaretli bir sistem paneline akiyor; ustte son tarihi gosteren takvim izgarasi ve saat.
 */
export default function EArchiveInvoice2027Art({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={270} />
      <Floor horizon={322} vx={320} />
      <Reflection cx={320} cy={338} rx={190} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Kagit fatura (biten) */}
      <g opacity="0.55">
        <rect x={28} y={150} width={92} height={120} rx="6" fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="4 5" />
        <Lines x={40} y={170} w={66} rows={6} gap={12} thick={3} />
      </g>
      <circle cx={112} cy={156} r={13} fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
      <Cross x={112} y={156} s={10} />

      {/* E-ticaret sitesi + dijital fatura */}
      <rect x={156} y={70} width={280} height={250} rx="14" fill={C.accent} opacity="0.08" filter={`url(#${ids.bloom})`} />
      <Browser x={156} y={70} w={280} h={250} hot>
        <rect x={172} y={104} width={112} height={96} rx="8" fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
        <Cart x={212} y={142} s={30} />
        <rect x={184} y={180} width={86} height={8} rx="4" fill={C.hot} opacity="0.75" />
        <Lines x={172} y={216} w={110} rows={5} gap={14} thick={4} />
        <Beam d="M284 152 C 300 152, 300 132, 318 132" delay={0.3} />
        <rect x={316} y={100} width={104} height={150} rx="10" fill={C.accent} opacity="0.14" filter={`url(#${ids.bloom})`} />
        <g className="sv-float">
          <Doc x={324} y={108} w={88} h={130} hot rows={7} />
        </g>
        <circle cx={396} cy={276} r={14} fill={C.accent} fillOpacity="0.2" stroke={C.hot} strokeWidth="1" />
        <Check x={396} y={276} s={13} />
        <rect x={324} y={270} width={56} height={6} rx="3" fill={C.faint} />
        <rect x={324} y={284} width={36} height={6} rx="3" fill={C.faint} />
      </Browser>

      {/* Takvim ve saat */}
      <g>
        <rect x={474} y={60} width={138} height={98} rx="10" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.9" />
        <line x1={474} y1={80} x2={612} y2={80} stroke={C.line} strokeWidth="0.8" />
        <Grid x={486} y={88} cols={6} rows={3} cell={16} gap={4} hot={[5]} />
      </g>
      <Clock cx={590} cy={190} r={24} hand={0.95} hot />

      {/* Sisteme akis */}
      <Beam d="M436 230 C 462 230, 470 262, 494 262" delay={0.7} />
      <rect x={494} y={226} width={118} height={86} rx="12" fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
      <rect x={494} y={226} width={118} height={86} rx="12" fill={`url(#${ids.panelHot})`} stroke={C.accent} strokeWidth="1" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={508} y={240 + i * 22} width={60} height={14} rx="4" fill={C.bg2} stroke={C.line} strokeWidth="0.7" />
          <circle className="sv-pulse" cx={590} cy={247 + i * 22} r={4} fill={C.hot} style={{ animationDelay: `${i * 0.3}s` }} />
        </g>
      ))}
    </g>
  );
}
