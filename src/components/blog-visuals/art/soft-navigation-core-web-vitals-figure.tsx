'use client';

import { Ambient, ArtFrame, Arrow, Beam, Browser, C, Check, Clock, Lines, Panel, useArt } from '../kit';

/**
 * Klasik olcum ve soft navigation dahil olcum. Ust serit: tarayici + uc gorunum; yalnizca ilk yuklemenin
 * saati var, diger iki gecis kesik cizgili ve olculmuyor. Alt serit: ayni uc gorunum, her birinin kendi saati
 * ve onayi var.
 */
export default function SoftNavigationCoreWebVitalsFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={270} />
      <Scene />
    </ArtFrame>
  );
}

const COLS = [150, 310, 470];
const ROWS = [104, 290];

function View({ x, y, measured, first, hot }: { x: number; y: number; measured: boolean; first: boolean; hot: boolean }) {
  const ids = useArt();
  return (
    <g>
      {measured ? (
        <Panel x={x} y={y - 54} w={130} h={108} hot={hot}>
          <rect x={x + 12} y={y - 42} width={58} height={34} rx="4" fill={hot ? `url(#${ids.panelHot})` : C.faint} stroke={hot ? C.hot : 'none'} strokeWidth="0.8" />
          <Lines x={x + 12} y={y + 4} w={60} rows={3} gap={10} thick={3} accentFirst={hot} />
          <Clock cx={x + 100} cy={y - 14} r={18} hand={first ? 0.3 : 0.12} hot={hot} />
          <circle cx={x + 100} cy={y + 30} r={10} fill={C.bg} stroke={hot ? C.hot : C.line} strokeWidth="0.9" />
          <Check x={x + 101} y={y + 31} s={11} hot={hot} />
        </Panel>
      ) : (
        <g>
          <rect x={x} y={y - 54} width={130} height={108} rx="10" fill="#FFFFFF" fillOpacity="0.02" stroke={C.line} strokeWidth="0.9" strokeDasharray="5 5" />
          <rect x={x + 12} y={y - 42} width={58} height={34} rx="4" fill={C.faint} opacity="0.5" />
          <rect x={x + 12} y={y + 4} width={56} height={4} rx="2" fill={C.faint} opacity="0.5" />
          <rect x={x + 12} y={y + 14} width={44} height={4} rx="2" fill={C.faint} opacity="0.5" />
          <circle cx={x + 100} cy={y - 14} r={18} fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="3 4" />
        </g>
      )}
    </g>
  );
}

function Scene() {
  return (
    <g>
      {ROWS.map((y, r) => (
        <g key={y}>
          <Browser x={20} y={y - 40} w={100} h={80} hot={r === 1}>
            <Lines x={32} y={y - 6} w={70} rows={3} gap={10} thick={3} />
          </Browser>
          <Beam d={`M120 ${y} L ${COLS[0]} ${y}`} delay={r * 0.4} faint={r === 0} />
          {COLS.map((x, i) => (
            <g key={x}>
              <View x={x} y={y} measured={r === 1 || i === 0} first={i === 0} hot={r === 1 && i > 0} />
              {i < COLS.length - 1 && (
                <g>
                  <Beam d={`M${x + 130} ${y} L ${COLS[i + 1]} ${y}`} delay={0.3 + i * 0.3 + r * 0.4} faint={r === 0} />
                  <Arrow x={COLS[i + 1] - 2} y={y} s={7} hot={r === 1} />
                </g>
              )}
            </g>
          ))}
        </g>
      ))}
      <line x1={20} y1={197} x2={620} y2={197} stroke={C.line} strokeWidth="0.8" strokeDasharray="2 6" />
    </g>
  );
}
