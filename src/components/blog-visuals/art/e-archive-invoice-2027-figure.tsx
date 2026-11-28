'use client';

import { Ambient, ArtFrame, Arrow, Beam, Browser, C, Cart, Check, Cross, Cube, Doc, Lines, Panel, Stack, useArt } from '../kit';

/**
 * Siparisten faturaya otomatik akis: e-ticaret sitesinde tamamlanan siparis -> alici bilgisini kontrol eden karar
 * noktasi (eskenar dortgen). Ustte ince yol e-Fatura belgesine (alici e-Fatura kullanicisi), altta kalin yol e-Arsiv
 * belgesine (son tuketici). Iki yol entegrator paneline, oradan onay isaretli sistem paneline akiyor. Altta elle
 * doldurulan kesik cizgili kagit fatura carpi ile isaretli.
 */
export default function EArchiveInvoice2027Figure({ label }: { label: string }) {
  return (
    <ArtFrame label={label}>
      <Ambient cx={320} cy={180} r={280} />
      <Scene />
    </ArtFrame>
  );
}

function Scene() {
  const ids = useArt();
  return (
    <g>
      {/* Siparis */}
      <Browser x={14} y={110} w={112} h={112} hot>
        <Cart x={52} y={156} s={26} />
        <rect x={30} y={192} width={80} height={8} rx="4" fill={C.hot} opacity="0.75" />
        <rect x={30} y={206} width={52} height={5} rx="2.5" fill={C.faint} />
      </Browser>
      <Beam d="M126 166 L 160 166" delay={0.1} />

      {/* Karar noktasi */}
      <path d="M186 140 L 212 166 L 186 192 L 160 166 Z" fill={`url(#${ids.panelHot})`} stroke={C.hot} strokeWidth="1.1" />
      <circle className="sv-pulse" cx={186} cy={166} r={5} fill={C.hot} />

      {/* Ust yol: e-Fatura */}
      <Beam d="M212 166 C 232 166, 236 96, 262 96" delay={0.3} width={1.1} faint />
      <Panel x={262} y={52} w={96} h={88}>
        <Doc x={278} y={60} w={48} h={66} rows={3} />
        <rect x={334} y={64} width={14} height={14} rx="3" fill={C.faint} />
      </Panel>

      {/* Alt yol: e-Arsiv */}
      <Beam d="M212 166 C 232 166, 236 236, 262 236" delay={0.5} width={2.6} />
      <rect x={262} y={184} width={96} height={104} rx="14" fill={C.accent} opacity="0.12" filter={`url(#${ids.bloom})`} />
      <Panel x={262} y={184} w={96} h={104} hot>
        <Doc x={278} y={194} w={52} h={76} hot rows={4} />
        <circle className="sv-pulse" cx={342} cy={202} r={5} fill={C.hot} />
      </Panel>

      {/* Entegrator */}
      <Beam d="M358 96 C 384 96, 390 156, 412 156" delay={0.7} faint />
      <Beam d="M358 236 C 384 236, 390 180, 412 180" delay={0.8} />
      <Arrow x={412} y={168} s={7} />
      <rect x={416} y={118} width={92} height={100} rx="14" fill={C.accent} opacity="0.1" filter={`url(#${ids.bloom})`} />
      <Panel x={416} y={118} w={92} h={100} hot>
        <circle className="sv-pulse" cx={446} cy={168} r={20} fill="none" stroke={C.hot} strokeWidth="1" opacity="0.6" />
        <Cube x={446} y={170} s={16} hot />
        <Stack x={472} y={140} w={24} count={4} gap={13} hotIndex={1} />
      </Panel>

      {/* Sistem */}
      <Beam d="M508 168 L 532 168" delay={1.0} />
      <Arrow x={532} y={168} s={7} />
      <Panel x={536} y={110} w={90} h={116}>
        <line x1={536} y1={130} x2={626} y2={130} stroke={C.line} strokeWidth="0.8" />
        <circle cx={548} cy={120} r={3} fill={C.faint} />
        <circle cx={558} cy={120} r={3} fill={C.faint} />
        <Lines x={548} y={142} w={62} rows={3} gap={11} thick={4} />
        <circle cx={581} cy={198} r={15} fill={C.accent} fillOpacity="0.2" stroke={C.hot} strokeWidth="1.1" />
        <Check x={581} y={198} s={15} />
      </Panel>

      {/* Elle kagit fatura (bitiyor) */}
      <g opacity="0.55">
        <rect x={40} y={262} width={64} height={84} rx="5" fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="4 5" />
        <Lines x={50} y={280} w={42} rows={5} gap={11} thick={3} />
      </g>
      <path d="M104 304 C 150 304, 170 320, 210 320" fill="none" stroke={C.line} strokeWidth="1" strokeDasharray="3 6" />
      <circle cx={224} cy={320} r={13} fill={C.bg2} stroke={C.line} strokeWidth="0.9" />
      <Cross x={224} y={320} s={10} />
    </g>
  );
}
