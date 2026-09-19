'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Cube, Floor, Lines, Node, Phone, Reflection, useArt } from '../kit';

/** Progressive Web App — tarayicidan telefon ana ekranina "kurulum" isini, altta cevrimdisi onbellek katmani. */
export default function ProgressiveWebAppArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={430} cy={170} r={240} />
      <Floor horizon={284} vx={380} />
      <Reflection cx={380} cy={336} rx={200} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Cevrimdisi katman: onbellek duzlemi */}
      <path d="M150 292 L500 292 L566 324 L216 324 Z" fill={`url(#${ids.panelHot})`} stroke={C.accent} strokeOpacity="0.6" strokeWidth="0.9" strokeDasharray="5 5" />
      <path d="M170 300 L480 300" stroke={C.line} strokeWidth="0.6" />
      <Cube x={276} y={306} s={16} />
      <Cube x={306} y={306} s={16} hot />
      <Cube x={336} y={306} s={16} />
      <Cube x={420} y={306} s={16} />

      {/* Tarayici: kaynak web uygulamasi */}
      <g transform="translate(78 64) skewY(4)">
        <Browser x={0} y={0} w={284} h={196}>
          <rect x={200} y={5} width={10} height={10} rx="2" fill="none" stroke={C.hot} strokeWidth="1" />
          <path d="M205 7 L205 13 M202 10 L205 13 L208 10" fill="none" stroke={C.hot} strokeWidth="1" strokeLinecap="round" />
          <rect x={14} y={32} width={256} height={70} rx="8" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.6" />
          <rect x={26} y={46} width={110} height={10} rx="5" fill={C.ink} opacity="0.85" />
          <Lines x={26} y={64} w={100} rows={2} gap={8} thick={3} />
          <rect x={190} y={42} width={66} height={50} rx="8" fill={`url(#${ids.accent})`} opacity="0.8" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={14 + i * 65} y={114} width={58} height={64} rx="6" fill="#FFFFFF" fillOpacity="0.03" stroke={C.line} strokeWidth="0.6" />
              <Lines x={22 + i * 65} y={124} w={40} rows={4} gap={9} thick={3} accentFirst={i === 2} />
            </g>
          ))}
        </Browser>
      </g>

      {/* Telefon: ana ekran ikon izgarasi, kurulan uygulama vurgulu */}
      <g className="sv-float">
        <Phone x={458} y={78} w={112} h={206} hot>
          {Array.from({ length: 12 }, (_, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const isApp = i === 4;
            return (
              <rect
                key={i}
                x={472 + col * 30}
                y={102 + row * 32}
                width={22}
                height={22}
                rx="6"
                fill={isApp ? `url(#${ids.accent})` : C.faint}
                stroke={isApp ? C.hot : 'none'}
                filter={isApp ? `url(#${ids.glow})` : undefined}
              />
            );
          })}
          <rect x={470} y={238} width={88} height={30} rx="12" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.6" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={488 + i * 26} cy={253} r={5} fill={C.faint} />
          ))}
        </Phone>
      </g>

      {/* Cevrimdisi isareti */}
      <g transform="translate(410 222)" fill="none" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round">
        <path d="M-14 0 A20 20 0 0 1 14 0" />
        <path d="M-8 6 A11 11 0 0 1 8 6" />
        <circle cx={0} cy={12} r="1.8" fill={C.muted} stroke="none" />
        <path d="M-15 -8 L15 18" stroke={C.hot} />
      </g>

      {/* Kurulum isini: adres cubugundan ana ekrana */}
      <Beam d="M283 88 C 360 40, 440 70, 502 145" />
      {/* Service worker: tarayicidan onbellek katmanina */}
      <Beam d="M230 272 C 250 290, 280 296, 306 290" delay={0.7} faint />
      <Beam d="M514 284 C 506 296, 470 302, 434 298" delay={1.2} faint />
      <Node x={283} y={88} hot />
      <Node x={230} y={272} />
    </g>
  );
}
