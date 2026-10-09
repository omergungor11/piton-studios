# Piton - Project Memory

## Ajanlarla performans iyileştirmesi (2026-10-09)
- TASK-106: üç ajan CSS, IntentLink ve hizmet kataloğunu geliştirdi. Ortak CSS kaynağı 245.267 → 150.050 B; 11 ayrı stil modülü. Mobil anasayfa CSS transferi 80.499 → 29.454 B. Ortak CTA/önizleme/hareket cascade sırası korundu; 34 mobil/masaüstü karşılaştırmasında stil ve boyut farkı yok, istemci gezinmesinde stiller doğru.
- `font-lab` ve `projects-v2` sunucu sayfalarında `NODE_ENV === 'development'` koşuluyla dinamik import kullanılır. Salt production `notFound()` + statik client import, Turbopack'te font lab CSS'ini ortak pakete sızdırıyordu. Üretim font CSS'i 231 → 45 `@font-face`; üretim 404 / geliştirme 200, 26 font adayı ve 15 proje doğrulandı.
- `src/components/navigation/intent-link.tsx`: mevcut next-intl Link'i sarar; hover/focus/touch sonrası prefetch, açık false / Save-Data / 2G / çevrimdışı korunur. Link kullanan modüller yeni wrapper'ı import eder; router/usePathname gibi diğer API'ler `i18n/navigation` içinde kalır. Mobil blog 143 RSC → 0; kullanıcı niyetinde yalnız hedef yerelleştirilmiş URL indirilir.
- Hizmet katalog metinleri/cards sunucu slotlarıdır; yalnız filtreler istemcide. `service-art-loaders.ts` 18 doğrudan import içerir; kart 180 px yakına gelince SVG yükler, uzakta DOM'u kaldırır. Metin/bağlantı ve kart en/boy oranı korunur; TR/EN/RU filtre/kategori sayımları doğrulandı. HTML %45,4 ve JS %18,2 küçüldü; tüm SVG barrel'ını client'a yeniden eklemeyin.
- Aynı yerel varsayılan Turbopack profili, başlangıç `cffd1d1` (TASK-104 dahil): mobil anasayfa medyan 81 → 84, LCP 4,75 → 4,40 sn; hizmetler 83 → 88, LCP 4,42 → 3,89 sn; blog 86 → 89, iletişim 80 → 89. Projeler 86 → 85, ek tekrarlar 84/84; kaynak azalsa da bu sayfada skor artışı doğrulanmadı. Masaüstü 98–99. 34 Lighthouse, mobil ana matris CLS 0. LCP hâlâ iyileştirmeye açık; alan INP veya canlı skor iddiası yok.
- Plan ve tüm sınırlar `piton-plans/performance-followup.md`; kalıcı JSON `piton-docs/performance-followup-2026-10-09.json`. Ham dosyalar `tmp/performance-followup-2026-10-09/`. Menü/scroll lock, iki genişlikte 8 sayfalık istemci akışı, JS kapalı ilk ekranlar, 1000/1001 hero kırılımı, light tema, proje toggle/GPU pause/WebGL fallback geçti. Lint/typecheck/content 630/build 868 başarılı. Push/deploy henüz yapılmadı.
- Oturum sonundaki ayrı TASK-107 commit'i korundu; son production build/typecheck ve 390/1280 px hero kontrolü tekrar geçti. Son üç anasayfa ölçümü 84/84/83, medyan 84 / LCP 4,44 sn / TBT 10 ms / CLS 0. Toplam 37 Lighthouse; ana 32 ölçümlük matris font güncellemesinden önceki TASK-106 etkisini gösterir.

