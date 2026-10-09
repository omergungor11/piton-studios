# Piton — Canlı site performans testi

9 Ekim 2026, 14:29–14:38 (Asia/Famagusta). TASK-105.

Canlı Türkçe anasayfanın mobil Lighthouse medyanı **73**, masaüstü sonucu **98**.
Hizmetler listesi mobilde **71–89** arasında değişiyor; medyan **78**.
Diğer örnek iç sayfalar mobilde **87–96**, masaüstünde **98–100**.
Kullanıcının bildirdiği **43** bu test koşullarında tekrarlanmadı.

Bu çalışma canlı üretim sürümünü ölçer. Uygulama kodu değiştirilmedi; push veya
deploy yapılmadı. Önceden hazırlanmış TASK-104 iyileştirmeleri canlıda görünmüyor.

## Yöntem ve kapsam

- Lighthouse **13.5.0**, Chrome **155**, yalnızca Performance kategorisi.
- Mobil: **412×823**, DPR **1,75**, 4× CPU yavaşlatma, yaklaşık **1,6 Mbps** ve
  **150 ms RTT** simülasyonu.
- Masaüstü: **1350×940**, DPR **1**, 1× CPU, **10 Mbps** ve **40 ms RTT** simülasyonu.
- Testler sırayla, ayrı Chrome süreçleriyle ve temiz tarayıcı depolamasıyla
  çalıştırıldı. Eşzamanlı Lighthouse, build veya başka test tarayıcısı çalıştırılmadı.
  Sunucu/CDN önbelleği temizlenmedi; mobil ve masaüstü sonuçları kendi profillerinde yorumlanmalıdır.
- **25 ölçüm**: dokuz Türkçe sayfa türünde mobil + masaüstü; Türkçe anasayfa
  ve hizmetler listesinde toplam üçer mobil tekrar; İngilizce/Rusça anasayfada
  birer mobil test; kök alan adında bir mobil yönlendirme testi.
- Bütün Lighthouse kayıtlarında aynı canlı deployment kimliği bulundu:
  `dpl_8pfgspyN7nipQzeMCW9PKARETtHY`. Denetim sırasında yerel HEAD `6a226dd` idi;
  bu SHA canlı sürümün SHA'sı olarak kullanılmaz.
- Anasayfa, hizmetler ve blog ayrıca 412 px dokunmatik Chrome emülasyonunda,
  ek CPU/ağ yavaşlatması olmadan kontrol edildi.
  Bu üç sayfada yatay taşma, JavaScript sayfa hatası veya HTTP 4xx/5xx kaynak hatası görülmedi.

## Sayfa sonuçları

Anasayfa ve hizmetler için her metrik ayrı ayrı üç ölçümün medyanıdır. Diğer
sayfalar tek ölçümdür. Boyutlar sıkıştırılmış ağ transferini gösterir; Lighthouse
kayıt süresinde yapılan sayfa ön indirmeleri de bu boyuta dahildir.

