'use client';

import { Ambient, ArtFrame, Beam, Browser, C, Check, Chip, Cross, Cube, Floor, Grid, Panel, Reflection, useArt } from '../kit';

/**
 * E-ticarette yorum ve indirim kurallari — ortada urun sayfasi: urun gorseli ve alti yildiz satirlari; her
 * dogrulanmis yorumun yaninda onay, siparise bagli olmayan soluk satir carpiyla ayrilmis. Solda yapay zeka
 * kupu ve acik bir etiket (aciklama zorunlulugu). Sagda fiyat etiketi: ustteki eski fiyat cizili, altinda on
 * gunluk fiyat gecmisi takvimi ve en dusuk gun vurgulu.
 */
export default function TurkiyeEcommerceReviewDiscountRulesArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={260} />
      <Floor horizon={320} vx={320} />
      <Reflection cx={320} cy={336} rx={170} ry={12} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function star(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return pts.join(' ');
}

function Stars({ x, y, filled, hot }: { x: number; y: number; filled: number; hot: boolean }) {
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => (
        <polygon
          key={i}
          points={star(x + i * 14, y, 5.5)}
          fill={i < filled ? (hot ? C.hot : C.muted) : 'none'}
          stroke={i < filled ? 'none' : C.line}
          strokeWidth="0.8"
          opacity={i < filled ? 0.9 : 1}
        />
      ))}
    </g>
  );
}

const REVIEWS = [
  { y: 196, filled: 5, hot: true },
  { y: 228, filled: 3, hot: false },
  { y: 260, filled: 4, hot: false },
];

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Yapay zeka icerigi + aciklama etiketi */}
      <Panel x={34} y={112} w={128} h={128}>
        <Cube x={98} y={158} s={28} />
        <Chip x={67} y={204} w={62} h={20} hot />
      </Panel>
      <Beam d="M162 176 C 186 176, 196 176, 214 176" delay={0.3} faint />

      {/* Urun sayfasi ve yorumlar */}
      <rect x={214} y={70} width={212} height={240} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Browser x={214} y={70} w={212} h={240} hot>
        <rect x={230} y={104} width={84} height={64} rx="6" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="0.8" />
        <rect x={326} y={108} width={84} height={8} rx="4" fill={C.ink} opacity="0.7" />
        <rect x={326} y={124} width={60} height={5} rx="2.5" fill={C.faint} />
        <rect x={326} y={148} width={48} height={14} rx="4" fill={C.hot} opacity="0.85" />
        <line x1={230} y1={182} x2={410} y2={182} stroke={C.line} strokeWidth="0.8" />
        {REVIEWS.map((r) => (
          <g key={r.y}>
            <Stars x={238} y={r.y} filled={r.filled} hot={r.hot} />
            <rect x={312} y={r.y - 3} width={64} height={5} rx="2.5" fill={C.faint} />
            <circle cx={396} cy={r.y} r={9} fill={C.bg} stroke={r.hot ? C.hot : C.line} strokeWidth="0.9" />
            <Check x={397} y={r.y + 1} s={10} hot={r.hot} />
          </g>
        ))}
        <g opacity="0.45">
          <rect x={230} y={280} width={180} height={18} rx="5" fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="4 4" />
          <Stars x={238} y={289} filled={5} hot={false} />
        </g>
      </Browser>
      <circle cx={426} cy={289} r={11} fill={C.bg} stroke={C.line} strokeWidth="0.9" />
      <Cross x={426} y={289} s={11} />

      {/* Fiyat etiketi + on gunluk gecmis */}
      <Beam d="M426 150 C 446 150, 452 146, 470 144" delay={0.9} />
      <g className="sv-float">
        <Panel x={470} y={92} w={140} h={176}>
          <path d="M490 112 L 572 112 L 590 132 L 572 152 L 490 152 Z" fill={C.bg2} stroke={C.hot} strokeWidth="1" />
          <circle cx={572} cy={132} r={3.5} fill="none" stroke={C.hot} strokeWidth="1" />
          <rect x={500} y={121} width={46} height={5} rx="2.5" fill={C.muted} opacity="0.6" />
          <line x1={496} y1={124} x2={552} y2={124} stroke={C.hot} strokeWidth="1.4" />
          <rect x={500} y={136} width={56} height={8} rx="4" fill={C.hot} opacity="0.9" />
          <Grid x={488} y={176} cols={5} rows={2} cell={18} gap={4} hot={[6]} />
          <rect x={488} y={230} width={106} height={4} rx="2" fill={C.faint} />
          <rect className="sv-pulse" x={510} y={198} width={18} height={18} rx="3" fill="none" stroke={C.hot} strokeWidth="1.4" />
        </Panel>
      </g>
    </g>
  );
}
