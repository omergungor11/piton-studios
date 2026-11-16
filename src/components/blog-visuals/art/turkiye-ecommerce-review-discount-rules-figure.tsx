'use client';

import { Ambient, ArtFrame, Arrow, Beam, C, Check, Clock, Cross, Doc, Panel, useArt } from '../kit';

/**
 * Yeni kurallara uygun yorum akisi, soldan saga: teslim edilen siparis (kutu + onay), siparise bagli yorum formu,
 * buyutecle yayin oncesi kontrol, saatli satici yanit suresi, tarihe gore dizilmis yildizli yorum listesi ve
 * takvim simgesi. Altta siparisle baglantisi olmayan yorum kesik cizgili yoldan carpiya gidiyor.
 */
export default function TurkiyeEcommerceReviewDiscountRulesFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={180} r={280} />
      <Scene />
    </ArtFrame>
  );
}

const Y = 80;
const PH = 140;
const PW = 108;
const XS = [14, 138, 262, 386, 510];

function star(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return pts.join(' ');
}

function Scene() {
  const ids = useArt();
  const mid = Y + PH / 2;
  return (
    <g>
      {/* 1. Teslim edilen siparis */}
      <Panel x={XS[0]} y={Y} w={PW} h={PH}>
        <path d={`M${XS[0] + 30} ${Y + 50} L ${XS[0] + 54} ${Y + 38} L ${XS[0] + 78} ${Y + 50} L ${XS[0] + 78} ${Y + 82} L ${XS[0] + 54} ${Y + 94} L ${XS[0] + 30} ${Y + 82} Z`} fill={C.bg2} stroke={C.muted} strokeWidth="1.1" strokeLinejoin="round" />
        <path d={`M${XS[0] + 30} ${Y + 50} L ${XS[0] + 54} ${Y + 62} L ${XS[0] + 78} ${Y + 50} M${XS[0] + 54} ${Y + 62} L ${XS[0] + 54} ${Y + 94}`} fill="none" stroke={C.muted} strokeWidth="1.1" />
        <circle cx={XS[0] + 54} cy={Y + 116} r={11} fill={C.bg} stroke={C.hot} strokeWidth="0.9" />
        <Check x={XS[0] + 55} y={Y + 117} s={11} />
      </Panel>

      {/* 2. Siparise bagli yorum formu */}
      <Panel x={XS[1]} y={Y} w={PW} h={PH}>
        {Array.from({ length: 5 }, (_, i) => (
          <polygon key={i} points={star(XS[1] + 22 + i * 16, Y + 30, 6)} fill={i < 4 ? C.hot : 'none'} stroke={i < 4 ? 'none' : C.line} strokeWidth="0.8" />
        ))}
        <rect x={XS[1] + 14} y={Y + 48} width={PW - 28} height={48} rx="5" fill="none" stroke={C.line} strokeWidth="0.9" />
        <rect x={XS[1] + 22} y={Y + 58} width={56} height={4} rx="2" fill={C.faint} />
        <rect x={XS[1] + 22} y={Y + 68} width={44} height={4} rx="2" fill={C.faint} />
        <rect x={XS[1] + 14} y={Y + 108} width={52} height={18} rx="5" fill={C.hot} opacity="0.85" />
        <circle cx={XS[1] + 84} cy={Y + 117} r={10} fill={C.bg} stroke={C.hot} strokeWidth="0.9" />
        <Check x={XS[1] + 85} y={Y + 118} s={10} />
      </Panel>

      {/* 3. Yayin oncesi kontrol */}
      <Panel x={XS[2]} y={Y} w={PW} h={PH}>
        <Doc x={XS[2] + 16} y={Y + 18} w={52} h={70} rows={4} />
        <circle className="sv-pulse" cx={XS[2] + 66} cy={Y + 74} r={20} fill="none" stroke={C.hot} strokeWidth="1.6" />
        <circle cx={XS[2] + 66} cy={Y + 74} r={17} fill={C.hot} opacity="0.08" />
        <line x1={XS[2] + 80} y1={Y + 88} x2={XS[2] + 94} y2={Y + 104} stroke={C.hot} strokeWidth="3" strokeLinecap="round" />
      </Panel>

      {/* 4. Satici yanit suresi */}
      <Panel x={XS[3]} y={Y} w={PW} h={PH}>
        <Clock cx={XS[3] + 54} cy={Y + 60} r={30} hand={0.5} hot />
        <rect x={XS[3] + 18} y={Y + 106} width={72} height={8} rx="4" fill={C.faint} />
        <rect x={XS[3] + 18} y={Y + 106} width={48} height={8} rx="4" fill={C.hot} opacity="0.8" />
      </Panel>

      {/* 5. Yayinda: tarihe gore dizili yorumlar + takvim */}
      <rect x={XS[4]} y={Y} width={PW + 8} height={PH} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Panel x={XS[4]} y={Y} w={PW + 8} h={PH} hot>
        <rect x={XS[4] + 14} y={Y + 14} width={24} height={22} rx="3" fill={C.bg2} stroke={C.hot} strokeWidth="0.9" />
        <line x1={XS[4] + 14} y1={Y + 21} x2={XS[4] + 38} y2={Y + 21} stroke={C.hot} strokeWidth="0.9" />
        <circle cx={XS[4] + 26} cy={Y + 28} r={2} fill={C.hot} />
        {[52, 80, 108].map((dy, r) => (
          <g key={dy}>
            {Array.from({ length: 5 }, (_, i) => (
              <polygon key={i} points={star(XS[4] + 20 + i * 12, Y + dy, 4.5)} fill={i < [5, 3, 4][r] ? (r === 0 ? C.hot : C.muted) : 'none'} stroke={i < [5, 3, 4][r] ? 'none' : C.line} strokeWidth="0.7" />
            ))}
            <rect x={XS[4] + 82} y={Y + dy - 2} width={22} height={4} rx="2" fill={C.faint} />
          </g>
        ))}
      </Panel>

      {/* Siradaki adim oklari */}
      {XS.slice(0, 4).map((x, i) => (
        <g key={x}>
          <Beam d={`M${x + PW} ${mid} L ${XS[i + 1] - 4} ${mid}`} delay={0.3 + i * 0.3} />
          <Arrow x={XS[i + 1] - 4} y={mid} s={7} />
        </g>
      ))}

      {/* Siparise bagli olmayan yorum: kesik yol -> carpi */}
      <g opacity="0.6">
        <rect x={XS[1] + 8} y={278} width={92} height={40} rx="8" fill="none" stroke={C.line} strokeWidth="0.9" strokeDasharray="5 5" />
        {Array.from({ length: 5 }, (_, i) => (
          <polygon key={i} points={star(XS[1] + 24 + i * 14, 298, 5)} fill={C.muted} />
        ))}
      </g>
      <path d={`M${XS[1] + 100} 298 L ${XS[2] + PW / 2 - 15} 298`} fill="none" stroke={C.line} strokeWidth="1.2" strokeDasharray="4 5" />
      <circle cx={XS[2] + PW / 2} cy={298} r={15} fill={C.bg} stroke={C.line} strokeWidth="0.9" />
      <Cross x={XS[2] + PW / 2} y={298} s={14} />
    </g>
  );
}
