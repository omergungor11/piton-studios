'use client';

import { Ambient, ArtFrame, Beam, C, Cross, Cube, Floor, Grid, Node, Panel, Reflection, Split, useArt } from '../kit';

/**
 * KOBI icin ERP mi Excel mi — solda ayri ayri duran, elle eslenen ve birbirini tutmayan tablolar;
 * sagda tek kaynaga baglanan modullerin ayni veriyi paylasmasi.
 */
export default function ErpVsExcelArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={456} cy={166} r={240} />
      <Floor horizon={308} vx={340} />
      <Reflection cx={456} cy={330} rx={150} ry={13} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Dagilmis tablolar: kopyalar, kopuk baglar */}
      <g transform="translate(44 60) rotate(-4)">
        <Panel x={0} y={0} w={148} h={104}>
          <Grid x={12} y={16} cols={5} rows={3} cell={22} gap={4} hot={[2, 7]} />
        </Panel>
      </g>
      <g transform="translate(120 152) rotate(3)">
        <Panel x={0} y={0} w={148} h={104}>
          <Grid x={12} y={16} cols={5} rows={3} cell={22} gap={4} hot={[6]} />
        </Panel>
      </g>
      <g transform="translate(36 196) rotate(-7)">
        <Panel x={0} y={0} w={120} h={86}>
          <Grid x={10} y={14} cols={4} rows={2} cell={22} gap={4} />
        </Panel>
      </g>
      {/* Elle tasinan, kopan baglar */}
      <g stroke={C.line} strokeWidth="1" fill="none" strokeDasharray="5 6" opacity="0.8">
        <path d="M118 120 C 140 134, 148 142, 156 158" />
        <path d="M96 176 C 92 190, 88 196, 84 206" />
      </g>
      <Cross x={148} y={142} s={16} />
      <Cross x={90} y={192} s={14} />

      <Split x={314} top={62} bottom={296} />

      {/* Tek kaynak + cevresindeki moduller */}
      <Panel x={352} y={54} w={248} h={236} hot>
        <circle cx={476} cy={176} r={62} fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
        <Cube x={476} y={186} s={46} hot />
        {[
          { x: 392, y: 96 },
          { x: 560, y: 96 },
          { x: 380, y: 236 },
          { x: 566, y: 236 },
        ].map((p, i) => (
          <g key={i}>
            <rect x={p.x - 28} y={p.y - 20} width={56} height={40} rx="8" fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
            <rect x={p.x - 16} y={p.y - 8} width={32} height={5} rx="2.5" fill={i === 0 ? C.hot : C.faint} />
            <rect x={p.x - 16} y={p.y + 2} width={22} height={5} rx="2.5" fill={C.faint} />
          </g>
        ))}
        <Beam d="M400 116 C 424 140, 440 152, 452 162" delay={0} width={1.3} />
        <Beam d="M552 116 C 528 140, 512 152, 500 162" delay={0.35} width={1.3} />
        <Beam d="M396 216 C 424 202, 440 196, 452 192" delay={0.7} width={1.3} />
        <Beam d="M556 216 C 528 202, 512 196, 500 192" delay={1.05} width={1.3} />
        <Node x={476} y={128} r={4} hot />
      </Panel>

      {/* Tablolardan tek kaynaga tasima */}
      <Beam d="M276 170 C 300 170, 300 172, 330 172" delay={0.5} faint />
    </g>
  );
}
