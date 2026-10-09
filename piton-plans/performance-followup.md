# TASK-106 — Performans iyileştirmeleri

2026-10-09. Canlı denetim TASK-105 ve yerel TASK-104 üzerine geliştirme.

## Kapsam ve ajan sahipliği

- CSS ajanı: `src/app/globals.css` ve yeni `src/styles/` dosyaları. Kullanılmayan
  eski sayfa stillerini doğrulayarak kaldır; sayfa türlerine özgü stilleri ayır.
  Import entegrasyonunu ana ajan yapar. Cascade ve mobil/masaüstü tasarımı korunur.
- Bağlantı ajanı: yalnız yeni `src/components/navigation/` modülü. Yerelleştirilmiş
  Next Link ile uyumlu, viewport yerine hover/focus/touch niyetiyle prefetch.
  Mevcut bağlantılara entegrasyonu ana ajan yapar.
- Hizmetler ajanı: yalnız `src/app/[locale]/services/`. İndeksin istemci paketini,
  ekran dışı çizimlerini ve etkileşimli panel yükünü azalt. Metin ve linkler SSR'da
  kalır; ilk ekran, çizim boyutları ve erişilebilirlik korunur.
- Ana ajan: ilk ekran/font/görsel öncelikleri, import entegrasyonu, ölçüm ve
  tarayıcı doğrulaması, task ve hafıza dosyaları. Paket/lock/env değişikliği yok.

## Kabul

- Mevcut TASK-104 davranışları korunur: mobil ilk açılışta WebGL/proje dokusu yok,
  buluta yaklaşınca 3B açılır; reduced-motion/Save-Data/WebGL fallback çalışır.
- Mobil başlıklar ve ilk içerik hidrasyon veya reveal animasyonu beklemez.
- Blog/nav/liste linkleri ilk yüklemede toplu RSC ön indirmesi başlatmaz; kullanıcı
  etkileşimi ve yerelleştirilmiş navigasyon çalışır.
- Ortak CSS transferi azalır; ayrı sayfalarda ve istemci navigasyonunda stiller kaybolmaz.
- Hizmetler sayfasının ekran dışı ağır etkileşimleri ilk açılışa yüklenmez.
- Lint/typecheck/content:check ve varsayılan üretim build başarılı.
- Aynı yerel üretim build yöntemiyle önce/sonra Lighthouse; anasayfa ve hizmetler
  üçer mobil ölçüm, blog/projeler ve temel iç sayfalar kontrolü.
- Mobil/masaüstü, üç dil, mobil menü, liste/filtre ve proje gezinmesi kontrolü;
  sayfa hatası, yatay taşma veya yerleşim kayması eklenmez.

## Ölçüm sınırı

Canlı TASK-105 ve yerel TASK-106 skorları doğrudan önce/sonra sayılmaz. Yeni
karşılaştırmanın başlangıcı yerel `cffd1d1` üretim derlemesidir. Canlı yayın bu
geliştirme isteğinden ayrı tutulur; yayın sonrası aynı profil yeniden ölçülür.

## Uygulanan değişiklikler

- Üç ajanla CSS, bağlantı ve hizmet kataloğu işleri yürütüldü; import entegrasyonu
  ve tarayıcı doğrulaması ana ajan tarafından yapıldı.
- Ortak CSS kaynağı 245.267 → 150.050 bayt (%38,8 azalma). On bir sayfa/bileşen
  stil dosyası ayrıldı; kullanılmayan admin/galeri/lightbox stilleri kaldırıldı.
  Ortak CTA, önizleme kontrolleri ve hareket kurallarının cascade sırası korundu.
- Font karşılaştırması ve tam sayfa proje prototipi, üretimde sabit ortam koşuluyla
  import ağacından çıkarıldı. Üretimde 404, geliştirmede kullanılabilir olmaya devam
  ederler. Font CSS'inin 231 `@font-face` tanımı 45'e indi; ana sitenin font
  dosyaları ve font görünümü korunur. Ana paket artık deneme fontlarını içermez.
- Mobilde tüm sayfa hero başlıkları/açıklamaları SSR ile görünür; 1000 px ve altında
  giriş animasyonunu beklemez. Masaüstü ve sonraki bölüm animasyonları korunur.
- Yerelleştirilmiş `IntentLink`, viewport ön indirmesini hover/focus/touch niyetine
  taşır. Save-Data, çevrimdışı ve 2G bağlantıda kapalıdır; açık `prefetch={false}`
  korunur. Next.js tıklama, URL çevirisi ve gezinme davranışını sürdürür.
