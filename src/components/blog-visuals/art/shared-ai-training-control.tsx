'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Check, Cross, Cube, Doc, Floor, Node, Panel, Reflection, useArt } from '../kit';

/**
 * Ortak yapay zeka egitim sinyali — ortada tek bir robots.txt belgesi, icinde vurgulu tek bir grup.
 * Belgeden cikan isik cizgileri ust taraftaki dort farkli yapay zeka modeline (kupler) ulasir ve hepsi
 * ayni anda carpi ile durur. Alttaki arama sonucu tarayicisina giden cizgi acik kalir (onay).
 */
export default function SharedAiTrainingControlArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={260} />
      <Floor horizon={320} vx={320} />
      <Reflection cx={320} cy={340} rx={180} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

const MODELS = [110, 250, 390, 530];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Dort yapay zeka saglayicisi */}
      {MODELS.map((x, i) => (
        <g key={x}>
          <Panel x={x - 46} y={34} w={92} h={78}>
            <Cube x={x} y={70} s={24} hot={i === 1} />
          </Panel>
          <circle cx={x + 34} cy={100} r={11} fill={C.bg} stroke={C.line} strokeWidth="0.8" />
          <Cross x={x + 34} y={100} s={12} />
          <Beam d={`M320 170 C 320 148, ${x} 140, ${x} 112`} delay={0.2 + i * 0.2} faint width={1.2} />
        </g>
      ))}

      {/* robots.txt: tek grup, hepsi icin */}
      <rect x={256} y={160} width={128} height={120} rx="14" fill={C.accent} opacity="0.14" filter={`url(#${ids.bloom})`} />
      <Panel x={256} y={160} w={128} h={120}>
        <Doc x={276} y={172} w={88} h={96} rows={2} />
        <rect x={284} y={222} width={72} height={10} rx="5" fill={C.hot} opacity="0.9" />
        <rect className="sv-pulse" x={278} y={216} width={84} height={22} rx="7" fill="none" stroke={C.hot} strokeWidth="1.2" />
        <rect x={284} y={244} width={48} height={6} rx="3" fill={C.faint} />
      </Panel>

      {/* Arama devam ediyor */}
      <Beam d="M384 250 C 420 250, 430 270, 452 272" delay={1.1} />
      <g className="sv-float">
        <Browser x={452} y={226} w={150} h={92} hot>
          <rect x={466} y={256} width={88} height={7} rx="3.5" fill={C.hot} opacity="0.85" />
          <rect x={466} y={270} width={118} height={5} rx="2.5" fill={C.faint} />
          <rect x={466} y={286} width={74} height={7} rx="3.5" fill={C.muted} opacity="0.7" />
          <rect x={466} y={300} width={104} height={5} rx="2.5" fill={C.faint} />
        </Browser>
      </g>
      <circle cx={598} cy={232} r={12} fill={C.bg} stroke={C.hot} strokeWidth="1" />
      <Check x={598} y={233} s={13} />

      {/* Sol: tarayici bot dugumleri hala geliyor */}
      <Beam d="M88 262 C 150 262, 200 230, 256 226" delay={0.6} faint />
      <Node x={84} y={262} r={7} />
      <Node x={60} y={240} r={4} />
      <Node x={64} y={288} r={4} />
    </g>
  );
}
