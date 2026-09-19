'use client';

import { Ambient, ArtFrame, Bars, Beam, C, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

const SEATS = [182, 262, 378, 458];
const LAPTOPS = [222, 320, 418];

/** Egitim & Danismanlik — sunum ekrani onunde workshop masasi, dizustu bilgisayarlar, ekip, mentor ve playbook karti. */
export default function HowToDoArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={330} cy={130} r={250} />
      <Floor horizon={292} vx={320} />
      <Reflection cx={320} cy={318} rx={230} ry={14} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Sunum ekrani */}
      <rect x={316} y={184} width={8} height={40} fill="#1C1A19" />
      <Panel x={176} y={30} w={288} h={156} hot>
        <Lines x={196} y={48} w={120} rows={2} gap={10} thick={5} accentFirst />
        <g stroke={C.line} strokeWidth="1" fill="none">
          <path d="M214 124 L262 96 L310 132 M262 96 L262 150" />
        </g>
        <circle cx={214} cy={124} r={9} fill={C.bg} stroke={C.line} />
        <circle cx={262} cy={96} r={11} fill={C.accent} filter={`url(#${ids.glow})`} />
        <circle cx={310} cy={132} r={9} fill={C.bg} stroke={C.line} />
        <circle cx={262} cy={150} r={9} fill={C.bg} stroke={C.line} />
        <rect x={340} y={80} width={108} height={90} rx="6" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.7" />
        <Bars x={348} y={92} w={92} h={70} values={[0.35, 0.5, 0.45, 0.7, 0.9]} hotIndex={4} />
      </Panel>

      {/* Ekip */}
      {SEATS.map((x, i) => (
        <g key={x} fill={i === 2 ? C.hot : C.muted} opacity={i === 2 ? 1 : 0.8}>
          <circle cx={x} cy={208} r={11} />
          <path d={`M${x - 22} 244 C${x - 22} 222, ${x + 22} 222, ${x + 22} 244 Z`} />
        </g>
      ))}

      {/* Workshop masasi */}
      <path d="M138 238 L502 238 L552 290 L88 290 Z" fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
      <path d="M138 238 L502 238 L552 290 L88 290 Z" fill={`url(#${ids.panel})`} />
      <path d="M88 290 L552 290 L552 298 L88 298 Z" fill="#121111" stroke={C.line} strokeWidth="0.6" />
      {LAPTOPS.map((x, i) => (
        <g key={x}>
          <rect x={x - 26} y={238} width={52} height={30} rx="3" fill={i === 1 ? C.deep : '#1C1A19'} stroke={i === 1 ? C.hot : C.line} strokeWidth="0.9" />
          <circle cx={x} cy={253} r={3} fill={i === 1 ? C.hot : C.faint} />
          <path d={`M${x - 30} 268 L${x + 30} 268 L${x + 36} 276 L${x - 36} 276 Z`} fill="#2A2826" stroke={C.line} strokeWidth="0.7" />
        </g>
      ))}
      <rect x={470} y={270} width={34} height={14} rx="2" fill={C.ink} opacity="0.2" transform="rotate(-8 487 277)" />

      {/* Mentor */}
      <g>
        <circle cx={566} cy={160} r={13} fill={C.hot} filter={`url(#${ids.glow})`} />
        <rect x={550} y={178} width={32} height={112} rx="15" fill={`url(#${ids.accent})`} />
        <path d="M554 196 L520 170" stroke={C.hot} strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Playbook karti */}
      <g className="sv-float">
        <Panel x={36} y={120} w={104} h={112}>
          <rect x={48} y={132} width={40} height={6} rx="3" fill={C.accent} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={48} y={150 + i * 18} width={10} height={10} rx="2" fill={i < 2 ? C.accent : 'none'} stroke={i < 2 ? C.hot : C.line} strokeWidth="0.9" />
              <Lines x={64} y={153 + i * 18} w={62} rows={1} thick={4} />
            </g>
          ))}
        </Panel>
      </g>

      <Beam d="M520 170 C 500 160, 480 140, 464 136" />
      <Beam d="M320 186 L320 238" delay={0.6} faint />
      <Beam d="M140 176 C 160 176, 166 150, 176 146" delay={1.1} />
      <Node x={464} y={136} hot />
      <Node x={140} y={176} />
      <Node x={320} y={238} r={4} hot />
    </g>
  );
}
