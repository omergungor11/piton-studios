'use client';

import { Ambient, ArtFrame, Bars, Beam, Browser, C, Cart, Chip, Clock, Floor, Lines, Node, Panel, Reflection, Spark, useArt } from '../kit';

/**
 * Kasim indirimlerine hazirlik — solda vitrin: indirim rozetli urun kartlari ve one cikan (parlayan)
 * kampanya urunu; uzerinde suzulen sepet. Vitrinden sagdaki izleme paneline isik cizgisi; panelde
 * geri sayan saat, yukselen trafik cubuklari ve siparis egrisi.
 */
export default function NovemberSalesReadinessArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={250} cy={190} r={250} />
      <Floor horizon={312} vx={320} />
      <Reflection cx={220} cy={334} rx={160} ry={12} opacity={0.45} />
      <Reflection cx={522} cy={334} rx={90} ry={10} opacity={0.35} />
      <Scene />
    </ArtFrame>
  );
}

/** Urun karti: gorsel alani + iki satir + indirim rozeti. */
function Product({ x, y, w, h, hot = false }: { x: number; y: number; w: number; h: number; hot?: boolean }) {
  const ids = useArt();
  const ih = h - 46;
  return (
    <g>
      {hot && <rect x={x} y={y} width={w} height={h} rx="10" fill={C.accent} opacity="0.22" filter={`url(#${ids.bloom})`} />}
      <Panel x={x} y={y} w={w} h={h} hot={hot}>
        <rect x={x + 8} y={y + 8} width={w - 16} height={ih} rx="6" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <circle cx={x + w / 2} cy={y + 8 + ih / 2} r={ih * 0.24} fill={hot ? C.accent : C.faint} opacity={hot ? 0.75 : 1} />
        <Lines x={x + 10} y={y + ih + 18} w={w - 20} rows={2} gap={9} thick={4} accentFirst={hot} />
        <Chip x={x + w - 44} y={y + 12} w={36} h={16} hot />
      </Panel>
    </g>
  );
}

function Scene() {
  return (
    <g>
      {/* Vitrin */}
      <Browser x={36} y={44} w={348} h={262}>
        <rect x={52} y={76} width={316} height={44} rx="8" fill={C.accent} fillOpacity="0.14" stroke={C.hot} strokeWidth="0.9" />
        <Lines x={68} y={90} w={150} rows={2} gap={10} thick={5} accentFirst />
        <rect x={290} y={88} width={62} height={20} rx="10" fill={C.accent} fillOpacity="0.3" stroke={C.hot} strokeWidth="1" />
        <Product x={52} y={134} w={96} h={156} />
        <Product x={162} y={134} w={96} h={156} hot />
        <Product x={272} y={134} w={96} h={156} />
      </Browser>

      {/* Sepet */}
      <g className="sv-float">
        <circle cx={410} cy={96} r={21} fill={C.bg} stroke={C.accent} strokeWidth="1.1" />
        <Cart x={405} y={92} s={22} />
      </g>

      <Beam d="M368 200 C 404 200, 412 150, 440 148" delay={0} />
      <Node x={440} y={148} r={4.5} hot />

      {/* Izleme paneli: geri sayim, trafik ve siparisler */}
      <Panel x={440} y={60} w={170} h={236} hot>
        <Lines x={458} y={78} w={80} rows={1} thick={5} accentFirst />
        <Clock cx={578} cy={84} r={18} hand={0.86} hot />
        <rect x={458} y={112} width={134} height={1} fill={C.line} />
        <Bars x={458} y={124} w={134} h={78} values={[0.22, 0.3, 0.36, 0.5, 0.68, 0.96]} hotIndex={5} />
        <rect x={458} y={214} width={134} height={1} fill={C.line} />
        <Spark x={458} y={226} w={134} h={50} points={[0.1, 0.16, 0.2, 0.34, 0.5, 0.62, 0.9]} />
      </Panel>
    </g>
  );
}
