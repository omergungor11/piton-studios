'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Floor, Lines, Node, Panel, Reflection, Spark, useArt } from '../kit';

/** Google Ads — arama sonuc kartlari, one cikan reklam karti, acilis sayfasi ve olceksiz yukselen donusum egrisi. */
export default function GoogleAdsArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={370} cy={160} r={250} />
      <Floor horizon={300} vx={340} />
      <Reflection cx={380} cy={322} rx={210} ry={14} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Anahtar kelime cipleri */}
      <g className="sv-float" style={{ animationDelay: '-2s' }}>
        {[0, 1, 2].map((i) => (
          <Panel key={i} x={34 + (i % 2) * 14} y={118 + i * 38} w={96} h={24} r={12} hot={i === 1}>
            <circle cx={50 + (i % 2) * 14} cy={130 + i * 38} r={4} fill="none" stroke={i === 1 ? C.hot : C.muted} strokeWidth="1.2" />
            <Lines x={60 + (i % 2) * 14} y={128 + i * 38} w={58} rows={1} thick={4} />
          </Panel>
        ))}
      </g>

      {/* Arama sonuclari sayfasi */}
      <g transform="translate(150 50) skewY(3)">
        <Panel x={0} y={0} w={250} h={236}>
          <rect x={12} y={14} width={226} height={22} rx="11" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.8" />
          <circle cx={27} cy={25} r={5} fill="none" stroke={C.ink} strokeWidth="1.4" />
          <path d="M31 29 L35 33" stroke={C.ink} strokeWidth="1.4" strokeLinecap="round" />
          <Lines x={42} y={23} w={110} rows={1} thick={4} />
          {/* Reklam karti */}
          <Panel x={12} y={48} w={226} h={54} r={8} hot>
            <rect x={22} y={58} width={18} height={9} rx="3" fill={C.accent} />
            <Lines x={46} y={60} w={120} rows={1} thick={4} />
            <rect x={22} y={74} width={150} height={7} rx="3.5" fill={C.hot} opacity="0.8" />
            <Lines x={22} y={88} w={190} rows={1} thick={3} />
          </Panel>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={27} cy={122 + i * 40} r={6} fill={C.faint} />
              <Lines x={40} y={118 + i * 40} w={150} rows={1} thick={4} />
              <rect x={22} y={132 + i * 40} width={120} height={6} rx="3" fill={C.ink} opacity="0.35" />
              <Lines x={22} y={143 + i * 40} w={196} rows={1} thick={3} />
            </g>
          ))}
        </Panel>
      </g>

      {/* Acilis sayfasi */}
      <g className="sv-float">
        <Browser x={452} y={86} w={160} h={130} hot>
          <rect x={464} y={118} width={72} height={9} rx="4.5" fill={C.ink} opacity="0.9" />
          <Lines x={464} y={134} w={70} rows={3} gap={8} thick={3} />
          <rect x={464} y={164} width={48} height={14} rx="7" fill={C.accent} />
          <rect x={548} y={114} width={52} height={64} rx="6" fill={`url(#${ids.accent})`} opacity="0.85" />
          <Lines x={464} y={192} w={136} rows={2} gap={8} thick={3} />
        </Browser>
      </g>

      {/* Donusum egrisi (olceksiz) */}
      <Panel x={452} y={240} w={160} h={62} hot>
        <Spark x={464} y={250} w={112} h={42} points={[0.08, 0.16, 0.12, 0.3, 0.38, 0.34, 0.58, 0.72, 0.92]} />
        <circle cx={594} cy={258} r={8} fill={C.bg} stroke={C.hot} strokeWidth="1.2" />
        <path d="M590 258 L593 261 L598 255" fill="none" stroke={C.hot} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </Panel>

      <Beam d="M144 168 C 160 168, 150 76, 166 76" faint delay={0.4} />
      <Beam d="M388 136 C 420 136, 424 160, 452 160" />
      <Beam d="M532 216 L532 240" delay={0.8} />
      <Node x={388} y={136} hot />
      <Node x={452} y={160} />
      <Node x={144} y={168} />

      {/* Tiklama */}
      <circle cx={336} cy={128} r={10} fill="none" stroke={C.hot} strokeWidth="1" opacity="0.6" />
      <circle cx={336} cy={128} r={17} fill="none" stroke={C.hot} strokeWidth="0.8" opacity="0.3" />
      <path d="M336 128 l0 22 l6 -6 l5 11 l4 -2 l-5 -11 l8 0 Z" fill={C.ink} stroke={C.bg} strokeWidth="1" filter={`url(#${ids.glow})`} />
    </g>
  );
}
