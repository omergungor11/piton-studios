'use client';

interface BgStageProps {
  /**
   * Aktif sahne kimligi — yalnizca anasayfada anlamli, ic sayfalarda verilmez.
   * `data-scene` su an CSS'te kullanilmiyor; sahneye ozel arka plan icin kanca.
   */
  active?: string;
}

export default function BgStage({ active }: BgStageProps) {
  return (
    <div className="bg-stage" data-scene={active}>
      <div className="aurora">
        <span className="aurora-blob aurora-1" />
        <span className="aurora-blob aurora-2" />
        <span className="aurora-blob aurora-3" />
        <span className="aurora-blob aurora-4" />
      </div>
      <div className="bg-veil" />
    </div>
  );
}