| Sayfa | Mobil skor | Masaüstü skor | Mobil FCP | Mobil LCP | Mobil TBT | Mobil CLS | Mobil transfer |
|---|---:|---:|---:|---:|---:|---:|---:|
| [Anasayfa](https://www.pitonstudios.com/tr) | **73** | 98 | 1,57 sn | **3,65 sn** | **305 ms** | 0,0015 | **2,59 MiB** |
| [Projeler](https://www.pitonstudios.com/tr/projeler) | 87 | 99 | 1,41 sn | 3,21 sn | 3 ms | 0,0014 | 1,36 MiB |
| [Proje detayı — Naiben](https://www.pitonstudios.com/tr/projeler/naiben) | 87 | 100 | 1,26 sn | 3,81 sn | 4 ms | 0,0015 | 1,20 MiB |
| [Hizmetler](https://www.pitonstudios.com/tr/hizmetler) | **78** | 97 | 1,56 sn | **5,46 sn** | 3 ms | 0,0015 | 1,19 MiB |
| [Hizmet detayı — Web tasarım](https://www.pitonstudios.com/tr/hizmetler/web-tasarim) | 90 | 98 | 1,58 sn | 3,45 sn | 4 ms | 0,0015 | 1,19 MiB |
| [Blog](https://www.pitonstudios.com/tr/blog) | 90 | 99 | 1,69 sn | 3,19 sn | 1 ms | 0,0019 | 1,39 MiB |
| [Blog yazısı — Hızlı web sitesi](https://www.pitonstudios.com/tr/blog/hizli-web-sitesi-nasil-yapilir) | 96 | 99 | 1,26 sn | 2,54 sn | 0 ms | 0,0015 | 1,19 MiB |
| [Fiyatlandırma](https://www.pitonstudios.com/tr/fiyatlandirma) | 93 | 99 | 1,27 sn | 3,07 sn | 0 ms | 0,0015 | 1,20 MiB |
| [İletişim](https://www.pitonstudios.com/tr/iletisim) | 93 | 99 | 1,37 sn | 2,94 sn | 0 ms | 0,0015 | 1,15 MiB |

FCP ilk görünür içeriği, LCP en büyük içeriğin görünmesini, TBT açılıştaki ana
iş parçacığı bloklamasını, CLS ise yerleşim kaymasını ölçer. CLS düşük; iyileştirme
ihtiyacı mobil LCP, anasayfa bloklaması ve gereksiz kaynak yüklemesinde yoğunlaşıyor.
Lighthouse skoru birden fazla metriğin ağırlıklı sonucudur; yüksek skor bütün
kaynakların verimli yüklendiğini tek başına göstermez.
([Lighthouse skor hesabı](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring))

## Tekrarlar ve dil/yönlendirme testleri

| Mobil test | Skor | FCP | LCP | Speed Index | TBT |
|---|---:|---:|---:|---:|---:|
| TR anasayfa 1 | 73 | 1,53 sn | 3,03 sn | 10,34 sn | 454 ms |
| TR anasayfa 2 | 72 | 1,57 sn | 4,80 sn | 5,26 sn | 299 ms |
| TR anasayfa 3 | 73 | 1,62 sn | 3,65 sn | 16,23 sn | 305 ms |
| Hizmetler 1 | 78 | 1,56 sn | 5,46 sn | 3,44 sn | 0 ms |
| Hizmetler 2 | 71 | 2,10 sn | 6,50 sn | 5,23 sn | 3 ms |
| Hizmetler 3 | 89 | 1,53 sn | 3,10 sn | 5,40 sn | 3 ms |
| [EN anasayfa](https://www.pitonstudios.com/en) | 77 | 1,60 sn | 2,88 sn | 11,08 sn | 365 ms |
| [RU anasayfa](https://www.pitonstudios.com/ru) | 78 | 1,61 sn | 3,41 sn | 4,66 sn | 411 ms |
| [Kök URL](https://pitonstudios.com/) → EN | 69 | 2,11 sn | 4,21 sn | 5,86 sn | 419 ms |

Türkçe anasayfanın skoru yakın olsa da LCP ve Speed Index değişiyor. Mobilde
animasyonlu açılış perdesi/reveal ve WebGL çalışıyor; bir anasayfa ölçümünün LCP
diagnostiğinde açılış perdesinin logosu aday olarak yer alıyor. Açılış deneyimi
bu nedenle yalnızca tek bir skora göre değerlendirilmemelidir. Bunların testler
arası değişimin tamamını açıkladığı doğrulanmış değildir; ağ zamanlamaları da değişmiştir.

Kök URL zinciri `pitonstudios.com/` → `www.pitonstudios.com/` → `/en` oldu.
Dil, test tarayıcısının İngilizce tercihiyle belirlendi; Türkçe başlıklarla yapılan
ayrı HTTP kontrolde son rota `/tr` idi. Lighthouse iki yönlendirme için
**1.658,82 ms tahmini tasarruf** raporluyor; gözlenen document-latency kaydı
**1.343 ms** ek yönlendirme süresi içeriyor. Tahmini ve gözlenen süreler aynı
ölçü değildir. Kök URL ile doğrudan dil URL'sinin skor farkı yalnızca
yönlendirmeye atfedilemez.

## Ölçülen darboğazlar

1. **Mobil anasayfada erken WebGL ve ağır paketler.** Mobil tarayıcı emülasyonunda
   ilk açılışta iki canvas var; proje canvas'ı ekran dışında, yaklaşık 1.725 px
   aşağıda. Lighthouse anasayfada **33 JavaScript isteği / 876 KiB** kaydediyor.
   Three.js ve Canvas kodu içeren iki ayrı paket yaklaşık **236 KiB** transfer
   ediyor; Lighthouse toplam **389 KiB kullanılmayan JavaScript** tasarrufu
   tahmin ediyor. Kullanılmayan kod miktarı kayıt süresine aittir; tümü silinebilir kod anlamına gelmez.
2. **Görseller görünmeden yükleniyor.** Mobil anasayfada **18 görsel / 1.287 KiB**
   (1.317.884 bayt) kaydedildi. Mobil tarayıcı emülasyonunda
   ilk açılışta **13 masaüstü proje önizlemesi** indiriliyor.
   `/logo.webp` yaklaşık **146 KiB**, yılan sprite'ı yaklaşık **164 KiB**.
   Hero logosu canlıda ham `<img>`; `srcset`, boyut öznitelikleri ve
   `fetchpriority=high` yok. Lighthouse hero görselinde **123 KiB** tasarruf tahmin ediyor.
3. **Ortak font yükü bütün sayfalara yayılıyor.** Türkçe örnek sayfaların
   tamamında **22 font isteği / yaklaşık 231 KiB** var. İlk ekranın kullanmadığı
   stil/alfabe varyantlarının ön yüklemesi ortak açılış bütçesini büyütüyor.
4. **Sayfa ön indirmeleri fazla.** Mobil anasayfada **30 RSC isteği**, blogda
   **169 RSC isteği** var. Blog toplam **230 isteğe** ve yaklaşık **422 KiB fetch
   transferine** ulaşıyor. Masaüstü blogda **344 toplam / 277 RSC isteği**
   kaydedildi. Skorun 90/99 olması bu trafiğin tamamının kullanıcı için gerekli
   olduğunu göstermez; bu yükün ilk etkileşim ve navigasyondaki etkisi sonraki
   geliştirme aşamasında ayrıca ölçülmelidir.
5. **Ortak CSS ilk çizimi engelliyor.** Anasayfa mobilde **48 KiB CSS**
   transfer ediyor; Lighthouse yaklaşık **21 KiB kullanılmayan CSS** ve
   **340–350 ms render-blocking** tasarrufu tahmin ediyor. İç sayfalarda
   kullanılmayan CSS tahmini yaklaşık **25–28 KiB**. Global CSS'nin sayfa
   türlerine göre ayrılması araştırılabilecek kalan işlerden biri.
6. **Hizmetler listesinde açılış tutarlılığı zayıf.** LCP **3,10–6,50 sn**;
   TBT **0–3 ms**. Bu sayfadaki temel sorun anasayfadaki kadar yoğun JavaScript
   bloklaması görünmüyor. Font/görsel keşfi, intro/reveal ve CSS zamanlamaları
   kontrollü deneylerle ayrıştırılmalı; tek ölçümden kesin kök neden çıkartılmamalı.

HTTP örneğinde anasayfa `x-vercel-cache: HIT` döndü. Lighthouse kaynak kayıtlarında
4xx/5xx hata yok. Ölçülen sayfalarda harici üçüncü taraf kaynakları belirgin
ana iş parçacığı yükü olarak raporlanmadı; öncelik siteye ait kaynaklar.

## Yerel çalışma ile canlı sürümün farkı

Yerel **TASK-104 / `6a226dd`**, yukarıdaki erken WebGL/görsel yüklemesi, mobil
intro, font preload, kapalı menü prefetch ve hero logo sorunlarına yönelik
iyileştirmeleri zaten içeriyor. Canlı HTML'deki ham hero görseli, 22 font isteği
ve ilk açılışta ekran dışı canvas bu davranışların canlıya yansımadığını gösteriyor.

Önceki yerel üretim ölçümleri webpack'te **83/83/83**, varsayılan Turbopack'te
**81** idi. Bunlar canlı **73** ile doğrudan önce/sonra karşılaştırması değildir;
ağ, CDN ve sunum sürümü farklı. Önceki çalışmanın ayrıntıları
[TASK-104 raporunda](/Users/arlec/Work-Restored/piton-studios/piton-plans/mobile-performance.md).

Sonraki ajan planı mevcut yerel kodu esas almalı: tamamlanmış iyileştirmeler
yeniden yazılmamalı. Aynı canlı URL/profil ile yayın sonrası tekrar ölçüm;
kalan ortak CSS, liste ön indirmeleri, iç sayfa açılışı ve yönlendirme konuları
bu rapordaki verilerle önceliklendirilebilir. Bu denetimde ajan geliştirmesi veya
yayın işlemi başlatılmadı.

## Sınırlar ve kanıtlar

- Bunlar laboratuvar ölçümleridir; gerçek kullanıcıların **INP** veya p75
  Core Web Vitals sonucu değildir. TBT, INP yerine kullanılamaz. İyi alan verisi
  eşikleri p75'te LCP ≤2,5 sn, INP ≤200 ms ve CLS ≤0,1'dir.
  ([Web Vitals ölçütleri](https://web.dev/articles/vitals))
- PageSpeed Insights API **HTTP 429 / kota** hatası verdi. CrUX veya Vercel
  Speed Insights alan verisi elde edilmedi; “Core Web Vitals geçti” sonucu çıkarılmadı.
- Tek ölçümlü iç sayfalar ve EN/RU sonuçları istatistiksel aralık değildir.
  Dokuz sayfa türü örneklendi; bütün site URL'leri, cihazlar ve coğrafyalar taranmadı.
- Lighthouse tahmini tasarrufları birbirine eklenerek garantili hız/skor artışı
  hesaplanamaz. LCP insight alt süreleri gözlenen trace verileridir; tabloların
  simüle LCP metriğiyle doğrudan toplanmamalıdır.
- Performans dışında erişilebilirlik/SEO denetimi veya iletişim formu gönderimi yapılmadı.

Kalıcı [ölçüm verisi](/Users/arlec/Work-Restored/piton-studios/piton-docs/performance-audit-2026-10-09.json)
25 kaydın metriklerini, kaynak dağılımını, test profillerini ve tarayıcı kontrollerini içerir.

Ham JSON/HTML, çalıştırma betikleri ve ekran görüntüleri gitignore'daki
`/Users/arlec/Work-Restored/piton-studios/tmp/performance-audit-2026-10-09/` altında:

- [Mobil anasayfa HTML raporu](/Users/arlec/Work-Restored/piton-studios/tmp/performance-audit-2026-10-09/home-mobile-3.report.html)
- [Mobil hizmetler HTML raporu](/Users/arlec/Work-Restored/piton-studios/tmp/performance-audit-2026-10-09/services-mobile.report.html)
- [Mobil blog HTML raporu](/Users/arlec/Work-Restored/piton-studios/tmp/performance-audit-2026-10-09/blog-mobile.report.html)
- [Kök URL HTML raporu](/Users/arlec/Work-Restored/piton-studios/tmp/performance-audit-2026-10-09/root-mobile.report.html)
- [Test matrisi betiği](/Users/arlec/Work-Restored/piton-studios/tmp/performance-audit-2026-10-09/run-audit.mjs)
- [Tekrar/dil kontrolü betiği](/Users/arlec/Work-Restored/piton-studios/tmp/performance-audit-2026-10-09/run-extra-audit.mjs)

Yeniden testte aynı Lighthouse/Chrome sürümü, URL'ler ve profil kullanılmalı;
anasayfa/hizmetler tekrarlarının medyanı ve dağılımı raporlanmalıdır.

Raporun 25 kaydı ham Lighthouse JSON'larıyla karşılaştırıldı. Yerel proje
kontrolleri de tamamlandı: lint 0 hata / 10 mevcut uyarı; typecheck başarılı;
varsayılan üretim build başarılı (868 sayfa). Bu build canlıya yayımlanmadı.
