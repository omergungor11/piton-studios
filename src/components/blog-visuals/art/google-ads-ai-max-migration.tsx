'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Chip, Cube, Floor, Lines, Node, Panel, Reflection, Shield, useArt } from '../kit';

/**
 * AI Max gecisi — solda arama kutusu ve sabit anahtar kelime cipleri; ortada bir yapay zeka cekirdegi
 * cipleri alip cok sayida yeni arama sorgusuna dagitiyor. Sagda reklam karti: degisen baslik satirlari ve
 * farkli sayfalara giden baglantilar. Altta marka/URL hariç tutma icin kalkan ve ayar dugmeleri.
 */
export default function GoogleAdsAiMaxMigrationArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={170} r={260} />
      <Floor horizon={318} vx={320} />
      <Reflection cx={320} cy={338} rx={190} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

const QUERIES = [70, 104, 138, 172, 206, 240];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Arama kutusu + anahtar kelimeler */}
      <Panel x={30} y={100} w={160} h={168}>
        <rect x={44} y={116} width={132} height={28} rx="14" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.9" />
        <circle cx={62} cy={130} r={6} fill="none" stroke={C.muted} strokeWidth="1.6" />
        <line x1={66} y1={134} x2={71} y2={139} stroke={C.muted} strokeWidth="1.6" strokeLinecap="round" />
        <rect x={80} y={128} width={70} height={5} rx="2.5" fill={C.faint} />
        <Chip x={44} y={160} w={70} hot />
        <Chip x={120} y={160} w={56} />
        <Chip x={44} y={190} w={56} />
        <Chip x={106} y={190} w={70} hot />
        <Chip x={44} y={220} w={92} />
      </Panel>
      <Beam d="M190 184 C 214 184, 220 184, 246 184" delay={0.1} />

      {/* Yapay zeka cekirdegi */}
      <circle cx={282} cy={184} r={46} fill={C.accent} opacity="0.16" filter={`url(#${ids.bloom})`} />
      <circle cx={282} cy={184} r={40} fill="none" stroke={C.line} strokeWidth="0.8" strokeDasharray="3 5" />
      <Cube x={282} y={184} s={34} hot />

      {/* Genisleyen sorgular */}
      {QUERIES.map((y, i) => (
        <g key={y}>
          <Beam d={`M318 184 C 344 184, 346 ${y + 8}, 372 ${y + 8}`} delay={0.3 + i * 0.15} faint={i % 2 === 1} width={1.2} />
          <rect x={372} y={y} width={i % 3 === 0 ? 62 : 46} height={16} rx="8" fill={i % 2 === 0 ? C.accent : '#FFFFFF'} fillOpacity={i % 2 === 0 ? 0.2 : 0.04} stroke={i % 2 === 0 ? C.hot : C.line} strokeWidth="0.8" />
        </g>
      ))}

      {/* Reklam karti: degisen basliklar, farkli sayfalar */}
      <Beam d="M436 150 C 452 150, 456 150, 466 150" delay={1.2} faint />
      <g className="sv-float">
        <Browser x={466} y={74} w={150} h={176} hot>
          <rect x={480} y={106} width={36} height={6} rx="3" fill={C.muted} opacity="0.7" />
          <rect x={480} y={120} width={110} height={10} rx="5" fill={C.hot} opacity="0.9" />
          <rect x={480} y={136} width={86} height={10} rx="5" fill={C.accent} opacity="0.45" />
          <Lines x={480} y={158} w={118} rows={2} gap={9} thick={4} />
          {[188, 210].map((y, i) => (
            <g key={y}>
              <Node x={486} y={y + 6} r={4} hot={i === 0} />
              <rect x={498} y={y + 3} width={i === 0 ? 74 : 58} height={6} rx="3" fill={i === 0 ? C.hot : C.faint} opacity={i === 0 ? 0.8 : 1} />
            </g>
          ))}
        </Browser>
      </g>

      {/* Kontroller: marka / URL haric tutma */}
      <Panel x={232} y={262} w={180} h={50}>
        <Shield x={258} y={287} s={16} />
        {[300, 340, 380].map((x, i) => (
          <g key={x}>
            <rect x={x - 14} y={282} width={28} height={10} rx="5" fill={i === 1 ? C.faint : C.accent} fillOpacity={i === 1 ? 1 : 0.5} />
            <circle cx={i === 1 ? x - 8 : x + 8} cy={287} r={6} fill={C.ink} />
          </g>
        ))}
      </Panel>
      <Beam d="M282 226 C 282 240, 290 250, 300 262" delay={0.8} faint />
    </g>
  );
}
