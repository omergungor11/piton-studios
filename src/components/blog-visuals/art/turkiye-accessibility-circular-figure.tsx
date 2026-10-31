'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Check, Clock, Cross, Doc, Grid, Lines, Panel, useArt } from '../kit';

/**
 * Genelgeden logoya izleme akisi, soldan saga dort asama: genelge (belge), kurumun kendi inceleme
 * komisyonu (sitede karsilanan ve karsilanmayan olcutler), izleme komisyonunun yillik plani
 * (denetlenecek siteler izgarasi) ve iki yillik erisilebilirlik logosu (muhur + saat).
 */
export default function TurkiyeAccessibilityCircularFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={260} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* 1. Genelge */}
      <Panel x={24} y={130} w={112} h={140}>
        <Doc x={48} y={150} w={64} h={84} rows={4} hot />
        <rect x={48} y={246} width={64} height={6} rx="3" fill={C.muted} opacity="0.7" />
      </Panel>
      <Beam d="M136 200 C 150 200, 152 200, 164 200" delay={0.1} />

      {/* 2. Kurumun inceleme komisyonu */}
      <Browser x={164} y={96} w={150} h={208}>
        {[134, 172, 210, 248].map((y, i) => (
          <g key={y}>
            <rect x={180} y={y} width={22} height={22} rx="6" fill={`url(#${ids.panel})`} stroke={i === 2 ? C.line : C.hot} strokeWidth="0.9" />
            {i === 2 ? <Cross x={191} y={y + 11} s={12} /> : <Check x={191} y={y + 12} s={12} />}
            <Lines x={212} y={y + 6} w={84} rows={2} gap={8} thick={4} accentFirst={i !== 2} />
          </g>
        ))}
      </Browser>
      <Beam d="M314 200 C 330 200, 332 200, 346 200" delay={0.5} />

      {/* 3. Izleme komisyonu: yillik plan */}
      <Panel x={346} y={110} w={138} h={180}>
        <Lines x={362} y={126} w={70} rows={1} thick={5} />
        <Grid x={362} y={146} cols={4} rows={4} cell={22} gap={6} hot={[1, 6, 11, 12]} />
        <rect x={362} y={262} width={106} height={5} rx="2.5" fill={C.faint} />
        <rect x={362} y={262} width={64} height={5} rx="2.5" fill={C.accent} />
      </Panel>
      <Beam d="M484 200 C 500 200, 502 176, 520 172" delay={0.9} />

      {/* 4. Iki yillik logo */}
      <Panel x={520} y={92} w={100} h={216}>
        <circle cx={570} cy={162} r={34} fill={C.accent} opacity="0.2" filter={`url(#${ids.bloom})`} />
        <circle cx={570} cy={162} r={28} fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="1.4" />
        <circle cx={570} cy={162} r={21} fill="none" stroke={C.hot} strokeWidth="0.8" strokeDasharray="3 4" />
        <Check x={571} y={163} s={20} />
        <Clock cx={570} cy={250} r={22} hand={0.3} />
      </Panel>
    </g>
  );
}
