'use client';

import { Ambient, ArtFrame, Bars, Beam, C, Chip, Floor, Node, Panel, Reflection, Spark, Split, useArt } from '../kit';

/**
 * Google Ads mi SEO mu — solda butceye bagli musluk: acikken trafik hemen gelir, kapaninca duser;
 * sagda yavas basliyip birikerek yukselen organik gorunurluk.
 */
export default function GoogleAdsVsSeoArt({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={452} cy={168} r={240} />
      <Floor horizon={308} vx={340} />
      <Reflection cx={340} cy={332} rx={190} ry={13} opacity={0.4} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Butce → musluk → aninda trafik */}
      <Panel x={40} y={54} w={236} h={232}>
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={98} cy={110 + i * 14} rx={30} ry={10} fill={i === 0 ? C.accent : '#1F1D1C'} fillOpacity={i === 0 ? 0.6 : 1} stroke={C.line} strokeWidth="0.8" />
        ))}
        <rect x={86} y={150} width={24} height={34} rx="4" fill="#FFFFFF" fillOpacity="0.05" stroke={C.line} strokeWidth="0.8" />
        {/* Musluk kolu */}
        <rect x={72} y={186} width={52} height={16} rx="8" fill={C.bg2} stroke={C.accent} strokeWidth="1.1" />
        <circle cx={112} cy={194} r="5" fill={C.hot} filter={`url(#${ids.glow})`} />
        <Beam d="M98 204 C 98 222, 140 218, 156 226" delay={0} />
        {/* Butce durdugu anda duzlesen trafik */}
        <Spark x={150} y={104} w={110} h={96} points={[0.08, 0.86, 0.9, 0.84, 0.88, 0.12, 0.1]} />
        <line x1={224} y1={104} x2={224} y2={200} stroke={C.line} strokeWidth="0.9" strokeDasharray="3 5" />
        <Chip x={150} y={216} w={62} h={18} hot />
        <Node x={156} y={226} r={4} hot />
      </Panel>

      <Split x={316} top={62} bottom={296} />

      {/* Yavas ama biriken organik gorunurluk */}
      <Panel x={356} y={54} w={244} h={232} hot>
        <Bars x={378} y={108} w={200} h={110} values={[0.12, 0.18, 0.3, 0.44, 0.62, 0.84]} hotIndex={5} />
        <Spark x={378} y={108} w={200} h={110} points={[0.12, 0.18, 0.3, 0.44, 0.62, 0.84]} fill={false} />
        <line x1={378} y1={218} x2={578} y2={218} stroke={C.line} strokeWidth="0.9" />
        {/* Birikim: yayinlanan icerik parcalari */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={378 + i * 34} y={234} width={26} height={20} rx="4" fill="#FFFFFF" fillOpacity="0.05" stroke={i === 3 ? C.accent : C.line} strokeWidth="0.8" />
        ))}
        <Chip x={518} y={234} w={58} h={20} />
        <Beam d="M378 262 L578 262" delay={0.4} faint width={1.2} />
      </Panel>
    </g>
  );
}
