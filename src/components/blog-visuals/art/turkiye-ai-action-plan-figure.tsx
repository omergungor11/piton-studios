'use client';

import { Ambient, ArtFrame, Bars, Beam, Browser, C, Cube, Doc, Gauge, Lines, Node, Panel, Shield, Spark, useArt } from '../kit';

/**
 * Planin dort ekseni solda dort panel: farkindalik (belge + parlayan dugum), kullanim (gosterge +
 * cubuklar), uretim (kup), yonetisim (kalkan). Dort panelden isik cizgileri ortadaki isletme
 * paneline akar; isletmeden sagdaki buyume grafigine yukselen bir cizgi gider.
 */
export default function TurkiyeAiActionPlanFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={330} cy={200} r={250} />
      <Scene />
    </ArtFrame>
  );
}

const ROWS = [30, 120, 210, 300];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Fark Et: farkindalik */}
      <Panel x={28} y={ROWS[0]} w={160} h={74}>
        <Doc x={42} y={ROWS[0] + 10} w={40} h={54} rows={3} />
        <Node x={124} y={ROWS[0] + 37} r={6} hot />
        <Lines x={142} y={ROWS[0] + 30} w={34} rows={2} gap={10} thick={4} />
      </Panel>
      {/* Istifade Et: kullanim */}
      <Panel x={28} y={ROWS[1]} w={160} h={74}>
        <Gauge cx={76} cy={ROWS[1] + 56} r={34} value={0.42} />
        <Bars x={124} y={ROWS[1] + 14} w={52} h={48} values={[0.35, 0.55, 0.8]} hotIndex={2} />
      </Panel>
      {/* Uret: uretim */}
      <Panel x={28} y={ROWS[2]} w={160} h={74}>
        <Cube x={80} y={ROWS[2] + 34} s={34} hot />
        <Lines x={124} y={ROWS[2] + 28} w={52} rows={2} gap={10} thick={4} accentFirst />
      </Panel>
      {/* Yonet: yonetisim */}
      <Panel x={28} y={ROWS[3]} w={160} h={74}>
        <Shield x={80} y={ROWS[3] + 37} s={26} />
        <Lines x={124} y={ROWS[3] + 28} w={52} rows={2} gap={10} thick={4} />
      </Panel>

      {/* Eksenlerden isletmeye */}
      {ROWS.map((y, i) => (
        <Beam key={y} d={`M188 ${y + 37} C 230 ${y + 37}, 232 ${200 + (i - 1.5) * 26}, 262 ${200 + (i - 1.5) * 26}`} delay={i * 0.3} />
      ))}

      {/* Isletme */}
      <rect x={262} y={120} width={168} height={160} rx="12" fill={C.accent} opacity="0.14" filter={`url(#${ids.bloom})`} />
      <Browser x={262} y={120} w={168} h={160} hot>
        <rect x={278} y={154} width={136} height={34} rx="6" fill={C.accent} fillOpacity="0.16" stroke={C.hot} strokeWidth="0.9" />
        <Lines x={290} y={164} w={90} rows={2} gap={9} thick={4} accentFirst />
        <rect x={278} y={200} width={62} height={62} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <rect x={352} y={200} width={62} height={62} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <circle cx={309} cy={231} r="12" fill={C.accent} opacity="0.7" />
        <circle cx={383} cy={231} r="12" fill={C.faint} />
      </Browser>

      {/* Isletmeden buyumeye */}
      <Beam d="M430 200 C 458 200, 462 170, 486 166" delay={1.3} />
      <Panel x={486} y={86} w={126} h={228}>
        <Lines x={500} y={102} w={60} rows={1} thick={5} />
        <Spark x={500} y={124} w={98} h={110} points={[0.08, 0.15, 0.22, 0.38, 0.55, 0.78, 0.95]} />
        <rect x={500} y={250} width={98} height={1} fill={C.line} />
        <Bars x={500} y={260} w={98} h={40} values={[0.3, 0.45, 0.6, 0.85]} hotIndex={3} />
      </Panel>
    </g>
  );
}
