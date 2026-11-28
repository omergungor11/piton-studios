'use client';

import { Ambient, ArtFrame, Arrow, Beam, Bubble, C, Cart, Check, Cube, Doc, Grid, Panel, Stack, useArt } from '../kit';

/**
 * Ajanli alisveris akisi: kullanici istegi -> yapay zeka ajani. Ajan uc kaynaktan besleniyor: urun beslemesi (izgara),
 * magazanin siparis arayuzu (yigin) ve dijital cuzdan (kart). Ajan bir sepet hazirliyor; yaninda kullanici onayini
 * gosteren anahtar acik. Onaydan sonra siparis magazaya ulasiyor, magaza siparisi kendi sisteminde tamamliyor (belge + onay).
 */
export default function AgenticCommerceFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={280} />
      <Scene />
    </ArtFrame>
  );
}

const SOURCES = [64, 168, 272];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Kaynaklar: urun beslemesi, siparis arayuzu, cuzdan */}
      {SOURCES.map((y, i) => (
        <g key={y}>
          <Panel x={16} y={y} w={104} h={64}>
            {i === 0 && <Grid x={28} y={y + 14} cols={4} rows={2} cell={14} gap={4} hot={[2]} />}
            {i === 1 && <Stack x={32} y={y + 16} w={72} count={3} gap={12} hotIndex={1} />}
            {i === 2 && (
              <g>
                <rect x={30} y={y + 14} width={76} height={36} rx="6" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="0.9" />
                <rect x={38} y={y + 22} width={18} height={12} rx="3" fill={C.hot} opacity="0.7" />
                <rect x={38} y={y + 40} width={44} height={4} rx="2" fill={C.faint} />
              </g>
            )}
          </Panel>
          <Beam d={`M120 ${y + 32} C 138 ${y + 32}, 140 200, 158 200`} delay={0.2 + i * 0.15} faint={i !== 1} />
        </g>
      ))}

      {/* Kullanici istegi */}
      <Bubble x={160} y={40} w={92} h={50} side="left" rows={2} />
      <path d="M206 100 L 206 146" fill="none" stroke={C.hot} strokeWidth="1.2" strokeDasharray="4 4" className="sv-flow" />
      <Arrow x={206} y={146} angle={90} s={7} />

      {/* Ajan */}
      <rect x={160} y={150} width={92} height={100} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Panel x={160} y={150} w={92} h={100} hot>
        <circle className="sv-pulse" cx={206} cy={200} r={32} fill="none" stroke={C.hot} strokeWidth="1.1" opacity="0.6" />
        <Cube x={206} y={202} s={24} hot />
      </Panel>

      {/* Sepet + onay */}
      <Beam d="M252 200 L 300 200" delay={0.6} />
      <Arrow x={300} y={200} s={7} />
      <Panel x={304} y={146} w={110} h={108} hot>
        <Cart x={344} y={188} s={34} />
        <rect x={336} y={226} width={36} height={18} rx="9" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="0.9" />
        <circle cx={363} cy={235} r={6} fill={C.hot} />
        <circle className="sv-pulse" cx={396} cy={164} r={6} fill={C.hot} opacity="0.8" />
      </Panel>

      {/* Magaza siparisi tamamliyor */}
      <Beam d="M414 200 L 462 200" delay={0.9} />
      <Arrow x={462} y={200} s={7} />
      <rect x={466} y={120} width={158} height={160} rx="14" fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
      <Panel x={466} y={120} w={158} h={160}>
        <line x1={466} y1={142} x2={624} y2={142} stroke={C.line} strokeWidth="0.8" />
        <circle cx={480} cy={131} r={3} fill={C.faint} />
        <circle cx={490} cy={131} r={3} fill={C.faint} />
        <Doc x={490} y={156} w={64} h={84} hot rows={4} />
        <circle cx={590} cy={234} r={16} fill={C.accent} fillOpacity="0.2" stroke={C.hot} strokeWidth="1.1" />
        <Check x={590} y={234} s={16} />
      </Panel>
    </g>
  );
}
