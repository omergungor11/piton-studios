# Piton - Project Memory

## Proje sıralaması (2026-10-08)
- TASK-094: `WORKS` içinde Kabizzu #01, Velis LTD #10 olarak yer değiştirdi. Projeler sayfasının görsel şeridi, tablosu ve ItemList JSON-LD sırası aynı kaynaktan güncellenir. Anasayfa proje bulutunun seçili slug sırası ayrıdır.
- TASK-095: 16, 17, 18, 19, 20, 21, 23, 26, 32, 36–45, 50, 51, 52 numaralı 22 proje yalnızca projeler sayfasındaki Seçilmiş Projeler tablosundan gizlendi. `src/lib/project-list.ts` slug tabanlı görünürlüğü yönetir; tabloda 30 proje kalır, alan sayaçları ve liste JSON-LD aynı seçkiyi kullanır. Üstteki görsel şeridi, teslim akışı, proje detayları ve diğer sayfalar tüm kayıtları kullanmaya devam eder.

## Anasayfa düzeni (2026-10-08)
- TASK-100: hero'daki “Tasarım · Kod · AI — Dijital Stüdyo” kicker satırı ve Reveal kapsayıcısı kaldırıldı. Ortak HeroScene tüm dillerde, mobil/masaüstü ve font karşılaştırmasında logo görselinden doğrudan piton başlığına geçer.
- TASK-099: Neden Piton bölümündeki sekiz özellik, 480 px ve altındaki telefonlarda da iki sütunda gösterilir. Dar kartlarda ikon metnin üstündedir; eşit sütunlar `minmax(0, 1fr)` ve 8 px aralık kullanır. Tablet/masaüstü düzeni korunur.
- TASK-098: mobil anasayfa süreç bölümünde süre notu (“Çoğu proje…”) ve “Projeni anlat” butonu, Reveal kapsayıcısıyla birlikte gizlenir; altta boş satır/aralık kalmaz. Detaylar bağlantısı görünür; masaüstü ve ayrı süreç sayfası alt not/CTA'sını korur.
- TASK-097: 640 px ve altındaki mobil anasayfada süreç bölümünün altı kartı gizlenir; açıklamanın altında “Detaylar” bağlantısı gösterilir. `/process` kanonik rotası TR `/nasil-calisiyoruz`, EN `/how-we-work`, RU `/kak-my-rabotaem` olarak yerelleşir. Ortak `ProcessScene` sayfa varyantında altı kart her genişlikte açık, başlık h1 ve CTA ayrı iletişim sayfasına gider. Masaüstü anasayfa kutuları ve iletişim çapası korunur.
- TASK-093: Hakkında / Biz (`#about`) bölümü anasayfadan kaldırıldı. Akış: Hero → Spark → Projeler → Not → Hizmetler → Süreç → İletişim; `SCENES` 7 öğe, alt sayaç otomatik 07 gösterir. Süreçten sonra doğrudan İletişim gelir; iletişim üst etiketi üç dilde § 05 oldu.
- Anasayfanın `AboutScene` import/render dalı ve istemciye gönderilen `about` çeviri namespace'i kaldırıldı. Ayrı Hakkında sayfası, nav/footer bağlantıları ve kayıtlı AboutScene bileşeni korunur.

## Marka fontu: Nippo (2026-10-08)
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
