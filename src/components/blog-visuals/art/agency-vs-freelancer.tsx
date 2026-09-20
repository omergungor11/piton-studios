'use client';

import { Ambient, Arrow, ArtFrame, Beam, C, Chip, Floor, Node, Panel, Reflection, Split, useArt } from '../kit';

/**
 * Ajans mi freelancer mi — solda tek kisiye yiğilan isler (her sey tek dugumden geciyor),
 * sagda rolleri dagitilmis ekip: isler paralel akiyor, merkezde ortak proje karti.
 */
export default function AgencyVsFreelancerArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={452} cy={170} r={240} />
      <Floor horizon={306} vx={360} />
      <Reflection cx={452} cy={330} rx={150} ry={13} opacity={0.4} />
      <Reflection cx={160} cy={330} rx={90} ry={9} opacity={0.18} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  // Tek kisiye gelen isler: hepsi ayni dugumde sirada bekliyor.
  const queue = [86, 120, 154, 188, 222];
  return (
    <g>
      {/* Sol: tek dugum, darboğaz */}
      <Panel x={44} y={58} w={228} h={222}>
        {queue.map((y, i) => (
          <g key={y}>
            <Chip x={60} y={y - 10} w={70} h={20} />
            <Beam d={`M132 ${y} C 164 ${y}, 168 178, 196 178`} delay={i * 0.35} faint width={1.2} />
          </g>
        ))}
        <Node x={200} y={178} r={7} hot />
        {/* Tek cikis: kuyrugun tamami buradan geciyor */}
        <Beam d="M208 178 L256 178" delay={0.2} />
        <Arrow x={258} y={178} angle={0} />
      </Panel>

      <Split x={314} top={62} bottom={296} />

      {/* Sag: rolleri dagitilmis ekip */}
      <Panel x={356} y={58} w={238} h={222} hot>
        {/* Ortak proje karti */}
        <rect x={438} y={148} width={74} height={62} rx="8" fill={`url(#${ids.accent})`} opacity="0.85" />
        <rect x={450} y={164} width={50} height={5} rx="2.5" fill={C.bg} opacity="0.7" />
        <rect x={450} y={176} width={34} height={5} rx="2.5" fill={C.bg} opacity="0.5" />
        <rect x={450} y={188} width={42} height={5} rx="2.5" fill={C.bg} opacity="0.5" />

        {/* Roller: proje kartinin cevresinde, her biri kendi isini paralel yurutuyor */}
        {[
          { x: 392, y: 96 },
          { x: 558, y: 96 },
          { x: 392, y: 246 },
          { x: 558, y: 246 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={17} fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
            <circle cx={p.x} cy={p.y - 4} r={5.5} fill={i === 0 ? C.hot : C.muted} />
            <path
              d={`M${p.x - 9},${p.y + 12} a9,9 0 0 1 18,0 Z`}
              fill={i === 0 ? C.accent : C.faint}
            />
          </g>
        ))}
        <Beam d="M404 110 C 428 132, 440 148, 452 156" delay={0} width={1.3} />
        <Beam d="M546 110 C 522 132, 510 148, 498 156" delay={0.3} width={1.3} />
        <Beam d="M404 232 C 428 214, 440 204, 452 200" delay={0.6} width={1.3} />
        <Beam d="M546 232 C 522 214, 510 204, 498 200" delay={0.9} width={1.3} />
        <Node x={475} y={124} r={4} />
      </Panel>
    </g>
  );
}
