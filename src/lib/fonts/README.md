# Nippo — marka yazıları

- Tasarımcı: Indian Type Foundry.
- Resmi kaynak: https://www.fontshare.com/fonts/nippo
- Lisans: ITF Free Font License 2.0 (17 Ağustos 2026); ücretsiz ticari kullanım ve kendi sitesinde self-hosting izni.
- Lisans metni: `nippo-license.txt`; güncel kaynak https://www.fontshare.com/licenses/itf-ffl
- Kullanım: hero Piton başlığı (700), nav ve mobil menüde logo yanındaki Piton yazısı (500).

Font ikilileri public Git deposuna eklenmez. `pnpm dev` ve `pnpm build`,
`scripts/fetch-brand-fonts.mjs` ile eksik dosyaları doğrudan resmi Fontshare CDN'inden
indirir. Sonraki çalıştırmalarda yerel dosyalar yeniden kullanılır.
Site ziyaretçilerine fontlar `next/font/local` ile sitenin kendi alan adından sunulur.
