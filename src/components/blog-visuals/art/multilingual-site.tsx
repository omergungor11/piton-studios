'use client';

import { Ambient, ArtFrame, Arrow, Beam, Browser, C, Floor, Globe, Lines, Node, Reflection } from '../kit';

/**
 * Cok dilli site — ayni sayfanin uc dil surumu ust uste; aralarindaki karsilikli baglar (hreflang)
 * her surumu digerine isaret ediyor, soldaki kure ise ziyaretcinin dil/bolge sinyalini temsil ediyor.
 */
export default function MultilingualSiteArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={400} cy={170} r={250} />
      <Floor horizon={308} vx={380} />
      <Reflection cx={410} cy={332} rx={175} ry={13} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  // Uc dil surumu: ayni duzen, basamakli kaydirma — aradaki bag her zaman gorunur kalir.
  const layers = [
    { x: 262, y: 186, hot: false },
    { x: 330, y: 124, hot: false },
    { x: 398, y: 62, hot: true },
  ];
  return (
    <g>
      <Globe cx={128} cy={186} r={76} />
      <Node x={104} y={150} r={4} />
      <Node x={162} y={200} r={4} />
      <Node x={126} y={232} r={4} hot />
      <Beam d="M204 186 C 238 186, 236 244, 258 252" delay={0.2} />

      {layers.map((l, i) => (
        <g key={i} opacity={l.hot ? 1 : 0.72 + i * 0.1}>
          <Browser x={l.x} y={l.y} w={196} h={140} hot={l.hot}>
            <rect x={l.x + 14} y={l.y + 34} width={84} height={9} rx="4.5" fill={l.hot ? C.ink : C.muted} opacity="0.9" />
            <Lines x={l.x + 14} y={l.y + 52} w={104} rows={3} gap={9} thick={3} />
            <rect x={l.x + 14} y={l.y + 96} width={44} height={14} rx="7" fill={l.hot ? C.accent : C.faint} />
            <rect x={l.x + 126} y={l.y + 32} width={58} height={76} rx="6" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.7" />
            {/* Dil secici: uc secenek, biri etkin */}
            {[0, 1, 2].map((k) => (
              <rect
                key={k}
                x={l.x + 130 + k * 20}
                y={l.y + 8}
                width={14}
                height={6}
                rx="3"
                fill={k === i ? C.hot : C.faint}
              />
            ))}
          </Browser>
        </g>
      ))}

      {/* Karsilikli baglar: basamaklarin arasindaki bosluktan gecer, iki ucunda da ok vardir */}
      <Beam d="M278 184 L328 142" delay={0} width={1.3} />
      <Beam d="M346 122 L396 80" delay={0.5} width={1.3} />
      <Arrow x={328} y={142} angle={-40} />
      <Arrow x={278} y={184} angle={140} s={8} hot={false} />
      <Arrow x={396} y={80} angle={-40} />
      <Arrow x={346} y={122} angle={140} s={8} hot={false} />
    </g>
  );
}
