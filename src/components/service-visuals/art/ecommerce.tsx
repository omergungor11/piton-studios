'use client';

import { Ambient, ArtFrame, Beam, C, Cube, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/** E-ticaret — urun kartlarindan sepete, sepetten odeme terminaline akan isik; yanda kargo paketi. */
export default function EcommerceArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={430} cy={170} r={250} />
      <Floor horizon={298} vx={370} />
      <Reflection cx={390} cy={328} rx={210} ry={14} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function ProductCard({ x, y, hot = false, shape }: { x: number; y: number; hot?: boolean; shape: 'bottle' | 'box' }) {
  const ids = useArt();
  const cx = x + 56;
  return (
    <Panel x={x} y={y} w={112} h={150} hot={hot}>
      <rect x={x + 10} y={y + 10} width={92} height={74} rx="8" fill={hot ? `url(#${ids.accent})` : '#FFFFFF'} fillOpacity={hot ? 0.75 : 0.04} />
      {shape === 'bottle' ? (
        <path d={`M${cx - 6} ${y + 22} h12 v10 q10 6 10 18 v24 h-32 v-24 q0 -12 10 -18 Z`} fill={C.bg} opacity="0.6" />
      ) : (
        <path d={`M${cx} ${y + 26} l20 10 v24 l-20 10 l-20 -10 v-24 Z M${cx - 20} ${y + 36} l20 10 l20 -10 M${cx} ${y + 46} v24`} fill="none" stroke={C.ink} strokeOpacity="0.6" strokeWidth="1" />
      )}
      <Lines x={x + 10} y={y + 94} w={70} rows={2} gap={8} thick={3} />
      <rect x={x + 10} y={y + 120} width={36} height={10} rx="5" fill={hot ? C.ink : C.muted} opacity="0.8" />
      <circle cx={x + 90} cy={y + 125} r={10} fill={hot ? C.accent : C.faint} />
      <path d={`M${x + 85} ${y + 125} h10 M${x + 90} ${y + 120} v10`} stroke={C.ink} strokeWidth="1.4" strokeLinecap="round" />
    </Panel>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Urun kartlari */}
      <ProductCard x={52} y={78} shape="box" />
      <g className="sv-float">
        <ProductCard x={128} y={116} shape="bottle" hot />
      </g>

      {/* Sepet */}
      <g stroke={C.ink} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${ids.glow})`}>
        <path d="M290 176 L312 176 L330 246 L402 246 L416 196 L318 196" />
      </g>
      <rect x={336} y={208} width={22} height={22} rx="4" fill={C.accent} />
      <rect x={362} y={214} width={30} height={16} rx="4" fill={C.faint} stroke={C.line} />
      <circle cx={340} cy={262} r={7} fill={C.bg2} stroke={C.ink} strokeWidth="2.4" />
      <circle cx={392} cy={262} r={7} fill={C.bg2} stroke={C.ink} strokeWidth="2.4" />

      {/* Odeme terminali */}
      <g transform="translate(462 108) skewY(-5)">
        <Panel x={0} y={0} w={112} h={176} r={16}>
          <rect x={12} y={16} width={88} height={62} rx="8" fill={`url(#${ids.panelHot})`} stroke={C.accent} strokeWidth="0.8" />
          <circle cx={56} cy={47} r={15} fill="none" stroke={C.hot} strokeWidth="1.6" filter={`url(#${ids.glow})`} />
          <path d="M48 47 L54 53 L65 41" fill="none" stroke={C.hot} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={20 + (i % 3) * 26} y={92 + Math.floor(i / 3) * 20} width={20} height={12} rx="4" fill={i === 8 ? C.accent : C.faint} />
          ))}
          <rect x={30} y={158} width={52} height={4} rx="2" fill={C.bg} />
        </Panel>
      </g>

      {/* Temassiz kart */}
      <g className="sv-float" style={{ animationDelay: '-2.5s' }}>
        <g transform="translate(520 52) rotate(-14)">
          <rect x={0} y={0} width={76} height={48} rx="7" fill={`url(#${ids.accent})`} stroke={C.hot} strokeWidth="0.8" />
          <rect x={10} y={12} width={14} height={11} rx="2" fill={C.ink} opacity="0.7" />
          <Lines x={10} y={32} w={44} rows={1} thick={4} />
        </g>
      </g>

      {/* Kargo paketi */}
      <Cube x={604} y={262} s={26} />
      <path d="M604 262 L604 288" stroke={C.accent} strokeWidth="1.2" />

      {/* Akis: kart → sepet → terminal → kargo */}
      <Beam d="M240 196 C 262 196, 272 186, 296 186" />
      <Beam d="M410 214 C 432 208, 444 190, 470 184" delay={0.6} />
      <Beam d="M540 268 C 556 280, 570 280, 582 272" delay={1.2} faint />
      <Node x={240} y={196} />
      <Node x={366} y={196} hot />
      <Node x={470} y={184} />
    </g>
  );
}
