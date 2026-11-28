'use client';

import { Ambient, ArtFrame, Beam, Bubble, C, Check, Clock, Doc, Lines, Panel, useArt } from '../kit';

/**
 * Uc serit. Ustte musterinin mesajiyla acilan 24 saatlik pencere: ilk yanitlar onayli (aylik ucretsiz
 * hak), sinirdan sonrakiler jetonlu (ucretli). Ortada reklam kartindan acilan daha uzun, parlayan
 * pencere: butun yanitlar onayli. Altta pencere disinda gonderilen sablon: jetonlu.
 */
export default function WhatsappServiceMessagePricingFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={250} />
      <Scene />
    </ArtFrame>
  );
}

function Coin({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={C.bg2} stroke={C.hot} strokeWidth="1.3" />
      <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={C.accent} strokeWidth="1" />
    </g>
  );
}

/** Pencere icindeki tek yanit: kucuk balon + isaret (onay veya jeton). */
function Reply({ x, y, paid }: { x: number; y: number; paid: boolean }) {
  return (
    <g>
      <rect x={x} y={y - 11} width={40} height={22} rx="8" fill={C.accent} fillOpacity="0.22" stroke={C.accent} strokeWidth="0.9" />
      <rect x={x + 8} y={y - 2} width={24} height={4} rx="2" fill={C.hot} opacity="0.8" />
      {paid ? (
        <Coin cx={x + 20} cy={y - 26} r={8} />
      ) : (
        <g>
          <circle cx={x + 20} cy={y - 26} r={8} fill={C.bg} stroke={C.accent} strokeWidth="1" />
          <Check x={x + 21} y={y - 26} s={10} />
        </g>
      )}
    </g>
  );
}

/** Pencere bandi. */
function Band({ x, y, w, hot = false }: { x: number; y: number; w: number; hot?: boolean }) {
  const ids = useArt();
  return (
    <g>
      {hot && <rect x={x} y={y - 22} width={w} height={44} rx="22" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />}
      <rect x={x} y={y - 22} width={w} height={44} rx="22" fill={`url(#${hot ? ids.panelHot : ids.panel})`} stroke={hot ? C.accent : C.line} strokeWidth="1" />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Serit 1: musteri yazar, 24 saatlik pencere */}
      <Bubble x={28} y={70} w={70} h={26} rows={1} />
      <Beam d="M98 96 L128 96" delay={0} />
      <Band x={130} y={96} w={330} />
      <Clock cx={156} cy={96} r={15} hand={0.25} />
      <Reply x={186} y={100} paid={false} />
      <Reply x={240} y={100} paid={false} />
      <line x1={300} y1={64} x2={300} y2={128} stroke={C.hot} strokeWidth="1.2" strokeDasharray="3 4" />
      <Reply x={314} y={100} paid />
      <Reply x={368} y={100} paid />
      <Reply x={414} y={100} paid />

      {/* Serit 2: reklamdan gelen konusma, uzun ucretsiz pencere */}
      <Panel x={24} y={176} w={78} h={56} hot>
        <rect x={32} y={184} width={30} height={30} rx="5" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <circle cx={54} cy={192} r="4" fill={C.accent} opacity="0.85" />
        <Lines x={68} y={190} w={26} rows={2} gap={9} thick={3} accentFirst />
        <rect x={32} y={220} width={62} height={6} rx="3" fill={C.accent} fillOpacity="0.4" />
      </Panel>
      <Beam d="M102 210 L128 210" delay={0.4} />
      <Band x={130} y={210} w={486} hot />
      <Reply x={160} y={214} paid={false} />
      <Reply x={240} y={214} paid={false} />
      <Reply x={320} y={214} paid={false} />
      <Reply x={400} y={214} paid={false} />
      <Reply x={480} y={214} paid={false} />
      <Reply x={556} y={214} paid={false} />

      {/* Serit 3: pencere disinda sablon */}
      <rect x={130} y={302} width={486} height={44} rx="22" fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="4 6" />
      <Doc x={40} y={286} w={54} h={70} rows={3} />
      <Beam d="M94 324 C 200 324, 260 324, 300 324" delay={0.8} faint />
      <rect x={300} y={313} width={48} height={22} rx="8" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.9" />
      <rect x={310} y={322} width={28} height={4} rx="2" fill={C.muted} />
      <Coin cx={366} cy={324} r={10} />
    </g>
  );
}
