# Nippo — marka yazıları

- Tasarımcı: Indian Type Foundry.
- Resmi kaynak: https://www.fontshare.com/fonts/nippo
- Lisans: ITF Free Font License 2.0 (17 Ağustos 2026); ücretsiz ticari kullanım ve kendi sitesinde self-hosting izni.
- Lisans metni: `nippo-license.txt`; güncel kaynak https://www.fontshare.com/licenses/itf-ffl
- Kullanım: hero piton başlığı (700), nav ve mobil menüde logo yanındaki piton yazısı ve hero rozetleri (500).
- Anasayfa başlık vurguları: “Konuşalım”, “Piton?”, “altı adımda” ve “projelerden” (700, normal stil).
- Anasayfa bölüm etiketleri: Öne Çıkan Projeler, Not, Hizmetler, Nasıl Çalışıyoruz, İletişim ve Spark CTA üst etiketi (500).
- Kayıtlı `AboutScene` bileşenindeki “ürünler” vurgusu 700, üst etiket 500 kullanır; bu bölüm anasayfada gösterilmez.

Font ikilileri public Git deposuna eklenmez. `pnpm dev` ve `pnpm build`,
`scripts/fetch-brand-fonts.mjs` ile eksik dosyaları doğrudan resmi Fontshare CDN'inden
indirir. Sonraki çalıştırmalarda yerel dosyalar yeniden kullanılır.
Site ziyaretçilerine fontlar `next/font/local` ile sitenin kendi alan adından sunulur.

## Qurova DEMO — kayıtlı aday

- Kaynak: https://www.1001fonts.com/qurova-demo-font.html
- Kullanılan sürüm: Qurova DEMO Bold 700, yalnızca yerel `/tr/font-lab` karşılaştırması.
- Demo kişisel kullanım içindir. Ticari kullanım için tam sürüm lisansı gerekir:
  https://prioritypeco.com/product/qurova-logo-font/
- Paketle gelen lisans notu: `qurova-demo-license.txt`.

Qurova dosyası gitignore'da tutulur; `pnpm dev/build` eksikse kaynaktan indirir.
Ana sitedeki Nippo seçimi bu adayın saklanmasından etkilenmez.
