'use client';

import { Ambient, ArtFrame, Beam, C, Cube, Floor, Gauge, Lines, Node, Panel, Phone, Reflection, useArt } from '../kit';

/**
 * Hizli web sitesi — solda performans gostergesi, ortada agirligi kucuk parcalara bolunmus yuk,
 * sagda ilk boyamada icerigi dolu gelen ekran; altta kisalan istek seridi.
 */
export default function FastWebsiteArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={190} cy={150} r={240} />
      <Floor horizon={308} vx={320} />
      <Reflection cx={190} cy={330} rx={130} ry={12} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Performans gostergesi */}
      <g className="sv-float">
        <Panel x={48} y={74} w={228} h={166} hot>
          <Gauge cx={162} cy={186} r={68} value={0.88} />
          <circle className="sv-pulse" cx={162} cy={186} r={10} fill="none" stroke={C.hot} strokeWidth="1" />
        </Panel>
      </g>

      {/* Agir tek paket, kucuk parcalara boluniyor */}
      <g opacity="0.65">
        <Cube x={330} y={130} s={52} />
      </g>
      <Beam d="M366 116 C 404 104, 416 110, 436 104" delay={0} width={1.3} />
      <Beam d="M366 130 C 404 134, 420 140, 440 140" delay={0.35} width={1.3} />
      <Beam d="M362 146 C 398 166, 412 172, 434 176" delay={0.7} width={1.3} />
      <Cube x={452} y={100} s={22} hot />
      <Cube x={456} y={144} s={20} />
      <Cube x={450} y={186} s={18} />

      {/* Ilk boyamada dolu ekran */}
      <Phone x={510} y={58} w={98} h={196} hot>
        <rect x={522} y={82} width={74} height={44} rx="6" fill={`url(#${ids.accent})`} opacity="0.85" />
        <Lines x={522} y={138} w={68} rows={4} gap={11} thick={4} />
        <rect x={522} y={196} width={46} height={16} rx="8" fill={C.accent} />
        <rect x={522} y={224} width={74} height={18} rx="4" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.7" />
      </Phone>
      <Node x={506} y={156} r={4} hot />

      {/* Istek seridi: once uzun ve sirali, sonra kisa ve paralel */}
      <Panel x={48} y={252} w={412} h={72}>
        {[
          { y: 268, w: 150, hot: true },
          { y: 284, w: 96, hot: false },
          { y: 300, w: 64, hot: false },
        ].map((r, i) => (
          <g key={i}>
            <rect x={70 + i * 26} y={r.y} width={r.w} height={9} rx="4.5" fill={r.hot ? C.accent : C.faint} />
            <rect x={70 + i * 26 + r.w + 6} y={r.y + 2} width={5} height={5} rx="2.5" fill={C.muted} opacity="0.6" />
          </g>
        ))}
        <line x1={70} y1={260} x2={70} y2={314} stroke={C.line} strokeWidth="0.9" />
        <line x1={278} y1={260} x2={278} y2={314} stroke={C.hot} strokeWidth="1" strokeDasharray="3 4" opacity="0.8" />
        <Lines x={300} y={276} w={140} rows={2} gap={12} thick={4} />
      </Panel>
    </g>
  );
}
