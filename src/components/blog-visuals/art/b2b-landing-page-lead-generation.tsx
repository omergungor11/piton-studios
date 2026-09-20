'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Chip, Check, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/**
 * B2B teklif toplayan acilis sayfasi — soldaki huni ziyaretciyi daraltir, ortadaki sayfa tek bir
 * teklif formuna odaklanir, sagda gelen talep karti dusar.
 */
export default function B2bLandingPageArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={330} cy={160} r={250} />
      <Floor horizon={306} vx={330} />
      <Reflection cx={330} cy={330} rx={185} ry={13} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Trafik: genis girisin daralmasi */}
      <path d="M32 62 L156 62 L124 236 L64 236 Z" fill={`url(#${ids.panelHot})`} opacity="0.5" />
      <path d="M32 62 L156 62 L124 236 L64 236 Z" fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="4 6" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={44 + i * 3}
          y={82 + i * 52}
          width={100 - i * 16}
          height={10}
          rx="5"
          fill={i === 2 ? C.accent : C.faint}
        />
      ))}
      {[70, 96, 122].map((x, i) => (
        <circle key={x} cx={x} cy={48} r="4" fill={C.muted} opacity={0.5 + i * 0.15} />
      ))}
      <Beam d="M94 240 C 94 268, 150 268, 186 268" delay={0.4} faint />

      {/* Acilis sayfasi: tek mesaj, tek form, tek buton */}
      <g transform="translate(196 48) skewY(-3)">
        <Browser x={0} y={0} w={276} h={244} hot>
          <rect x={20} y={38} width={150} height={12} rx="6" fill={C.ink} opacity="0.9" />
          <rect x={20} y={58} width={104} height={12} rx="6" fill={C.ink} opacity="0.5" />
          <Lines x={20} y={82} w={140} rows={2} gap={9} thick={4} />
          {/* Guven satiri */}
          {[0, 1, 2].map((i) => (
            <Chip key={i} x={20 + i * 52} y={106} w={44} h={14} />
          ))}
          {/* Form: uc alan + tek eylem */}
          <rect x={186} y={34} width={74} height={200} rx="10" fill={C.bg2} stroke={C.accent} strokeWidth="1" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={194} y={46 + i * 34} width={58} height={24} rx="5" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.7" />
          ))}
          <rect x={194} y={148} width={58} height={26} rx="6" fill={C.accent} />
          <Lines x={194} y={186} w={58} rows={2} gap={8} thick={3} />
          {/* Kanit blogu */}
          <rect x={20} y={136} width={150} height={96} rx="8" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.7" />
          <circle cx={44} cy={162} r="12" fill={C.faint} />
          <Lines x={64} y={154} w={92} rows={2} gap={9} thick={4} />
          <Lines x={32} y={190} w={126} rows={3} gap={10} thick={3} />
        </Browser>
      </g>

      {/* Gelen talep karti */}
      <g className="sv-float">
        <Panel x={492} y={168} w={124} h={92} hot>
          <circle cx={516} cy={196} r={11} fill={C.accent} opacity="0.35" />
          <Check x={516} y={196} s={15} />
          <Lines x={534} y={190} w={68} rows={2} gap={9} thick={4} />
          <Lines x={506} y={224} w={96} rows={2} gap={9} thick={3} />
        </Panel>
      </g>
      <Beam d="M474 168 C 500 168, 484 196, 502 200" delay={0.8} />
      <Node x={474} y={168} hot />
    </g>
  );
}
