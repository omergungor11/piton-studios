'use client';

import { Ambient, ArtFrame, Beam, C, Cube, Floor, Lines, Node, Panel, Phone, Reflection, useArt } from '../kit';

const PEOPLE: { x: number; y: number; hot: boolean }[] = [
  { x: 150, y: 104, hot: false },
  { x: 92, y: 150, hot: true },
  { x: 204, y: 146, hot: true },
  { x: 110, y: 222, hot: false },
  { x: 188, y: 226, hot: true },
  { x: 62, y: 196, hot: false },
];

/** Meta Reklamlari — hedef halkalarindaki kitle, sosyal akis telefonu, kreatif format yigini ve donusum kupu. */
export default function MetaAdsArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={340} cy={170} r={250} />
      <Floor horizon={298} vx={330} />
      <Reflection cx={330} cy={320} rx={220} ry={14} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Person({ x, y, hot }: { x: number; y: number; hot: boolean }) {
  return (
    <g fill={hot ? C.hot : C.muted}>
      <circle cx={x} cy={y - 6} r={4.5} />
      <path d={`M${x - 8} ${y + 9} C${x - 8} ${y}, ${x + 8} ${y}, ${x + 8} ${y + 9} Z`} />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Hedef halkalari ve kitle */}
      <circle cx={140} cy={170} r={96} fill="none" stroke={C.line} strokeWidth="0.8" strokeDasharray="3 5" />
      <circle cx={140} cy={170} r={66} fill="none" stroke={C.line} strokeWidth="0.9" />
      <circle cx={140} cy={170} r={36} fill={`url(#${ids.panelHot})`} stroke={C.accent} strokeWidth="1.2" />
      <circle cx={140} cy={170} r={10} fill={C.hot} filter={`url(#${ids.glow})`} />
      {PEOPLE.map((p) => (
        <Person key={`${p.x}-${p.y}`} {...p} />
      ))}

      {/* Sosyal akis */}
      <Phone x={276} y={52} w={128} h={240} hot>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={298 + i * 28} cy={82} r={9} fill={C.bg} stroke={i === 0 ? C.hot : C.line} strokeWidth="1.4" />
        ))}
        <circle cx={294} cy={110} r={6} fill={C.faint} />
        <Lines x={306} y={106} w={60} rows={2} gap={6} thick={3} />
        <rect x={286} y={124} width={108} height={84} rx="6" fill={`url(#${ids.accent})`} opacity="0.85" />
        <circle cx={360} cy={150} r={16} fill={C.hot} opacity="0.5" filter={`url(#${ids.bloom})`} />
        <path d="M290 204 L322 172 L342 190 L356 178 L390 204 Z" fill={C.bg} opacity="0.5" />
        <path d="M296 222 c-4 -5 -10 -1 -6 4 l6 6 l6 -6 c4 -5 -2 -9 -6 -4 Z" fill={C.hot} />
        <circle cx={318} cy={223} r={5} fill="none" stroke={C.muted} strokeWidth="1.2" />
        <path d="M334 219 L344 223 L334 228 Z" fill="none" stroke={C.muted} strokeWidth="1.2" strokeLinejoin="round" />
        <Lines x={288} y={238} w={100} rows={2} gap={8} thick={3} />
        <rect x={286} y={260} width={108} height={24} rx="6" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.7" />
      </Phone>

      {/* Kreatif formatlar: carousel, video */}
      <g className="sv-float" style={{ animationDelay: '-2.5s' }}>
        <g transform="translate(452 70) skewY(-6)">
          <Panel x={36} y={0} w={100} h={110} />
          <Panel x={18} y={14} w={100} h={110}>
            <Lines x={30} y={104} w={70} rows={2} gap={7} thick={3} />
          </Panel>
          <Panel x={0} y={28} w={100} h={110} hot>
            <rect x={10} y={38} width={80} height={62} rx="5" fill={C.deep} opacity="0.9" />
            <circle cx={50} cy={69} r={15} fill={C.bg} fillOpacity="0.6" stroke={C.hot} strokeWidth="1.2" />
            <path d="M45 61 L58 69 L45 77 Z" fill={C.hot} />
            <rect x={10} y={108} width={80} height={3} rx="1.5" fill={C.faint} />
            <rect x={10} y={108} width={34} height={3} rx="1.5" fill={C.hot} />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={40 + i * 10} cy={124} r={2.4} fill={i === 0 ? C.hot : C.faint} />
            ))}
          </Panel>
        </g>
      </g>

      {/* Donusum */}
      <Cube x={530} y={262} s={32} hot />

      <Beam d="M176 170 C 220 170, 240 150, 276 150" />
      <Beam d="M452 160 C 432 160, 426 176, 404 176" delay={0.5} />
      <Beam d="M404 250 C 440 250, 470 246, 502 246" delay={1} />
      <Node x={176} y={170} hot />
      <Node x={452} y={160} />
      <Node x={502} y={246} hot />
    </g>
  );
}
