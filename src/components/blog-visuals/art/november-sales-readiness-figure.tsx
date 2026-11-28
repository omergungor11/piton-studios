'use client';

import { Ambient, ArtFrame, Bars, Beam, C, Check, Doc, Gauge, Lines, Node, Panel } from '../kit';

/**
 * Uc asamali zaman cizelgesi. Solda hazirlik: yuk testi gostergesi ve onay isaretleri. Ortada zirve:
 * yukselen trafik cubuklari ve surekli izlenen nabiz cizgisi (parlayan panel). Sagda analiz: rapor ve
 * cubuk grafik. Asamalar alttaki isik cizgisiyle soldan saga bagli.
 */
export default function NovemberSalesReadinessFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={250} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  return (
    <g>
      {/* Zaman ekseni */}
      <Beam d="M120 336 L520 336" delay={0} width={1.4} />
      <Node x={120} y={336} r={5} />
      <Node x={320} y={336} r={5} hot />
      <Node x={520} y={336} r={5} />
      <line x1={120} y1={304} x2={120} y2={326} stroke={C.line} strokeWidth="0.9" strokeDasharray="3 5" />
      <line x1={320} y1={304} x2={320} y2={326} stroke={C.accent} strokeWidth="0.9" strokeDasharray="3 5" />
      <line x1={520} y1={304} x2={520} y2={326} stroke={C.line} strokeWidth="0.9" strokeDasharray="3 5" />

      {/* Hazirlik: yuk testi ve kontrol listesi */}
      <Panel x={40} y={56} w={160} h={248}>
        <Lines x={56} y={72} w={70} rows={1} thick={5} />
        <Gauge cx={120} cy={146} r={46} value={0.48} />
        <rect x={56} y={170} width={128} height={1} fill={C.line} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx={66} cy={192 + i * 26} r="8" fill={C.bg} stroke={C.accent} strokeWidth="1" />
            <Check x={67} y={192 + i * 26} s={10} />
            <Lines x={84} y={190 + i * 26} w={92} rows={1} thick={4} />
          </g>
        ))}
      </Panel>

      {/* Zirve: trafik ve izleme */}
      <Panel x={232} y={36} w={176} h={268} hot>
        <Lines x={248} y={52} w={80} rows={1} thick={5} accentFirst />
        <Bars x={248} y={70} w={144} h={112} values={[0.2, 0.32, 0.5, 0.74, 0.96, 0.82]} hotIndex={4} />
        <rect x={248} y={196} width={144} height={1} fill={C.line} />
        <path
          d="M248 250 L280 250 L290 226 L300 270 L310 238 L318 250 L392 250"
          fill="none"
          stroke={C.accent}
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <path
          className="sv-flow"
          d="M248 250 L280 250 L290 226 L300 270 L310 238 L318 250 L392 250"
          fill="none"
          stroke={C.hot}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle className="sv-pulse" cx={392} cy={250} r={7} fill="none" stroke={C.hot} strokeWidth="1" />
        <circle cx={392} cy={250} r={3} fill={C.hot} />
      </Panel>

      {/* Analiz: rapor ve sonuc grafigi */}
      <Panel x={440} y={56} w={160} h={248}>
        <Lines x={456} y={72} w={70} rows={1} thick={5} />
        <Doc x={456} y={92} w={70} h={92} hot rows={5} />
        <Doc x={536} y={104} w={50} h={68} rows={3} />
        <rect x={456} y={198} width={128} height={1} fill={C.line} />
        <Bars x={456} y={210} w={128} h={76} values={[0.4, 0.55, 0.48, 0.8]} hotIndex={3} />
      </Panel>
    </g>
  );
}
