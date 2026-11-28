'use client';

import { Ambient, ArtFrame, Arrow, Beam, Browser, C, Check, Clock, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/**
 * Soft navigation — tek bir tarayici penceresi: kullanici tiklar (parlayan dugum), adres cubugu yanip soner,
 * eski icerik paneli soluklasir ve yeni icerik paneli onun yerine suzulur; yeni belge yuklenmez.
 * Sagda ayni oturumdaki uc gecis ust uste dizilir, her birinin kendi saati var (her gecis ayri olculur).
 */
export default function SoftNavigationCoreWebVitalsArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={300} cy={190} r={260} />
      <Floor horizon={320} vx={320} />
      <Reflection cx={260} cy={334} rx={170} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

const VIEWS = [96, 186, 276];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Tarayici: tek belge, icerik degisiyor */}
      <rect x={70} y={70} width={330} height={236} rx="14" fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
      <Browser x={70} y={70} w={330} h={236} hot>
        <rect className="sv-pulse" x={170} y={74} width={130} height={12} rx="6" fill="none" stroke={C.hot} strokeWidth="1.2" />
        <rect x={180} y={78} width={70} height={4} rx="2" fill={C.hot} opacity="0.85" />
        {/* Sol menu */}
        <Lines x={88} y={112} w={58} rows={6} gap={14} thick={4} accentFirst />
        {/* Eski gorunum, soluk */}
        <rect x={164} y={108} width={92} height={180} rx="8" fill="#FFFFFF" fillOpacity="0.03" stroke={C.line} strokeWidth="0.8" strokeDasharray="4 4" />
        <rect x={176} y={124} width={68} height={40} rx="5" fill={C.faint} opacity="0.6" />
        <rect x={176} y={176} width={60} height={5} rx="2.5" fill={C.faint} opacity="0.6" />
        <rect x={176} y={188} width={50} height={5} rx="2.5" fill={C.faint} opacity="0.6" />
        <Arrow x={266} y={198} s={8} />
      </Browser>
      {/* Yeni gorunum suzuluyor */}
      <g className="sv-float">
        <Panel x={276} y={104} w={110} h={188} hot>
          <rect x={288} y={118} width={86} height={52} rx="6" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="0.9" />
          <rect x={288} y={182} width={72} height={6} rx="3" fill={C.hot} opacity="0.85" />
          <rect x={288} y={196} width={86} height={5} rx="2.5" fill={C.faint} />
          <rect x={288} y={208} width={64} height={5} rx="2.5" fill={C.faint} />
          <rect x={288} y={240} width={86} height={34} rx="5" fill={C.faint} />
        </Panel>
      </g>
      {/* Kullanici eylemi */}
      <Node x={150} y={214} r={6} hot />

      {/* Ayni oturumdaki gecisler, her biri olculur */}
      {VIEWS.map((y, i) => (
        <g key={y}>
          <Beam d={`M400 ${188} C 430 ${188}, 436 ${y}, 460 ${y}`} delay={0.3 + i * 0.3} faint={i !== 1} width={1.2} />
          <Panel x={460} y={y - 36} w={150} h={72} hot={i === 1}>
            <rect x={474} y={y - 22} width={56} height={30} rx="4" fill={i === 1 ? C.hot : C.faint} opacity={i === 1 ? 0.35 : 1} />
            <rect x={474} y={y + 16} width={48} height={5} rx="2.5" fill={C.faint} />
            <Clock cx={572} cy={y} r={20} hand={0.12 + i * 0.1} hot={i === 1} />
          </Panel>
          <circle cx={604} cy={y - 32} r={9} fill={C.bg} stroke={i === 1 ? C.hot : C.line} strokeWidth="0.9" />
          <Check x={605} y={y - 31} s={10} hot={i === 1} />
        </g>
      ))}
    </g>
  );
}
