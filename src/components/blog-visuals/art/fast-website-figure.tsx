'use client';

import { ArtFrame, Ambient, Beam, C, Lines, Node, Panel } from '../kit';

/**
 * Kritik yol semasi: ustte ilk boyamayi bekleten zincir (istek → yanit → belge → kritik stil →
 * boyama), altta boyamadan sonraya birakilan agir varliklar. Iki seridin uzunlugu isin ozeti.
 */
export default function FastWebsiteFigure({ label }: { label: string }) {
  const critical = [64, 168, 268, 368, 468];
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={130} r={230} />

      {/* Kritik zincir */}
      <Panel x={32} y={54} w={576} h={124} hot>
        {critical.map((x, i) => (
          <g key={x}>
            <rect x={x} y={92} width={72} height={40} rx="8" fill={C.bg2} stroke={i === 4 ? C.accent : C.line} strokeWidth={i === 4 ? 1.2 : 0.8} />
            <rect x={x + 14} y={104} width={i === 4 ? 44 : 32} height={5} rx="2.5" fill={i === 4 ? C.hot : C.faint} />
            <rect x={x + 14} y={115} width={24} height={5} rx="2.5" fill={C.faint} />
            {i < 4 && <Beam d={`M${x + 72} 112 L${x + 100} 112`} delay={i * 0.3} width={1.3} />}
          </g>
        ))}
        <Lines x={64} y={70} w={180} rows={1} thick={4} accentFirst />
        <Node x={540} y={112} r={5} hot />
      </Panel>

      {/* Boyama cizgisi */}
      <line x1={540} y1={54} x2={540} y2={330} stroke={C.hot} strokeWidth="1.2" strokeDasharray="4 5" opacity="0.7" />

      {/* Boyamadan sonraya birakilanlar */}
      <Panel x={32} y={198} w={576} h={132}>
        {[
          { y: 228, w: 150, x: 548 },
          { y: 254, w: 34, x: 556 },
          { y: 280, w: 64, x: 552 },
        ].map((r, i) => (
          <g key={i}>
            <rect x={r.x} y={r.y} width={r.w > 600 - r.x ? 600 - r.x : r.w} height={12} rx="6" fill={C.faint} />
            <rect x={r.x - 8} y={r.y + 3} width={6} height={6} rx="3" fill={C.muted} opacity="0.6" />
          </g>
        ))}
        <Lines x={64} y={230} w={300} rows={3} gap={26} thick={4} />
        <Beam d="M64 312 L508 312" delay={0.5} faint width={1.2} />
      </Panel>
    </ArtFrame>
  );
}
