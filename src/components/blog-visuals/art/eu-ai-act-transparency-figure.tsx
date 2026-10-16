'use client';

import { Ambient, ArtFrame, Arrow, Beam, Bubble, C, Check, Chip, Doc, Lines, Panel, useArt } from '../kit';

/**
 * Uc icerik turu, uc yol. Ustte sohbet penceresi kullaniciya ulasir; ilk balonun yaninda aciklama
 * rozeti var. Ortada uretilmis gercekci gorsel, yayina cikmadan once ustune etiket alir. Altta metin
 * insan onayindan (onay isareti) gecer ve etiket duragini atlayip dogrudan yayina gider.
 */
export default function EuAiActTransparencyFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={330} cy={200} r={240} />
      <Scene />
    </ArtFrame>
  );
}

/** Uretilmis gorsel: dag silueti ve gunes. */
function Picture({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const ids = useArt();
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.9" />
      <circle cx={x + w * 0.72} cy={y + h * 0.32} r={h * 0.12} fill={C.accent} opacity="0.7" />
      <path d={`M${x + 6},${y + h - 6} L${x + w * 0.38},${y + h * 0.42} L${x + w * 0.6},${y + h * 0.7} L${x + w * 0.74},${y + h * 0.56} L${x + w - 6},${y + h - 6} Z`} fill={C.faint} opacity="0.8" />
    </g>
  );
}

/** Kullanici / yayin hedefi: yuvarlak ikon. */
function Person({ x, y, hot = false }: { x: number; y: number; hot?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill={C.bg2} stroke={hot ? C.accent : C.line} strokeWidth="1" />
      <circle cx={x} cy={y - 5} r={6} fill={hot ? C.hot : C.muted} />
      <path d={`M${x - 11},${y + 13} a11,9 0 0 1 22,0`} fill={hot ? C.hot : C.muted} />
    </g>
  );
}

function Scene() {
  const lanes = { top: 80, mid: 200, bottom: 320 };
  return (
    <g>
      {/* Ust yol: sohbet → kullanici */}
      <Panel x={30} y={34} w={220} h={92} hot>
        <Bubble x={46} y={50} w={110} h={30} side="left" hot rows={1} />
        <Chip x={164} y={55} w={70} h={20} hot />
        <Bubble x={110} y={94} w={110} h={22} side="right" rows={1} />
      </Panel>
      <Beam d={`M250 ${lanes.top} L540 ${lanes.top}`} delay={0} width={1.4} />
      <Arrow x={540} y={lanes.top} />
      <Person x={578} y={lanes.top} hot />

      {/* Orta yol: gorsel → etiket duragi → yayin */}
      <Panel x={30} y={156} w={220} h={88}>
        <Picture x={50} y={170} w={92} h={60} />
        <Lines x={156} y={182} w={74} rows={3} gap={10} thick={4} />
      </Panel>
      <Beam d={`M250 ${lanes.mid} L340 ${lanes.mid}`} delay={0.3} />
      <Panel x={340} y={164} w={120} h={72} hot>
        <Picture x={356} y={176} w={88} h={48} />
        <Chip x={366} y={168} w={68} h={18} hot />
      </Panel>
      <Beam d={`M460 ${lanes.mid} L540 ${lanes.mid}`} delay={0.6} />
      <Arrow x={540} y={lanes.mid} />
      <Person x={578} y={lanes.mid} />

      {/* Alt yol: metin → insan onayi → etiket duragini atlar */}
      <Panel x={30} y={276} w={220} h={88}>
        <Doc x={52} y={286} w={54} h={68} rows={4} />
        <Lines x={124} y={300} w={104} rows={3} gap={11} thick={4} />
      </Panel>
      <Beam d={`M250 ${lanes.bottom} L300 ${lanes.bottom}`} delay={0.2} width={1.3} />
      <circle className="sv-pulse" cx={318} cy={lanes.bottom} r={22} fill="none" stroke={C.hot} strokeWidth="1" />
      <circle cx={318} cy={lanes.bottom} r={18} fill={C.bg} stroke={C.accent} strokeWidth="1.2" />
      <Check x={320} y={lanes.bottom} s={18} />
      {/* atlanan etiket duragi */}
      <rect x={358} y={lanes.bottom - 22} width={84} height={44} rx="8" fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="4 5" />
      <Beam d={`M336 ${lanes.bottom} C 370 ${lanes.bottom - 46}, 430 ${lanes.bottom - 46}, 464 ${lanes.bottom}`} delay={0.5} width={1.3} />
      <Beam d={`M464 ${lanes.bottom} L540 ${lanes.bottom}`} delay={0.8} width={1.3} />
      <Arrow x={540} y={lanes.bottom} />
      <Person x={578} y={lanes.bottom} />
    </g>
  );
}
