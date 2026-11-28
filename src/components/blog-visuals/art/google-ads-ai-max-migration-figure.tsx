'use client';

import { Ambient, ArtFrame, Arrow, Beam, Browser, C, Chip, Clock, Cross, Doc, Lines, Node, Panel, Shield, Stack, useArt } from '../kit';

/**
 * Gecis oncesi / sonrasi. Solda klasik arama kampanyasi: secili anahtar kelime cipleri, tek reklam
 * metni, tek hedef sayfa. Ortada gecis tarihi (saat + ok). Sagda AI Max: arama terimi eslestirme ile
 * cogalan sorgular, metin ozellestirme ile degisen baslik yigini, son URL genisletme ile birden fazla
 * sayfa. Altta reklamverenin elindeki kontroller: marka/URL haric tutma.
 */
export default function GoogleAdsAiMaxMigrationFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={190} r={270} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Once: klasik kampanya */}
      <Panel x={22} y={40} w={196} h={250}>
        <Lines x={38} y={56} w={80} rows={1} thick={5} />
        <Chip x={38} y={76} w={70} hot />
        <Chip x={114} y={76} w={86} />
        <Chip x={38} y={104} w={86} />
        <rect x={38} y={140} width={162} height={60} rx="8" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <rect x={50} y={152} width={110} height={8} rx="4" fill={C.ink} opacity="0.85" />
        <Lines x={50} y={170} w={130} rows={2} gap={9} thick={4} />
        <Beam d="M119 200 C 119 214, 119 218, 119 226" delay={0.2} faint />
        <Doc x={92} y={226} w={54} h={52} rows={3} />
      </Panel>

      {/* Gecis */}
      <Clock cx={258} cy={148} r={22} hand={0.62} hot />
      <Beam d="M222 190 C 244 190, 272 190, 296 190" delay={0.4} />
      <Arrow x={298} y={190} angle={0} />

      {/* Sonra: AI Max */}
      <Panel x={312} y={22} w={306} h={286}>
        <Lines x={328} y={38} w={80} rows={1} thick={5} />
        {/* Arama terimi eslestirme */}
        <Chip x={328} y={58} w={70} hot />
        {[52, 74, 96, 118].map((y, i) => (
          <g key={y}>
            <Beam d={`M398 68 C 412 68, 414 ${y + 7}, 428 ${y + 7}`} delay={0.6 + i * 0.15} faint width={1.1} />
            <rect x={428} y={y} width={i % 2 ? 44 : 60} height={14} rx="7" fill={i % 2 ? '#FFFFFF' : C.accent} fillOpacity={i % 2 ? 0.04 : 0.22} stroke={i % 2 ? C.line : C.hot} strokeWidth="0.8" />
          </g>
        ))}
        <Node x={500} y={89} r={5} hot />
        {/* Metin ozellestirme */}
        <rect x={328} y={150} width={140} height={74} rx="8" fill={`url(#${ids.panel})`} stroke={C.line} strokeWidth="0.8" />
        <Stack x={340} y={162} w={116} count={4} gap={13} hotIndex={1} />
        {/* Son URL genisletme */}
        <Beam d="M468 186 C 488 186, 490 160, 508 158" delay={1.2} faint />
        <Beam d="M468 186 C 488 186, 490 212, 508 214" delay={1.4} faint />
        <Doc x={508} y={136} w={40} h={44} rows={2} hot />
        <Doc x={556} y={136} w={40} h={44} rows={2} />
        <Doc x={508} y={192} w={40} h={44} rows={2} />
        <Doc x={556} y={192} w={40} h={44} rows={2} hot />
        {/* Kontroller */}
        <rect x={328} y={250} width={274} height={44} rx="8" fill="#FFFFFF" fillOpacity="0.03" stroke={C.line} strokeWidth="0.8" strokeDasharray="4 5" />
        <Shield x={352} y={272} s={14} />
        <Cross x={392} y={272} s={14} />
        <Browser x={414} y={258} w={70} h={28} />
        <Cross x={506} y={272} s={14} />
        <rect x={524} y={268} width={62} height={8} rx="4" fill={C.faint} />
      </Panel>
    </g>
  );
}
