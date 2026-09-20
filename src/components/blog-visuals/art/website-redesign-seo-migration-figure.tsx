'use client';

import { ArtFrame, Ambient, Arrow, Beam, C, Cross, Lines, Node, Panel } from '../kit';

/**
 * Yonlendirme haritasi semasi: soldaki eski adresler sagdaki yeni adreslere baglanir. Ucuncu satirda
 * iki eski adres tek yeni adreste birlesir, son satirda karsiligi olmayan adres isaretlenir.
 */
export default function RedesignMigrationFigure({ label }: { label: string }) {
  const oldRows = [56, 128, 196, 264, 324];
  const newRows = [64, 140, 232, 308];
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={230} />

      <Panel x={26} y={32} w={196} h={336}>
        {oldRows.map((y, i) => (
          <g key={y}>
            <rect x={48} y={y} width={152} height={34} rx="7" fill="#FFFFFF" fillOpacity="0.04" stroke={i === 4 ? C.muted : C.line} strokeWidth="0.8" strokeDasharray={i === 4 ? '5 5' : undefined} />
            <Lines x={62} y={y + 14} w={110} rows={1} thick={5} />
          </g>
        ))}
      </Panel>

      <Panel x={418} y={32} w={196} h={336} hot>
        {newRows.map((y, i) => (
          <g key={y}>
            <rect x={438} y={y} width={152} height={34} rx="7" fill={i === 0 ? C.accent : '#FFFFFF'} fillOpacity={i === 0 ? 0.24 : 0.05} stroke={i === 0 ? C.accent : C.line} strokeWidth="0.8" />
            <Lines x={452} y={y + 14} w={110} rows={1} thick={5} accentFirst={i === 0} />
          </g>
        ))}
      </Panel>

      {/* Bire bir esleme */}
      <Beam d="M200 73 C 300 73, 320 81, 414 81" delay={0} width={1.3} />
      <Arrow x={414} y={81} angle={4} />
      <Beam d="M200 145 C 300 145, 320 157, 414 157" delay={0.35} width={1.3} />
      <Arrow x={414} y={157} angle={5} />

      {/* Iki eski adres tek yeni adreste birlesir */}
      <Beam d="M200 213 C 300 213, 320 245, 414 249" delay={0.7} faint width={1.2} />
      <Beam d="M200 281 C 300 281, 320 253, 414 249" delay={1} faint width={1.2} />
      <Arrow x={414} y={249} angle={0} />
      <Node x={320} y={249} r={4} hot />

      {/* Karsiligi olmayan adres */}
      <path d="M200 341 C 260 341, 280 335, 316 333" fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="5 6" />
      <Cross x={330} y={333} s={18} />
    </ArtFrame>
  );
}
