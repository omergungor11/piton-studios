'use client';

import { Ambient, ArtFrame, Beam, Bubble, C, Chip, Floor, Globe, Lines, Node, Panel, Reflection, Shield, useArt } from '../kit';

/**
 * AB yapay zeka yasasi seffaflik kurallari — solda yildiz halkasiyla cevrili kure (AB pazari);
 * sagda sohbet penceresi: ilk balonun yaninda parlayan aciklama rozeti, kullanicinin yapay zekayla
 * konustugunu bastan soyler. Pencerenin kosesinde kalkan, kureden pencereye isik cizgisi.
 */
export default function EuAiActTransparencyArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={420} cy={170} r={250} />
      <Floor horizon={312} vx={330} />
      <Reflection cx={150} cy={334} rx={96} ry={12} opacity={0.45} />
      <Reflection cx={450} cy={334} rx={140} ry={12} opacity={0.35} />
      <Scene />
    </ArtFrame>
  );
}

/** Kurenin cevresindeki on iki noktali halka. */
function StarRing({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const ids = useArt();
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return <circle key={i} cx={x} cy={y} r={i === 0 ? 4.2 : 3.2} fill={i === 0 ? C.hot : C.accent} opacity={i === 0 ? 1 : 0.75} filter={i === 0 ? `url(#${ids.glow})` : undefined} />;
      })}
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* AB pazari */}
      <g className="sv-float">
        <Globe cx={150} cy={176} r={62} />
        <StarRing cx={150} cy={176} r={92} />
      </g>

      <Beam d="M242 176 C 266 176, 270 126, 300 122" delay={0} />
      <Node x={300} y={122} r={4.5} hot />

      {/* Sohbet penceresi */}
      <Panel x={300} y={56} w={300} h={248} hot>
        <rect x={300} y={56} width={300} height={34} rx="10" fill="#FFFFFF" fillOpacity="0.04" />
        <circle cx={324} cy={73} r="8" fill={C.accent} fillOpacity="0.35" stroke={C.hot} strokeWidth="1" />
        <Lines x={340} y={70} w={90} rows={1} thick={5} accentFirst />

        {/* Ilk mesaj + aciklama rozeti */}
        <Bubble x={320} y={106} w={170} h={44} side="left" hot rows={2} />
        <g>
          <rect x={498} y={112} width={84} height={30} rx="15" fill={C.accent} opacity="0.3" filter={`url(#${ids.bloom})`} />
          <Chip x={498} y={116} w={84} h={22} hot />
        </g>

        <Bubble x={420} y={168} w={160} h={36} side="right" rows={1} />
        <Bubble x={320} y={222} w={140} h={36} side="left" rows={2} />

        <rect x={320} y={272} width={224} height={20} rx="10" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.7" />
      </Panel>

      {/* Guven: kalkan */}
      <Shield x={584} y={290} s={30} />
      <Node x={584} y={290} r={3} hot />
    </g>
  );
}