- Hizmet metinleri/kartları sunucuda hazırlanır; istemci yalnız filtre durumunu
  yönetir. 18 SVG sahnesi ayrı importlarla 180 px yakına gelince yüklenir ve ekran
  dışında DOM'dan çıkarılır. Sabit en/boy oranı ve indirilmiş modül önbelleği korunur.

## Aynı üretim profilinde sonuçlar

Önce: `cffd1d1` (TASK-104 dahil), sonra: TASK-106. İki sürüm de varsayılan
`pnpm build` / Turbopack ve `pnpm start --port 3100` ile test edildi.
Lighthouse 13.5.0, Chrome 155; ölçümler tek tek, her seferinde yeni Chrome oturumuyla
çalıştırıldı. Mobil: 412×823, DPR 1,75, CPU 4×, 1,6 Mbps / 150 ms RTT simülasyonu.
Masaüstü: 1350×940, DPR 1, CPU 1×, 10 Mbps / 40 ms RTT. Anasayfa ve hizmetlerde
üçer mobil tekrar; diğer ana matris sayfalarında birer ölçüm. 32 ana ölçüm ve
projeler listesindeki sapmayı incelemek için iki ek ölçüm, toplam 34 Lighthouse.
Oturum sonunda ayrı TASK-107 hero istatistik fontu commit'i korundu; son üretim
derlemesinde anasayfa üç kez daha ölçüldü (oturum toplamı 37). Bu son entegrasyon
ölçümleri 84/84/83, medyan 84; LCP medyan 4,44 sn, TBT medyan 10 ms, CLS 0.
390/1280 px'te dört istatistiğin Nippo fontu ve taşmasız görünümü doğrulandı.
Aşağıdaki ana matris, TASK-106 değişikliklerini font güncellemesinden önce ölçer.

| Mobil TR sayfa | Önce skor | Sonra skor | LCP önce → sonra | Transfer önce → sonra |
|---|---:|---:|---:|---:|
| Anasayfa (medyan) | 81 | 84 | 4,75 → 4,40 sn | 0,58 → 0,53 MiB |
| Hizmetler (medyan) | 83 | 88 | 4,42 → 3,89 sn | 0,60 → 0,44 MiB |
| Projeler (ana ölçüm) | 86 | 85 | 4,06 → 4,32 sn | 0,89 → 0,72 MiB |
| Proje detayı | 85 | 87 | 4,27 → 3,95 sn | 0,61 → 0,45 MiB |
| Hizmet detayı | 84 | 87 | 4,27 → 3,97 sn | 0,60 → 0,45 MiB |
| Blog | 86 | 89 | 3,96 → 3,67 sn | 0,85 → 0,39 MiB |
| Blog yazısı | 85 | 88 | 4,12 → 3,83 sn | 0,63 → 0,40 MiB |
| Fiyatlandırma | 80 | 87 | 5,18 → 4,04 sn | 0,62 → 0,47 MiB |
| İletişim | 80 | 89 | 5,12 → 3,74 sn | 0,57 → 0,42 MiB |

- Anasayfa skorları önce 81/81/81, sonra 84/84/84; FCP medyan 2,11 → 1,66 sn.
  Hizmetler önce 83/83/83, sonra 88/87/88. Ana matris mobil TBT 0,5–7 ms ve CLS 0.
- Masaüstü anasayfa 97 → 98, hizmetler 98 → 99, blog 99 → 99. Masaüstü CLS
  yaklaşık 0,01 ile başlangıç düzeyinde kaldı.
- Projeler ek ölçümleri 84/84, LCP 4,41/4,35 sn ve TBT 35/10,5 ms. Bu sayfada
  skor artışı doğrulanmadı; kaynak yükü %19 azalsa da simüle LCP önceki tek ölçümden
  0,27–0,36 sn daha geç. LCP öğesi iki sürümde de `.df-desc` metni. Ham zaman
  ayrıştırmasında öğe daha erken çiziliyor (103,6 → 94,0 ms); simülasyon sonucunun
  nedenini tek başlangıç ölçümünden kesinleştirmek mümkün değil. Skor farkı
  iyileşme olarak sunulmaz; canlı yayın sonrası aynı profilde ayrıca izlenmeli.

## Kaynak yükü

Lighthouse ağ kayıtları, ilk yükleme sırasında aktarılmış baytları içerir.