## Canlı performans denetimi (2026-10-09)
- TASK-105: 25 Lighthouse 13.5.0 ölçümü; dokuz TR sayfa türü mobil/masaüstü, TR anasayfa/hizmetler üçer mobil tekrar, EN/RU ve kök URL. Mobil TR anasayfa medyan 73 (72–73), LCP 3,65 sn, TBT 305 ms, 2,59 MiB; hizmetler medyan 78 (71–89), LCP 5,46 sn. Diğer örnek iç sayfalar 87–96; masaüstü 97–100. EN 77, RU 78; kök → EN 69 ve iki yönlendirme.
- Ölçülen canlı deployment `dpl_8pfgspyN7nipQzeMCW9PKARETtHY`; TASK-104 yerel `6a226dd` henüz canlı davranışta görünmüyor. Mobil ilk açılışta iki canvas (biri ekran dışında), ham hero img, 22 font ve ekran dışı proje dokuları var. Yerel 81–83 sonucu canlı skorla doğrudan önce/sonra karşılaştırması değildir.
- Blogda mobil 230 toplam / 169 RSC, masaüstü 344 toplam / 277 RSC isteği. Sonraki ajan planı mevcut yerel iyileştirmeleri tekrarlamadan kalan CSS, liste prefetch, iç sayfa açılışı ve yönlendirme işlerini ele almalı; canlı yayın sonrası aynı URL/profil tekrar ölçülmeli.
- Kalıcı veri/rapor `piton-docs/performance-audit-2026-10-09.json` ve `.md`; ham kayıtlar gitignore'daki `tmp/performance-audit-2026-10-09/`. PSI API 429 nedeniyle alan verisi yok; INP veya Core Web Vitals geçişi iddia edilmez. Bu aşamada uygulama kodu, push veya deploy değişmedi.

## Mobil performans (2026-10-09)
- TASK-104: yerel webpack üretim derlemesinde Lighthouse mobil 59 → 83 (üç son ölçüm 83/83/83). LCP 7,1 → 4,4–4,5 sn; TBT 630 → 10 ms; CLS 0. Görsel transferi 1.288 → 42 KB, JS 602 → 283 KB, font isteği 22 → 8. FCP 1,5 → 1,8 sn; canlı skor bu yerel sonuçla aynı kabul edilmez.
- Hero doğrudan boyutlu / öncelikli `next/image` kullanır; GLB hazır olmadığı için gereksiz Three.js / R3F / Drei logo import'u kaldırıldı. Hero mobilde SSR ile hemen görünür. Intro perde ve Lenis kaydırma kilidi 1000 px ve altında veya reduced-motion'da çalışmaz; masaüstü intro korunur.
- Dekoratif Three.js arka planı yalnızca 1001+ px, ince işaretçi ve normal hareket tercihinde açılır. Proje bulutunun WebGL yoklaması / paket / 15 dokusu bölüm 400 px yakına gelmeden yüklenmez; sticky mesafesi checking aşamasında da ayrılır. Canvas ekran dışında veya sekme gizliyken `frameloop="never"` kullanır.
- IBM Plex Mono `preload: false`; alfabe / ağırlık / stil dosyaları korunur, yalnız kullanılanlar yüklenir. Mobil menü ve HTML proje fallback linklerinde gereksiz route prefetch kapalı. Yılan kenarı geometrisi görünür olunca hazırlanır; mobil ilk ekranda sprite isteği yok. Kullanılmayan saat kaldırıldı; tüm anasayfayı her saniye yeniden çizdiren zamanlayıcı yok.
- Varsayılan `pnpm build` (Turbopack) da başarılı: yerel mobil 81, LCP 4,7 sn, TBT 10 ms, CLS 0. Webpack / Turbopack sonuçları ayrı tutulur; canlı deploy sonrası aynı URL ve profille yeniden ölçülmelidir.
- 390×844, 430×932, 844×390 ve 1280×800; mobil menü, proje gezinmesi, üç dil, reduced-motion / Save-Data / WebGL context loss fallback ve JS kapalı mobil ilk ekran doğrulandı. Sayfa hatası yok. Rapor / yeniden ölçüm yöntemi `piton-plans/mobile-performance.md`; ham JSON / HTML / ekran görüntüleri gitignore'daki `tmp/lighthouse/` altında.

