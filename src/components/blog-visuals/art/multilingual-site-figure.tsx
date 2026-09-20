'use client';

import { ArtFrame, Ambient, Arrow, Beam, C, Lines, Node, Panel } from '../kit';

/**
 * hreflang karsilikliligi semasi: uc dil surumu ucgenin koselerinde; her bag cift yonlu ve her
 * surum kendini de isaret eder. Ortadaki dugum, dili eslesmeyen ziyaretcinin dustugu varsayilan surum.
 */
export default function MultilingualSiteFigure({ label }: { label: string }) {
  const nodes = [
    { x: 150, y: 110 },
    { x: 490, y: 110 },
    { x: 320, y: 306 },
  ];
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={180} r={230} />

      {nodes.map((n, i) => (
        <g key={i}>
          <Panel x={n.x - 74} y={n.y - 48} w={148} h={96} hot={i === 0}>
            <rect x={n.x - 58} y={n.y - 30} width={62} height={8} rx="4" fill={i === 0 ? C.ink : C.muted} opacity="0.85" />
            <Lines x={n.x - 58} y={n.y - 14} w={80} rows={2} gap={9} thick={3} />
            {[0, 1, 2].map((k) => (
              <rect key={k} x={n.x + 16 + k * 16} y={n.y - 32} width={12} height={6} rx="3" fill={k === i ? C.hot : C.faint} />
            ))}
          </Panel>
          {/* Surumun kendini isaret etmesi */}
          <path
            d={`M${n.x + 74} ${n.y - 20} a22,22 0 1 1 -2,40`}
            fill="none"
            stroke={C.line}
            strokeWidth="1"
            strokeDasharray="4 5"
          />
          <Arrow x={n.x + 72} y={n.y + 20} angle={150} s={8} hot={false} />
        </g>
      ))}

      {/* Cift yonlu baglar */}
      <Beam d="M224 110 L416 110" delay={0} width={1.3} />
      <Beam d="M224 122 L416 122" delay={0.6} faint width={1.2} />
      <Arrow x={416} y={110} angle={0} />
      <Arrow x={224} y={122} angle={180} hot={false} />

      <Beam d="M182 158 L288 264" delay={0.3} width={1.3} />
      <Beam d="M170 168 L276 274" delay={0.9} faint width={1.2} />
      <Arrow x={288} y={264} angle={45} />
      <Arrow x={170} y={168} angle={225} hot={false} />

      <Beam d="M458 158 L352 264" delay={0.45} width={1.3} />
      <Beam d="M470 168 L364 274" delay={1.05} faint width={1.2} />
      <Arrow x={352} y={264} angle={135} />
      <Arrow x={470} y={168} angle={-45} hot={false} />

      {/* Varsayilan surum isareti */}
      <Node x={320} y={186} r={6} hot />
      <circle className="sv-pulse" cx={320} cy={186} r={12} fill="none" stroke={C.hot} strokeWidth="1" />
    </ArtFrame>
  );
}
