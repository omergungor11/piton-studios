'use client';

import { ArtFrame, Ambient, C, Chip, Lines, Node, Panel, useArt } from '../kit';

/**
 * Acilis sayfasi anatomisi: kesme cizgisinin ustunde vaat, kanit ve form; altinda detay, sik sorulanlar
 * ve eylemin tekrari. Sag kenardaki isaretler kesme cizgisini ve tekrarlanan eylemi gosterir.
 */
export default function B2bLandingFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={300} cy={150} r={230} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      <Panel x={56} y={24} w={404} h={352}>
        {/* Vaat */}
        <rect x={82} y={52} width={200} height={14} rx="7" fill={C.ink} opacity="0.9" />
        <rect x={82} y={74} width={148} height={14} rx="7" fill={C.ink} opacity="0.5" />
        <Lines x={82} y={100} w={180} rows={2} gap={11} thick={4} />
        {/* Form: ilk ekranda */}
        <rect x={304} y={48} width={132} height={140} rx="10" fill={C.bg2} stroke={C.accent} strokeWidth="1" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={316} y={62 + i * 30} width={108} height={22} rx="5" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.7" />
        ))}
        <rect x={316} y={152} width={108} height={24} rx="6" fill={C.accent} />
        {/* Kanit */}
        <Chip x={82} y={136} w={56} h={18} hot />
        <Chip x={146} y={136} w={56} h={18} />
        <Chip x={210} y={136} w={56} h={18} />
        <rect x={82} y={168} width={184} height={54} rx="8" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.7" />
        <circle cx={106} cy={195} r={12} fill={C.faint} />
        <Lines x={126} y={186} w={128} rows={2} gap={10} thick={4} />

        {/* Kesme cizgisi */}
        <line x1={56} y1={238} x2={460} y2={238} stroke={C.hot} strokeWidth="1.2" strokeDasharray="6 6" opacity="0.8" />

        {/* Kesme cizgisinin altinda: detay, sss, eylemin tekrari */}
        <Lines x={82} y={258} w={230} rows={3} gap={12} thick={4} />
        {[0, 1].map((i) => (
          <rect key={i} x={82} y={302 + i * 26} width={296} height={18} rx="5" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.7" />
        ))}
        <rect x={82} y={352} width={112} height={22} rx="8" fill={C.accent} opacity="0.9" />
      </Panel>

      {/* Kenar isaretleri */}
      <g>
        <Node x={492} y={118} r={5} hot />
        <Lines x={506} y={116} w={92} rows={1} thick={4} accentFirst />
        <Node x={492} y={238} r={4} />
        <Lines x={506} y={236} w={72} rows={1} thick={4} />
        <Node x={492} y={362} r={4} hot />
        <Lines x={506} y={360} w={82} rows={1} thick={4} />
        <line x1={492} y1={126} x2={492} y2={230} stroke={C.line} strokeWidth="0.9" strokeDasharray="4 5" />
        <line x1={492} y1={246} x2={492} y2={354} stroke={C.line} strokeWidth="0.9" strokeDasharray="4 5" />
        <circle cx={492} cy={118} r={13} fill="none" stroke={C.accent} strokeWidth="0.9" opacity="0.6" filter={`url(#${ids.glow})`} />
      </g>
    </g>
  );
}
