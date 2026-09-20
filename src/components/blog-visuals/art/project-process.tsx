'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Check, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/**
 * Kurumsal web projesi sureci — soldan saga ilerleyen rayda asamalar; her asamada teslimat karti
 * biraz daha netlesir (kaba taslak → tasarim → gelistirme → yayin) ve aralarinda onay kapilari var.
 */
export default function ProjectProcessArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={470} cy={160} r={250} />
      <Floor horizon={314} vx={420} />
      <Reflection cx={470} cy={336} rx={160} ry={12} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  const stops = [88, 216, 344, 472];
  return (
    <g>
      {/* Ray */}
      <line x1={56} y1={232} x2={600} y2={232} stroke={C.line} strokeWidth="1" />
      <Beam d="M56 232 L600 232" delay={0} width={1.4} />

      {stops.map((x, i) => (
        <g key={x}>
          <Node x={x} y={232} r={i === 3 ? 6 : 5} hot={i === 3} />
          {/* Asama numarasi yerine kalinlik artan isaret cizgisi */}
          <rect x={x - 18} y={250} width={36 + i * 8} height={4} rx="2" fill={i === 3 ? C.accent : C.faint} />
          <Lines x={x - 18} y={264} w={62} rows={2} gap={9} thick={3} />
          {/* Onay kapisi */}
          {i < 3 && (
            <g>
              <circle cx={x + 64} cy={232} r={12} fill={C.bg} stroke={C.line} strokeWidth="0.9" />
              <Check x={x + 64} y={232} s={13} hot={false} />
            </g>
          )}
        </g>
      ))}

      {/* Teslimatlar: netlesen dort adim */}
      <Panel x={46} y={72} w={96} h={124}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={60} y={92 + i * 24} width={i === 1 ? 44 : 68} height={14} rx="3" fill="none" stroke={C.line} strokeWidth="0.8" strokeDasharray="4 4" />
        ))}
      </Panel>

      <Panel x={172} y={64} w={96} h={132}>
        <rect x={186} y={82} width={68} height={34} rx="5" fill={C.faint} />
        <Lines x={186} y={126} w={68} rows={3} gap={10} thick={4} />
        <rect x={186} y={170} width={34} height={12} rx="6" fill={C.accent} opacity="0.55" />
      </Panel>

      <Panel x={298} y={58} w={96} h={138}>
        <Lines x={312} y={78} w={70} rows={7} gap={11} thick={4} accentFirst />
        <rect x={312} y={78} width={4} height={90} rx="2" fill={C.accent} opacity="0.5" />
      </Panel>

      <g className="sv-float">
        <Browser x={412} y={44} w={176} h={152} hot>
          <rect x={428} y={78} width={78} height={9} rx="4.5" fill={C.ink} opacity="0.9" />
          <Lines x={428} y={94} w={88} rows={2} gap={9} thick={3} />
          <rect x={428} y={126} width={40} height={14} rx="7" fill={C.accent} />
          <rect x={508} y={76} width={66} height={64} rx="6" fill={`url(#${ids.accent})`} opacity="0.8" />
          <Lines x={428} y={158} w={146} rows={2} gap={10} thick={3} />
        </Browser>
      </g>

      {/* Teslimatlardan raya baglar */}
      {stops.map((x, i) => (
        <Beam key={x} d={`M${x} ${[196, 196, 196, 196][i]} L${x} 224`} delay={i * 0.4} faint width={1.2} />
      ))}
    </g>
  );
}
