'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/** AI Entegrasyonu — parlayan model cekirdegi, cevresinde belge / veri / vektor kaynaklari ve korumali uygulama penceresi. */
export default function AiIntegrationArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={330} cy={170} r={270} />
      <Floor horizon={298} vx={330} />
      <Reflection cx={330} cy={322} rx={190} ry={14} opacity={0.5} />
      <Scene />
    </ArtFrame>
  );
}

function Core() {
  const ids = useArt();
  return (
    <g>
      <circle cx={330} cy={170} r={70} fill={C.accent} opacity="0.4" filter={`url(#${ids.bloom})`} />
      <ellipse cx={330} cy={170} rx={92} ry={30} fill="none" stroke={C.line} strokeWidth="0.9" transform="rotate(-18 330 170)" />
      <ellipse cx={330} cy={170} rx={92} ry={30} fill="none" stroke={C.accent} strokeOpacity="0.7" strokeWidth="1" transform="rotate(24 330 170)" />
      <circle cx={330} cy={170} r={44} fill={`url(#${ids.accent})`} stroke={C.hot} strokeWidth="1.2" />
      <circle cx={330} cy={170} r={30} fill="none" stroke={C.ink} strokeOpacity="0.3" strokeWidth="1" />
      <path d="M330 146 L351 158 L351 182 L330 194 L309 182 L309 158 Z" fill={C.bg} fillOpacity="0.45" stroke={C.ink} strokeOpacity="0.7" strokeWidth="1.2" />
      <path d="M330 146 L330 170 L351 182 M330 170 L309 182" fill="none" stroke={C.ink} strokeOpacity="0.5" strokeWidth="1" />
      <circle cx={318} cy={156} r={8} fill={C.ink} opacity="0.25" filter={`url(#${ids.glow})`} />
      <circle cx={416} cy={140} r={3.2} fill={C.hot} filter={`url(#${ids.glow})`} />
      <circle cx={250} cy={196} r={2.6} fill={C.ink} opacity="0.7" />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  const dots = Array.from({ length: 15 }, (_, i) => ({ x: 74 + (i % 5) * 16, y: 238 + Math.floor(i / 5) * 14, on: i % 4 === 1 }));
  return (
    <g>
      {/* Kaynaklar: belge, veritabani, vektor dizini */}
      <g className="sv-float">
        <Panel x={64} y={52} w={96} h={70} r={6}>
          <path d="M140 52 L160 72 L140 72 Z" fill={C.faint} />
          <Lines x={76} y={66} w={56} rows={5} gap={9} thick={3} accentFirst />
        </Panel>
      </g>
      <g>
        <path d="M86 148 L86 186 A28 8 0 0 0 142 186 L142 148 Z" fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
        <path d="M86 161 A28 8 0 0 0 142 161 M86 174 A28 8 0 0 0 142 174" fill="none" stroke={C.line} strokeWidth="0.8" />
        <ellipse cx={114} cy={148} rx={28} ry={8} fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
      </g>
      <Panel x={62} y={224} w={92} h={56} r={6}>
        {dots.map((d) => (
          <circle key={`${d.x}-${d.y}`} cx={d.x} cy={d.y} r={d.on ? 3 : 2} fill={d.on ? C.hot : C.muted} opacity={d.on ? 1 : 0.5} />
        ))}
      </Panel>

      <Beam d="M160 88 C 220 92, 250 130, 290 150" />
      <Beam d="M142 168 C 200 168, 240 170, 286 170" delay={0.4} />
      <Beam d="M154 250 C 220 250, 250 210, 292 190" delay={0.8} />
      <Node x={160} y={88} />
      <Node x={142} y={168} />
      <Node x={154} y={250} hot />

      <Core />

      {/* Uygulama: sohbet / arac cagrisi */}
      <g className="sv-float" style={{ animationDelay: '-3.5s' }}>
        <Browser x={448} y={96} w={156} h={156}>
          <rect x={460} y={128} width={96} height={20} rx="8" fill={C.bg} stroke={C.line} strokeWidth="0.7" />
          <Lines x={468} y={134} w={70} rows={1} thick={3} />
          <rect x={480} y={158} width={112} height={36} rx="8" fill={`url(#${ids.panelHot})`} stroke={C.accent} strokeWidth="0.8" />
          <Lines x={490} y={166} w={86} rows={3} gap={7} thick={3} />
          <path d="M466 210 l-8 8 l8 8 M490 210 l8 8 l-8 8" fill="none" stroke={C.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={508} y={212} width={84} height={12} rx="6" fill={C.faint} />
        </Browser>
        {/* Guvenlik katmani */}
        <path d="M600 222 L620 230 L620 246 C620 258 610 266 600 270 C590 266 580 258 580 246 L580 230 Z" fill={C.bg2} stroke={C.hot} strokeWidth="1.2" filter={`url(#${ids.glow})`} />
        <path d="M592 246 l5 5 l10 -11" fill="none" stroke={C.hot} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <Beam d="M374 170 C 400 170, 420 172, 448 174" delay={1.1} width={2} />
      <Node x={448} y={174} hot />
    </g>
  );
}
