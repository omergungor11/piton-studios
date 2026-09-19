'use client';

import { Ambient, ArtFrame, Beam, C, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/** AI Danismanlik — egik duran karar haritasi: dallanan yollar, isaretli firsat noktalari, kesif ve yol haritasi panelleri. */
export default function AiConsultingArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={340} cy={190} r={260} />
      <Floor horizon={290} vx={340} />
      <Reflection cx={340} cy={316} rx={210} ry={14} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

/** Harita duzleminden ekrana: yatay yatirilmis, sola egik. */
const p = (x: number, y: number) => `${Math.round(330 + x - 0.385 * y)} ${Math.round(212 + 0.55 * y)}`;
const pt = (x: number, y: number) => ({ x: Math.round(330 + x - 0.385 * y), y: Math.round(212 + 0.55 * y) });

const START: [number, number] = [-180, 70];
const FORK: [number, number] = [-90, 20];
const MIDS: [number, number][] = [[0, -70], [10, 30], [-10, 110]];
const ENDS: { from: number; at: [number, number]; hot: boolean }[] = [
  { from: 0, at: [80, -125], hot: false },
  { from: 0, at: [150, -40], hot: true },
  { from: 1, at: [160, 50], hot: false },
  { from: 2, at: [130, 130], hot: true },
];

function Pin({ x, y, hot }: { x: number; y: number; hot: boolean }) {
  const ids = useArt();
  return (
    <g>
      {hot && <circle cx={x} cy={y - 30} r={16} fill={C.accent} opacity="0.5" filter={`url(#${ids.bloom})`} />}
      <path d={`M${x} ${y} C ${x - 4} ${y - 12}, ${x - 12} ${y - 18}, ${x - 12} ${y - 30} A12 12 0 1 1 ${x + 12} ${y - 30} C ${x + 12} ${y - 18}, ${x + 4} ${y - 12}, ${x} ${y} Z`} fill={hot ? `url(#${ids.accent})` : C.bg2} stroke={hot ? C.hot : C.line} strokeWidth="1" />
      <circle cx={x} cy={y - 30} r={4.5} fill={hot ? C.ink : C.muted} opacity={hot ? 0.9 : 0.6} />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  const board = `M${p(-230, -150)} L${p(230, -150)} L${p(230, 150)} L${p(-230, 150)} Z`;
  const grid = [-150, -75, 0, 75, 150];
  const branch = (a: [number, number], b: [number, number]) => {
    const mx = (a[0] + b[0]) / 2;
    return `M${p(a[0], a[1])} C ${p(mx, a[1])}, ${p(mx, b[1])}, ${p(b[0], b[1])}`;
  };
  const start = pt(...START);
  const fork = pt(...FORK);
  return (
    <g>
      {/* Karar haritasi zemini */}
      <path d={board} fill={C.bg2} stroke={C.line} strokeWidth="1" />
      <path d={board} fill={`url(#${ids.panel})`} />
      <g stroke={C.faint} strokeWidth="0.8">
        {grid.map((g) => (
          <path key={`v${g}`} d={`M${p(g, -150)} L${p(g, 150)}`} />
        ))}
        {[-75, 0, 75].map((g) => (
          <path key={`h${g}`} d={`M${p(-230, g)} L${p(230, g)}`} />
        ))}
      </g>

      {/* Dallanan yollar */}
      <Beam d={branch(START, FORK)} />
      {MIDS.map((m, i) => (
        <Beam key={`m${i}`} d={branch(FORK, m)} delay={0.3 + i * 0.2} faint={i === 2} />
      ))}
      {ENDS.map((e, i) => (
        <Beam key={`e${i}`} d={branch(MIDS[e.from], e.at)} delay={0.9 + i * 0.2} faint={!e.hot} />
      ))}
      {MIDS.map((m) => {
        const q = pt(...m);
        return <Node key={`${m[0]}-${m[1]}`} x={q.x} y={q.y} r={4} />;
      })}
      <Node x={start.x} y={start.y} hot />
      <Node x={fork.x} y={fork.y} />
      {ENDS.map((e) => {
        const q = pt(...e.at);
        return <Pin key={`${e.at[0]}-${e.at[1]}`} x={q.x} y={q.y} hot={e.hot} />;
      })}

      {/* Kesif: buyutec */}
      <g className="sv-float">
        <Panel x={50} y={46} w={130} h={78}>
          <circle cx={82} cy={80} r={16} fill="none" stroke={C.hot} strokeWidth="2.2" filter={`url(#${ids.glow})`} />
          <path d="M94 92 L106 104" stroke={C.hot} strokeWidth="3" strokeLinecap="round" />
          <Lines x={116} y={66} w={50} rows={4} gap={9} thick={3} />
        </Panel>
      </g>

      {/* Yol haritasi: kilometre taslari */}
      <g className="sv-float" style={{ animationDelay: '-3.5s' }}>
        <Panel x={440} y={28} w={164} h={72} hot>
          <line x1={458} y1={56} x2={586} y2={56} stroke={C.line} strokeWidth="1.2" />
          <line x1={458} y1={56} x2={522} y2={56} stroke={C.hot} strokeWidth="1.6" filter={`url(#${ids.glow})`} />
          {[458, 490, 522, 554, 586].map((x, i) => (
            <circle key={x} cx={x} cy={56} r={i === 2 ? 6 : 4} fill={i <= 2 ? C.hot : C.bg} stroke={i <= 2 ? C.hot : C.line} strokeWidth="1" />
          ))}
          <Lines x={456} y={74} w={120} rows={2} gap={9} thick={3} />
        </Panel>
      </g>
    </g>
  );
}
