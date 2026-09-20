'use client';

import { Ambient, ArtFrame, Arrow, Beam, Browser, C, Cube, Floor, Lines, Node, Panel, Phone, Reflection, useArt } from '../kit';

/**
 * PWA mi native uygulama mi — ayni ana ekrana iki farkli yoldan varilir: solda tarayicidan
 * dogrudan eklenen surum, sagda magaza paketinden inen surum; ortadaki telefon ikisinin de hedefi.
 */
export default function PwaVsNativeAppArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={160} r={250} />
      <Floor horizon={312} vx={320} />
      <Reflection cx={320} cy={334} rx={120} ry={12} opacity={0.48} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Tarayicidan eklenen surum */}
      <g className="sv-float">
        <Browser x={30} y={70} w={182} h={130}>
          <rect x={44} y={104} width={72} height={9} rx="4.5" fill={C.ink} opacity="0.85" />
          <Lines x={44} y={120} w={84} rows={2} gap={9} thick={3} />
          <rect x={44} y={152} width={92} height={26} rx="8" fill={C.accent} opacity="0.85" />
          <rect x={68} y={162} width={44} height={6} rx="3" fill={C.bg} opacity="0.7" />
          <rect x={152} y={102} width={46} height={46} rx="10" fill={`url(#${ids.accent})`} opacity="0.75" />
        </Browser>
      </g>
      {/* Cevrimdisi da calisan onbellek */}
      <Panel x={38} y={218} w={166} h={78}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={56 + i * 46} y={240} width={34} height={34} rx="6" fill="#FFFFFF" fillOpacity="0.05" stroke={i === 0 ? C.accent : C.line} strokeWidth="0.8" />
        ))}
        <Lines x={56} y={284} w={126} rows={1} thick={3} />
      </Panel>
      <Beam d="M212 140 C 238 140, 240 160, 252 166" delay={0} />
      <Arrow x={252} y={166} angle={22} />

      {/* Ortak hedef: ana ekran */}
      <Phone x={262} y={54} w={116} h={238} hot>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={282 + (i % 3) * 30}
            y={96 + Math.floor(i / 3) * 34}
            width={24}
            height={24}
            rx="7"
            fill={i === 1 ? C.accent : '#FFFFFF'}
            fillOpacity={i === 1 ? 0.9 : 0.06}
            stroke={i === 1 ? C.hot : C.line}
            strokeWidth="0.8"
          />
        ))}
        <rect x={276} y={178} width={88} height={64} rx="8" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.7" />
        <Lines x={286} y={192} w={68} rows={4} gap={11} thick={4} />
        <rect x={296} y={258} width={48} height={12} rx="6" fill={C.accent} />
        <circle className="sv-pulse" cx={294} cy={108} r={14} fill="none" stroke={C.hot} strokeWidth="1" />
      </Phone>

      {/* Magaza paketinden inen surum */}
      <Beam d="M428 166 C 416 160, 402 142, 388 140" delay={0.6} />
      <Arrow x={388} y={140} angle={186} />
      <Panel x={432} y={64} w={172} h={140}>
        <Cube x={518} y={130} s={44} hot />
        <rect x={452} y={168} width={132} height={18} rx="9" fill="none" stroke={C.line} strokeWidth="0.9" />
        <rect x={452} y={168} width={84} height={18} rx="9" fill={C.accent} opacity="0.5" />
      </Panel>
      {/* Magaza inceleme kuyrugu */}
      <Panel x={440} y={220} w={156} h={76}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Node x={470 + i * 44} y={250} r={4} hot={i === 2} />
            {i < 2 && <Beam d={`M${478 + i * 44} 250 L${508 + i * 44} 250`} delay={0.3 + i * 0.4} faint width={1.2} />}
          </g>
        ))}
        <Lines x={458} y={272} w={120} rows={1} thick={3} />
      </Panel>
    </g>
  );
}
