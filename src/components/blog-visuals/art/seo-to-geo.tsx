'use client';

import { Ambient, ArtFrame, Beam, C, Chip, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/**
 * Arama gorunurlugunun yapay zeka caginda degismesi — soldaki on sonuc listesi dagilir, parcalari
 * ortadaki sentez halkasindan gecer ve sagda tek bir cevapta toplanir; cevabin altinda kaynak ciplari.
 */
export default function SeoToGeoArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={452} cy={168} r={250} />
      <Floor horizon={310} vx={360} />
      <Reflection cx={452} cy={332} rx={150} ry={13} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  const list = [72, 108, 144, 180, 216, 252];
  return (
    <g>
      {/* Dagilmakta olan sonuc listesi */}
      <g>
        {list.map((y, i) => (
          <g key={y} opacity={1 - i * 0.13}>
            <rect x={44} y={y} width={132 - i * 12} height={8} rx="4" fill={i === 0 ? C.accent : C.faint} />
            <rect x={44} y={y + 14} width={96 - i * 10} height={5} rx="2.5" fill={C.faint} opacity="0.7" />
          </g>
        ))}
        {/* Listenin dagilan parcalari */}
        {[
          { x: 186, y: 96 },
          { x: 202, y: 142 },
          { x: 190, y: 190 },
          { x: 210, y: 232 },
        ].map((p, i) => (
          <rect key={i} x={p.x} y={p.y} width={14 - i * 2} height={5} rx="2.5" fill={C.muted} opacity={0.5 - i * 0.08} transform={`rotate(${-12 + i * 9} ${p.x} ${p.y})`} />
        ))}
      </g>

      {/* Sentez halkasi */}
      <g>
        <circle cx={288} cy={172} r={46} fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="5 7" />
        <circle cx={288} cy={172} r={26} fill={C.accent} opacity="0.2" filter={`url(#${ids.bloom})`} />
        <path
          d="M288 148 C291 162, 298 169, 312 172 C298 175, 291 182, 288 196 C285 182, 278 175, 264 172 C278 169, 285 162, 288 148 Z"
          fill={`url(#${ids.accent})`}
          filter={`url(#${ids.glow})`}
        />
        <circle className="sv-pulse" cx={288} cy={172} r={20} fill="none" stroke={C.hot} strokeWidth="1" />
      </g>
      {list.filter((_, i) => i % 2 === 0).map((y, i) => (
        <Beam key={y} d={`M180 ${y + 4} C 228 ${y + 4}, 238 172, 262 172`} delay={i * 0.4} faint width={1.2} />
      ))}

      {/* Tek cevap + kaynaklar */}
      <g className="sv-float">
        <Panel x={358} y={64} w={242} h={196} hot>
          <Lines x={382} y={92} w={160} rows={2} gap={11} thick={5} accentFirst />
          <rect x={382} y={130} width={194} height={1} fill={C.line} />
          <Lines x={382} y={144} w={190} rows={4} gap={11} thick={4} />
          {/* Kaynak ciplari: alinti verilen siteler */}
          <Chip x={382} y={200} w={72} h={20} hot />
          <Chip x={462} y={200} w={60} h={20} />
          <Chip x={530} y={200} w={46} h={20} />
          <Lines x={382} y={232} w={140} rows={1} thick={3} />
        </Panel>
      </g>
      <Beam d="M334 172 C 344 172, 346 160, 356 160" delay={0.9} />
      <Node x={356} y={160} r={4.5} hot />
      {/* Kaynak cipinden listeye geri dogru olan alinti bagi */}
      <Beam d="M418 266 C 418 292, 140 292, 120 276" delay={1.3} faint width={1.2} />
      <Node x={120} y={276} r={3.5} />
    </g>
  );
}