## Proje sıralaması (2026-10-08)
- TASK-103: `naiben` #01 olarak eklendi; mevcut proje numaraları bir sıra ilerledi. `WORKS` 53, Seçilmiş Projeler 31 kayıt içerir; gizleme slug tabanlı kalır. Anasayfa `PROJECT_CLOUD_SELECTION` Naiben ile başlar; Radyo Juke seçkiden çıkarıldı, portfolyo kaydı korunur. Bulut 15 kart / 7 gezilebilir proje olarak kaldı. Canlı adres `https://neiden-konsept.vercel.app/`; masaüstü 1440×810 ve mobil 430×928 WebP önizlemeleri canlı siteden alındı. TR/EN/RU açıklamaları Neiden referansından yeniden geliştirilen ön yüz konsepti kapsamını belirtir.
- TASK-094: `WORKS` içinde Kabizzu #01, Velis LTD #10 olarak yer değiştirdi. Projeler sayfasının görsel şeridi, tablosu ve ItemList JSON-LD sırası aynı kaynaktan güncellenir. Anasayfa proje bulutunun seçili slug sırası ayrıdır.
- TASK-095: 16, 17, 18, 19, 20, 21, 23, 26, 32, 36–45, 50, 51, 52 numaralı 22 proje yalnızca projeler sayfasındaki Seçilmiş Projeler tablosundan gizlendi. `src/lib/project-list.ts` slug tabanlı görünürlüğü yönetir; tabloda 30 proje kalır, alan sayaçları ve liste JSON-LD aynı seçkiyi kullanır. Üstteki görsel şeridi, teslim akışı, proje detayları ve diğer sayfalar tüm kayıtları kullanmaya devam eder.

## Anasayfa düzeni (2026-10-08)
- TASK-109 (2026-10-09): anasayfa hizmet kartları 1024 px ve altında iki sütun / üç satır; daha geniş masaüstünde üç sütun / iki satır. `minmax(0, 1fr)` ve kart `min-width: 0` taşmayı önler; 480 px altında kategori üstte ayrı satırda, kompakt padding/yazı ve kırılabilir liste metinleri kullanılır. Altı kartın tüm içeriği ve bağlantıları korunur.
- TASK-110 (2026-10-09): 480 px ve altında anasayfa hizmet kartlarının sıra numarası ile kategori badge'i aynı satırda kalır. Dar kartlarda uzun kategori adları tek satır içinde ellipsis ile kısaltılır; iki sütunlu kart düzeni ve diğer metin kuralları korunur.
- TASK-102: ortak iletişim bölümündeki Fiverr sosyal bağlantısı 1000 px ve altında gizlenir. Diğer yedi sosyal bağlantı boşluk bırakmadan yeniden dizilir; masaüstünde Fiverr görünür.
- TASK-101: anasayfa proje bulutunda normal sayfa akışı ilk dört projeyi gösterir; 450 px (3 × 150 px) kısa sticky önizlemeden sonra Neden Piton bölümüne devam eder. Görsellerin üzerinde tekerlek/dokunma mevcut 7 projelik gezinmeyi sürdürür; 15 görünür kart ve HUD kontrolleri korunur. Elle gezinmeden sonra sayfaya dönmek seçimi geri sarmaz. `project-cloud-scroll.ts` bu ilerleme politikasını yönetir; dört davranış testi vardır. Reduced-motion/Save-Data/WebGL fallback ve bağımsız V2 prototipine sticky önizleme uygulanmaz.
- TASK-100: hero'daki “Tasarım · Kod · AI — Dijital Stüdyo” kicker satırı ve Reveal kapsayıcısı kaldırıldı. Ortak HeroScene tüm dillerde, mobil/masaüstü ve font karşılaştırmasında logo görselinden doğrudan piton başlığına geçer.
- TASK-099: Neden Piton bölümündeki sekiz özellik, 480 px ve altındaki telefonlarda da iki sütunda gösterilir. Dar kartlarda ikon metnin üstündedir; eşit sütunlar `minmax(0, 1fr)` ve 8 px aralık kullanır. Tablet/masaüstü düzeni korunur.
- TASK-098: mobil anasayfa süreç bölümünde süre notu (“Çoğu proje…”) ve “Projeni anlat” butonu, Reveal kapsayıcısıyla birlikte gizlenir; altta boş satır/aralık kalmaz. Detaylar bağlantısı görünür; masaüstü ve ayrı süreç sayfası alt not/CTA'sını korur.
- TASK-097: 640 px ve altındaki mobil anasayfada süreç bölümünün altı kartı gizlenir; açıklamanın altında “Detaylar” bağlantısı gösterilir. `/process` kanonik rotası TR `/nasil-calisiyoruz`, EN `/how-we-work`, RU `/kak-my-rabotaem` olarak yerelleşir. Ortak `ProcessScene` sayfa varyantında altı kart her genişlikte açık, başlık h1 ve CTA ayrı iletişim sayfasına gider. Masaüstü anasayfa kutuları ve iletişim çapası korunur.
- TASK-093: Hakkında / Biz (`#about`) bölümü anasayfadan kaldırıldı. Akış: Hero → Spark → Projeler → Not → Hizmetler → Süreç → İletişim; `SCENES` 7 öğe, alt sayaç otomatik 07 gösterir. Süreçten sonra doğrudan İletişim gelir; iletişim üst etiketi üç dilde § 05 oldu.
- Anasayfanın `AboutScene` import/render dalı ve istemciye gönderilen `about` çeviri namespace'i kaldırıldı. Ayrı Hakkında sayfası, nav/footer bağlantıları ve kayıtlı AboutScene bileşeni korunur.

