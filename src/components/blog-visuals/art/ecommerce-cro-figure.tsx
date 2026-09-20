'use client';

import { ArtFrame, Ambient, Arrow, Beam, C, Cart, Lines, Node, Panel } from '../kit';

/**
 * Donusum hunisi semasi: her adimda daralan bant, yanlara sizan oklarla kaybi gosterir; son bantta
 * tamamlanan siparis kalir. Bant genislikleri oranlidir, sahnede rakam yoktur.
 */
export default function EcommerceCroFigure({ label }: { label: string }) {
  const steps = [
    { w: 460, leak: true },
    { w: 352, leak: true },
    { w: 244, leak: true },
    { w: 156, leak: false },
  ];
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={200} r={230} />

      <Panel x={30} y={30} w={580} h={340}>
        {steps.map((s, i) => {
          const y = 76 + i * 72;
          const x = 320 - s.w / 2;
          const last = i === steps.length - 1;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={s.w}
                height={46}
                rx="8"
                fill={last ? C.accent : '#FFFFFF'}
                fillOpacity={last ? 0.26 : 0.05}
                stroke={last ? C.accent : C.line}
                strokeWidth={last ? 1.2 : 0.8}
              />
              <Lines x={x + 18} y={y + 20} w={Math.min(160, s.w - 40)} rows={1} thick={6} accentFirst={last} />
              {i > 0 && <Beam d={`M320 ${y - 26} L320 ${y - 4}`} delay={i * 0.3} width={1.3} />}
              {s.leak && (
                <g>
                  <path d={`M${x + 6} ${y + 46} C ${x - 24} ${y + 62}, ${x - 40} ${y + 66}, ${x - 56} ${y + 68}`} fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="4 5" />
                  <Arrow x={x - 56} y={y + 68} angle={168} s={8} hot={false} />
                  <path d={`M${x + s.w - 6} ${y + 46} C ${x + s.w + 24} ${y + 62}, ${x + s.w + 40} ${y + 66}, ${x + s.w + 56} ${y + 68}`} fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="4 5" />
                  <Arrow x={x + s.w + 56} y={y + 68} angle={12} s={8} hot={false} />
                </g>
              )}
            </g>
          );
        })}
        <Cart x={320} y={352} s={24} />
        <Node x={320} y={62} r={5} hot />
      </Panel>
    </ArtFrame>
  );
}
