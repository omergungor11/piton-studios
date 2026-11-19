'use client';

import { Ambient, ArtFrame, Beam, C, Cube, Floor, Panel, Phone, Reflection, Spark, Stack, useArt } from '../kit';

/**
 * Meta reklamlarinda 2026 degisiklikleri — solda butce yigini; ustteki dilim ayri parliyor ve ucret olarak
 * yigindan ayriliyor. Butce ortadaki yapay zeka cekirdegine akiyor; cekirdegin yaninda uc anahtar, ikisi kendiliginden
 * acik. Sagda telefonda bir reklam karti: altinda yuzen urun kareleri (uygulama ici urun gezinme) ve bir sonuc grafigi.
 */
export default function MetaAds2026ChangesArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={260} />
      <Floor horizon={320} vx={320} />
      <Reflection cx={320} cy={336} rx={170} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function Toggle({ x, y, on }: { x: number; y: number; on: boolean }) {
  const ids = useArt();
  return (
    <g>
      <rect x={x} y={y} width={36} height={18} rx={9} fill={on ? `url(#${ids.panelHot})` : C.bg} stroke={on ? C.hot : C.line} strokeWidth="0.9" />
      <circle cx={on ? x + 27 : x + 9} cy={y + 9} r={6} fill={on ? C.hot : C.muted} />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Butce yigini + ayrilan ucret dilimi */}
      <Panel x={30} y={118} w={124} h={150}>
        <Stack x={52} y={176} w={80} count={6} gap={13} />
        <g className="sv-float">
          <rect x={64} y={140} width={80} height={10} rx="3" fill={C.accent} fillOpacity="0.35" stroke={C.hot} strokeWidth="1" />
        </g>
        <line x1={52} y1={164} x2={132} y2={164} stroke={C.hot} strokeWidth="0.9" strokeDasharray="3 4" />
      </Panel>
      <Beam d="M154 210 C 186 210, 196 200, 220 196" delay={0.2} />

      {/* Yapay zeka cekirdegi + anahtarlar */}
      <rect x={220} y={112} width={150} height={168} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Panel x={220} y={112} w={150} h={168} hot>
        <circle className="sv-pulse" cx={272} cy={190} r={38} fill="none" stroke={C.hot} strokeWidth="1.2" opacity="0.6" />
        <Cube x={272} y={192} s={30} hot />
        <Toggle x={318} y={140} on />
        <Toggle x={318} y={182} on />
        <Toggle x={318} y={224} on={false} />
      </Panel>
      <Beam d="M370 196 C 400 196, 410 186, 440 182" delay={0.7} />

      {/* Telefonda reklam + urun gezinme */}
      <Phone x={440} y={70} w={116} h={230} hot>
        <circle cx={460} cy={98} r={7} fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
        <rect x={472} y={94} width={50} height={5} rx="2.5" fill={C.muted} opacity="0.7" />
        <rect x={452} y={112} width={92} height={70} rx="6" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="0.8" />
        <rect x={452} y={190} width={64} height={5} rx="2.5" fill={C.faint} />
        <rect x={452} y={202} width={92} height={14} rx="4" fill={C.hot} opacity="0.85" />
        <line x1={452} y1={284} x2={544} y2={284} stroke={C.line} strokeWidth="0.8" />
        <Spark x={452} y={240} w={92} h={40} points={[0.2, 0.3, 0.26, 0.44, 0.5, 0.66, 0.78]} />
      </Phone>
      <g className="sv-float">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={566} y={112 + i * 34} width={28} height={28} rx="5" fill={i === 1 ? `url(#${ids.panelHot})` : C.bg2} stroke={i === 1 ? C.hot : C.line} strokeWidth="0.9" />
        ))}
      </g>
    </g>
  );
}
