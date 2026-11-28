'use client';

import { Ambient, ArtFrame, Bars, Beam, Bubble, C, Chip, Floor, Gauge, Lines, Node, Panel, Reflection, useArt } from '../kit';

/**
 * ChatGPT reklamlari — solda sohbet penceresi: kullanicinin sorusu, modelin cevabi ve cevabin altinda
 * etiketli, gorselli ayri bir reklam karti (parlayan). Reklam kartindan sagdaki reklam paneline isik
 * cizgisi; panelde butce gostergesi ve performans cubuklari.
 */
export default function ChatgptAdsArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={250} cy={190} r={250} />
      <Floor horizon={312} vx={320} />
      <Reflection cx={210} cy={334} rx={150} ry={12} opacity={0.45} />
      <Reflection cx={520} cy={334} rx={90} ry={10} opacity={0.35} />
      <Scene />
    </ArtFrame>
  );
}

/** Reklam karti: kucuk gorsel + metin satirlari + etiket. */
function AdCard({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const ids = useArt();
  const iw = h - 20;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={C.accent} opacity="0.22" filter={`url(#${ids.bloom})`} />
      <Panel x={x} y={y} w={w} h={h} hot>
        <rect x={x + 10} y={y + 10} width={iw} height={iw} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <circle cx={x + 10 + iw * 0.7} cy={y + 10 + iw * 0.32} r={iw * 0.12} fill={C.accent} opacity="0.8" />
        <path d={`M${x + 14},${y + 6 + iw} L${x + 10 + iw * 0.4},${y + 10 + iw * 0.45} L${x + 10 + iw * 0.65},${y + 10 + iw * 0.72} L${x + 6 + iw},${y + 6 + iw} Z`} fill={C.faint} />
        <Lines x={x + iw + 24} y={y + 16} w={w - iw - 92} rows={2} gap={10} thick={4} accentFirst />
        <Chip x={x + w - 62} y={y + 12} w={50} h={18} hot />
      </Panel>
    </g>
  );
}

function Scene() {
  return (
    <g>
      {/* Sohbet penceresi */}
      <Panel x={40} y={40} w={340} h={264}>
        <rect x={40} y={40} width={340} height={30} rx="10" fill="#FFFFFF" fillOpacity="0.04" />
        <Lines x={60} y={53} w={70} rows={1} thick={5} />
        {/* soru */}
        <Bubble x={200} y={84} w={160} h={30} side="right" rows={1} />
        {/* cevap */}
        <g>
          <circle cx={66} cy={140} r="9" fill={C.accent} fillOpacity="0.3" stroke={C.hot} strokeWidth="1" />
          <Lines x={84} y={134} w={260} rows={4} gap={11} thick={4} />
        </g>
        {/* cevaptan ayri reklam birimi */}
        <line x1={60} y1={192} x2={360} y2={192} stroke={C.line} strokeWidth="0.8" strokeDasharray="3 6" />
        <g className="sv-float">
          <AdCard x={60} y={204} w={300} h={64} />
        </g>
        <rect x={60} y={278} width={300} height={16} rx="8" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.7" />
      </Panel>

      <Beam d="M360 236 C 400 236, 410 170, 440 168" delay={0} />
      <Node x={440} y={168} r={4.5} hot />

      {/* Reklam paneli: butce ve performans */}
      <Panel x={440} y={76} w={170} h={208} hot>
        <Lines x={458} y={94} w={90} rows={1} thick={5} accentFirst />
        <Gauge cx={525} cy={170} r={44} value={0.46} />
        <rect x={458} y={196} width={134} height={1} fill={C.line} />
        <Bars x={458} y={208} w={134} h={60} values={[0.3, 0.42, 0.38, 0.6, 0.72, 0.9]} hotIndex={5} />
      </Panel>
    </g>
  );
}
