'use client';

import { Ambient, ArtFrame, Beam, Bubble, C, Chip, Clock, Floor, Lines, Node, Panel, Phone, Reflection, useArt } from '../kit';

/**
 * WhatsApp Business API — musterinin sohbeti solda; sagda mesaji karsilayan servis, onayli sablon
 * karti, arka sistemlere giden baglar ve yanit penceresini gosteren saat.
 */
export default function WhatsappBusinessApiArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={400} cy={160} r={250} />
      <Floor horizon={312} vx={320} />
      <Reflection cx={180} cy={334} rx={100} ry={12} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Musterinin sohbeti */}
      <Phone x={46} y={46} w={188} h={254} hot>
        <Bubble x={62} y={86} w={116} h={40} side="left" rows={2} />
        <Bubble x={104} y={146} w={116} h={40} side="right" hot rows={2} />
        <Bubble x={62} y={206} w={96} h={32} side="left" rows={1} />
        <rect x={62} y={258} width={158} height={24} rx="12" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.7" />
        <circle cx={206} cy={270} r="8" fill={C.accent} />
      </Phone>

      <Beam d="M242 160 C 268 160, 272 148, 290 146" delay={0} />
      <Node x={290} y={146} r={5} hot />

      {/* Servis: gelen mesaj → kurallar → sistemler */}
      <Panel x={306} y={46} w={294} h={166} hot>
        <Lines x={326} y={70} w={120} rows={2} gap={10} thick={4} accentFirst />
        {/* Onayli sablon karti */}
        <rect x={326} y={104} width={130} height={84} rx="8" fill={C.bg2} stroke={C.accent} strokeWidth="1" />
        <Lines x={338} y={118} w={104} rows={3} gap={10} thick={4} />
        <Chip x={338} y={158} w={52} h={18} hot />
        <Chip x={396} y={158} w={46} h={18} />
        {/* Arka sistemler */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={506} y={76 + i * 44} width={72} height={32} rx="7" fill="#FFFFFF" fillOpacity="0.05" stroke={i === 1 ? C.accent : C.line} strokeWidth="0.8" />
            <rect x={518} y={88 + i * 44} width={30} height={5} rx="2.5" fill={i === 1 ? C.hot : C.faint} />
            <Beam d={`M466 146 C 488 146, 486 ${92 + i * 44}, 502 ${92 + i * 44}`} delay={i * 0.4} faint width={1.2} />
          </g>
        ))}
        <circle cx={476} cy={146} r={44} fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
      </Panel>

      {/* Yanit penceresi ve toplu gonderim */}
      <Panel x={306} y={228} w={294} h={92}>
        <Clock cx={348} cy={274} r={26} hand={0.75} hot />
        <Beam d="M382 274 L432 274" delay={0.3} width={1.3} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={448 + i * 34} y={256} width={26} height={36} rx="6" fill={C.bg2} stroke={i === 0 ? C.accent : C.line} strokeWidth="0.8" />
            <rect x={454 + i * 34} y={266} width={14} height={4} rx="2" fill={i === 0 ? C.hot : C.faint} />
            <rect x={454 + i * 34} y={276} width={10} height={4} rx="2" fill={C.faint} />
          </g>
        ))}
      </Panel>
    </g>
  );
}
