'use client';

import { Ambient, ArtFrame, Bars, Beam, Browser, C, Cart, Chip, Floor, Lines, Node, Panel, Reflection, Spark, useArt } from '../kit';

/**
 * E-ticaret donusum optimizasyonu — urun sayfasindan odemeye giden yol; yanda her adimda eriyen
 * ziyaretci cubuklari, altta iyilestirme sonrasi yukselen donusum egrisi.
 */
export default function EcommerceCroArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={250} cy={150} r={250} />
      <Floor horizon={312} vx={300} />
      <Reflection cx={250} cy={334} rx={170} ry={12} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Urun sayfasi */}
      <g transform="translate(46 50) skewY(-3)">
        <Browser x={0} y={0} w={280} h={230} hot>
          <rect x={18} y={34} width={122} height={120} rx="8" fill={`url(#${ids.accent})`} opacity="0.8" />
          <path d="M26 154 L62 118 L86 140 L108 122 L134 154 Z" fill={C.bg} opacity="0.5" />
          <Lines x={154} y={38} w={106} rows={2} gap={10} thick={5} />
          <Chip x={154} y={64} w={54} h={18} hot />
          <Lines x={154} y={92} w={106} rows={3} gap={9} thick={3} />
          {/* Tek ve net eylem */}
          <rect x={154} y={126} width={106} height={28} rx="8" fill={C.accent} />
          <rect x={176} y={137} width={62} height={6} rx="3" fill={C.bg} opacity="0.75" />
          {/* Guven satiri */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={30 + i * 44} cy={182} r="8" fill="none" stroke={C.line} strokeWidth="0.9" />
              <circle cx={30 + i * 44} cy={182} r="3" fill={i === 0 ? C.hot : C.faint} />
            </g>
          ))}
          <Lines x={154} y={172} w={106} rows={2} gap={10} thick={3} />
        </Browser>
      </g>

      {/* Odeme adimlari: son adim vurgulu */}
      <g className="sv-float">
        <Panel x={360} y={48} w={232} h={106}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Node x={396 + i * 80} y={88} r={5} hot={i === 2} />
              <Lines x={378 + i * 80} y={108} w={44} rows={1} thick={4} accentFirst={i === 2} />
            </g>
          ))}
          <Beam d="M404 88 L468 88" delay={0} width={1.3} />
          <Beam d="M484 88 L548 88" delay={0.5} width={1.3} />
          <Cart x={552} y={64} s={22} />
        </Panel>
      </g>

      {/* Adim adim eriyen ziyaretciler */}
      <Panel x={360} y={170} w={110} h={124}>
        <Bars x={374} y={192} w={82} h={84} values={[1, 0.72, 0.46, 0.24]} hotIndex={3} />
      </Panel>

      {/* Iyilestirme sonrasi donusum egrisi */}
      <Panel x={482} y={170} w={110} h={124} hot>
        <Spark x={496} y={196} w={82} h={76} points={[0.18, 0.22, 0.3, 0.28, 0.46, 0.62, 0.86]} />
      </Panel>

      <Beam d="M334 150 C 348 150, 346 96, 362 96" delay={0.3} faint />
      <Node x={334} y={150} hot />
    </g>
  );
}
