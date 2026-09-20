'use client';

import { Ambient, ArtFrame, Arrow, Beam, C, Floor, Lines, Panel, Reflection, useArt } from '../kit';

/**
 * Erisilebilir form tasarimi — klavye odaginin alanlar arasinda gorunur sekilde ilerlemesi,
 * hatanin alanin yaninda isaretlenmesi, genis dokunma hedefi ve yanda kontrast/metin olcegi denetimi.
 */
export default function AccessibleFormsArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={280} cy={160} r={250} />
      <Floor horizon={312} vx={300} />
      <Reflection cx={272} cy={334} rx={160} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  const fields = [70, 134, 198];
  return (
    <g>
      <Panel x={116} y={44} w={312} h={256}>
        {fields.map((y, i) => (
          <g key={y}>
            {/* Etiket alanin ustunde — yer tutucu degil */}
            <rect x={140} y={y} width={i === 1 ? 74 : 56} height={6} rx="3" fill={C.muted} opacity="0.8" />
            <rect
              x={140}
              y={y + 14}
              width={264}
              height={34}
              rx="8"
              fill="#FFFFFF"
              fillOpacity="0.04"
              stroke={i === 1 ? C.accent : C.line}
              strokeWidth={i === 1 ? 1.2 : 0.8}
            />
            <Lines x={152} y={y + 28} w={120} rows={1} thick={5} />
            {/* Odaklanan alanin gorunur halkasi */}
            {i === 0 && (
              <>
                <rect x={135} y={y + 9} width={274} height={44} rx="12" fill="none" stroke={C.hot} strokeWidth="2" filter={`url(#${ids.glow})`} />
                <rect className="sv-pulse" x={135} y={y + 9} width={274} height={44} rx="12" fill="none" stroke={C.hot} strokeWidth="1" />
              </>
            )}
            {/* Hata: alanin hemen altinda, yalnizca renge dayanmayan bir isaretle */}
            {i === 1 && (
              <g>
                <circle cx={148} cy={y + 60} r="7" fill="none" stroke={C.hot} strokeWidth="1.4" />
                <line x1={148} y1={y + 56} x2={148} y2={y + 61} stroke={C.hot} strokeWidth="1.6" strokeLinecap="round" />
                <circle cx={148} cy={y + 64} r="1.2" fill={C.hot} />
                <rect x={162} y={y + 57} width={96} height={5} rx="2.5" fill={C.hot} opacity="0.8" />
              </g>
            )}
          </g>
        ))}
        {/* Genis dokunma hedefi */}
        <rect x={140} y={252} width={148} height={38} rx="10" fill={C.accent} />
        <rect x={176} y={267} width={76} height={7} rx="3.5" fill={C.bg} opacity="0.75" />
        <rect x={132} y={244} width={164} height={54} rx="14" fill="none" stroke={C.line} strokeWidth="0.8" strokeDasharray="4 5" />
      </Panel>

      {/* Klavye yolu: alandan alana sirayla */}
      <Beam d="M96 96 C 118 96, 118 120, 96 120 C 74 120, 74 160, 100 160" delay={0.2} faint width={1.3} />
      <Beam d="M96 160 C 74 190, 80 226, 104 226" delay={0.8} faint width={1.3} />
      <Arrow x={104} y={96} angle={0} />
      <Arrow x={104} y={226} angle={6} s={8} hot={false} />
      <g stroke={C.line} strokeWidth="0.9" fill="none">
        <rect x={40} y={140} width={46} height={34} rx="6" />
        <path d="M52 157 h20 m-7 -6 l7 6 l-7 6" stroke={C.muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Kontrast ve metin olcegi denetimi */}
      <g className="sv-float">
        <Panel x={462} y={78} w={136} h={188}>
          <circle cx={530} cy={132} r={30} fill={C.ink} />
          <path d="M530 102 a30,30 0 0 0 0,60 Z" fill={C.bg} />
          <circle cx={530} cy={132} r={30} fill="none" stroke={C.accent} strokeWidth="1.2" />
          <rect x={486} y={180} width={88} height={11} rx="3" fill={C.ink} opacity="0.85" />
          <rect x={486} y={198} width={70} height={8} rx="3" fill={C.ink} opacity="0.6" />
          <rect x={486} y={212} width={54} height={6} rx="3" fill={C.muted} opacity="0.5" />
          <Lines x={486} y={232} w={88} rows={2} gap={9} thick={3} />
        </Panel>
      </g>
    </g>
  );
}
