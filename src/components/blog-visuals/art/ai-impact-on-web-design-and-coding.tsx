'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Check, Cross, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/**
 * Yapay zekanin web tasarim ve kodlamaya etkisi — soldaki uretec varyantlari ve kod taslagini hizla
 * cikarir, hepsi ortadaki insan denetim kapisindan gecer; onaylanan yayina gider, elenen geri doner.
 */
export default function AiImpactArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={300} cy={160} r={250} />
      <Floor horizon={312} vx={330} />
      <Reflection cx={470} cy={334} rx={130} ry={12} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Uretec: varyantlar ve kod taslagi */}
      <Panel x={36} y={54} w={196} h={240}>
        <circle cx={134} cy={110} r={30} fill={C.accent} opacity="0.18" filter={`url(#${ids.bloom})`} />
        <path
          d="M134 88 C137 100, 143 106, 155 109 C143 112, 137 118, 134 130 C131 118, 125 112, 113 109 C125 106, 131 100, 134 88 Z"
          fill={`url(#${ids.accent})`}
          filter={`url(#${ids.glow})`}
        />
        {/* Uc tasarim varyanti */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${56 + i * 50} ${156}) rotate(${-6 + i * 6})`}>
            <rect x={0} y={0} width={42} height={56} rx="5" fill="#FFFFFF" fillOpacity={i === 1 ? 0.08 : 0.04} stroke={i === 1 ? C.accent : C.line} strokeWidth="0.8" />
            <rect x={7} y={8} width={28} height={16} rx="3" fill={i === 1 ? C.accent : C.faint} fillOpacity={i === 1 ? 0.6 : 1} />
            <rect x={7} y={30} width={22} height={4} rx="2" fill={C.faint} />
            <rect x={7} y={38} width={16} height={4} rx="2" fill={C.faint} />
          </g>
        ))}
        {/* Kod taslagi */}
        <Lines x={56} y={236} w={150} rows={4} gap={11} thick={4} accentFirst />
      </Panel>

      {/* Insan denetim kapisi */}
      <g>
        <rect x={268} y={92} width={92} height={168} rx="14" fill={C.bg2} stroke={C.accent} strokeWidth="1.1" />
        <circle cx={314} cy={140} r={18} fill={C.bg} stroke={C.line} strokeWidth="0.9" />
        <circle cx={314} cy={134} r={6} fill={C.muted} />
        <path d="M304 154 a10,10 0 0 1 20,0 Z" fill={C.faint} />
        <circle cx={314} cy={196} r={20} fill="none" stroke={C.hot} strokeWidth="1.2" />
        <Check x={314} y={196} s={20} />
        <Cross x={314} y={234} s={16} />
        <Lines x={284} y={252} w={60} rows={1} thick={3} />
      </g>
      <Beam d="M232 124 C 248 124, 252 140, 264 140" delay={0} width={1.3} />
      <Beam d="M232 182 C 248 182, 252 190, 264 196" delay={0.3} width={1.3} />
      <Beam d="M232 250 C 248 250, 252 240, 264 234" delay={0.6} faint width={1.2} />
      {/* Elenen varyant geri doner */}
      <Beam d="M268 234 C 240 268, 180 276, 140 268" delay={1.1} faint width={1.2} />
      <Node x={140} y={268} r={3.5} />

      {/* Onaylanan yayina gider */}
      <Beam d="M360 196 C 388 196, 388 150, 408 146" delay={0.9} />
      <Node x={408} y={146} r={4.5} hot />
      <g className="sv-float">
        <Browser x={412} y={62} w={188} h={150} hot>
          <rect x={428} y={98} width={76} height={10} rx="5" fill={C.ink} opacity="0.9" />
          <Lines x={428} y={116} w={86} rows={3} gap={10} thick={3} />
          <rect x={428} y={158} width={44} height={14} rx="7" fill={C.accent} />
          <rect x={524} y={96} width={62} height={76} rx="6" fill={`url(#${ids.accent})`} opacity="0.8" />
        </Browser>
      </g>
      {/* Yayin sonrasi olcum */}
      <Panel x={412} y={230} w={188} h={78}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Node x={444 + i * 42} y={262} r={4} hot={i === 3} />
            {i < 3 && <Beam d={`M${452 + i * 42} 262 L${478 + i * 42} 262`} delay={i * 0.35} faint width={1.2} />}
          </g>
        ))}
        <Lines x={432} y={286} w={148} rows={1} thick={3} />
      </Panel>
    </g>
  );
}
