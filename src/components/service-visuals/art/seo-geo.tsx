'use client';

import { Ambient, ArtFrame, Beam, C, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/** SEO & GEO — arama cubugu, siralama listesi, sitenin kaynak olarak alintilandigi yapay zeka yanit karti ve tarama agi. */
export default function SeoGeoArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={420} cy={170} r={250} />
      <Floor horizon={300} vx={380} />
      <Reflection cx={400} cy={322} rx={200} ry={14} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Tarama agi */}
      <g stroke={C.line} strokeWidth="0.9" fill="none">
        <path d="M72 272 L128 256 L184 276 M128 256 L150 236" />
      </g>
      <Node x={72} y={272} r={3.5} />
      <Node x={184} y={276} r={3.5} />
      <Node x={150} y={236} r={3.5} />
      <Node x={128} y={256} r={4} hot />

      {/* Arama cubugu */}
      <Panel x={56} y={44} w={262} h={36} r={18}>
        <circle cx={78} cy={61} r={6.5} fill="none" stroke={C.ink} strokeWidth="1.5" />
        <path d="M83 66 L88 71" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" />
        <Lines x={98} y={59} w={150} rows={1} thick={4} />
        <rect x={276} y={52} width={30} height={20} rx="10" fill={C.accent} />
      </Panel>

      {/* Siralama listesi */}
      <g className="sv-float" style={{ animationDelay: '-1.5s' }}>
        <Panel x={56} y={96} w={200} h={112}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              {i === 0 && <rect x={62} y={102} width={188} height={24} rx="6" fill={`url(#${ids.panelHot})`} stroke={C.accent} strokeWidth="0.9" />}
              <rect x={70} y={108 + i * 25} width={12} height={12} rx="3" fill={i === 0 ? C.hot : C.faint} />
              <Lines x={90} y={110 + i * 25} w={140 - i * 14} rows={1} thick={4} accentFirst={i === 0} />
            </g>
          ))}
        </Panel>
      </g>

      {/* Yapay zeka yanit karti */}
      <g transform="translate(300 70) skewY(-3)">
        <Panel x={0} y={0} w={286} h={206} hot>
          <path d="M28 12 C30 22, 34 26, 44 28 C34 30, 30 34, 28 44 C26 34, 22 30, 12 28 C22 26, 26 22, 28 12 Z" fill={`url(#${ids.accent})`} filter={`url(#${ids.glow})`} />
          <Lines x={54} y={22} w={120} rows={2} gap={9} thick={4} />
          <rect x={16} y={56} width={254} height={1} fill={C.line} />
          <Lines x={16} y={70} w={250} rows={5} gap={11} thick={4} />
          {/* Kaynak ciplari */}
          <rect x={16} y={138} width={78} height={20} rx="10" fill={C.accent} fillOpacity="0.25" stroke={C.hot} strokeWidth="1.1" />
          <rect x={24} y={144} width={8} height={8} rx="2" fill={C.hot} />
          <rect x={38} y={146} width={46} height={4} rx="2" fill={C.ink} opacity="0.8" />
          {[0, 1].map((i) => (
            <g key={i}>
              <rect x={102 + i * 74} y={138} width={66} height={20} rx="10" fill="none" stroke={C.line} strokeWidth="0.9" />
              <rect x={112 + i * 74} y={146} width={40} height={4} rx="2" fill={C.faint} />
            </g>
          ))}
          <Lines x={16} y={172} w={200} rows={2} gap={10} thick={3} />
        </Panel>
      </g>

      {/* Yapisal veri parcasi */}
      <g className="sv-float">
        <Panel x={470} y={236} w={130} h={64}>
          <path d="M486 252 L480 258 L486 264 M512 252 L518 258 L512 264" fill="none" stroke={C.hot} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <Lines x={528} y={250} w={60} rows={2} gap={8} thick={3} />
          <Lines x={482} y={276} w={100} rows={2} gap={8} thick={3} />
        </Panel>
      </g>

      <Beam d="M318 62 C 340 62, 350 67, 366 67" delay={0.3} faint />
      <Beam d="M256 114 C 292 114, 284 217, 316 217" />
      <Beam d="M150 236 L150 210" delay={0.9} faint />
      <Node x={256} y={114} hot />
      <Node x={366} y={67} r={4} />
      <Node x={316} y={217} hot />
    </g>
  );
}
