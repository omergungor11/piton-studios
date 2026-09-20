'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Clock, Floor, Lines, Node, Panel, Reflection, Split, Stack, useArt } from '../kit';

/**
 * Next.js mi WordPress mi — solda her istegi eklenti kulesi ve veritabani uzerinden dolastiran yol,
 * sagda onceden uretilip kenardan dogrudan servis edilen sayfa.
 */
export default function NextjsVsWordpressArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={456} cy={158} r={240} />
      <Floor horizon={310} vx={340} />
      <Reflection cx={456} cy={332} rx={150} ry={13} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Her istekte yeniden uretim */}
      <Panel x={40} y={52} w={240} h={244}>
        <Node x={70} y={92} r={5} />
        <Beam d="M78 92 C 110 92, 112 108, 130 112" delay={0} faint width={1.2} />
        {/* Eklenti kulesi: egri duran katmanlar */}
        <g transform="translate(130 96) rotate(-3)">
          <Stack x={0} y={0} w={92} count={7} gap={14} skew={3} hotIndex={2} />
        </g>
        {/* Veritabani */}
        <g>
          <ellipse cx={226} cy={196} rx={26} ry={9} fill="#1F1D1C" stroke={C.line} strokeWidth="0.8" />
          <path d="M200 196 v34 a26,9 0 0 0 52,0 v-34" fill="#171615" stroke={C.line} strokeWidth="0.8" />
          <ellipse cx={226} cy={214} rx={26} ry={9} fill="none" stroke={C.line} strokeWidth="0.7" opacity="0.6" />
        </g>
        <Beam d="M222 172 C 236 180, 232 186, 228 188" delay={0.5} faint width={1.2} />
        <Beam d="M200 230 C 150 246, 110 240, 86 232" delay={0.9} faint width={1.2} />
        <Clock cx={80} cy={252} r={22} hand={0.6} />
        <Lines x={56} y={286} w={180} rows={1} thick={3} />
      </Panel>

      <Split x={316} top={62} bottom={296} />

      {/* Onceden uretilmis sayfa, kenardan servis */}
      <Panel x={352} y={52} w={248} h={244} hot>
        {/* Bilesen agaci */}
        <g stroke={C.line} strokeWidth="0.9" fill="none">
          <path d="M392 108 L392 148 M392 128 L424 128 M392 148 L424 148" />
        </g>
        <Node x={392} y={96} r={5} hot />
        <Node x={430} y={128} r={3.5} />
        <Node x={430} y={148} r={3.5} />
        <Node x={392} y={160} r={3.5} />

        {/* Kenar dugumleri */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={480 + i * 40} cy={96} r={12} fill={C.bg2} stroke={i === 1 ? C.accent : C.line} strokeWidth="0.9" />
            <circle cx={480 + i * 40} cy={96} r={4} fill={i === 1 ? C.hot : C.faint} />
          </g>
        ))}
        <Beam d="M404 96 L468 96" delay={0} width={1.3} />
        <Beam d="M520 108 C 520 140, 500 150, 492 158" delay={0.35} width={1.3} />

        <Browser x={398} y={176} w={168} h={104}>
          <rect x={412} y={208} width={68} height={8} rx="4" fill={C.ink} opacity="0.85" />
          <Lines x={412} y={222} w={78} rows={2} gap={9} thick={3} />
          <rect x={500} y={206} width={52} height={52} rx="6" fill={`url(#${ids.accent})`} opacity="0.8" />
          <rect x={412} y={252} width={34} height={12} rx="6" fill={C.accent} />
        </Browser>
        <circle className="sv-pulse" cx={520} cy={96} r={12} fill="none" stroke={C.hot} strokeWidth="1" />
      </Panel>
    </g>
  );
}
