'use client';

import { Ambient, ArtFrame, Beam, Bubble, C, Cart, Check, Cube, Floor, Panel, Reflection, useArt } from '../kit';

/**
 * Yapay zeka alisveris ajanlari — solda kullanicinin istegi (sohbet balonu). Ortada ajan cekirdegi; ondan uc urun
 * kartina tarama isiklari gidiyor, ortadaki kart secilmis (onay isareti). Secilen urun sagdaki sepete akiyor; sepetin
 * altinda bir cuzdan karti ve kullanici onayini gosteren acik anahtar. Ustte yuzen urun kareleri katalogu temsil eder.
 */
export default function AgenticCommerceArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={260} />
      <Floor horizon={320} vx={320} />
      <Reflection cx={320} cy={336} rx={180} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

const CARDS = [92, 168, 244];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Kullanici istegi */}
      <Bubble x={22} y={132} w={112} h={56} side="left" rows={3} />
      <Beam d="M134 168 C 156 168, 164 190, 186 190" delay={0.1} />

      {/* Ajan cekirdegi */}
      <rect x={186} y={140} width={100} height={100} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Panel x={186} y={140} w={100} h={100} hot>
        <circle className="sv-pulse" cx={236} cy={190} r={34} fill="none" stroke={C.hot} strokeWidth="1.2" opacity="0.6" />
        <Cube x={236} y={192} s={26} hot />
      </Panel>

      {/* Taranan urun kartlari */}
      {CARDS.map((y, i) => {
        const hot = i === 1;
        return (
          <g key={y}>
            <Beam d={`M286 190 C 306 190, 312 ${y + 30}, 330 ${y + 30}`} delay={0.4 + i * 0.2} faint={!hot} />
            <Panel x={330} y={y} w={120} h={60} hot={hot}>
              <rect x={340} y={y + 10} width={40} height={40} rx="6" fill={hot ? `url(#${ids.panelHot})` : C.bg2} stroke={hot ? C.hot : C.line} strokeWidth="0.8" />
              <rect x={390} y={y + 14} width={48} height={5} rx="2.5" fill={hot ? C.hot : C.faint} />
              <rect x={390} y={y + 26} width={34} height={5} rx="2.5" fill={C.faint} />
              <rect x={390} y={y + 38} width={22} height={6} rx="3" fill={hot ? C.hot : C.muted} opacity="0.8" />
              {hot && <Check x={432} y={y + 42} s={12} />}
            </Panel>
          </g>
        );
      })}
      <Beam d="M450 198 C 472 198, 480 186, 500 186" delay={1.1} />

      {/* Sepet + cuzdan + onay anahtari */}
      <rect x={500} y={120} width={118} height={170} rx="14" fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
      <Panel x={500} y={120} w={118} h={170} hot>
        <Cart x={548} y={170} s={40} />
        <circle className="sv-pulse" cx={590} cy={150} r={7} fill={C.hot} opacity="0.8" />
        <rect x={514} y={218} width={90} height={34} rx="6" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="0.9" />
        <rect x={522} y={226} width={20} height={14} rx="3" fill={C.hot} opacity="0.7" />
        <rect x={550} y={232} width={44} height={4} rx="2" fill={C.faint} />
        <rect x={522} y={262} width={36} height={18} rx="9" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="0.9" />
        <circle cx={549} cy={271} r={6} fill={C.hot} />
        <rect x={566} y={269} width={38} height={4} rx="2" fill={C.faint} />
      </Panel>

      {/* Katalog */}
      <g className="sv-float">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={330 + i * 32} y={46} width={24} height={24} rx="5" fill={i === 2 ? `url(#${ids.panelHot})` : C.bg2} stroke={i === 2 ? C.hot : C.line} strokeWidth="0.9" />
        ))}
      </g>
      <path d="M390 70 L 390 92" fill="none" stroke={C.hot} strokeWidth="1" strokeDasharray="3 4" className="sv-flow" />
    </g>
  );
}
