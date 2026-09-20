'use client';

import { Ambient, ArtFrame, Beam, C, Chip, Floor, Lines, Node, Panel, Reflection, Stack, useArt } from '../kit';

/**
 * Kurumsal web sitesi maliyeti — soldaki kapsam kalemleri basamakli uc bandi besliyor; band
 * yukseldikce icindeki modul sayisi ve katman derinligi artiyor. Sahnede rakam yok, oran var.
 */
export default function WebsiteCostArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={452} cy={150} r={250} />
      <Floor horizon={316} vx={360} />
      <Reflection cx={470} cy={338} rx={140} ry={12} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  // Uc band: yukseldikce hem boyu hem icerigi artar.
  const tiers = [
    { x: 262, h: 104, modules: 2 },
    { x: 372, h: 162, modules: 4 },
    { x: 482, h: 220, modules: 6 },
  ];
  return (
    <g>
      {/* Kapsam kalemleri */}
      <Panel x={40} y={70} w={176} h={196}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <Chip x={62} y={94 + i * 32} w={90} h={20} hot={i === 0} />
            <Node x={172} y={104 + i * 32} r={3.5} hot={i === 0} />
          </g>
        ))}
        <Lines x={62} y={254} w={90} rows={1} thick={3} />
      </Panel>
      <Beam d="M180 118 C 220 118, 226 168, 252 176" delay={0} faint width={1.2} />
      <Beam d="M180 182 C 214 182, 222 200, 252 204" delay={0.4} width={1.2} />
      <Beam d="M180 246 C 216 246, 226 236, 252 232" delay={0.8} faint width={1.2} />

      {tiers.map((t, i) => {
        const top = 300 - t.h;
        const hot = i === 2;
        return (
          <g key={t.x}>
            <Panel x={t.x} y={top} w={96} h={t.h} hot={hot}>
              {/* Katmanlar: kapsam derinligi */}
              <Stack x={t.x + 14} y={top + 16} w={68} count={t.modules} gap={14} hotIndex={hot ? 0 : -1} />
              <Lines x={t.x + 14} y={top + t.h - 28} w={68} rows={2} gap={9} thick={3} />
            </Panel>
            {hot && <circle cx={t.x + 48} cy={top - 18} r={7} fill={C.hot} filter={`url(#${ids.glow})`} opacity="0.9" />}
          </g>
        );
      })}

      {/* Bandlari birlestiren olcek cizgisi */}
      <path d="M262 196 L358 138 L482 80" fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="4 6" />
      <Node x={310} y={196} r={3.5} />
      <Node x={420} y={138} r={3.5} />
      <Node x={530} y={80} r={4.5} hot />
    </g>
  );
}
