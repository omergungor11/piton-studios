'use client';

import { Ambient, ArtFrame, Bars, Beam, C, Cube, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

/** Ozel Yazilim — ust uste kurulmus modul bloklari, merkezde parlayan cekirdek; surec haritasindan panele akan veri hatti. */
export default function CustomSoftwareArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={390} cy={190} r={250} />
      <Floor horizon={300} vx={390} />
      <Reflection cx={390} cy={328} rx={170} ry={14} opacity={0.5} />
      <Scene />
    </ArtFrame>
  );
}

function Person({ x, y, hot = false }: { x: number; y: number; hot?: boolean }) {
  return (
    <g fill={hot ? C.accent : C.muted} opacity={hot ? 1 : 0.8}>
      <circle cx={x} cy={y} r="6" />
      <path d={`M${x - 11} ${y + 20} Q${x - 11} ${y + 8} ${x} ${y + 8} Q${x + 11} ${y + 8} ${x + 11} ${y + 20} Z`} />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Cekirdegin etrafindaki yorunge */}
      <ellipse cx={390} cy={214} rx={138} ry={40} fill="none" stroke={C.line} strokeWidth="0.8" strokeDasharray="3 7" />

      {/* Modul yigini: arkadan one */}
      <Cube x={351.9} y={228} s={44} />
      <Cube x={428.1} y={228} s={44} />
      <Cube x={428.1} y={184} s={44} />
      <Cube x={390} y={250} s={44} />
      <Cube x={390} y={206} s={44} hot />
      <circle cx={390} cy={184} r={30} fill={C.hot} opacity="0.35" filter={`url(#${ids.bloom})`} />

      {/* Surec haritasi paneli: kutular + karar noktasi */}
      <g className="sv-float">
        <Panel x={56} y={96} w={170} h={118}>
          <Lines x={70} y={110} w={80} rows={1} thick={4} accentFirst />
          <rect x={70} y={130} width={36} height={20} rx="4" fill="none" stroke={C.line} />
          <path d="M140 126 L154 140 L140 154 L126 140 Z" fill="none" stroke={C.hot} strokeWidth="1.1" />
          <rect x={176} y={130} width={36} height={20} rx="4" fill={C.faint} />
          <rect x={120} y={178} width={40} height={20} rx="4" fill="none" stroke={C.line} />
          <path d="M106 140 L126 140 M154 140 L176 140 M140 154 L140 178" stroke={C.muted} strokeWidth="0.9" fill="none" />
        </Panel>
      </g>

      {/* Cikti paneli: rol bazli yonetim paneli */}
      <g className="sv-float" style={{ animationDelay: '-3.5s' }}>
        <Panel x={492} y={82} w={118} h={112} hot>
          <rect x={502} y={94} width={28} height={88} rx="4" fill={C.faint} />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={516} cy={108 + i * 16} r="3" fill={i === 0 ? C.hot : C.muted} />
          ))}
          <Lines x={538} y={96} w={60} rows={2} gap={8} thick={3} />
          <Bars x={536} y={122} w={64} h={58} values={[0.4, 0.65, 0.5, 0.9, 0.7]} hotIndex={3} />
        </Panel>
      </g>

      {/* Belge / rapor ciktisi */}
      <g transform="translate(540 214) skewY(-6)">
        <Panel x={0} y={0} w={58} h={72} r={6}>
          <rect x={8} y={10} width={20} height={4} rx="2" fill={C.accent} />
          <Lines x={8} y={22} w={40} rows={4} gap={8} thick={3} />
        </Panel>
      </g>

      {/* Veri hatti: surecten cekirdege, cekirdekten panele */}
      <Beam d="M226 156 C 280 160, 300 214, 334 226" />
      <Beam d="M466 184 C 478 170, 480 142, 492 138" delay={0.5} />
      <Beam d="M466 244 C 500 250, 518 250, 540 244" delay={0.9} faint />
      <Node x={226} y={156} />
      <Node x={390} y={162} hot />
      <Node x={492} y={138} />

      {/* Kullanicilar */}
      <Person x={150} y={250} />
      <Person x={180} y={262} hot />
      <Person x={210} y={250} />
      <path d="M224 262 C 260 270, 290 268, 312 258" fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="2 5" />
    </g>
  );
}
