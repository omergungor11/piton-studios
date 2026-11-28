'use client';

import { Ambient, ArtFrame, Beam, Browser, Bubble, C, Check, Cross, Cube, Doc, Panel, useArt } from '../kit';

/**
 * Ayni siteye uc farkli kullanim, uc ayri kontrol. Solda site + robots.txt. Sagda uc serit:
 * ustte arama dizini (tarayici, onay — egitim sinyali dokunmaz), ortada model egitimi (kup, carpi —
 * ortak egitim sinyaliyle durur), altta yapay zeka yanitlari / grounding (balon, ayri kontrol).
 */
export default function SharedAiTrainingControlFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={270} />
      <Scene />
    </ArtFrame>
  );
}

const LANES = [70, 200, 330];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Site + robots.txt */}
      <Panel x={26} y={110} w={150} h={180}>
        <Browser x={40} y={124} w={122} h={70} />
        <Doc x={66} y={206} w={70} h={74} rows={2} hot />
        <rect x={74} y={248} width={54} height={8} rx="4" fill={C.hot} opacity="0.9" />
      </Panel>

      {LANES.map((y, i) => (
        <Beam key={y} d={`M176 200 C 220 200, 230 ${y}, 270 ${y}`} delay={i * 0.3} faint={i !== 1} />
      ))}

      {/* 1. Arama dizini */}
      <Panel x={270} y={LANES[0] - 44} w={344} h={88}>
        <Browser x={286} y={LANES[0] - 30} w={150} h={60} />
        <rect x={300} y={LANES[0] - 2} width={90} height={6} rx="3" fill={C.muted} opacity="0.75" />
        <rect x={300} y={LANES[0] + 10} width={116} height={5} rx="2.5" fill={C.faint} />
        <circle cx={500} cy={LANES[0]} r={18} fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="1.1" />
        <Check x={501} y={LANES[0] + 1} s={16} />
        <rect x={530} y={LANES[0] - 3} width={66} height={6} rx="3" fill={C.faint} />
      </Panel>

      {/* 2. Model egitimi */}
      <Panel x={270} y={LANES[1] - 44} w={344} h={88} hot>
        <Cube x={340} y={LANES[1]} s={30} hot />
        <rect x={386} y={LANES[1] - 10} width={70} height={6} rx="3" fill={C.hot} opacity="0.85" />
        <rect x={386} y={LANES[1] + 4} width={50} height={5} rx="2.5" fill={C.faint} />
        <circle cx={500} cy={LANES[1]} r={18} fill={C.bg} stroke={C.line} strokeWidth="1" />
        <Cross x={500} y={LANES[1]} s={18} />
        <rect x={530} y={LANES[1] - 3} width={66} height={6} rx="3" fill={C.faint} />
      </Panel>

      {/* 3. Yapay zeka yanitlari / grounding */}
      <Panel x={270} y={LANES[2] - 44} w={344} h={88}>
        <Bubble x={290} y={LANES[2] - 28} w={130} h={40} rows={2} />
        <circle cx={500} cy={LANES[2]} r={18} fill={C.bg} stroke={C.line} strokeWidth="1" strokeDasharray="3 4" />
        <rect x={491} y={LANES[2] - 3} width={18} height={6} rx="3" fill={C.muted} />
        <rect x={530} y={LANES[2] - 3} width={66} height={6} rx="3" fill={C.faint} />
      </Panel>
    </g>
  );
}
