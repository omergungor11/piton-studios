'use client';

import { Ambient, ArtFrame, Arrow, Bars, Beam, Bubble, C, Chip, Cube, Lines, Panel, Stack, useArt } from '../kit';

/**
 * AI Mode reklam eslemesi: uzun kullanici sorusu -> yapay zeka yanit paneli (icinde sponsorlu kart). Panelden iki yol:
 * ustte ince yol, kisa ve acik niyetli sorgunun tam eslemeli anahtar kelimeyle reklama baglanmasi; altta daha kalin yol,
 * soru ve yanitin birlikte degerlendirildigi baglamsal eslemeyle genis esleme / AI Max kampanyalari. Iki yol en sagdaki
 * tek toplu rapor paneline akiyor.
 */
export default function GoogleAiModeAdsFigure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={300} cy={200} r={280} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Uzun soru */}
      <Bubble x={14} y={160} w={98} h={70} side="left" rows={5} />
      <Beam d="M112 196 L 140 196" delay={0.1} />
      <Arrow x={140} y={196} s={7} />

      {/* Yanit paneli + sponsorlu kart */}
      <rect x={144} y={110} width={140} height={176} rx="14" fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
      <Panel x={144} y={110} w={140} h={176} hot>
        <circle className="sv-pulse" cx={160} cy={128} r={5} fill={C.hot} />
        <Lines x={172} y={125} w={96} rows={4} gap={10} thick={4} />
        <rect x={156} y={178} width={116} height={92} rx="7" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="1" />
        <rect x={166} y={188} width={36} height={36} rx="5" fill={C.accent} fillOpacity="0.25" stroke={C.hot} strokeWidth="0.8" />
        <Lines x={210} y={192} w={52} rows={3} gap={10} thick={4} accentFirst />
        <rect x={166} y={238} width={60} height={6} rx="3" fill={C.faint} />
        <rect x={166} y={252} width={30} height={8} rx="4" fill={C.hot} opacity="0.8" />
      </Panel>

      {/* Ust yol: kisa ticari sorgu -> tam esleme */}
      <Beam d="M284 150 C 304 150, 310 96, 336 96" delay={0.4} width={1.1} faint />
      <Panel x={336} y={58} w={124} h={76}>
        <rect x={350} y={72} width={56} height={14} rx="7" fill={C.bg2} stroke={C.line} strokeWidth="0.8" />
        <rect x={358} y={77} width={36} height={4} rx="2" fill={C.faint} />
        <Chip x={350} y={98} w={70} h={20} />
        <rect x={430} y={100} width={16} height={16} rx="4" fill={C.faint} />
      </Panel>

      {/* Alt yol: baglamsal esleme -> genis esleme / AI Max */}
      <Beam d="M284 244 C 304 244, 310 290, 336 290" delay={0.6} width={2.6} />
      <rect x={336} y={226} width={124} height={128} rx="14" fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
      <Panel x={336} y={226} w={124} h={128} hot>
        <circle className="sv-pulse" cx={372} cy={270} r={22} fill="none" stroke={C.hot} strokeWidth="1" opacity="0.6" />
        <Cube x={372} y={272} s={18} hot />
        <Stack x={404} y={250} w={44} count={5} gap={13} hotIndex={2} />
        <Chip x={350} y={318} w={96} h={20} hot />
      </Panel>

      {/* Toplu rapor */}
      <Beam d="M460 96 C 484 96, 488 170, 506 170" delay={0.9} faint />
      <Beam d="M460 290 C 484 290, 488 210, 506 210" delay={1.0} />
      <Arrow x={506} y={190} s={7} />
      <Panel x={510} y={120} w={116} h={140}>
        <line x1={510} y1={142} x2={626} y2={142} stroke={C.line} strokeWidth="0.8" />
        <circle cx={524} cy={131} r={3} fill={C.faint} />
        <circle cx={534} cy={131} r={3} fill={C.faint} />
        <Bars x={522} y={154} w={92} h={60} values={[0.4, 0.55, 0.5, 0.75, 0.9]} hotIndex={4} />
        <Lines x={524} y={226} w={84} rows={2} gap={10} thick={4} />
      </Panel>
    </g>
  );
}
