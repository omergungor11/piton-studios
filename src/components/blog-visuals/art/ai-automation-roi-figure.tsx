'use client';

import { ArtFrame, Ambient, Beam, C, Clock, Lines, Node, Panel } from '../kit';

/**
 * Once/sonra sema: ustteki serit elle yurutulen surecin adimlarini ve toplam suresini, alttaki serit
 * ayni isin otomasyonla kalan iki insan adimini ve kisalan suresini gosterir.
 */
export default function AiAutomationRoiFigure({ label }: { label: string }) {
  const manual = [0, 1, 2, 3, 4, 5];
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={230} />

      {/* Elle yurutulen surec */}
      <Panel x={30} y={44} w={500} h={132}>
        {manual.map((i) => (
          <g key={i}>
            <rect x={60 + i * 74} y={94} width={58} height={40} rx="8" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.8" />
            <rect x={72 + i * 74} y={106} width={28} height={5} rx="2.5" fill={C.faint} />
            <rect x={72 + i * 74} y={117} width={18} height={5} rx="2.5" fill={C.faint} />
            {i < 5 && <Beam d={`M${118 + i * 74} 114 L${134 + i * 74} 114`} delay={i * 0.2} faint width={1.2} />}
          </g>
        ))}
        <Lines x={60} y={64} w={160} rows={1} thick={4} />
        <rect x={60} y={152} width={442} height={8} rx="4" fill={C.faint} />
      </Panel>
      <Clock cx={572} cy={114} r={32} hand={0.66} />

      {/* Otomasyonla kalan adimlar */}
      <Panel x={30} y={218} w={500} h={132} hot>
        <rect x={60} y={268} width={58} height={40} rx="8" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.8" />
        <rect x={72} y={280} width={28} height={5} rx="2.5" fill={C.faint} />
        <rect x={72} y={291} width={18} height={5} rx="2.5" fill={C.faint} />
        <Beam d="M118 288 L146 288" delay={0} width={1.3} />
        {/* Otomatik blok: arada insan yok */}
        <rect x={146} y={262} width={186} height={52} rx="10" fill={C.accent} fillOpacity="0.22" stroke={C.accent} strokeWidth="1.1" />
        <Node x={192} y={288} r={4} hot />
        <Node x={239} y={288} r={4} hot />
        <Node x={286} y={288} r={4} hot />
        <Beam d="M160 288 L318 288" delay={0.3} width={1.3} />
        <Beam d="M332 288 L360 288" delay={0.6} width={1.3} />
        <rect x={360} y={268} width={58} height={40} rx="8" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.8" />
        <rect x={372} y={280} width={28} height={5} rx="2.5" fill={C.hot} />
        <rect x={372} y={291} width={18} height={5} rx="2.5" fill={C.faint} />
        <Lines x={60} y={238} w={160} rows={1} thick={4} accentFirst />
        <rect x={60} y={326} width={158} height={8} rx="4" fill={C.accent} />
      </Panel>
      <Clock cx={572} cy={288} r={32} hand={0.14} hot />
    </ArtFrame>
  );
}
