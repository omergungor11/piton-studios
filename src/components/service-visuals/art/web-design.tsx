'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Floor, Lines, Node, Panel, Phone, Reflection, useArt } from '../kit';

/** Web Tasarim — perspektifte yuzen tarayici penceresi, tasarim sistemi paneli, mobil gorunum ve imlec izi. */
export default function WebDesignArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={380} cy={150} r={260} />
      <Floor horizon={300} vx={360} />
      <Reflection cx={360} cy={330} rx={200} ry={14} opacity={0.45} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Ana tarayici: hafif egik, arka planda */}
      <g transform="translate(206 58) skewY(-4)">
        <Browser x={0} y={0} w={330} h={220}>
          {/* Hero bloku */}
          <rect x={16} y={34} width={132} height={10} rx="5" fill={C.ink} opacity="0.9" />
          <rect x={16} y={50} width={96} height={10} rx="5" fill={C.ink} opacity="0.55" />
          <Lines x={16} y={70} w={120} rows={3} gap={8} thick={3} />
          <rect x={16} y={100} width={58} height={16} rx="8" fill={C.accent} />
          {/* Gorsel alani */}
          <rect x={168} y={32} width={146} height={92} rx="8" fill={`url(#${ids.accent})`} opacity="0.85" />
          <circle cx={268} cy={62} r={18} fill={C.hot} opacity="0.5" filter={`url(#${ids.bloom})`} />
          <path d="M176 116 L220 80 L248 104 L270 88 L306 116 Z" fill={C.bg} opacity="0.55" />
          {/* Kart izgarasi */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={16 + i * 102} y={140} width={94} height={62} rx="6" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.7" />
              <rect x={24 + i * 102} y={148} width={22} height={22} rx="5" fill={i === 1 ? C.accent : C.faint} />
              <Lines x={24 + i * 102} y={178} w={70} rows={2} gap={8} thick={3} />
            </g>
          ))}
        </Browser>
      </g>

      {/* Tasarim sistemi paneli: renk ornekleri, tip olcegi */}
      <g className="sv-float">
        <Panel x={70} y={176} w={170} h={128} hot>
          {[C.ink, C.accent, C.hot, C.muted].map((color, i) => (
            <circle key={color} cx={92 + i * 26} cy={200} r={9} fill={color} stroke={C.line} strokeWidth="0.6" />
          ))}
          <rect x={84} y={222} width={60} height={12} rx="3" fill={C.ink} opacity="0.85" />
          <rect x={84} y={240} width={44} height={8} rx="3" fill={C.ink} opacity="0.5" />
          <rect x={84} y={254} width={32} height={6} rx="3" fill={C.ink} opacity="0.3" />
          {/* Izgara ikonlari */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={160 + (i % 2) * 34} y={222 + Math.floor(i / 2) * 34} width={28} height={28} rx="5" fill="none" stroke={i === 0 ? C.hot : C.line} strokeWidth="0.9" />
          ))}
        </Panel>
      </g>

      {/* Mobil gorunum */}
      <g className="sv-float" style={{ animationDelay: '-3s' }}>
        <Phone x={500} y={150} w={88} h={164}>
          <rect x={510} y={174} width={68} height={46} rx="6" fill={`url(#${ids.accent})`} opacity="0.8" />
          <Lines x={510} y={230} w={60} rows={4} gap={9} thick={3} />
          <rect x={510} y={272} width={40} height={12} rx="6" fill={C.accent} />
        </Phone>
      </g>

      {/* Imlec izi: tasarim sisteminden sayfaya */}
      <Beam d="M232 200 C 300 190, 300 120, 360 112" />
      <Beam d="M470 160 C 490 170, 500 190, 512 200" delay={0.6} faint />
      <Node x={232} y={200} hot />
      <Node x={360} y={112} />
      {/* Imlec */}
      <path d="M362 114 l0 22 l6 -6 l5 11 l4 -2 l-5 -11 l8 0 Z" fill={C.ink} stroke={C.bg} strokeWidth="1" filter={`url(#${ids.glow})`} />
    </g>
  );
}
