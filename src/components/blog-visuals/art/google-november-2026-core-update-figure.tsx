'use client';

import { Ambient, ArtFrame, Arrow, Beam, C, Clock, Cross, Doc, Panel, Spark, useArt } from '../kit';

/**
 * Core update sonrasi onerilen sira, soldan saga: yayilma donemi (kesik, dalgali siralama cizgisi + saat),
 * bir haftalik bekleme (yedi gun karesi), Search Console grafigi + buyutecle analiz, iyilestirme belgesi +
 * yukselen cizgi. Altta yayilmadan analize uzanan, carpiyla kesilmis "hemen degistir" kisayolu.
 */
export default function GoogleNovember2026CoreUpdateFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={180} r={280} />
      <Scene />
    </ArtFrame>
  );
}

const Y = 70;
const PH = 150;
const STAGES = [20, 176, 332, 488];
const PW = 132;

function Scene() {
  const ids = useArt();
  const mid = Y + PH / 2;
  return (
    <g>
      {/* 1. Yayilma: dalgali, kesik siralama cizgisi + saat */}
      <Panel x={STAGES[0]} y={Y} w={PW} h={PH}>
        <path
          className="sv-flow"
          d={`M${STAGES[0] + 14} ${Y + 104} C ${STAGES[0] + 34} ${Y + 70}, ${STAGES[0] + 50} ${Y + 132}, ${STAGES[0] + 70} ${Y + 100} S ${STAGES[0] + 104} ${Y + 76}, ${STAGES[0] + 118} ${Y + 110}`}
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />
        <Clock cx={STAGES[0] + 66} cy={Y + 40} r={22} hand={0.36} hot />
      </Panel>

      {/* 2. Bir hafta bekle: yedi gun */}
      <Panel x={STAGES[1]} y={Y} w={PW} h={PH}>
        <rect x={STAGES[1] + 14} y={Y + 18} width={PW - 28} height={10} rx="3" fill={C.faint} />
        {Array.from({ length: 7 }, (_, i) => (
          <rect
            key={i}
            x={STAGES[1] + 14 + (i % 4) * 27}
            y={Y + 44 + Math.floor(i / 4) * 30}
            width={22}
            height={22}
            rx="4"
            fill={i === 6 ? `url(#${ids.panelHot})` : C.bg}
            stroke={i === 6 ? C.hot : C.line}
            strokeWidth="0.9"
          />
        ))}
        <Clock cx={STAGES[1] + 104} cy={Y + 120} r={14} hand={0.12} />
      </Panel>

      {/* 3. Analiz: Search Console grafigi + buyutec */}
      <Panel x={STAGES[2]} y={Y} w={PW} h={PH}>
        <line x1={STAGES[2] + 14} y1={Y + 116} x2={STAGES[2] + PW - 14} y2={Y + 116} stroke={C.line} strokeWidth="0.8" />
        <Spark x={STAGES[2] + 14} y={Y + 26} w={PW - 28} h={86} points={[0.72, 0.7, 0.74, 0.5, 0.44, 0.46, 0.4]} />
        <circle className="sv-pulse" cx={STAGES[2] + 88} cy={Y + 76} r={22} fill="none" stroke={C.hot} strokeWidth="1.6" />
        <circle cx={STAGES[2] + 88} cy={Y + 76} r={19} fill={C.hot} opacity="0.08" />
        <line x1={STAGES[2] + 104} y1={Y + 92} x2={STAGES[2] + 120} y2={Y + 110} stroke={C.hot} strokeWidth="3" strokeLinecap="round" />
      </Panel>

      {/* 4. Iyilestir: belge + yukselen cizgi */}
      <rect x={STAGES[3]} y={Y} width={PW} height={PH} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Panel x={STAGES[3]} y={Y} w={PW} h={PH} hot>
        <Doc x={STAGES[3] + 14} y={Y + 18} w={52} h={68} rows={4} hot />
        <Spark x={STAGES[3] + 14} y={Y + 96} w={PW - 28} h={40} points={[0.1, 0.18, 0.16, 0.36, 0.5, 0.7, 0.9]} />
        <g className="sv-float">
          <rect x={STAGES[3] + 78} y={Y + 26} width={40} height={8} rx="4" fill={C.hot} opacity="0.8" />
          <rect x={STAGES[3] + 78} y={Y + 42} width={30} height={6} rx="3" fill={C.faint} />
          <rect x={STAGES[3] + 78} y={Y + 56} width={36} height={6} rx="3" fill={C.faint} />
        </g>
      </Panel>

      {/* Siradaki adim oklari */}
      {STAGES.slice(0, 3).map((x, i) => (
        <g key={x}>
          <Beam d={`M${x + PW} ${mid} L ${STAGES[i + 1] - 4} ${mid}`} delay={0.3 + i * 0.35} />
          <Arrow x={STAGES[i + 1] - 4} y={mid} s={7} />
        </g>
      ))}

      {/* Zaman ekseni */}
      <line x1={20} y1={252} x2={620} y2={252} stroke={C.line} strokeWidth="0.9" />
      {STAGES.map((x) => (
        <circle key={x} cx={x + PW / 2} cy={252} r={4} fill={C.bg} stroke={C.muted} strokeWidth="1" />
      ))}

      {/* Kisayol: yayilma sirasinda hemen degistir -> carpi */}
      <path
        d={`M${STAGES[0] + PW / 2} ${Y + PH} L ${STAGES[0] + PW / 2} 320 L ${STAGES[2] + PW / 2} 320 L ${STAGES[2] + PW / 2} ${Y + PH}`}
        fill="none"
        stroke={C.line}
        strokeWidth="1.2"
        strokeDasharray="4 5"
      />
      <circle cx={(STAGES[0] + STAGES[2]) / 2 + PW / 2} cy={320} r={15} fill={C.bg} stroke={C.line} strokeWidth="0.9" />
      <Cross x={(STAGES[0] + STAGES[2]) / 2 + PW / 2} y={320} s={14} />
    </g>
  );
}
