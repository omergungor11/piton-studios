'use client';

import { Ambient, ArtFrame, Bars, Beam, Browser, C, Cube, Floor, Grid, Lines, Node, Panel, Reflection, Shield, Spark, Stack, useArt } from '../kit';

/**
 * Turkiye Yapay Zeka Eylem Plani ve KOBI'ler — ortada parlayan yapay zeka cekirdegi (kup), solda
 * paylasilan hesaplama gucu (GPU plaka yigini), altinda kurallari anlatan kalkan. Cekirdekten saga
 * isik cizgileri: kucuk isletmenin sitesi ve yukselen buyume paneli.
 */
export default function TurkiyeAiActionPlanArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={300} cy={190} r={250} />
      <Floor horizon={312} vx={300} />
      <Reflection cx={300} cy={334} rx={130} ry={12} opacity={0.5} />
      <Reflection cx={530} cy={334} rx={90} ry={10} opacity={0.35} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Hesaplama gucu: GPU yigini */}
      <Panel x={36} y={70} w={150} h={196}>
        <Lines x={52} y={86} w={70} rows={1} thick={5} />
        <Stack x={52} y={106} w={118} count={6} gap={16} hotIndex={1} />
        <Grid x={52} y={210} cols={6} rows={2} cell={14} gap={6} hot={[2, 7, 9]} />
      </Panel>
      <Beam d="M186 168 C 216 168, 226 190, 252 190" delay={0} />

      {/* Cekirdek */}
      <circle cx={300} cy={190} r={74} fill={C.accent} opacity="0.18" filter={`url(#${ids.bloom})`} />
      <circle className="sv-pulse" cx={300} cy={190} r={66} fill="none" stroke={C.hot} strokeWidth="1" />
      <circle cx={300} cy={190} r={58} fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="3 6" />
      <g className="sv-float">
        <Cube x={300} y={178} s={56} hot />
      </g>

      {/* Kurallar */}
      <Shield x={300} y={290} s={24} />
      <line x1={300} y1={248} x2={300} y2={264} stroke={C.line} strokeWidth="0.9" strokeDasharray="3 4" />

      {/* Isletmeye dogru */}
      <Beam d="M352 168 C 392 168, 400 116, 430 112" delay={0.4} />
      <Beam d="M352 212 C 392 212, 400 246, 430 250" delay={0.8} />
      <Node x={430} y={112} r={4} hot />
      <Node x={430} y={250} r={4} hot />

      <Browser x={440} y={52} w={170} h={118}>
        <rect x={454} y={84} width={60} height={42} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <circle cx={498} cy={96} r="5" fill={C.accent} opacity="0.85" />
        <Lines x={524} y={88} w={72} rows={3} gap={11} thick={4} accentFirst />
        <rect x={454} y={138} width={70} height={18} rx="9" fill={C.accent} fillOpacity="0.3" stroke={C.hot} strokeWidth="1" />
      </Browser>

      <Panel x={440} y={196} w={170} h={110} hot>
        <Bars x={456} y={212} w={70} h={78} values={[0.25, 0.4, 0.58, 0.9]} hotIndex={3} />
        <Spark x={538} y={214} w={58} h={74} points={[0.1, 0.25, 0.35, 0.6, 0.92]} />
      </Panel>
    </g>
  );
}
