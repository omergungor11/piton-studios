'use client';

import { Ambient, ArtFrame, Beam, C, Cross, Cube, Floor, Grid, Lines, Node, Panel, Reflection, Split, useArt } from '../kit';

/**
 * Shopify mi ozel e-ticaret mi — solda hazir paketin sabit yuvalari (isine uymayan parca disarida
 * kaliyor, sayac isliyor), sagda kendi modullerini ekleyip disari baglanabilen kurulum.
 */
export default function ShopifyVsCustomArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={452} cy={164} r={240} />
      <Floor horizon={308} vx={340} />
      <Reflection cx={452} cy={332} rx={155} ry={13} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Hazir paket: kapali kutu, sabit yuvalar */}
      <Panel x={44} y={62} w={232} h={224}>
        <rect x={70} y={92} width={180} height={116} rx="10" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.9" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={84 + (i % 2) * 84}
            y={106 + Math.floor(i / 2) * 50}
            width={70}
            height={38}
            rx="6"
            fill={i === 0 ? C.accent : '#FFFFFF'}
            fillOpacity={i === 0 ? 0.24 : 0.05}
            stroke={i === 0 ? C.accent : C.line}
            strokeWidth="0.8"
          />
        ))}
        {/* Yuvaya girmeyen ihtiyac */}
        <g transform="translate(252 210) rotate(18)">
          <path d="M0 0 h40 l14 22 h-54 Z" fill="#1C1A19" stroke={C.muted} strokeWidth="0.9" />
        </g>
        <Cross x={250} y={200} s={16} />
        {/* Isleyen sayac */}
        <rect x={70} y={230} width={180} height={22} rx="11" fill="none" stroke={C.line} strokeWidth="0.9" />
        <rect x={70} y={230} width={112} height={22} rx="11" fill={C.accent} opacity="0.45" />
        <Beam d="M70 264 L250 264" delay={0} faint width={1.2} />
      </Panel>

      <Split x={314} top={62} bottom={296} />

      {/* Ozel kurulum: modul ekle, disari bagla */}
      <Panel x={352} y={62} w={248} h={224} hot>
        <Grid x={376} y={92} cols={4} rows={3} cell={30} gap={8} hot={[1, 6]} />
        <g opacity="0.75">
          <Cube x={556} y={124} s={22} hot />
        </g>
        <Beam d="M534 118 C 522 118, 516 118, 508 118" delay={0.2} width={1.3} />
        {/* Disari acilan baglar: stok, kargo, muhasebe */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Node x={566} y={196 + i * 30} r={4} hot={i === 1} />
            <Beam d={`M496 224 C 528 224, 536 ${196 + i * 30}, 558 ${196 + i * 30}`} delay={i * 0.4} faint width={1.2} />
          </g>
        ))}
        <circle cx={438} cy={140} r={44} fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
        <Lines x={376} y={252} w={160} rows={2} gap={10} thick={3} />
      </Panel>
    </g>
  );
}
