'use client';

import { Ambient, ArtFrame, Beam, C, Cube, Floor, Lines, Node, Phone, Reflection, Spark, useArt } from '../kit';

/** Mobil Uygulama — birbirine egik duran iki telefon, aralarinda senkron isik yayi, altta ortak kod tabani blogu. */
export default function MobileAppArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={360} cy={170} r={250} />
      <Floor horizon={302} vx={360} />
      <Reflection cx={360} cy={330} rx={190} ry={14} opacity={0.5} />
      <Scene />
    </ArtFrame>
  );
}

function StoreBadge({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={44} height={44} rx="12" fill={C.bg2} stroke={C.line} />
      <path d={`M${x + 22} ${y + 12} L${x + 22} ${y + 28} M${x + 15} ${y + 22} L${x + 22} ${y + 29} L${x + 29} ${y + 22}`} fill="none" stroke={C.hot} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={x + 13} y={y + 33} width={18} height={2.5} rx="1.25" fill={C.muted} />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Senkron yaylari */}
      <Beam d="M272 96 C 310 20, 410 20, 448 96" />
      <Beam d="M290 262 C 320 300, 400 300, 430 262" delay={0.8} faint />
      <Node x={360} y={39} hot />

      {/* Sol telefon: liste gorunumu */}
      <g className="sv-float">
        <g transform="translate(196 84) rotate(-9)">
          <Phone x={0} y={0} w={112} h={214} hot>
            <rect x={10} y={22} width={92} height={62} rx="8" fill={`url(#${ids.accent})`} opacity="0.85" />
            <circle cx={80} cy={42} r={12} fill={C.hot} opacity="0.5" filter={`url(#${ids.bloom})`} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx={22} cy={104 + i * 26} r={8} fill={i === 0 ? C.accent : C.faint} />
                <Lines x={36} y={99 + i * 26} w={60} rows={2} gap={7} thick={3} />
              </g>
            ))}
            <rect x={10} y={180} width={92} height={20} rx="10" fill={C.accent} />
          </Phone>
        </g>
      </g>

      {/* Sag telefon: grafik ve ayarlar */}
      <g className="sv-float" style={{ animationDelay: '-3.5s' }}>
        <g transform="translate(418 68) rotate(9)">
          <Phone x={0} y={0} w={112} h={214}>
            <Lines x={12} y={24} w={70} rows={1} thick={5} accentFirst />
            <rect x={10} y={38} width={92} height={60} rx="8" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.6" />
            <Spark x={16} y={48} w={80} h={42} points={[0.2, 0.45, 0.35, 0.7, 0.55, 0.9]} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <Lines x={12} y={114 + i * 22} w={50} rows={1} thick={3} />
                <rect x={76} y={109 + i * 22} width={24} height={13} rx="6.5" fill={i === 1 ? C.faint : C.accent} />
                <circle cx={i === 1 ? 82 : 94} cy={115.5 + i * 22} r="4.5" fill={C.ink} />
              </g>
            ))}
            <line x1={0} y1={184} x2={112} y2={184} stroke={C.line} strokeWidth="0.7" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={16 + i * 24} y={192} width={10} height={10} rx="3" fill={i === 0 ? C.hot : C.faint} />
            ))}
          </Phone>
        </g>
      </g>

      {/* Ortak kod tabani */}
      <Cube x={360} y={252} s={32} hot />
      <path d="M352 238 L346 244 L352 250 M368 238 L374 244 L368 250" fill="none" stroke={C.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" transform="translate(0 -8)" />

      {/* Magaza rozetleri */}
      <g className="sv-float" style={{ animationDelay: '-1.5s' }}>
        <StoreBadge x={96} y={150} />
        <StoreBadge x={562} y={196} />
      </g>
      <Beam d="M140 172 C 170 176, 180 180, 196 186" delay={1.2} faint />
      <Beam d="M504 236 C 526 228, 544 222, 562 218" delay={1.6} faint />
    </g>
  );
}