| Ölçüm | Önce | Sonra | Azalma |
|---|---:|---:|---:|
| Mobil anasayfa CSS transferi | 80.499 B | 29.454 B | %63,4 |
| Mobil hizmetler JS transferi | 331.868 B | 271.312 B | %18,2 |
| Mobil hizmetler HTML transferi | 45.090 B | 24.618 B | %45,4 |
| Mobil hizmetler toplam transferi | 630.483 B | 461.296 B | %26,8 |
| Mobil blog toplam transferi | 895.975 B | 404.740 B | %54,8 |
| Masaüstü anasayfa toplam transferi | 2.000.713 B | 959.413 B | %52,0 |
| Masaüstü hizmetler toplam transferi | 1.789.423 B | 663.393 B | %62,9 |

Mobil blog ilk yüklemesindeki 143 RSC isteği → 0; hizmetler 5 → 0. Masaüstü
anasayfa 134 → 0, hizmetler 136 → 0. Gerçek mouse hover ve klavye focus testlerinde
yalnız hedef URL için Next'in parçalı ön indirmesi başladı; Save-Data'da başlamadı.
Hizmetler sunucu slotlarına taşındığında HTML/RSC şişmesi oluşmadı: HTML de küçüldü.

## Doğrulama

- Lint: 0 hata / önceden mevcut 10 uyarı. Typecheck, 630 çeviri kontrolü ve
  varsayılan üretim build başarılı; 868 statik sayfa.
- 17 sayfa türü × 390/1280 px = 34 düzen kontrolü: kontrol edilen metinler,
  tipografi, padding, renkler, grid ve boyutlarda başlangıca göre fark yok;
  yatay taşma ve sayfa hatası yok. Anasayfa/hizmetler ekran görüntüleri incelendi.
- Sekiz sayfalık mobil ve masaüstü istemci gezinmesinde stiller doğrudan
  açılışla aynı. Mobil menü kapanır ve kaydırma kilidi bırakılır; yerelleştirilmiş
  URL'ler korunur. TR/EN/RU hizmet kataloğu 18 kart, sekiz kategori sayacı ve
  “Tümü” dönüşü doğru; SVG boyutu 328×205 px sabit, ekran dışında çizim yok.
- 430/1000/1001 px hero kırılımı, JavaScript kapalı dört mobil ilk ekran,
  Naiben mobil önizleme düğmesi ve açık tema kontrol edildi.
- Mobil ilk açılışta proje canvas/doku/sprite yok. Proje alanına gelince canvas
  açılır, sonraki proje düğmesi çalışır. Ekran dışında GPU draw sayısı iki örnekte
  945/945 sabit. Gerçek `WEBGL_lose_context` sonrası 15 bağlantılı fallback,
  JS kapalı logo ve kısa yatay görünüm hatasız.
- Font lab/proje prototipi üretimde 404, geliştirmede 200. Font lab'da 26 aday,
  arama ve seçim; prototipte 15 proje ve mobil taşmasız görünüm doğrulandı.
- Yerel Vercel Analytics / Speed Insights endpoint'lerinin beklenen 404'leri
  tarayıcı kaynak kontrolünden ayrı tutuldu; form e-posta gönderimi yapılmadı.

## Kayıt ve kalan sınır

Kalıcı ölçüm verisi: `piton-docs/performance-followup-2026-10-09.json`.
Ham HTML/JSON, ekran görüntüleri ve tarayıcı betikleri gitignore'daki
`tmp/performance-followup-2026-10-09/` altında. Mobil matris 84–89; anasayfa ve
hizmetler LCP'si hâlâ [2,5 sn hedefinin](https://web.dev/articles/optimize-lcp)
üzerinde. Bu oturum canlı deploy veya gerçek
kullanıcı INP ölçümü içermez; bildirilen 43 ile yerel yeni skor doğrudan
önce/sonra sayılmaz. Yayın sonrası canlı URL'lerde aynı profil tekrarlanmalı.

Yeniden ölçüm: `pnpm build`, `pnpm start --port 3100`; Lighthouse CLI'da URL,
`--only-categories=performance --output=json --output=html`, masaüstü için ayrıca
`--preset=desktop`. Sabit Lighthouse/Chrome sürümleri ve tek seferde tek tarayıcı
kullanılmalı.

Uygulama referansları: [Next.js CSS](https://nextjs.org/docs/app/getting-started/css),
[LCP optimizasyonu](https://web.dev/articles/optimize-lcp).
