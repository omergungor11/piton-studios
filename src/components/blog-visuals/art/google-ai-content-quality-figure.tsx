'use client';

import { Ambient, ArtFrame, Arrow, Beam, Browser, C, Check, Cross, Cube, Doc, Lines, Node, Panel, Shield, Stack, useArt } from '../kit';

/**
 * Yapay zeka taslagindan yayina dort kontrol: solda kup + taslak, ortada sirayla dort panel
 * (emek = satirlar, ozgunluk = tek parlayan nokta, beceri = rozet, dogruluk = onay), sagda yazar imzali
 * onayli sayfa. Altta kontrolden gecmeyen toplu sayfa yigini carpiyla ayrilir.
 */
export default function GoogleAiContentQualityFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={270} />
      <Scene />
    </ArtFrame>
  );
}

const STEPS = [150, 234, 318, 402];
const PY = 112;
const PW = 72;
const PH = 112;

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Taslak */}
      <Panel x={18} y={96} w={112} h={144}>
        <Cube x={74} y={130} s={24} hot />
        <Doc x={50} y={160} w={48} h={66} rows={3} />
      </Panel>
      <Beam d={`M130 168 L ${STEPS[0]} 168`} delay={0.1} />

      {STEPS.map((x, i) => {
        const cx = x + PW / 2;
        const cy = PY + PH / 2;
        return (
          <g key={x}>
            <Panel x={x} y={PY} w={PW} h={PH} hot={i === 3}>
              {i === 0 && <Lines x={x + 14} y={cy - 20} w={PW - 28} rows={5} gap={9} thick={3} accentFirst />}
              {i === 1 && (
                <g>
                  <circle cx={cx - 18} cy={cy - 18} r={4} fill={C.faint} />
                  <circle cx={cx + 18} cy={cy - 18} r={4} fill={C.faint} />
                  <circle cx={cx - 18} cy={cy + 18} r={4} fill={C.faint} />
                  <circle cx={cx + 18} cy={cy + 18} r={4} fill={C.faint} />
                  <Node x={cx} y={cy} r={7} hot />
                </g>
              )}
              {i === 2 && <Shield x={cx} y={cy} s={26} hot={false} />}
              {i === 3 && (
                <g>
                  <circle cx={cx} cy={cy} r={22} fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="1.1" />
                  <Check x={cx + 1} y={cy + 1} s={22} />
                </g>
              )}
            </Panel>
            <rect x={x + 18} y={PY + PH - 18} width={PW - 36} height={5} rx="2.5" fill={i === 3 ? C.hot : C.faint} opacity={i === 3 ? 0.8 : 1} />
            {i < 3 && (
              <g>
                <Beam d={`M${x + PW} 168 L ${STEPS[i + 1]} 168`} delay={0.3 + i * 0.25} />
                <Arrow x={STEPS[i + 1] - 2} y={168} s={7} />
              </g>
            )}
          </g>
        );
      })}

      {/* Yayinda */}
      <Beam d={`M${STEPS[3] + PW} 168 L 494 168`} delay={1.1} />
      <Arrow x={492} y={168} s={7} />
      <Browser x={494} y={96} w={130} h={150} hot>
        <circle cx={516} cy={132} r={9} fill={C.bg2} stroke={C.hot} strokeWidth="1" />
        <circle cx={516} cy={129} r={3} fill={C.hot} opacity="0.85" />
        <rect x={530} y={127} width={52} height={6} rx="3" fill={C.hot} opacity="0.85" />
        <rect x={508} y={156} width={102} height={6} rx="3" fill={C.muted} opacity="0.7" />
        <rect x={508} y={170} width={94} height={5} rx="2.5" fill={C.faint} />
        <rect x={508} y={182} width={100} height={5} rx="2.5" fill={C.faint} />
        <rect x={508} y={200} width={102} height={30} rx="5" fill={C.faint} />
      </Browser>
      <circle cx={620} cy={100} r={12} fill={C.bg} stroke={C.hot} strokeWidth="1" />
      <Check x={620} y={101} s={13} />

      {/* Kontrolsuz toplu uretim: ayrilir */}
      <path d="M74 240 C 74 290, 120 300, 190 300" fill="none" stroke={C.line} strokeWidth="1.1" strokeDasharray="4 5" />
      <Stack x={196} y={276} w={150} count={5} gap={11} skew={8} />
      <path d={`M380 300 L 430 300`} fill="none" stroke={C.line} strokeWidth="1.1" strokeDasharray="4 5" />
      <circle cx={446} cy={300} r={14} fill={C.bg} stroke={C.line} strokeWidth="0.9" />
      <Cross x={446} y={300} s={15} />
    </g>
  );
}
