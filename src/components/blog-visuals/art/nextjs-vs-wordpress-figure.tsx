'use client';

import { ArtFrame, Ambient, Beam, C, Clock, Lines, Node, Panel } from '../kit';

/**
 * Istek yolu karsilastirmasi: ustte her ziyaretci icin sunucuda yeniden uretilen sayfa (uzun zincir,
 * veritabani durağı), altta onceden uretilip kenardan dogrudan verilen sayfa (kisa zincir).
 */
export default function NextjsVsWordpressFigure({ label }: { label: string }) {
  const longHops = [64, 172, 280, 388];
  const shortHops = [64, 220];
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={230} />

      {/* Her istekte yeniden uretim */}
      <Panel x={26} y={40} w={588} h={140}>
        {longHops.map((x, i) => (
          <g key={x}>
            <rect x={x} y={96} width={82} height={46} rx="9" fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
            <rect x={x + 16} y={110} width={38} height={5} rx="2.5" fill={C.faint} />
            <rect x={x + 16} y={122} width={24} height={5} rx="2.5" fill={C.faint} />
            {i < 3 && <Beam d={`M${x + 82} 119 L${x + 104} 119`} delay={i * 0.3} faint width={1.2} />}
          </g>
        ))}
        {/* Veritabani duragi */}
        <g>
          <ellipse cx={508} cy={96} rx={26} ry={9} fill="#262322" stroke={C.line} strokeWidth="0.9" />
          <path d="M482 96 v46 a26,9 0 0 0 52,0 v-46" fill="#171615" stroke={C.line} strokeWidth="0.9" />
          <ellipse cx={508} cy={112} rx={26} ry={9} fill="none" stroke={C.line} strokeWidth="0.7" opacity="0.55" />
          <ellipse cx={508} cy={128} rx={26} ry={9} fill="none" stroke={C.line} strokeWidth="0.7" opacity="0.4" />
        </g>
        <Beam d="M470 119 L480 119" delay={0.9} faint width={1.2} />
        <Lines x={64} y={66} w={200} rows={1} thick={4} />
        <Clock cx={578} cy={119} r={24} hand={0.58} />
      </Panel>

      {/* Onceden uretilmis sayfa */}
      <Panel x={26} y={216} w={588} h={140} hot>
        {shortHops.map((x, i) => (
          <g key={x}>
            <rect x={x} y={272} width={82} height={46} rx="9" fill={i === 1 ? C.accent : C.bg2} fillOpacity={i === 1 ? 0.24 : 1} stroke={i === 1 ? C.accent : C.line} strokeWidth={i === 1 ? 1.1 : 0.8} />
            <rect x={x + 16} y={286} width={38} height={5} rx="2.5" fill={i === 1 ? C.hot : C.faint} />
            <rect x={x + 16} y={298} width={24} height={5} rx="2.5" fill={C.faint} />
          </g>
        ))}
        <Beam d="M146 295 L216 295" delay={0} width={1.4} />
        <Beam d="M302 295 L404 295" delay={0.3} width={1.4} />
        {/* Hazir sayfa */}
        <rect x={404} y={262} width={106} height={66} rx="9" fill={C.bg2} stroke={C.accent} strokeWidth="1" />
        <Lines x={418} y={276} w={78} rows={3} gap={11} thick={4} accentFirst />
        <Node x={510} y={295} r={5} hot />
        <Lines x={64} y={242} w={200} rows={1} thick={4} accentFirst />
        <Clock cx={566} cy={295} r={26} hand={0.08} hot />
      </Panel>
    </ArtFrame>
  );
}