## Marka fontu: Nippo (2026-10-08)
- TASK-108 (2026-10-09): Spark / Konuşalım bölümündeki 50+, 5+ ve 24h değerleri Nippo Bold 700 kullanır (`.spark-stat-value`). 24h'nin 860 px ve altında gizlenmesi ve etiket fontları korunur.
- TASK-107 (2026-10-09): hero altındaki istatistik barında 50+, 10+, 12 ve 3 değerleri Nippo Bold 700 kullanır (`.hero-stat-value`). Etiketler Space Grotesk olarak kalır; ortak stil tüm dillerde ve ekran boyutlarında uygulanır.
- TASK-096: ikinci bölüm Spark CTA'daki “Tamamlanan Proje” ve “Yıllık Deneyim” etiketleri Nippo Medium 500 kullanır. İstatistik sayıları ve “Yanıt Süresi” etiketi mevcut mono fontta kalır.
- TASK-092: anasayfa Öne Çıkan Projeler başlığındaki “projelerden” kelimesi Nippo Bold 700 ve `--accent` firma rengiyle vurgulanır. EN “projects” / RU “проектов” karşılıkları `projectCloud.titleAccent` anahtarında; `SplitWords` segmentleri mevcut kelime animasyonunu korur. V2 prototip başlığı düz metin olarak kalır.
- TASK-091: Nasıl Çalışıyoruz başlığındaki “altı adımda” vurgusu da Nippo Bold 700, normal stil kullanır (`.prc-title .em`).
- TASK-090: anasayfadaki bölüm etiketleri (Öne Çıkan Projeler, Not, Hizmetler, Nasıl Çalışıyoruz, Hakkında, İletişim ve Spark CTA üst etiketi) Nippo Medium 500 kullanır. Hakkında başlığındaki “ürünler” vurgusu Nippo Bold 700, normal stildir. `.about-eyebrow` inline etiket stillerinin yerini aldı; çeviriler ve gövde metinleri aynı kaldı.
- Yerel önizlemede Turbopack globals.css güncellemelerini eski önbellekten sunabiliyor; yeniden başlatmak da çözmezse `pnpm dev --webpack --port 3000` güncel stilleri doğru sunuyor. Üretim doğrulamasında `pnpm build --webpack` kullanılıyor.
- TASK-089: Spark CTA'daki “Konuşalım” ve Manifesto'daki “Piton?” vurguları Nippo Bold 700, normal stil kullanır. Üç dilde soru işareti `titleAccent` içinde tutulur; soru işareti ile marka arasında boşluk oluşmaz.
- TASK-088: hero rozetleri (ONLINE, WEB APP, AI, SEO, CLOUD, OTOMASYON) Nippo Medium 500 kullanır. `.chip` doğrudan `--font-nippo` kullanır; font karşılaştırmasında başka bir başlık fontu seçilse de rozetler Nippo olarak kalır.
- TASK-087: görsel marka yazımı küçük harf “piton”. Hero başlığı (tr/en/ru), anasayfa ve iç sayfa nav/mobil menü logoları, font karşılaştırmasındaki tüm örnekler küçük harf kullanır.
- Kullanıcı Qurova'dan sonra farklı adayları karşılaştırmak istedi ve sonunda Fontshare Nippo'yu seçti.
- Hero piton başlığı Nippo Bold 700; ortak nav ve mobil menüde logo yanındaki piton Nippo Medium 500. Genel gövde tipografisi Space Grotesk / IBM Plex Mono.
- `src/lib/fonts.ts` → `next/font/local`, `--font-nippo` / `--font-brand`; fontlar ziyaretçiye kendi alan adımızdan sunulur.
- Nippo ITF Free Font License 2.0: ücretsiz ticari kullanım + self-hosting izinli, public repoda font dosyası dağıtımı yasak. `pnpm dev/build` eksik WOFF2'leri resmi CDN'den indirir (`scripts/fetch-brand-fonts.mjs`); ikililer gitignore'da, lisans `src/lib/fonts/nippo-license.txt`.
- Yerel karşılaştırma: `http://localhost:3000/tr/font-lab` — 26 aday (Nippo dahil), arama, 4 kategori; gerçek hero bileşeni ve logo yazısı birlikte değişir. Rota production'da 404 ve noindex, nav/sitemap'te yok.
- TASK-086: kullanıcı Qurova'yı saklamak ve Gotico Antiqua'yı eklemek istedi. Qurova DEMO Bold 700 “Kayıtlı” adayı olarak geri eklendi; ikilisi gitignore'da, eksikse başlangıçta 1001fonts kaynağından indirilir. Demo yalnızca kişisel deneme içindir; ticari kullanım için tam lisans gerekir.
- Gotico Antiqua referansındaki varyant Fust & Schöffer “Durandus” 118G, Regular 400. Resmi ANRT deposundan değişmeden alınan OTF, OFL 1.1 lisansı ve yazar bilgileri `font-lab/assets/` altında. Karşılaştırma Gotico Antiqua seçili açılır; ana sitede uygulanan font Nippo olarak kaldı.

