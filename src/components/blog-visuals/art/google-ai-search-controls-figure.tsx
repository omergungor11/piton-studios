'use client';

import { Ambient, ArtFrame, Beam, C, Check, Chip, Cube, Doc, Lines, Node, Panel, useArt } from '../kit';

/**
 * Uc ayri yol semasi: soldaki site uc hedefe dallanir. Ustte klasik sonuclara giden yol her zaman
 * acik; ortada yapay zeka cevabina giden yol bir anahtardan gecer (Search Console ayari); altta model
 * egitimine giden yol ayri bir anahtara baglidir.
 */
export default function GoogleAiSearchControlsFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={330} cy={200} r={230} />
      <Scene />
    </ArtFrame>
  );
}

function Switch({ x, y, on, hot = false }: { x: number; y: number; on: boolean; hot?: boolean }) {
  const ids = useArt();
  const w = 58;
  const h = 28;
  const kx = on ? x + w - h / 2 : x + h / 2;
  return (
    <g>
      <rect x={x} y={y - h / 2} width={w} height={h} rx={h / 2} fill={hot ? C.accent : C.bg2} fillOpacity={hot ? 0.3 : 1} stroke={hot ? C.hot : C.line} strokeWidth={hot ? 1.2 : 0.9} />
      <circle cx={kx} cy={y} r={h / 2 - 4} fill={hot ? `url(#${ids.accent})` : '#2A2826'} stroke={hot ? C.hot : C.line} strokeWidth="0.9" filter={hot ? `url(#${ids.glow})` : undefined} />
    </g>
  );
}

function Scene() {
  const lanes = { top: 84, mid: 200, bottom: 316 };
  return (
    <g>
      {/* Kaynak site */}
      <Panel x={30} y={140} w={116} h={120}>
        <Doc x={56} y={158} w={64} h={84} hot rows={4} />
      </Panel>

      {/* Ust yol: klasik sonuclar, her zaman acik */}
      <Beam d={`M146 200 C 190 200, 196 ${lanes.top}, 250 ${lanes.top}`} delay={0} width={1.3} />
      <Beam d={`M250 ${lanes.top} L420 ${lanes.top}`} delay={0.3} width={1.3} />
      <Check x={330} y={lanes.top} s={18} hot={false} />
      <Panel x={420} y={40} w={190} h={88}>
        {[58, 82, 106].map((y, i) => (
          <g key={y}>
            <rect x={438} y={y} width={110 - i * 12} height={6} rx="3" fill={C.faint} />
            <rect x={438} y={y + 10} width={150 - i * 18} height={4} rx="2" fill={C.faint} opacity="0.7" />
          </g>
        ))}
      </Panel>

      {/* Orta yol: yapay zeka cevabi, anahtardan gecer */}
      <Beam d={`M146 200 L272 ${lanes.mid}`} delay={0.2} />
      <Switch x={272} y={lanes.mid} on hot />
      <Beam d={`M330 ${lanes.mid} L420 ${lanes.mid}`} delay={0.5} />
      <Panel x={420} y={152} w={190} h={96} hot>
        <Lines x={438} y={170} w={130} rows={3} gap={10} thick={4} accentFirst />
        <Chip x={438} y={212} w={56} h={18} hot />
        <Chip x={500} y={212} w={46} h={18} />
      </Panel>
      <Node x={420} y={lanes.mid} r={4} hot />

      {/* Alt yol: model egitimi, ayri anahtar */}
      <Beam d={`M146 200 C 190 200, 196 ${lanes.bottom}, 250 ${lanes.bottom}`} delay={0.4} faint width={1.2} />
      <Switch x={250} y={lanes.bottom} on={false} />
      <line x1={308} y1={lanes.bottom} x2={420} y2={lanes.bottom} stroke={C.line} strokeWidth="1" strokeDasharray="4 6" />
      <Panel x={420} y={272} w={190} h={88}>
        <Cube x={472} y={306} s={30} />
        <Cube x={530} y={300} s={24} />
        <Lines x={448} y={340} w={120} rows={1} thick={4} />
      </Panel>
    </g>
  );
}
