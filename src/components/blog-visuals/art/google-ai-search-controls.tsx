'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Chip, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/**
 * Google'in yapay zeka kontrolu — solda klasik sonuc listesi olan arama penceresi, ustunde kaynak
 * ciplariyla yapay zeka cevabi; sagda site sahibinin elindeki buyuk acma/kapama anahtari, isik
 * cizgisiyle cevaba bagli. Anahtarin altinda ayar paneli ve ikincil anahtarlar.
 */
export default function GoogleAiSearchControlsArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={470} cy={170} r={240} />
      <Floor horizon={312} vx={340} />
      <Reflection cx={500} cy={334} rx={130} ry={12} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

/** Acma/kapama anahtari. `on` ise topuz sagda ve parlak. */
function Toggle({ x, y, w, h, on = true }: { x: number; y: number; w: number; h: number; on?: boolean }) {
  const ids = useArt();
  const r = h / 2;
  const kx = on ? x + w - r : x + r;
  return (
    <g>
      {on && <rect x={x} y={y} width={w} height={h} rx={r} fill={C.accent} opacity="0.3" filter={`url(#${ids.bloom})`} />}
      <rect x={x} y={y} width={w} height={h} rx={r} fill={on ? C.accent : C.bg2} fillOpacity={on ? 0.32 : 1} stroke={on ? C.hot : C.line} strokeWidth={on ? 1.2 : 0.9} />
      <circle cx={kx} cy={y + r} r={r - 5} fill={on ? `url(#${ids.accent})` : '#2A2826'} stroke={on ? C.hot : C.line} strokeWidth="0.9" filter={on ? `url(#${ids.glow})` : undefined} />
    </g>
  );
}

function Scene() {
  return (
    <g>
      {/* Arama penceresi: klasik sonuclar */}
      <Browser x={36} y={60} w={300} h={236}>
        <rect x={56} y={92} width={220} height={18} rx="9" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.8" />
        <circle cx={262} cy={101} r="4" fill="none" stroke={C.muted} strokeWidth="1.2" />
        {[214, 244, 274].map((y, i) => (
          <g key={y} opacity={1 - i * 0.2}>
            <rect x={56} y={y} width={150 - i * 16} height={6} rx="3" fill={C.faint} />
            <rect x={56} y={y + 11} width={210 - i * 22} height={4} rx="2" fill={C.faint} opacity="0.7" />
          </g>
        ))}
      </Browser>

      {/* Yapay zeka cevabi, sonuclarin ustunde */}
      <g className="sv-float">
        <Panel x={56} y={122} w={262} h={80} hot>
          <Lines x={74} y={138} w={180} rows={3} gap={10} thick={4} accentFirst />
          <Chip x={74} y={174} w={58} h={16} hot />
          <Chip x={138} y={174} w={48} h={16} />
          <Chip x={192} y={174} w={40} h={16} />
        </Panel>
      </g>

      {/* Site sahibinin anahtari */}
      <Panel x={402} y={84} w={196} h={204}>
        <Lines x={424} y={104} w={110} rows={1} thick={5} accentFirst />
        <Toggle x={440} y={128} w={120} h={56} on />
        <rect x={424} y={204} width={152} height={1} fill={C.line} />
        {[218, 246].map((y, i) => (
          <g key={y}>
            <Lines x={424} y={y + 6} w={84} rows={1} thick={4} />
            <Toggle x={536} y={y} w={40} h={18} on={i === 0} />
          </g>
        ))}
      </Panel>
      <Beam d="M440 156 C 392 156, 372 162, 320 162" delay={0} />
      <Node x={320} y={162} r={4.5} hot />
      <Beam d="M500 288 C 500 306, 420 312, 336 290" delay={0.7} faint width={1.2} />
    </g>
  );
}
