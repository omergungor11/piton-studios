import { WORKS, type Work } from '@/lib/data';

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
]);

export const PROJECT_LIST_WORKS: Work[] = WORKS.filter(
  (work) => !HIDDEN_PROJECT_SLUGS.has(work.slug)
);
