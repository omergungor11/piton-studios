'use client';

import { Ambient, ArtFrame, Bars, Beam, C, Cube, Floor, Lines, Node, Panel, Reflection, useArt } from '../kit';

type Module = { x: number; y: number; hot?: boolean; icon: 'coins' | 'box' | 'bars' | 'network' };

const MODULES: Module[] = [
  { x: 64, y: 64, icon: 'coins' },
  { x: 470, y: 50, icon: 'box' },
  { x: 52, y: 206, icon: 'bars', hot: true },
  { x: 482, y: 196, icon: 'network' },
];

/** ERP & CRM — merkezdeki tek veri hub'i ve cevresinde cari, stok, satis ve bayi modulleri; hepsinden hub'a akan veri. */
export default function ErpCrmArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={340} cy={200} r={240} />
      <Floor horizon={296} vx={340} />
      <Reflection cx={340} cy={316} rx={170} ry={14} opacity={0.55} />
      <Scene />
    </ArtFrame>
  );
}

function Icon({ x, y, icon }: { x: number; y: number; icon: Module['icon'] }) {
  if (icon === 'coins') {
    return (
      <g fill={C.bg2} stroke={C.hot} strokeWidth="1.1">
        {[2, 1, 0].map((i) => (
          <ellipse key={i} cx={x + 14} cy={y + 20 - i * 6} rx={12} ry={4} />
        ))}
      </g>
    );
  }
  if (icon === 'box') {
    return (
      <path
        d={`M${x + 14} ${y + 2} l13 6 v14 l-13 6 l-13 -6 v-14 Z M${x + 1} ${y + 8} l13 6 l13 -6 M${x + 14} ${y + 14} v14`}
        fill="none"
        stroke={C.hot}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    );
  }
  if (icon === 'bars') return <Bars x={x} y={y} w={30} h={28} values={[0.4, 0.7, 1]} hotIndex={2} />;
  return (
    <g stroke={C.hot} strokeWidth="1.1" fill={C.bg2}>
      <path d={`M${x + 14} ${y + 6} L${x + 3} ${y + 24} M${x + 14} ${y + 6} L${x + 26} ${y + 24} M${x + 3} ${y + 24} L${x + 26} ${y + 24}`} fill="none" />
      <circle cx={x + 14} cy={y + 6} r="4" />
      <circle cx={x + 3} cy={y + 24} r="3.5" />
      <circle cx={x + 26} cy={y + 24} r="3.5" />
    </g>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Hub platformu */}
      <ellipse cx={340} cy={278} rx={124} ry={30} fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
      <ellipse cx={340} cy={268} rx={124} ry={30} fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.9" />
      <ellipse cx={340} cy={268} rx={84} ry={20} fill="none" stroke={C.accent} strokeOpacity="0.7" strokeWidth="1" />
      <ellipse cx={340} cy={268} rx={176} ry={46} fill="none" stroke={C.line} strokeWidth="0.8" strokeDasharray="3 7" />

      {/* Cekirdek: tek dogru kaynak */}
      <Cube x={340} y={214} s={50} hot />
      <circle cx={340} cy={176} r={30} fill={C.hot} opacity="0.3" filter={`url(#${ids.bloom})`} />
      <Node x={340} y={164} hot />

      {/* Moduller */}
      {MODULES.map((m, i) => (
        <g key={m.icon} className="sv-float" style={{ animationDelay: `${-i * 1.7}s` }}>
          <Panel x={m.x} y={m.y} w={120} h={78} hot={m.hot}>
            <rect x={m.x + 12} y={m.y + 14} width={40} height={40} rx="10" fill="#FFFFFF" fillOpacity="0.04" stroke={C.line} strokeWidth="0.6" />
            <Icon x={m.x + 17} y={m.y + 19} icon={m.icon} />
            <Lines x={m.x + 62} y={m.y + 18} w={46} rows={3} gap={9} thick={3} accentFirst={m.hot} />
            <rect x={m.x + 12} y={m.y + 62} width={96} height={4} rx="2" fill={C.faint} />
            <rect x={m.x + 12} y={m.y + 62} width={40 + i * 14} height={4} rx="2" fill={C.accent} opacity="0.8" />
          </Panel>
        </g>
      ))}

      {/* Modullerden hub'a veri */}
      <Beam d="M184 120 C 240 130, 262 200, 280 254" />
      <Beam d="M470 104 C 420 118, 414 200, 400 254" delay={0.5} />
      <Beam d="M172 250 C 200 256, 214 262, 232 264" delay={1} />
      <Beam d="M482 238 C 462 250, 456 258, 446 262" delay={1.5} faint />
      <Node x={280} y={254} />
      <Node x={400} y={254} />
      <Node x={232} y={264} />
      <Node x={446} y={262} />
    </g>
  );
}
