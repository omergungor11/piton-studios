'use client';

import { Ambient, ArtFrame, Arrow, Bars, Beam, Browser, Bubble, C, Check, Chip, Cross, Lines, Node, Panel, useArt } from '../kit';

/**
 * Reklamin yolu. Solda sohbet: soru, cevap ve cevabin altinda etiketli reklam karti. Ustte reklam
 * sistemi ile cevap arasindaki bag kesik (carpi): reklam cevabi etkilemez. Reklam kartindan acilis
 * sayfasina, oradan donusum olayina; donusum verisi alttan geri donup reklam panelindeki
 * optimizasyonu besler.
 */
export default function ChatgptAdsFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={210} r={240} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Reklam paneli (ust orta) */}
      <Panel x={250} y={28} w={150} h={84} hot>
        <Lines x={266} y={44} w={70} rows={1} thick={5} accentFirst />
        <Bars x={266} y={58} w={118} h={42} values={[0.35, 0.5, 0.45, 0.7, 0.92]} hotIndex={4} />
      </Panel>

      {/* Sohbet */}
      <Panel x={30} y={60} w={200} h={300}>
        <Bubble x={96} y={78} w={118} h={28} side="right" rows={1} />
        <circle cx={52} cy={136} r="8" fill={C.accent} fillOpacity="0.3" stroke={C.hot} strokeWidth="1" />
        <Lines x={68} y={130} w={140} rows={5} gap={11} thick={4} />
        <line x1={46} y1={202} x2={214} y2={202} stroke={C.line} strokeWidth="0.8" strokeDasharray="3 6" />
        {/* reklam karti */}
        <rect x={46} y={214} width={168} height={70} rx="10" fill={C.accent} opacity="0.2" filter={`url(#${ids.bloom})`} />
        <Panel x={46} y={214} w={168} h={70} hot>
          <rect x={56} y={224} width={50} height={50} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
          <circle cx={92} cy={238} r="6" fill={C.accent} opacity="0.8" />
          <path d="M60,270 L76,248 L88,262 L102,270 Z" fill={C.faint} />
          <Lines x={116} y={250} w={84} rows={2} gap={10} thick={4} accentFirst />
          <Chip x={150} y={222} w={54} h={18} hot />
        </Panel>
        <rect x={46} y={300} width={168} height={18} rx="9" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.7" />
      </Panel>

      {/* Reklam sistemi → cevap: kesik bag */}
      <path d="M250 70 C 222 70, 214 100, 214 130" fill="none" stroke={C.line} strokeWidth="1.2" strokeDasharray="4 5" />
      <circle cx={226} cy={86} r="12" fill={C.bg} stroke={C.line} strokeWidth="1" />
      <Cross x={226} y={86} s={14} />

      {/* Reklam paneli → reklam karti (gosterim) */}
      <Beam d="M325 112 C 325 180, 270 248, 214 248" delay={0} width={1.3} />

      {/* Reklam karti → acilis sayfasi */}
      <Beam d="M214 262 C 260 262, 270 220, 300 220" delay={0.3} />
      <Arrow x={302} y={220} />
      <Browser x={306} y={160} w={170} h={130}>
        <rect x={322} y={194} width={70} height={46} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <Lines x={402} y={198} w={60} rows={3} gap={11} thick={4} accentFirst />
        <rect x={322} y={254} width={70} height={20} rx="10" fill={C.accent} fillOpacity="0.3" stroke={C.hot} strokeWidth="1" />
      </Browser>

      {/* Acilis sayfasi → donusum olayi */}
      <Beam d="M476 225 L540 225" delay={0.6} />
      <circle className="sv-pulse" cx={568} cy={225} r={26} fill="none" stroke={C.hot} strokeWidth="1" />
      <circle cx={568} cy={225} r={22} fill={C.bg} stroke={C.accent} strokeWidth="1.2" />
      <Check x={570} y={225} s={20} />

      {/* Donusum verisi → reklam paneline geri (optimizasyon dongusu) */}
      <Beam d="M568 199 C 568 90, 470 60, 400 66" delay={1.1} width={1.3} />
      <Node x={400} y={66} r={4} hot />
    </g>
  );
}
