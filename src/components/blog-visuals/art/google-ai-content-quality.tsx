'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Check, Cross, Cube, Doc, Floor, Panel, Reflection, Stack, useArt } from '../kit';

/**
 * Google ve yapay zeka icerigi — solda bir yapay zeka kupu taslak uretir. Ortadaki inceleme panelinde
 * taslak buyutecle kontrol edilir; altinda dort kucuk onay (emek, ozgunluk, beceri, dogruluk) sirayla yanar.
 * Sagda yazar imzali sayfa yayinda ve onayli. Altta kontrolsuz, toplu uretilmis soluk sayfa yigini carpiyla ayrilir.
 */
export default function GoogleAiContentQualityArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={260} />
      <Floor horizon={320} vx={320} />
      <Reflection cx={320} cy={336} rx={170} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

const CHECKS = [272, 304, 336, 368];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Yapay zeka taslak uretiyor */}
      <Panel x={34} y={96} w={128} h={112}>
        <Cube x={98} y={140} s={30} hot />
      </Panel>
      <Beam d="M162 152 C 196 152, 206 150, 232 150" delay={0.2} />

      {/* Toplu, kontrolsuz sayfalar */}
      <Beam d="M98 208 C 98 236, 104 246, 118 252" delay={0.8} faint width={1.1} />
      <Stack x={70} y={252} w={104} count={5} gap={12} skew={5} />
      <circle cx={196} cy={286} r={13} fill={C.bg} stroke={C.line} strokeWidth="0.9" />
      <Cross x={196} y={286} s={14} />

      {/* Inceleme */}
      <rect x={232} y={66} width={176} height={234} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Panel x={232} y={66} w={176} h={234} hot>
        <Doc x={262} y={84} w={116} h={148} rows={6} hot />
        <circle className="sv-pulse" cx={350} cy={188} r={28} fill="none" stroke={C.hot} strokeWidth="1.6" />
        <circle cx={350} cy={188} r={24} fill={C.hot} opacity="0.08" />
        <line x1={370} y1={208} x2={392} y2={230} stroke={C.hot} strokeWidth="3" strokeLinecap="round" />
        {CHECKS.map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={264} r={11} fill={i === 3 ? `url(#${ids.panelHot})` : C.bg} stroke={i === 3 ? C.hot : C.line} strokeWidth="0.9" />
            <Check x={x + 1} y={265} s={11} hot={i === 3} />
          </g>
        ))}
      </Panel>

      {/* Yayinda: yazar imzali sayfa */}
      <Beam d="M408 170 C 430 170, 436 168, 456 166" delay={1.1} />
      <g className="sv-float">
        <Browser x={456} y={92} w={154} h={168} hot>
          <circle cx={480} cy={130} r={10} fill={C.bg2} stroke={C.hot} strokeWidth="1" />
          <circle cx={480} cy={127} r={3.5} fill={C.hot} opacity="0.85" />
          <rect x={496} y={124} width={60} height={6} rx="3" fill={C.hot} opacity="0.85" />
          <rect x={496} y={135} width={40} height={4} rx="2" fill={C.faint} />
          <rect x={470} y={156} width={124} height={7} rx="3.5" fill={C.muted} opacity="0.7" />
          <rect x={470} y={172} width={112} height={5} rx="2.5" fill={C.faint} />
          <rect x={470} y={184} width={118} height={5} rx="2.5" fill={C.faint} />
          <rect x={470} y={196} width={96} height={5} rx="2.5" fill={C.faint} />
          <rect x={470} y={214} width={124} height={30} rx="5" fill={C.faint} />
        </Browser>
      </g>
      <circle cx={606} cy={98} r={13} fill={C.bg} stroke={C.hot} strokeWidth="1" />
      <Check x={606} y={99} s={14} />
    </g>
  );
}
