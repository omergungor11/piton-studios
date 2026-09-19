'use client';

import { Ambient, ArtFrame, Beam, C, Floor, Lines, Node, Panel, Reflection, Spark, useArt } from '../kit';

/** Cloud Ekosistemi — parlayan bulut kutlesi, altinda sunucu raflari, koddan buluta CI/CD hatti ve izleme paneli. */
export default function CloudEcosystemArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={350} cy={130} r={260} />
      <Floor horizon={296} vx={350} />
      <Reflection cx={350} cy={316} rx={180} ry={14} opacity={0.5} />
      <Scene />
    </ArtFrame>
  );
}

const PUFFS = [
  { cx: 298, cy: 110, r: 36 },
  { cx: 352, cy: 84, r: 50 },
  { cx: 410, cy: 106, r: 38 },
];

function Cloud() {
  const ids = useArt();
  const shape = (stroke: boolean) => (
    <g fill={stroke ? 'none' : C.bg2} stroke={stroke ? C.hot : 'none'} strokeWidth={stroke ? 2.4 : 0}>
      {PUFFS.map((p) => (
        <circle key={p.cx} cx={p.cx} cy={p.cy} r={p.r} />
      ))}
      <rect x={290} y={104} width={126} height={42} rx="21" />
    </g>
  );
  return (
    <g>
      <ellipse cx={352} cy={116} rx={130} ry={60} fill={C.accent} opacity="0.35" filter={`url(#${ids.bloom})`} />
      {shape(true)}
      {shape(false)}
      <g opacity="0.16" fill={C.accent}>
        {PUFFS.map((p) => (
          <circle key={p.cx} cx={p.cx} cy={p.cy} r={p.r} />
        ))}
        <rect x={290} y={104} width={126} height={42} rx="21" />
      </g>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={318 + i * 17} cy={120} r={i === 2 ? 4 : 2.6} fill={i === 2 ? C.hot : C.muted} opacity={i === 2 ? 1 : 0.6} filter={i === 2 ? `url(#${ids.glow})` : undefined} />
      ))}
      <path d="M318 120 L386 120" stroke={C.line} strokeWidth="0.8" />
    </g>
  );
}

function Rack({ x, y, h, hot = false }: { x: number; y: number; h: number; hot?: boolean }) {
  const slots = Array.from({ length: Math.floor((h - 16) / 16) }, (_, i) => i);
  return (
    <Panel x={x} y={y} w={62} h={h} r={5} hot={hot}>
      {slots.map((i) => (
        <g key={i}>
          <rect x={x + 7} y={y + 9 + i * 16} width={48} height={11} rx="2" fill={C.bg} stroke={C.line} strokeWidth="0.6" />
          <circle cx={x + 13} cy={y + 14.5 + i * 16} r={1.8} fill={hot && i % 2 === 0 ? C.hot : C.muted} />
          <rect x={x + 20} y={y + 13.5 + i * 16} width={26} height={2} rx="1" fill={C.faint} />
        </g>
      ))}
    </Panel>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Kod: commit / dal grafigi */}
      <Panel x={46} y={70} w={134} h={92}>
        <Lines x={60} y={84} w={50} rows={1} thick={4} accentFirst />
        <line x1={62} y1={128} x2={164} y2={128} stroke={C.line} strokeWidth="1.2" />
        <path d="M84 128 C 96 104, 110 104, 124 104 L140 104 C 150 104, 154 116, 160 128" fill="none" stroke={C.accent} strokeWidth="1.4" />
        {[62, 84, 110, 138, 160].map((x) => (
          <circle key={x} cx={x} cy={128} r={4} fill={x === 160 ? C.hot : C.bg} stroke={x === 160 ? C.hot : C.muted} strokeWidth="1.2" />
        ))}
        {[110, 140].map((x) => (
          <circle key={x} cx={x} cy={104} r={3.4} fill={C.bg} stroke={C.accent} strokeWidth="1.2" />
        ))}
        <Lines x={62} y={142} w={90} rows={1} thick={3} />
      </Panel>

      {/* CI/CD adimlari */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${188 + i * 18} 104 l14 0 l8 10 l-8 10 l-14 0 l8 -10 Z`} fill={i === 2 ? C.accent : C.bg2} stroke={i === 2 ? C.hot : C.line} strokeWidth="0.9" filter={i === 2 ? `url(#${ids.glow})` : undefined} />
      ))}
      <Beam d="M180 114 L188 114" />
      <Beam d="M246 114 C 252 114, 258 112, 264 112" delay={0.4} />

      <g className="sv-float">
        <Cloud />
      </g>

      {/* Dagitim isinlari */}
      <Beam d="M314 146 C 310 164, 300 178, 296 196" delay={0.6} />
      <Beam d="M352 146 L352 184" delay={0.9} />
      <Beam d="M392 146 C 396 164, 404 178, 408 196" delay={1.2} faint />

      {/* Sunucu raflari */}
      <Rack x={265} y={196} h={100} />
      <Rack x={377} y={196} h={100} />
      <Rack x={321} y={184} h={116} hot />
      <Node x={352} y={184} r={4} hot />

      {/* Izleme */}
      <g className="sv-float" style={{ animationDelay: '-3.5s' }}>
        <Panel x={482} y={150} w={126} h={104}>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={496 + i * 12} cy={164} r={3} fill={i === 0 ? C.hot : C.faint} />
          ))}
          <Lines x={538} y={162} w={56} rows={1} thick={3} />
          <path d="M494 198 L516 198 L524 180 L534 214 L544 190 L550 198 L596 198" fill="none" stroke={C.hot} strokeWidth="1.6" strokeLinejoin="round" filter={`url(#${ids.glow})`} />
          <Spark x={494} y={222} w={100} h={22} points={[0.3, 0.5, 0.4, 0.6, 0.45, 0.55]} fill={false} />
        </Panel>
      </g>
      <Beam d="M439 240 C 456 236, 466 212, 482 206" delay={1.5} />
      <Node x={482} y={206} />
    </g>
  );
}