## Marka adı: Piton (2026-10-02)
- "Piton Studios" → "Piton" (kullanıcı kararı). Domain `pitonstudios.com`, `hi@pitonstudios.com`, sosyal hesaplar
  (instagram/behance/fiverr `pitonstudios`, LinkedIn `piton-studios`) ve repo/paket adı değişmedi.
- Eski ad `SITE.formerName` → Organization + WebSite JSON-LD `alternateName`. Hukuki metinlerde ticari ad da Piton
  (`LEGAL.tradeName = SITE.name`), `LEGAL.updated` 2026-10-02.
- Vercel env `CONTACT_FROM_EMAIL` görünen adı hâlâ "Piton Studios <…>" ise elle "Piton <…>" yapılmalı (koddaki
  yalnızca varsayılan değer).
- SSS cevaplarında (tr/ru) ilk paragraf zaten 40 kelimenin altındaydı; ad kısalınca 1'er kelime daha azaldı.

## Hukuki sayfalar (2026-09-14)
- Veri sorumlusu: Ömer Faruk Güngör (kayıtlı şirket yok, "Piton" ticari adı — 2026-10-02'ye kadar "Piton Studios"), adres 4 Eylül Mah. 889. Sk. Karaca Apt. A Blok, Bozüyük / Bilecik. Yetkili mahkeme Bozüyük. Form yazışmaları iş ilişkisine dönüşmezse 2 yıl saklanır.
- Veri akışı: form → Resend (ABD) → hi@pitonstudios.com (Zoho Mail, AB veri merkezi; 2026-09-15'te Gmail'den geçildi); barındırma + Analytics/Speed Insights → Vercel (ABD). Veritabanı yok. IP yalnızca bellek içi hız sınırı (10 dk).
- Metinler avukat incelemesinden geçmedi — özellikle KVKK m.9 yurt dışı aktarım bölümü (standart sözleşme / bildirim yükümlülüğü) hukukçuya gösterilmeli.

## Blog içerik ve altyapı (2026-09-05)
- Türkçe blog 12 yazı; İngilizce ve Rusça 8'er yazı. 2026-09-14: `yapay-zekanin-web-tasarim-ve-kodlamaya-etkisi` (yalnızca tr) — rakamlar yalnızca birincil kaynaktan doğrulanmış verilerle; Gartner doğru rakamı %75 (2028) / %10'un altı (2023), %90 değil. Figma 2025 AI raporu: %78 verimlilik / %32 çıktıya güven (tüm katılımcı); memnuniyet geliştirici %82 – tasarımcı %69, kalite artışı %68 – %54 (araştırma ajanının verdiği %47/%40 yanlıştı — alt ajan rakamlarını birincil sayfadan tekrar kontrol et).
- MDX `FlowDiagram` bileşeni: `steps: [{label, ai, human}]` — açılır veri tablosu üretmez, check-blog-pages.py'deki "tam 2 grafik tablosu" kuralını etkilemez. Yeni üç rehber yalnızca Türkçe; mevcut çeviri eşlemesi olmayan diller hreflang listesine eklenmiyor.
- Yeni konular: SEO site geçişi, B2B landing page, erişilebilir formlar. Altı grafik verisi temsili senaryo olarak etiketli; müşteri performansı iddiası yok.
- İsteğe bağlı frontmatter `sources: [{title, url}]`, görünür kaynakça + BlogPosting citation üretir. Grafiklerde `dataTableLabel` açılabilir tablo sağlar.
- Production sunucusu üzerinde doğrulama: `python3 scripts/check-blog-pages.py http://localhost:3100`.

## Project Info
- Piton Studios firmasinin video portfolyo websitesi. Video-agirlikli, hizli yuklenen modern portfolyo.

## Tech Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Veritabani yok — site statik; tek dinamik parca iletisim formu (Resend → hi@pitonstudios.com, Zoho)
- Vercel (hosting + CDN)
- pnpm (package manager)
- Framer Motion (scroll animations)
- Three.js (3D particle scene)

## Project Status
- **Phase 0**: COMPLETED — Project setup (7/7)
- **Phase 1**: COMPLETED — Core infrastructure (8/8)
- **Phase 2**: COMPLETED — Frontend / UI (6/6)
- **Overall**: 21/21 tasks (%100)
- **Deploy**: Vercel aktif (statik site, video yok)

## Projects V2 → Anasayfa entegrasyonu (2026-09-04, gece)
- Proje bulutu anasayfadaki "Projeler" sahnesinde canli (`ProjectCloudSection variant="home"`).
  Eski 6'li slider kullanilmiyor. `/projeler-v2` rotasi dev-only kaldi; oradaki guard'a
  dokunulmadi (nav/sitemap'te yok).
- Anasayfa `.scene` blok konteynerinde `section` 0px genislik olcuyordu — `.track`
  `width: 100%` zorunlu; kaldirmayin.
- 2026-10-08 (TASK-101): normal sayfa akışına ilk dört proje için 450 px kısa sticky önizleme eklendi; görsel alanındaki doğrudan gezinme ve kenarlardan sayfaya geçiş sürer. Önceki TASK-089 düzeni aşağıda tarihsel kayıt olarak korunur.
- 2026-10-08 (TASK-089): anasayfa sahnesi masaüstü ve mobilde 100svh. Mobildeki
  `320svh` track, sticky stage ve sayfa scroll'undan proje ilerlemesi kaldırıldı.
  Tekerlek yalnızca başlık ile HUD arasındaki orta proje alanında bulutu döndürür;
  başlık, HUD, yan boşluklar ve kenarlar sayfaya kalır. Uçlarda sayfaya devreder.
  Dokunma hareketi başladığı alana göre değerlendirilir: projelerde dikey/yatay
  ilerleme, dışarıda normal sayfa kaydırma. Anasayfada otomatik ilerleme yok.
  Tam sayfa V2 dokunmatik varyantı yatay kaydırma + otomatik ilerlemeyi koruyor. 15 kart görünür,
  `scrollCount=7` one gelir. Kullanici 7 kartli denemeyi begenmedi — 15 kalacak.
- 2026-09-05: sahne `.glass` kutuya alindi (`.trackHome .panel`), stage padding'i
  (`--cloud-frame-top/bottom/x`) chrome'a yer birakiyor; HUD offset artik 0. Tam sayfa
  `/projeler-v2` varyanti eski full-bleed gorunumunu koruyor.
- Bilinen, bu isle ilgisiz 404: `/models/logo.glb` (hero logo) — dosya repoda yok.

## Projects V2 Yerel Prototip (2026-09-04)
- Yerel rota: `/tr/projeler-v2` (`/en/projects-v2`, `/ru/projects-v2` esleri var).
- 15 gercek proje preview'i React Three Fiber sahnesinde iki kollu 3B spiral/helis
  uzerinde ilerliyor; scroll her projeyi sirayla foreground'a getiriyor.
- WebGL2 destekli mobil/dokunmatik cihazlarda optimize 3B spiral aktif; kompakt
  kamera/helis, sade atmosfer ve sabit `2x` Canvas render'i 390x844, 430x932 portre
  ile kisa-yatay telefon profillerine uyarlaniyor.
- Mobilde ilk dokunus projeyi odakliyor, ayni projeye ikinci dokunus detay sayfasini
  aciyor. `prefers-reduced-motion`, Save-Data, WebGL2 yoklugu veya context failure
  durumunda HTML/CSS yatay proje seridi kullaniliyor.
- Rota nav/sitemap'te yok, `noindex, nofollow`; production'da bilerek 404. Kullanici
  onayi gelmeden guard kaldirilmayacak, commit/push/deploy yapilmayacak.
- Sahne, `public/assets/previews/desktop/` icindeki 1440x810 ve
  `public/assets/previews/mobile/` icindeki 430x928 kaynaklari kullaniyor; plan
  `piton-plans/projects-v2-interactive-portfolio-plan.md`.

## Key Technical Decisions
- Video yok (2026-07-28 kaldirildi); gorseller public/assets/ altinda, repoda
- Next.js App Router with Server Components default (performance)
- No monorepo — single Next.js package (portfolio site complexity doesn't warrant it)
- Video optimization: ffmpeg pipeline (183MB → 13MB, %93 compression)
- next-intl config: ./i18n/request.ts (Vercel uyumluluk icin tasinmis)

## Saiber Ortakligi (proje atiflari)
- Saiber = Kibris merkezli ajans, eski adi Media King. WordPress tabanli islerin cogu Saiber ortakliginda teslim edildi.
- Kaynak dogrulugu: `/Users/arlec/Work-Restored/freelancer/02-projeler-case-study.md` (ajans notu) — atif sorularinda oraya bak.
- WORKS'te `collaborator: "Saiber"` olan 18 proje: velis-ltd, pampas-investment, ekh-yapi, radyo-juke, ozge-ozler, rnv-trading, pinnacle-yatirim, jet-transfer-cyprus, boon-fresh, halas-exchange, arslan-estates, arslan-coin-center, arslan-group, homes-in-mediterranean, sammys-hotel, all-pro-cyprus, alert-muhendislik, virginia-ice-cream
  (lider-emlak ve avie-global 2026-07-29'da portfolyodan tamamen kaldirildi — avie-global'in Saiber atifi hic teyit edilmedi)
- Lefke Belediyesi HIC YAPILMADI — freelancer dokumaninda listelense de siteye EKLENMEYECEK (kullanici 2026-07-16'da kaldirtti)
- Bagimsiz (collaborator YOK): nexos-investment, bt-elevator, gel-gez-gor, alp-sigorta, beton-store, ambalaj-cini, taksi & transfer siteleri (jet-transfer haric), tum AI/SaaS isleri
- **Kapsam teyitleri (2026-09-15, kullanici)**: Gel Gez Gor ilan platformunu BIZ YAPMADIK — site musteride vardi;
  bizim isimiz trend tespiti + WhatsApp bildirimi + sosyal medya icerik otomasyonu (repo `Work-Restored/gel-gez-gor`).
  Ambalaj Cini: 2022 WordPress sitesi Next.js ile yeniden gelistirildi. Metinlerde bu kapsamlar asilmaz.
- Kulup/nightlife siteleri 2026-07-27'de KALDIRILDI (kullanici istegi — portfolyoda listelenmesinler): WORKS'ten 10 (night-club-katalog, kibris-gece-hayati, gece-kibris, prenses/miracle/misse/crazy-girl-night-club, kibris-nights-club, kibris-katalog, faraon-night-clubs), STORIES'ten 5 (kibris-night-club, miracle-night-club, fareon-night-club, ibo-seytan, kibris-gece-hayati). Ceviriler de silindi; preview webp'leri assets'te duruyor
- Detay sayfasinda "Is Birligi" meta alani olarak gosteriliyor (`projectDetail.collab`)

## Canli Linkli Self-Development Projeleri (2026-07-16)
- Work tipine `url?: string` alani eklendi — detay sayfasinda "Canli Site → Siteyi ziyaret et" metasi olarak render ediliyor (`projectDetail.live/visit`)
- 5 canli proje eklendi (gercek ekran goruntuleriyle): fur-crm (one cikan slider #2 — mobilya CRM/cari/bayi sistemi), lithos, vanguard, jack-portfolio, veldara
- mindloop'a da canli url eklendi: mindloop-landing-page-phi.vercel.app
- fur-crm.vercel.app backend'i o gun veri vermiyordu — ekran goruntusu hata bandi gizlenerek alindi; backend duzelirse yeniden cekilebilir

## Important Patterns
- Video lazy loading with Intersection Observer
- Poster/thumbnail images for video previews (don't autoplay all)
- `preload="none"` on videos below fold

## Current State (Session 4 — 2026-05-24)
- 32 proje (WORKS), ilk 6'si anasayfa slider'da
- Anasayfa: Hero → Note → Services → Projects → About → Contact
- Unified nav (chrome) anasayfa ve ic sayfalar icin
- Videolar local fallback'ten servis ediliyor (media.ts)
- Stories section anasayfa ve projeler sayfasindan kaldirildi
- Hizmet ve manifesto kutulari JS ile esit yukseklikte

## Known Issues / Pending Work
- Proje tarihleri duzeltilecek (kullanicidan bilgi bekleniyor)
- Proje detay sayfalarina mockup gorselleri eklenecek
- SEO meta tags eksik (og:image, og:video, twitter cards)
- Custom domain baglanmamis
- Vercel env vars dogrulanmali
- Canli sitede video yukleme kontrolu yapilmali
