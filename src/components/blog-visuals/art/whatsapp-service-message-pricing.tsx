'use client';

import { Ambient, ArtFrame, Bars, Beam, Bubble, C, Clock, Floor, Lines, Node, Panel, Phone, Reflection, useArt } from '../kit';

/**
 * WhatsApp servis mesajlari ucretli — solda telefon: musterinin mesaji ve isletmenin parlayan
 * yanitlari. Her yanittan sagdaki sayac paneline isik cizgileri akar; panelde 24 saatlik pencereyi
 * anlatan saat, biriken jeton yigini ve aylik mesaj hacmi cubuklari.
 */
export default function WhatsappServiceMessagePricingArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={230} cy={190} r={250} />
      <Floor horizon={318} vx={320} />
      <Reflection cx={170} cy={338} rx={110} ry={12} opacity={0.45} />
      <Reflection cx={500} cy={338} rx={120} ry={10} opacity={0.35} />
      <Scene />
    </ArtFrame>
  );
}

/** Jeton: mesaj basina ucret. */
function Coin({ cx, cy, r = 10, hot = true }: { cx: number; cy: number; r?: number; hot?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.bg2} stroke={hot ? C.hot : C.line} strokeWidth="1.3" />
      <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={hot ? C.accent : C.faint} strokeWidth="1" />
    </g>
  );
}

/** Yandan gorunen jeton yigini. */
function CoinStack({ x, y, n }: { x: number; y: number; n: number }) {
  const ids = useArt();
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx={30} ry={8} fill={C.accent} opacity="0.25" filter={`url(#${ids.bloom})`} />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x - 26} y={y - i * 9 - 6} width={52} height={7} fill={i === n - 1 ? C.accent : C.bg2} fillOpacity={i === n - 1 ? 0.35 : 1} />
          <ellipse cx={x} cy={y - i * 9 + 1} rx={26} ry={6} fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
          <ellipse cx={x} cy={y - i * 9 - 6} rx={26} ry={6} fill={i === n - 1 ? C.deep : C.bg2} stroke={i === n - 1 ? C.hot : C.line} strokeWidth="1" />
        </g>
      ))}
    </g>
  );
}

function Scene() {
  return (
    <g>
      {/* Telefon ve sohbet */}
      <Phone x={84} y={40} w={176} h={276}>
        <rect x={84} y={58} width={176} height={26} fill="#FFFFFF" fillOpacity="0.04" />
        <circle cx={104} cy={71} r="7" fill={C.accent} fillOpacity="0.35" stroke={C.hot} strokeWidth="1" />
        <Lines x={118} y={68} w={60} rows={1} thick={5} />
        <Bubble x={98} y={98} w={110} h={30} rows={1} />
        <Bubble x={128} y={146} w={118} h={30} side="right" rows={1} hot />
        <Bubble x={140} y={194} w={106} h={30} side="right" rows={1} hot />
        <Bubble x={122} y={242} w={124} h={30} side="right" rows={1} hot />
      </Phone>

      {/* Yanitlardan sayaca */}
      <Beam d="M246 161 C 300 161, 320 140, 360 140" delay={0} />
      <Beam d="M246 209 C 300 209, 320 180, 360 178" delay={0.4} />
      <Beam d="M246 257 C 300 257, 320 220, 360 216" delay={0.8} />
      <g className="sv-float">
        <Coin cx={304} cy={150} r={9} />
        <Coin cx={312} cy={236} r={9} />
      </g>
      <Node x={360} y={178} r={4.5} hot />

      {/* Sayac paneli */}
      <Panel x={372} y={52} w={232} h={256} hot>
        <Lines x={392} y={70} w={90} rows={1} thick={5} accentFirst />
        <Clock cx={572} cy={76} r={18} hand={0.62} hot />
        <rect x={392} y={104} width={192} height={1} fill={C.line} />
        <CoinStack x={448} y={196} n={6} />
        <Bars x={500} y={120} w={84} h={96} values={[0.3, 0.45, 0.62, 0.9]} hotIndex={3} />
        <rect x={392} y={232} width={192} height={1} fill={C.line} />
        <rect x={392} y={250} width={192} height={10} rx="5" fill={C.faint} />
        <rect x={392} y={250} width={120} height={10} rx="5" fill={C.accent} fillOpacity="0.6" />
        <line x1={512} y1={244} x2={512} y2={266} stroke={C.hot} strokeWidth="1.2" />
        <Lines x={392} y={276} w={110} rows={1} thick={4} />
      </Panel>
    </g>
  );
}
