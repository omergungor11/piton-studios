'use client';

import { Ambient, ArtFrame, Bars, Beam, C, Floor, Lines, Node, Panel, Reflection, Spark, useArt } from '../kit';

/** Otomasyon — konveyor bandinda ilerleyen belgeler, isleme kapisi, disli dugumler ve rapor paneli. */
export default function AutomationArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={330} cy={150} r={250} />
      <Floor horizon={296} vx={330} />
      <Reflection cx={330} cy={318} rx={220} ry={14} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function Gear({ cx, cy, r, hot = false }: { cx: number; cy: number; r: number; hot?: boolean }) {
  const ids = useArt();
  const teeth = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {hot && <circle r={r * 1.2} fill={C.accent} opacity="0.45" filter={`url(#${ids.bloom})`} />}
      {teeth.map((deg) => (
        <rect key={deg} x={-r * 0.16} y={-r * 1.22} width={r * 0.32} height={r * 0.4} rx="2" transform={`rotate(${deg})`} fill={hot ? C.accent : C.bg2} stroke={hot ? C.hot : C.line} strokeWidth="0.8" />
      ))}
      <circle r={r} fill={hot ? `url(#${ids.accent})` : C.bg2} stroke={hot ? C.hot : C.line} strokeWidth="1" />
      <circle r={r * 0.62} fill="none" stroke={hot ? C.ink : C.faint} strokeOpacity={hot ? 0.35 : 1} strokeWidth="1" />
      <circle r={r * 0.28} fill={C.bg} stroke={hot ? C.hot : C.line} strokeWidth="1" />
    </g>
  );
}

function Doc({ x, y, done = false }: { x: number; y: number; done?: boolean }) {
  return (
    <Panel x={x} y={y} w={50} h={40} r={5} hot={done}>
      <Lines x={x + 8} y={y + 9} w={30} rows={3} gap={7} thick={3} accentFirst={done} />
      {done && <path d={`M${x + 32} ${y + 30} l4 4 l8 -9`} fill="none" stroke={C.hot} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
    </Panel>
  );
}

function Scene() {
  const ids = useArt();
  const rollers = [110, 170, 230, 290, 350, 410, 470, 530];
  return (
    <g>
      {/* Konveyor: hafif egik perspektif */}
      <g transform="translate(0 40) skewY(-6)">
        {[120, 300, 520].map((x) => (
          <line key={x} x1={x} y1={252} x2={x} y2={300} stroke={C.line} strokeWidth="2" />
        ))}
        <rect x={90} y={242} width={460} height={12} rx="3" fill={C.bg} stroke={C.line} strokeWidth="0.8" />
        {rollers.map((x) => (
          <circle key={x} cx={x} cy={248} r={4} fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
        ))}
        <rect x={90} y={228} width={460} height={14} rx="3" fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
        <path d="M96 235 L544 235" className="sv-flow" stroke={C.hot} strokeWidth="1.2" opacity="0.6" />

        <Doc x={112} y={188} />
        <Doc x={186} y={188} />
        <Doc x={396} y={188} done />
        <Doc x={470} y={188} done />

        {/* Isleme kapisi */}
        <rect x={280} y={160} width={8} height={70} fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
        <rect x={352} y={160} width={8} height={70} fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
        <rect x={288} y={162} width={64} height={66} fill={`url(#${ids.panelHot})`} />
        <path d="M290 196 L350 196" stroke={C.hot} strokeWidth="1.4" filter={`url(#${ids.glow})`} />
        <Panel x={272} y={138} w={96} h={26} r={6} hot>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={290 + i * 12} cy={151} r={2.6} fill={i === 0 ? C.hot : C.faint} />
          ))}
          <rect x={330} y={148} width={28} height={6} rx="3" fill={C.faint} />
        </Panel>
      </g>

      {/* Disli dugumler: kurallar / AI */}
      <g className="sv-float">
        <Gear cx={322} cy={82} r={26} hot />
        <Gear cx={368} cy={52} r={15} />
        <Gear cx={278} cy={48} r={12} />
      </g>

      {/* Tetikleyici */}
      <Panel x={50} y={70} w={120} h={74}>
        <path d="M78 84 L66 108 L76 108 L70 128 L90 100 L80 100 L88 84 Z" fill={C.accent} stroke={C.hot} strokeWidth="0.8" filter={`url(#${ids.glow})`} />
        <Lines x={100} y={90} w={56} rows={3} gap={9} thick={3} />
      </Panel>

      {/* Rapor */}
      <g className="sv-float" style={{ animationDelay: '-3.5s' }}>
        <Panel x={452} y={48} w={150} h={112}>
          <Lines x={466} y={62} w={60} rows={1} thick={4} accentFirst />
          <Bars x={462} y={86} w={70} h={58} values={[0.4, 0.62, 0.5, 0.86]} hotIndex={3} />
          <Spark x={540} y={90} w={50} h={50} points={[0.2, 0.35, 0.3, 0.6, 0.8]} fill={false} />
        </Panel>
      </g>

      <Beam d="M170 106 C 220 104, 250 92, 290 84" />
      <Beam d="M350 88 C 400 96, 420 112, 452 112" delay={0.5} />
      <Beam d="M322 114 L322 142" delay={0.9} faint />
      <Node x={170} y={106} hot />
      <Node x={452} y={112} />
      <Node x={322} y={142} r={4} />
    </g>
  );
}
