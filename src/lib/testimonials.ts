// Vaka sonuc kartlari — anasayfa "Referanslar" sahnesi.
// Bunlar musteri alintisi DEGIL: her kart bizim agzimizdan, data.ts'teki
// proje kapsamiyla dogrulanabilir bir sonuc cumlesi tasir. Metinler
// messages/*.json -> testimonials.results.{id} altindadir.
export interface CaseResult {
  id: string; // messages anahtari: testimonials.results.{id}
  workSlug: string;
}

export const CASE_RESULTS: CaseResult[] = [
  { id: "ambalajCini", workSlug: "ambalaj-cini" },
  { id: "nexos", workSlug: "nexos-investment" },
  { id: "sammys", workSlug: "sammys-hotel" },
  { id: "emlakSync", workSlug: "emlak-sync" },
  { id: "radyoJuke", workSlug: "radyo-juke" },
  { id: "lefkosaTaksi", workSlug: "kibris-lefkosa-taksi" },
];
