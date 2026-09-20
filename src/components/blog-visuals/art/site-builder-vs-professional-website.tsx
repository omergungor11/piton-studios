'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Floor, Lines, Node, Panel, Reflection, Split, useArt } from '../kit';

/**
 * Site kurucusu mu profesyonel site mi — solda birbirinin ayni sablonlar ve izgaraya oturmayan
 * surukle-birak bloklar; sagda olcege oturmus tasarim, altinda kendi kodu ve olculebilir ciktilari.
 */
export default function SiteBuilderVsProfessionalArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={452} cy={158} r={240} />
      <Floor horizon={310} vx={340} />
      <Reflection cx={452} cy={332} rx={150} ry={13} opacity={0.42} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Hazir sablonlar: ucu de ayni */}
      <Panel x={40} y={58} w={236} h={110}>
        {[0, 1, 2].map((i) => (
          <g key={i} opacity={0.55 + i * 0.12}>
            <rect x={60 + i * 74} y={78} width={62} height={70} rx="6" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.7" />
            <rect x={68 + i * 74} y={86} width={46} height={20} rx="3" fill={C.faint} />
            <Lines x={68 + i * 74} y={114} w={46} rows={3} gap={8} thick={3} />
          </g>
        ))}
      </Panel>

      {/* Izgaraya oturmayan bloklar + surukleyen imlec */}
      <Panel x={40} y={180} w={236} h={110}>
        <g transform="translate(62 198) rotate(-2)">
          <rect x={0} y={0} width={120} height={26} rx="4" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.8" />
        </g>
        <g transform="translate(78 232) rotate(3)">
          <rect x={0} y={0} width={96} height={24} rx="4" fill={C.accent} fillOpacity="0.22" stroke={C.accent} strokeWidth="0.9" />
        </g>
        <rect x={62} y={262} width={140} height={20} rx="4" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.8" strokeDasharray="4 4" />
        <path d="M196 236 l0 22 l6 -6 l5 11 l4 -2 l-5 -11 l8 0 Z" fill={C.ink} stroke={C.bg} strokeWidth="1" />
      </Panel>

      <Split x={314} top={62} bottom={296} />

      {/* Olcege oturmus tasarim + kendi kodu */}
      <Panel x={352} y={58} w={248} h={232} hot>
        {/* Temel izgara */}
        <g stroke={C.line} strokeWidth="0.6" opacity="0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={378 + i * 48} y1={80} x2={378 + i * 48} y2={200} />
          ))}
        </g>
        <Browser x={376} y={80} w={200} h={120} hot>
          <rect x={390} y={112} width={76} height={10} rx="5" fill={C.ink} opacity="0.9" />
          <Lines x={390} y={130} w={86} rows={2} gap={9} thick={3} />
          <rect x={390} y={162} width={44} height={14} rx="7" fill={C.accent} />
          <rect x={488} y={110} width={74} height={66} rx="6" fill={`url(#${ids.accent})`} opacity="0.8" />
        </Browser>
        {/* Altindaki kod katmani */}
        <g transform="translate(376 212) skewY(-2)">
          <rect x={0} y={0} width={200} height={62} rx="8" fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
          <Lines x={14} y={14} w={150} rows={4} gap={11} thick={4} accentFirst />
        </g>
        <Beam d="M476 200 L476 212" delay={0} width={1.3} />
        <Node x={476} y={200} r={4} hot />
      </Panel>
    </g>
  );
}
