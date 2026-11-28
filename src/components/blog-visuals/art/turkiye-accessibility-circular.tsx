'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Check, Clock, Floor, Lines, Panel, Phone, Reflection, useArt } from '../kit';

/**
 * Erisilebilirlik genelgesi — ortada bir site: menude gorunur klavye odagi, yuksek kontrastli metin
 * ve etiketli alan. Yaninda ayni duzen mobilde. Ustte suzulen erisilebilirlik muhru (onay), solda
 * sureyi hatirlatan saat; site ve telefondan muhre isik cizgileri akar.
 */
export default function TurkiyeAccessibilityCircularArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={300} cy={170} r={260} />
      <Floor horizon={316} vx={300} />
      <Reflection cx={292} cy={336} rx={170} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Site */}
      <Browser x={150} y={92} w={290} h={212}>
        {/* Menu: ikinci oge klavyeyle odakta */}
        {[170, 222, 274].map((x, i) => (
          <rect key={x} x={x} y={126} width={42} height={7} rx="3.5" fill={i === 1 ? C.ink : C.muted} opacity={i === 1 ? 1 : 0.7} />
        ))}
        <rect x={214} y={118} width={58} height={23} rx="7" fill="none" stroke={C.hot} strokeWidth="2" filter={`url(#${ids.glow})`} />
        <rect className="sv-pulse" x={214} y={118} width={58} height={23} rx="7" fill="none" stroke={C.hot} strokeWidth="1" />
        {/* Baslik ve govde: yuksek kontrast */}
        <rect x={170} y={158} width={150} height={12} rx="6" fill={C.ink} />
        <Lines x={170} y={182} w={190} rows={3} gap={10} thick={5} />
        {/* Gorsel + alternatif metin isareti */}
        <rect x={372} y={158} width={50} height={50} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <path d="M380 198 l12 -14 l9 9 l7 -6 l10 11 Z" fill={C.faint} />
        <rect x={372} y={214} width={50} height={5} rx="2.5" fill={C.accent} opacity="0.8" />
        {/* Etiketli alan + buton */}
        <rect x={170} y={232} width={60} height={6} rx="3" fill={C.muted} opacity="0.85" />
        <rect x={170} y={244} width={170} height={30} rx="7" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.9" />
        <rect x={350} y={244} width={72} height={30} rx="8" fill={C.accent} />
        <rect x={368} y={257} width={36} height={5} rx="2.5" fill={C.bg} opacity="0.8" />
      </Browser>

      {/* Ayni duzen mobilde */}
      <Phone x={470} y={130} w={92} h={176}>
        <rect x={484} y={160} width={64} height={9} rx="4.5" fill={C.ink} />
        <Lines x={484} y={180} w={64} rows={3} gap={9} thick={4} />
        <rect x={480} y={214} width={72} height={26} rx="7" fill="none" stroke={C.hot} strokeWidth="1.6" />
        <rect x={484} y={248} width={64} height={24} rx="7" fill={C.accent} />
      </Phone>

      {/* Sure */}
      <Panel x={46} y={150} w={76} h={86}>
        <Clock cx={84} cy={193} r={24} hand={0.72} hot />
      </Panel>
      <Beam d="M122 193 C 134 193, 138 200, 150 200" delay={0.2} faint />

      {/* Erisilebilirlik muhru */}
      <Beam d="M296 92 C 296 70, 310 58, 330 52" delay={0.5} />
      <Beam d="M516 130 C 516 92, 420 50, 370 48" delay={0.9} />
      <g className="sv-float">
        <circle cx={350} cy={48} r={30} fill={C.accent} opacity="0.22" filter={`url(#${ids.bloom})`} />
        <circle cx={350} cy={48} r={24} fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="1.4" />
        <circle cx={350} cy={48} r={18} fill="none" stroke={C.hot} strokeWidth="0.8" strokeDasharray="3 4" />
        <Check x={351} y={49} s={18} />
      </g>
    </g>
  );
}
