'use client';

import { Ambient, ArtFrame, Beam, C, Cube, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

const TICKS = Array.from({ length: 30 }, (_, i) => i);

/** Bakim & Destek — nabiz cizgili izleme ekrani onunde kalkan, yedek katmanlari ve guncelleme paneli. */
export default function MaintenanceSupportArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={380} cy={180} r={240} />
      <Floor horizon={300} vx={380} />
      <Reflection cx={380} cy={322} rx={210} ry={14} opacity={0.5} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Izleme ekrani */}
      <g transform="translate(222 40) skewY(-3)">
        <Panel x={0} y={0} w={318} h={196}>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={18 + i * 12} cy={16} r={3} fill={i === 0 ? C.hot : C.faint} />
          ))}
          <Lines x={60} y={14} w={90} rows={1} thick={4} />
          <rect x={250} y={10} width={52} height={12} rx="6" fill={C.accent} fillOpacity="0.25" stroke={C.accent} strokeWidth="0.8" />
          <rect x={16} y={34} width={286} height={1} fill={C.line} />
          <path d="M16 100 H300 M16 70 H300 M16 130 H300" stroke={C.faint} strokeWidth="0.6" strokeDasharray="2 6" />
          <path d="M16 100 L88 100 L100 78 L112 124 L124 60 L138 116 L150 100 L300 100" fill="none" stroke={C.hot} strokeWidth="2" strokeLinejoin="round" filter={`url(#${ids.glow})`} />
          {TICKS.map((i) => (
            <rect key={i} x={16 + i * 9.6} y={160} width={6} height={18} rx="2" fill={i === 11 ? C.accent : C.line} />
          ))}
        </Panel>
      </g>

      {/* Yedek katmanlari */}
      <Cube x={140} y={236} s={36} />
      <Cube x={140} y={200} s={36} />
      <Cube x={140} y={164} s={36} hot />

      {/* Kalkan */}
      <g className="sv-float">
        <circle cx={380} cy={214} r={60} fill={C.accent} opacity="0.35" filter={`url(#${ids.bloom})`} />
        <path d="M380 142 L440 164 L440 214 C440 254 414 278 380 294 C346 278 320 254 320 214 L320 164 Z" fill={`url(#${ids.accent})`} stroke={C.hot} strokeWidth="1.2" />
        <path d="M380 158 L427 175 L427 214 C427 246 406 266 380 279 C354 266 333 246 333 214 L333 175 Z" fill={C.bg} fillOpacity="0.25" stroke={C.ink} strokeOpacity="0.35" strokeWidth="1" />
        <path d="M357 216 L373 232 L405 198" fill="none" stroke={C.ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Guncelleme paneli */}
      <g className="sv-float" style={{ animationDelay: '-3.5s' }}>
        <Panel x={492} y={200} w={120} h={96} hot>
          <path d="M528 222 A14 14 0 1 1 514 236" fill="none" stroke={C.hot} strokeWidth="2" strokeLinecap="round" />
          <path d="M509 231 L514 237 L520 231" fill="none" stroke={C.hot} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Lines x={552} y={224} w={48} rows={2} gap={8} thick={3} />
          <rect x={504} y={260} width={96} height={5} rx="2.5" fill={C.faint} />
          <rect x={504} y={260} width={62} height={5} rx="2.5" fill={C.accent} />
          <Lines x={504} y={274} w={80} rows={1} thick={3} />
        </Panel>
      </g>

      <Beam d="M172 170 C 240 170, 270 212, 320 212" />
      <Beam d="M440 226 C 462 226, 470 240, 492 240" delay={0.7} />
      <Beam d="M380 142 L380 124" delay={1.2} faint />
      <Node x={172} y={170} hot />
      <Node x={492} y={240} />
    </g>
  );
}
