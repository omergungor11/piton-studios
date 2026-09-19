'use client';

import { Ambient, ArtFrame, Bars, Beam, Browser, C, Floor, Lines, Node, Panel, Reflection, Spark, useArt } from '../kit';

/** Web Uygulama — katmanli dashboard ekranlari (grafik, tablo, kartlar); veritabani ve entegrasyonlardan veri akisi. */
export default function WebAppArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={400} cy={160} r={260} />
      <Floor horizon={305} vx={390} />
      <Reflection cx={380} cy={334} rx={210} ry={14} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Arka katmanlar */}
      <g transform="translate(262 34) skewY(-6)" opacity="0.55">
        <Panel x={0} y={0} w={300} h={190}>
          <Lines x={16} y={16} w={120} rows={2} gap={9} thick={4} />
          <Spark x={16} y={60} w={268} h={90} points={[0.2, 0.35, 0.3, 0.55, 0.5, 0.7]} fill={false} />
        </Panel>
      </g>
      <g transform="translate(224 64) skewY(-6)" opacity="0.8">
        <Panel x={0} y={0} w={300} h={196}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={14} y={40 + i * 22} width={272} height={16} rx="3" fill="#FFFFFF" fillOpacity={i % 2 ? 0.02 : 0.04} />
              <circle cx={24} cy={48 + i * 22} r="3" fill={i === 2 ? C.hot : C.faint} />
              <Lines x={34} y={46 + i * 22} w={110} rows={1} thick={3} />
            </g>
          ))}
        </Panel>
      </g>

      {/* On dashboard */}
      <g transform="translate(184 96) skewY(-6)">
        <Browser x={0} y={0} w={330} h={212}>
          {/* Kenar menusu */}
          <rect x={8} y={28} width={48} height={176} rx="6" fill="#FFFFFF" fillOpacity="0.04" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={18} y={40 + i * 22} width={28} height={8} rx="4" fill={i === 1 ? C.accent : C.faint} />
          ))}
          {/* KPI kartlari */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={66 + i * 86} y={30} width={78} height={40} rx="6" fill={i === 0 ? `url(#${ids.panelHot})` : '#FFFFFF'} fillOpacity={i === 0 ? 1 : 0.04} stroke={i === 0 ? C.accent : C.line} strokeWidth="0.7" />
              <rect x={74 + i * 86} y={40} width={34} height={8} rx="4" fill={i === 0 ? C.ink : C.muted} opacity="0.8" />
              <rect x={74 + i * 86} y={54} width={50} height={4} rx="2" fill={C.faint} />
            </g>
          ))}
          {/* Grafik */}
          <rect x={66} y={80} width={164} height={120} rx="6" fill="#FFFFFF" fillOpacity="0.03" stroke={C.line} strokeWidth="0.6" />
          <Spark x={76} y={100} w={144} h={86} points={[0.15, 0.3, 0.25, 0.5, 0.42, 0.68, 0.6, 0.85]} />
          {/* Cubuklar + liste */}
          <rect x={238} y={80} width={82} height={120} rx="6" fill="#FFFFFF" fillOpacity="0.03" stroke={C.line} strokeWidth="0.6" />
          <Bars x={244} y={88} w={70} h={48} values={[0.5, 0.8, 0.35, 0.65]} hotIndex={1} />
          <Lines x={246} y={150} w={60} rows={5} gap={9} thick={3} />
        </Browser>
      </g>

      {/* Canli bildirim karti */}
      <g className="sv-float" style={{ animationDelay: '-2s' }}>
        <Panel x={470} y={214} w={120} h={58} hot>
          <circle cx={490} cy={243} r={9} fill={C.accent} filter={`url(#${ids.glow})`} />
          <Lines x={506} y={232} w={70} rows={3} gap={8} thick={3} accentFirst />
        </Panel>
      </g>

      {/* Veritabani */}
      <g className="sv-float">
        <g fill={C.bg2} stroke={C.line} strokeWidth="0.9">
          <path d="M70 208 L70 262 A42 12 0 0 0 154 262 L154 208" />
          <ellipse cx={112} cy={208} rx={42} ry={12} fill={`url(#${ids.panel})`} />
          <path d="M70 226 A42 12 0 0 0 154 226 M70 244 A42 12 0 0 0 154 244" fill="none" stroke={C.accent} strokeOpacity="0.6" />
        </g>
        <circle cx={112} cy={208} r={16} fill={C.accent} opacity="0.3" filter={`url(#${ids.bloom})`} />
      </g>

      {/* Entegrasyon cipi */}
      <g transform="translate(92 84)">
        <Panel x={0} y={0} w={64} h={64} r={12}>
          <rect x={18} y={18} width={28} height={28} rx="6" fill="none" stroke={C.hot} strokeWidth="1.1" />
          <path d="M26 32 L38 32 M32 26 L32 38" stroke={C.hot} strokeWidth="1.4" strokeLinecap="round" />
        </Panel>
      </g>

      <Beam d="M154 236 C 172 236, 180 250, 200 252" />
      <Beam d="M156 116 C 176 118, 184 140, 200 150" delay={0.7} faint />
      <Node x={154} y={236} hot />
      <Node x={156} y={116} />
    </g>
  );
}
