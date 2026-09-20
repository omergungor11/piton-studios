'use client';

import { Ambient, ArtFrame, Arrow, Beam, Browser, C, Doc, Floor, Lines, Node, Panel, Reflection, Spark, useArt } from '../kit';

/**
 * Site yenileme ve SEO gecisi — eski adreslerin yeni adreslere bire bir eslenmesi; solda devreden
 * cikan surum, sagda yeni surum, altta gecisten sonra once dusup sonra eski seviyesini asan trafik.
 */
export default function WebsiteRedesignMigrationArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={430} cy={140} r={240} />
      <Floor horizon={314} vx={340} />
      <Reflection cx={440} cy={336} rx={150} ry={12} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  const rows = [78, 128, 178];
  return (
    <g>
      {/* Devreden cikan surum */}
      <g opacity="0.62">
        <Browser x={36} y={52} w={160} h={112}>
          <rect x={50} y={84} width={62} height={8} rx="4" fill={C.muted} opacity="0.8" />
          <Lines x={50} y={100} w={72} rows={2} gap={9} thick={3} />
          <rect x={132} y={82} width={50} height={50} rx="5" fill={C.faint} />
        </Browser>
      </g>

      {/* Eski adresler → yeni adresler */}
      {rows.map((y, i) => (
        <g key={y}>
          <Doc x={62} y={y + 124} w={56} h={44} rows={2} />
          <Doc x={318} y={y + 124} w={56} h={44} hot={i === 0} rows={2} />
          <Beam d={`M122 ${y + 146} C 210 ${y + 146}, 228 ${rows[(i + 1) % rows.length] + 146}, 314 ${rows[(i + 1) % rows.length] + 146}`} delay={i * 0.4} faint width={1.2} />
          <Arrow x={314} y={rows[(i + 1) % rows.length] + 146} angle={0} hot={i === 0} />
        </g>
      ))}
      <Node x={218} y={270} r={5} hot />

      {/* Yeni surum */}
      <g className="sv-float">
        <Browser x={412} y={48} w={188} h={130} hot>
          <rect x={428} y={84} width={74} height={9} rx="4.5" fill={C.ink} opacity="0.9" />
          <Lines x={428} y={102} w={84} rows={2} gap={9} thick={3} />
          <rect x={428} y={134} width={42} height={14} rx="7" fill={C.accent} />
          <rect x={524} y={82} width={62} height={66} rx="6" fill={`url(#${ids.accent})`} opacity="0.8" />
        </Browser>
      </g>
      <Beam d="M380 200 C 420 200, 486 196, 486 182" delay={0.6} />

      {/* Gecis sonrasi trafik: once dip, sonra toparlanma */}
      <Panel x={412} y={214} w={188} h={104}>
        <Spark x={428} y={236} w={156} h={64} points={[0.56, 0.58, 0.2, 0.26, 0.42, 0.62, 0.82]} />
        <line x1={466} y1={236} x2={466} y2={300} stroke={C.hot} strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
        <Lines x={428} y={306} w={120} rows={1} thick={3} />
      </Panel>
    </g>
  );
}
