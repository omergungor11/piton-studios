'use client';

import { Ambient, ArtFrame, Beam, C, Check, Chip, Cross, Floor, Lines, Node, Panel, Reflection, Shield, Spark, useArt } from '../kit';

/**
 * Web sitesi bakimi — ortadaki kalkani besleyen surekli isler: guncelleme paketleri, yedek diskleri,
 * kesintisiz izleme cizgisi; yanda suresi dolmus sertifika ve birikmis surum bekleyen site.
 */
export default function WebsiteMaintenanceArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={230} cy={168} r={240} />
      <Floor horizon={310} vx={300} />
      <Reflection cx={230} cy={332} rx={120} ry={12} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Kalkan: surekli bakimin kendisi */}
      <Shield x={230} y={168} s={96} />
      <Check x={230} y={168} s={44} />
      <circle className="sv-pulse" cx={230} cy={168} r={26} fill="none" stroke={C.hot} strokeWidth="1" />

      {/* Guncelleme paketleri kalkana akiyor */}
      {[
        { x: 66, y: 76, d: 'M104 92 C 150 104, 168 116, 182 128' },
        { x: 52, y: 168, d: 'M100 184 C 132 180, 146 176, 158 172' },
        { x: 66, y: 250, d: 'M104 262 C 146 250, 166 236, 180 222' },
      ].map((u, i) => (
        <g key={i}>
          <rect x={u.x} y={u.y} width={48} height={32} rx="7" fill={C.bg2} stroke={i === 0 ? C.accent : C.line} strokeWidth={i === 0 ? 1.1 : 0.8} />
          <rect x={u.x + 12} y={u.y + 10} width={24} height={4} rx="2" fill={i === 0 ? C.hot : C.faint} />
          <rect x={u.x + 12} y={u.y + 19} width={16} height={4} rx="2" fill={C.faint} />
          <Beam d={u.d} delay={i * 0.45} faint width={1.2} />
        </g>
      ))}

      {/* Kesintisiz izleme */}
      <Panel x={352} y={54} w={244} h={110} hot>
        <Spark x={374} y={78} w={200} h={62} points={[0.62, 0.66, 0.6, 0.68, 0.64, 0.66, 0.63]} />
        <Node x={574} y={100} r={4.5} hot />
        <Lines x={374} y={148} w={140} rows={1} thick={3} />
      </Panel>

      {/* Yedekler */}
      <Panel x={352} y={180} w={116} h={116}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <ellipse cx={410} cy={216 + i * 26} rx={34} ry={11} fill={i === 0 ? C.accent : '#1F1D1C'} fillOpacity={i === 0 ? 0.5 : 1} stroke={C.line} strokeWidth="0.8" />
          </g>
        ))}
        <Lines x={376} y={282} w={68} rows={1} thick={3} />
      </Panel>

      {/* Ertelenen is: suresi dolan sertifika, bekleyen surumler */}
      <Panel x={484} y={180} w={112} h={116}>
        <rect x={506} y={204} width={68} height={44} rx="8" fill="#FFFFFF" fillOpacity="0.04" stroke={C.muted} strokeWidth="0.9" strokeDasharray="5 5" />
        <path d="M526 226 a14,14 0 0 1 28,0" fill="none" stroke={C.muted} strokeWidth="1.4" />
        <Cross x={540} y={226} s={18} />
        <Chip x={506} y={258} w={68} h={18} />
        <circle cx={588} cy={196} r={10} fill={C.accent} opacity="0.3" filter={`url(#${ids.glow})`} />
      </Panel>
    </g>
  );
}
