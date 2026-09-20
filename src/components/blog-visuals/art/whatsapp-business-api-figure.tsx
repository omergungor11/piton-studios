'use client';

import { ArtFrame, Ambient, Arrow, Beam, Bubble, C, Check, Chip, Clock, Lines, Node, Panel } from '../kit';

/**
 * Mesaj yasam dongusu semasi: onaylanmis sablonla baslatilan gonderim → iletim → okundu bilgisi;
 * musterinin yaniti serbest yazisma penceresini acar, pencere kapaninca yine sablona donulur.
 */
export default function WhatsappApiFigure({ label }: { label: string }) {
  const states = [96, 232, 368, 504];
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={160} r={230} />

      <Panel x={26} y={40} w={588} h={140} hot>
        {states.map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={110} r={26} fill={C.bg2} stroke={i === 3 ? C.accent : C.line} strokeWidth={i === 3 ? 1.2 : 0.9} />
            {i === 0 && <Check x={x} y={110} s={17} hot={false} />}
            {i === 1 && (
              <>
                <Check x={x - 6} y={110} s={17} hot={false} />
                <Check x={x + 7} y={110} s={17} hot={false} />
              </>
            )}
            {i === 2 && (
              <>
                <Check x={x - 6} y={110} s={17} />
                <Check x={x + 7} y={110} s={17} />
              </>
            )}
            {/* Musterinin yaniti: durum degil, gelen mesaj */}
            {i === 3 && (
              <g>
                <rect x={x - 14} y={100} width={28} height={16} rx="6" fill={C.accent} fillOpacity="0.3" stroke={C.accent} strokeWidth="0.9" />
                <path d={`M${x - 8},${116} l0,7 l9,-7 Z`} fill={C.accent} opacity="0.6" />
              </g>
            )}
            <Lines x={x - 32} y={148} w={64} rows={1} thick={4} accentFirst={i === 3} />
            {i < 3 && <Beam d={`M${x + 28} 110 L${x + 108} 110`} delay={i * 0.35} width={1.3} />}
          </g>
        ))}
        <Chip x={62} y={62} w={72} h={20} hot />
      </Panel>

      {/* Musterinin yaniti pencereyi acar */}
      <Panel x={26} y={206} w={302} h={160}>
        <Bubble x={56} y={240} w={140} h={44} side="left" hot rows={2} />
        <Bubble x={140} y={302} w={150} h={44} side="right" rows={2} />
      </Panel>
      <Beam d="M176 240 C 176 206, 130 190, 100 178" delay={0.6} />
      <Arrow x={100} y={178} angle={202} />

      {/* Serbest yazisma penceresi ve kapanisi */}
      <Panel x={348} y={206} w={266} h={160}>
        <Clock cx={412} cy={286} r={34} hand={0.72} hot />
        <Beam d="M452 286 L498 286" delay={0.4} width={1.3} />
        <circle cx={540} cy={286} r={26} fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="5 6" />
        <Chip x={508} y={332} w={64} h={18} />
        <Node x={540} y={286} r={4} />
      </Panel>
    </ArtFrame>
  );
}
