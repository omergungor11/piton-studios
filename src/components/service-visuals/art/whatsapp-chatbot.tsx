'use client';

import { Ambient, ArtFrame, Beam, C, Floor, Lines, Node, Panel, Phone, Reflection, useArt } from '../kit';

/** WhatsApp & Chatbot — konusma dolu telefon, kendi verisiyle yanit ureten bot ve ekibe devredilen konusma paneli. */
export default function WhatsappChatbotArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={330} cy={170} r={250} />
      <Floor horizon={300} vx={320} />
      <Reflection cx={320} cy={330} rx={220} ry={14} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Bubble({ x, y, w, mine = false }: { x: number; y: number; w: number; mine?: boolean }) {
  const tail = mine ? `M${x + w - 8} ${y + 22} l10 6 l-3 -10 Z` : `M${x + 8} ${y + 22} l-10 6 l3 -10 Z`;
  return (
    <g>
      <path d={tail} fill={mine ? C.accent : C.bg2} />
      <rect x={x} y={y} width={w} height={26} rx="9" fill={mine ? C.accent : C.bg2} fillOpacity={mine ? 0.85 : 1} stroke={mine ? C.hot : C.line} strokeWidth="0.8" />
      <Lines x={x + 9} y={y + 8} w={w - 22} rows={2} gap={7} thick={3} />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Musteri telefonu: sohbet */}
      <g transform="translate(96 54) skewY(5)">
        <Phone x={0} y={0} w={132} h={236} hot>
          <circle cx={20} cy={30} r={7} fill={C.accent} />
          <rect x={32} y={27} width={50} height={6} rx="3" fill={C.faint} />
          <line x1={0} y1={44} x2={132} y2={44} stroke={C.line} strokeWidth="0.7" />
          <Bubble x={12} y={56} w={82} />
          <Bubble x={40} y={92} w={80} mine />
          <Bubble x={12} y={128} w={92} />
          <Bubble x={46} y={164} w={74} mine />
          <rect x={12} y={206} width={86} height={16} rx="8" fill="none" stroke={C.line} strokeWidth="0.8" />
          <circle cx={112} cy={214} r={9} fill={C.accent} />
          <path d="M108 214 l8 0 M113 210 l4 4 l-4 4" stroke={C.ink} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </Phone>
      </g>

      {/* Bot cekirdegi */}
      <g className="sv-float">
        <circle cx={368} cy={168} r={52} fill={C.accent} opacity="0.35" filter={`url(#${ids.bloom})`} />
        <line x1={368} y1={116} x2={368} y2={130} stroke={C.hot} strokeWidth="2" />
        <circle cx={368} cy={112} r={5} fill={C.hot} filter={`url(#${ids.glow})`} />
        <Panel x={324} y={130} w={88} h={74} r={22} hot>
          <rect x={338} y={146} width={60} height={34} rx="14" fill={C.bg} stroke={C.line} strokeWidth="0.8" />
          <circle cx={356} cy={163} r={5} fill={C.hot} filter={`url(#${ids.glow})`} />
          <circle cx={380} cy={163} r={5} fill={C.hot} filter={`url(#${ids.glow})`} />
          <path d="M356 190 Q368 196 380 190" fill="none" stroke={C.ink} strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />
        </Panel>
      </g>

      {/* Kendi verin: bilgi tabani */}
      <g>
        <path d="M334 250 L334 276 A34 9 0 0 0 402 276 L402 250 Z" fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
        <path d="M334 263 A34 9 0 0 0 402 263" fill="none" stroke={C.line} strokeWidth="0.8" />
        <ellipse cx={368} cy={250} rx={34} ry={9} fill={C.bg2} stroke={C.accent} strokeWidth="1" />
        <ellipse cx={368} cy={250} rx={20} ry={4.5} fill={`url(#${ids.panelHot})`} />
      </g>

      {/* Ekip / CRM paneli */}
      <g className="sv-float" style={{ animationDelay: '-3s' }}>
        <Panel x={462} y={76} w={138} h={172}>
          <Lines x={476} y={90} w={60} rows={1} thick={4} accentFirst />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              {i === 1 && <rect x={468} y={108 + i * 32} width={126} height={28} rx="6" fill={`url(#${ids.panelHot})`} stroke={C.accent} strokeWidth="0.8" />}
              <circle cx={484} cy={122 + i * 32} r={8} fill={i === 1 ? C.accent : C.faint} />
              <Lines x={498} y={116 + i * 32} w={78} rows={2} gap={7} thick={3} />
            </g>
          ))}
        </Panel>
      </g>

      <Beam d="M232 150 C 270 140, 290 160, 324 164" />
      <Beam d="M412 160 C 432 160, 440 154, 462 150" delay={0.6} />
      <Beam d="M368 240 L368 206" delay={1} faint />
      <Node x={232} y={150} hot />
      <Node x={462} y={150} />
      <Node x={368} y={240} r={4} />
    </g>
  );
}
