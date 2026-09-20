'use client';

import { Ambient, ArtFrame, Arrow, Beam, C, Chip, Clock, Doc, Floor, Node, Panel, Reflection, Spark, useArt } from '../kit';

/**
 * KOBI'de yapay zeka otomasyonu ve geri donus — solda elle donen, her turunda ayni sureyi yiyen
 * dongu; sagda tetikten ciktiya tek seferde akan hat; altta kurulum maliyetini kesen birikimli kazanc.
 */
export default function AiAutomationRoiArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={392} cy={140} r={240} />
      <Floor horizon={312} vx={330} />
      <Reflection cx={392} cy={334} rx={160} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Elle donen dongu */}
      <Panel x={44} y={44} w={196} h={186}>
        <circle cx={142} cy={136} r={54} fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="6 8" />
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          return <Node key={i} x={142 + Math.cos(a) * 54} y={136 + Math.sin(a) * 54} r={4} />;
        })}
        <Arrow x={142} y={82} angle={14} s={10} hot={false} />
        <Clock cx={142} cy={136} r={26} hand={0.62} />
        <Chip x={70} y={196} w={64} h={18} />
        <Chip x={144} y={196} w={64} h={18} />
      </Panel>

      {/* Tetikten ciktiya akan hat */}
      <Panel x={276} y={44} w={324} h={186} hot>
        <Node x={310} y={96} r={5} hot />
        <Beam d="M318 96 L356 96" delay={0} width={1.3} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={358 + i * 68} y={78} width={54} height={36} rx="8" fill={C.bg2} stroke={i === 1 ? C.accent : C.line} strokeWidth={i === 1 ? 1.1 : 0.8} />
            <rect x={370 + i * 68} y={88} width={30} height={5} rx="2.5" fill={i === 1 ? C.hot : C.faint} />
            <rect x={370 + i * 68} y={99} width={20} height={5} rx="2.5" fill={C.faint} />
            {i < 2 && <Beam d={`M${412 + i * 68} 96 L${426 + i * 68} 96`} delay={0.3 + i * 0.3} width={1.3} />}
          </g>
        ))}
        {/* Uc ciktiya fan-out */}
        <Beam d="M562 96 C 584 96, 570 140, 588 146" delay={0.9} faint width={1.2} />
        <Beam d="M562 96 C 540 130, 520 140, 506 150" delay={1.1} width={1.2} />
        <Beam d="M562 96 C 520 116, 470 140, 434 152" delay={1.3} faint width={1.2} />
        <Doc x={312} y={140} w={58} h={74} hot rows={3} />
        <Doc x={404} y={150} w={58} h={64} rows={3} />
        <Clock cx={532} cy={176} r={24} hand={0.1} hot />
        <circle className="sv-pulse" cx={310} cy={96} r={9} fill="none" stroke={C.hot} strokeWidth="1" />
      </Panel>

      {/* Birikimli kazancin kurulum maliyetini kestigi nokta */}
      <Panel x={116} y={244} w={410} h={96}>
        <line x1={140} y1={288} x2={500} y2={288} stroke={C.line} strokeWidth="1" strokeDasharray="4 6" />
        <Spark x={140} y={256} w={360} h={72} points={[0.02, 0.08, 0.2, 0.36, 0.52, 0.74, 0.94]} />
        <circle cx={332} cy={288} r={7} fill="none" stroke={C.hot} strokeWidth="1.4" filter={`url(#${ids.glow})`} />
        <circle cx={332} cy={288} r={2.4} fill={C.hot} />
      </Panel>
    </g>
  );
}
