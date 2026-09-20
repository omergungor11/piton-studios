'use client';

import { ArtFrame, Ambient, C, Lines, Panel, useArt } from '../kit';

/**
 * Form alani anatomisi: yukaridan asagiya etiket, yardim metni, giris alani, hata satiri ve
 * dokunma hedefi. Sagdaki olcu cizgileri her parcanin kapladigi alani gosterir.
 */
export default function AccessibleFormsFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={300} cy={190} r={230} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  // Parcalarin dikey yerlesimi: [ust, yukseklik]
  const parts: [number, number][] = [
    [60, 18],
    [86, 16],
    [110, 52],
    [172, 22],
    [210, 56],
  ];
  return (
    <g>
      <Panel x={40} y={32} w={420} h={336}>
        {/* Etiket */}
        <rect x={76} y={64} width={104} height={10} rx="5" fill={C.ink} opacity="0.85" />
        {/* Yardim metni */}
        <rect x={76} y={90} width={168} height={8} rx="4" fill={C.muted} opacity="0.65" />
        {/* Giris alani + gorunur odak halkasi */}
        <rect x={76} y={110} width={348} height={52} rx="10" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.9" />
        <rect x={70} y={104} width={360} height={64} rx="14" fill="none" stroke={C.hot} strokeWidth="2" filter={`url(#${ids.glow})`} />
        <Lines x={94} y={132} w={150} rows={1} thick={6} />
        {/* Hata satiri: renge ek olarak isaret */}
        <circle cx={86} cy={183} r="9" fill="none" stroke={C.hot} strokeWidth="1.5" />
        <line x1={86} y1={178} x2={86} y2={184} stroke={C.hot} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx={86} cy={188} r="1.4" fill={C.hot} />
        <rect x={104} y={179} width={188} height={8} rx="4" fill={C.hot} opacity="0.8" />
        {/* Genis dokunma hedefi */}
        <rect x={76} y={210} width={190} height={56} rx="12" fill={C.accent} />
        <rect x={120} y={232} width={102} height={10} rx="5" fill={C.bg} opacity="0.75" />
        <rect x={68} y={202} width={206} height={72} rx="16" fill="none" stroke={C.line} strokeWidth="0.8" strokeDasharray="4 5" />
        <Lines x={76} y={296} w={300} rows={2} gap={16} thick={4} />
      </Panel>

      {/* Olcu cizgileri */}
      <g stroke={C.line} strokeWidth="0.9">
        {parts.map(([top, h], i) => (
          <g key={i}>
            <line x1={486} y1={top + 32} x2={486} y2={top + h + 32} />
            <line x1={480} y1={top + 32} x2={492} y2={top + 32} />
            <line x1={480} y1={top + h + 32} x2={492} y2={top + h + 32} />
            <rect x={504} y={top + h / 2 + 28} width={i === 4 ? 86 : 60} height={5} rx="2.5" fill={i === 4 ? C.accent : C.faint} stroke="none" />
          </g>
        ))}
      </g>
    </g>
  );
}
