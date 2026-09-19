'use client';

import { Ambient, ArtFrame, Bars, Beam, C, Cube, Floor, Lines, Node, Panel, Reflection, Spark, useArt } from '../kit';

/** Veri Muhendisligi — katmanli veri ambari silindirleri, kaynaklardan donusum kubune akan satirlar ve analitik paneli. */
export default function DataEngineeringArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={360} cy={170} r={250} />
      <Floor horizon={300} vx={350} />
      <Reflection cx={360} cy={318} rx={170} ry={14} opacity={0.5} />
      <Scene />
    </ArtFrame>
  );
}

function Disc({ cx, y, rx, ry, h, hot = false }: { cx: number; y: number; rx: number; ry: number; h: number; hot?: boolean }) {
  const ids = useArt();
  const body = `M${cx - rx} ${y} L${cx - rx} ${y + h} A${rx} ${ry} 0 0 0 ${cx + rx} ${y + h} L${cx + rx} ${y} Z`;
  return (
    <g>
      {hot && <ellipse cx={cx} cy={y + h / 2} rx={rx} ry={h} fill={C.accent} opacity="0.4" filter={`url(#${ids.bloom})`} />}
      <path d={body} fill={C.bg2} stroke={hot ? C.accent : C.line} strokeWidth="1" />
      <path d={body} fill={`url(#${hot ? ids.panelHot : ids.panel})`} />
      {[0.35, 0.65].map((t) => (
        <path key={t} d={`M${cx - rx} ${y + h * t} A${rx} ${ry} 0 0 0 ${cx + rx} ${y + h * t}`} fill="none" stroke={C.faint} strokeWidth="0.8" />
      ))}
      {[-0.58, -0.26, 0.1, 0.44].map((t, i) => (
        <rect key={t} x={cx + rx * t} y={y + ry + h * 0.45} width={rx * (i === 1 && hot ? 0.29 : 0.21)} height="3" rx="1.5" fill={i === 1 && hot ? C.hot : C.faint} />
      ))}
      <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill={hot ? C.accent : C.bg2} fillOpacity={hot ? 0.8 : 1} stroke={hot ? C.hot : C.line} strokeWidth="1" />
      <ellipse cx={cx} cy={y} rx={rx * 0.6} ry={ry * 0.6} fill="none" stroke={hot ? C.ink : C.faint} strokeOpacity={hot ? 0.4 : 1} strokeWidth="0.9" />
    </g>
  );
}

function Scene() {
  return (
    <g>
      {/* Kaynaklar */}
      <g className="sv-float">
        <Disc cx={96} y={70} rx={30} ry={8} h={40} />
      </g>
      <Panel x={56} y={148} w={84} h={56} r={6}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={66} y={160 + i * 13} width={10} height={6} rx="2" fill={i === 0 ? C.accent : C.faint} />
            <rect x={82} y={160 + i * 13} width={46} height={6} rx="2" fill={C.faint} />
          </g>
        ))}
      </Panel>
      <Panel x={62} y={232} w={74} h={48} r={6}>
        <path d="M80 248 l-8 8 l8 8 M118 248 l8 8 l-8 8" fill="none" stroke={C.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <Lines x={88} y={250} w={24} rows={2} gap={8} thick={3} />
      </Panel>

      <Beam d="M126 92 C 170 100, 180 150, 204 170" />
      <Beam d="M140 176 C 164 176, 180 180, 200 184" delay={0.4} faint />
      <Beam d="M136 256 C 170 250, 184 214, 204 200" delay={0.8} />
      <Node x={126} y={92} />
      <Node x={140} y={176} />
      <Node x={136} y={256} />

      {/* Donusum (ELT) */}
      <Cube x={234} y={200} s={34} />
      <Beam d="M264 190 C 284 186, 290 180, 296 176" delay={1} width={2} />

      {/* Veri ambari: katmanlar */}
      <Disc cx={370} y={222} rx={76} ry={20} h={36} />
      <Disc cx={370} y={170} rx={76} ry={20} h={36} />
      <Disc cx={370} y={118} rx={76} ry={20} h={36} hot />
      <Node x={370} y={118} r={5} hot />

      {/* Analitik */}
      <g className="sv-float" style={{ animationDelay: '-3s' }}>
        <Panel x={476} y={72} w={136} h={156}>
          <Lines x={490} y={86} w={60} rows={1} thick={4} accentFirst />
          <Spark x={490} y={102} w={108} h={52} points={[0.25, 0.4, 0.34, 0.55, 0.5, 0.78, 0.9]} />
          <line x1={490} y1={162} x2={598} y2={162} stroke={C.line} strokeWidth="0.7" />
          <Bars x={488} y={170} w={112} h={46} values={[0.45, 0.7, 0.55, 0.9, 0.62]} hotIndex={3} />
        </Panel>
      </g>
      <Beam d="M446 150 C 460 146, 466 140, 476 138" delay={1.3} />
      <Node x={476} y={138} hot />
    </g>
  );
}
