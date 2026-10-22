import { WORKS, type Project, type Work } from '@/lib/data';

// Yalnızca projeler sayfasındaki Seçilmiş Projeler tablosunun görünürlüğü.
const HIDDEN_PROJECT_SLUGS = new Set([
  'jet-transfer-cyprus',
  'boon-fresh',
  'halas-exchange',
  'arslan-estates',
  'arslan-coin-center',
  'arslan-group',
  'sosyal-piton',
  'kardesler-taxi',
  'welcome-pickups',
  'odeme-takip-botu',
  'deprem-erken-uyari',
  'arac-takip-yolo',
  'trafik-levha-okuma',
  'yuz-duygu-analizi',
  'hava-goruntu-segmentasyonu',
  'fuze-gudum-simulasyonu',
  'contentflow-ai',
  'social-pro',
  'holly-trader',
  'emlak-sync',
  'dolmus-kontrol',
  'ekh-yapi',
  'ozge-ozler',
  'rnv-trading',
  'homes-in-mediterranean',
  'aydin-transfer',
  'all-pro-cyprus',
  'pampas-investment',
]);

export const PROJECT_LIST_WORKS: Work[] = WORKS.filter(
  (work) => !HIDDEN_PROJECT_SLUGS.has(work.slug)
);

// Detay sayfasındaki önceki/sonraki yalnızca tabloda görünen projeler arasında döner;
// tablodan gizli projelerin detay sayfasında gezinti gösterilmez.
export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const all = PROJECT_LIST_WORKS.map((work) => ({ ...work, type: "work" as const }));
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? all[idx - 1] : all[all.length - 1],
    next: idx < all.length - 1 ? all[idx + 1] : all[0],
  };
}

// Projeler sayfasındaki ekran görüntüsü şeridi (desktop/mobil) görünürlüğü;
// tablo ve detay sayfaları bundan etkilenmez.
export const SHOWCASE_HIDDEN_SLUGS: ReadonlySet<string> = new Set([
  'halas-exchange',
  'arslan-estates',
  'arslan-group',
  'ozge-ozler',
  'rnv-trading',
  'kardesler-taxi',
  'homes-in-mediterranean',
  'all-pro-cyprus',
  'ekh-yapi',
  'pampas-investment',
  'arslan-coin-center',
  'aydin-transfer',
]);
