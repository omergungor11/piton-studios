'use client';

import { Ambient, ArtFrame, Arrow, Bars, Beam, C, Cube, Grid, Panel, Spark, Stack, useArt } from '../kit';

/**
 * Butce akisi: butce yigini -> yapay zeka cekirdegi -> yerlesim (izgara), urun gezinme (urun kareleri) ve olcum
 * (cubuklar) dugumleri; ikisinin yanindaki anahtar acik. Akisin ustunde harcamadan kucuk pay ayiran ucret katmani.
 * Sagda reklamin donusum grafigi ile ayri bir analitik panelinin grafigi yan yana.
 */
export default function MetaAds2026ChangesFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={280} />
      <Scene />
    </ArtFrame>
  );
}

const NODES = [116, 200, 284];

function Toggle({ x, y, on }: { x: number; y: number; on: boolean }) {
  const ids = useArt();
  return (
    <g>
      <rect x={x} y={y} width={30} height={15} rx={7.5} fill={on ? `url(#${ids.panelHot})` : C.bg} stroke={on ? C.hot : C.line} strokeWidth="0.9" />
      <circle cx={on ? x + 22.5 : x + 7.5} cy={y + 7.5} r={5} fill={on ? C.hot : C.muted} />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Ucret katmani */}
      <rect x={20} y={36} width={280} height={30} rx="8" fill={C.accent} fillOpacity="0.1" stroke={C.hot} strokeWidth="0.9" strokeDasharray="5 4" />
      <rect x={252} y={44} width={38} height={14} rx="4" fill={C.hot} opacity="0.85" />
      <path d="M78 150 C 78 110, 120 90, 160 66" fill="none" stroke={C.hot} strokeWidth="1.2" strokeDasharray="4 4" className="sv-flow" />

      {/* Butce */}
      <Panel x={20} y={140} w={110} h={120}>
        <Stack x={40} y={162} w={70} count={6} gap={13} hotIndex={0} />
      </Panel>
      <Beam d="M130 200 L 160 200" delay={0.2} />
      <Arrow x={160} y={200} s={7} />

      {/* Yapay zeka cekirdegi */}
      <rect x={164} y={150} width={92} height={100} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Panel x={164} y={150} w={92} h={100} hot>
        <Cube x={210} y={202} s={26} hot />
      </Panel>

      {/* Dugumler */}
      {NODES.map((y, i) => (
        <g key={y}>
          <Beam d={`M256 200 C 276 200, 284 ${y}, 304 ${y}`} delay={0.4 + i * 0.2} faint={i === 2} />
          <Panel x={304} y={y - 32} w={110} h={64}>
            {i === 0 && <Grid x={316} y={y - 20} cols={3} rows={2} cell={14} gap={4} hot={[1, 3]} />}
            {i === 1 && [0, 1, 2].map((k) => (
              <rect key={k} x={316 + k * 20} y={y - 12} width={16} height={16} rx="3" fill={k === 1 ? `url(#${ids.panelHot})` : C.bg2} stroke={k === 1 ? C.hot : C.line} strokeWidth="0.8" />
            ))}
            {i === 2 && <Bars x={316} y={y - 22} w={52} h={40} values={[0.4, 0.6, 0.5, 0.8]} hotIndex={3} />}
            <Toggle x={374} y={y - 7} on={i < 2} />
          </Panel>
        </g>
      ))}

      {/* Karsilastirma: reklam raporu vs analitik */}
      <Beam d="M414 200 L 440 200" delay={1.1} />
      <Arrow x={440} y={200} s={7} />
      <Panel x={444} y={110} w={176} h={180}>
        <rect x={456} y={124} width={70} height={152} rx="6" fill="none" stroke={C.line} strokeWidth="0.8" />
        <line x1={462} y1={262} x2={520} y2={262} stroke={C.line} strokeWidth="0.8" />
        <Spark x={462} y={150} w={58} h={108} points={[0.2, 0.35, 0.5, 0.62, 0.8]} />
        <rect x={538} y={124} width={70} height={152} rx="6" fill="none" stroke={C.hot} strokeWidth="0.9" />
        <line x1={544} y1={262} x2={602} y2={262} stroke={C.line} strokeWidth="0.8" />
        <Spark x={544} y={150} w={58} h={108} points={[0.2, 0.3, 0.38, 0.46, 0.55]} />
        <circle className="sv-pulse" cx={532} cy={136} r={8} fill="none" stroke={C.hot} strokeWidth="1.2" />
      </Panel>
    </g>
  );
}
