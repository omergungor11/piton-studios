# TASK-104 — Mobil performans

2026-10-09. Kullanıcının mobil Lighthouse sonucu: 43.

## Darboğazlar

- Hero için 3B model hazır olmadığı hâlde Three.js / R3F / Drei yükleniyor.
- Ekran dışındaki proje bulutu ilk mount'ta WebGL yoklaması ve 15 doku yüklemesi yapıyor.
- Dekoratif WebGL arka planı telefonlarda da açılıyor.
- Açılış perdesi ve hero reveal animasyonları ilk içeriği hidrasyon sonrasına erteliyor.
- IBM Plex Mono'nun tüm alfabe / stil / ağırlık dosyaları preload ediliyor (22 font isteği).
- Kapalı mobil menü linkleri diğer sayfaların RSC ve JS'ini önceden indiriyor.
- Görünmeyen yılan dekorasyonu 164 KB sprite'ı ilk ekranda indiriyor.

## Kabul

- Mobil ilk ekran SSR ile görünür; açılış perdesi kaydırmayı kilitlemez.
- Mobil ilk yüklemede WebGL canvas, proje dokusu ve yılan sprite isteği yok.
- Proje alanına yaklaşınca 3B deneyim, yedi proje kontrolü ve detay bağlantısı çalışır.
- Ekran dışındaki canvas ve gizli sekmede render döngüsü durur.
- Reduced-motion / Save-Data / WebGL failure durumları HTML seçkisine döner.
- Masaüstü dekorasyonu, mobil menü ve üç dil çalışır; yatay taşma / sayfa hatası yok.
- Aynı Lighthouse mobil profilinde üretim derlemesi önce / sonra ölçülür.
- Lint, typecheck, content:check ve build tamamlanır.

## Ölçüm

Lighthouse 13.5.0, Chrome headless, varsayılan mobil profil (412×823, DPR 1.75,
4× CPU, 1.6 Mbps simülasyon), yerel üretim sunucusu `http://localhost:3100/tr`.
Raporlar gitignore'daki `tmp/lighthouse/` altında. Canlı ve yerel skorlar ağ,
önbellek, yönlendirme ve derleme farklarından dolayı doğrudan karşılaştırılmaz.

Yerel ilk ölçüm (değişiklik öncesi, webpack): 59; FCP 1,5 sn, LCP 7,1 sn,
Speed Index 3,4 sn, TBT 630 ms, CLS 0,002. 43 JS / 602 KB; 22 font / 233 KB;
18 görsel / 1.288 KB.

Canlı ilk TR ölçümü: 71 (LCP 3,4 sn, Speed Index 8 sn, TBT 480 ms).
Alan adı ve dil yönlendirmeli EN ölçümü: 32 (LCP 8,5 sn, TBT 7.740 ms).
Bunlar kullanıcıdaki 43'ün birebir tekrarı değildir.

## Sonuç — webpack üretim derlemesi

| Metrik | Önce | Sonra (üç ölçüm) |
|---|---:|---:|
| Performans | 59 | 83 / 83 / 83 |
| FCP | 1,5 sn | 1,8 sn |
| LCP | 7,1 sn | 4,4–4,5 sn |
| Speed Index | 3,4 sn | 1,8 sn |
| TBT | 630 ms | 10 ms |
| CLS | 0,002 | 0 |
| JS | 43 istek / 602 KB | 23 istek / 283 KB |
| Font | 22 istek / 233 KB | 8 istek / 111 KB |
| Görsel | 18 istek / 1.288 KB | 4 istek / 42 KB |
| RSC ön indirme | Birçok görünmeyen menü sayfası | 0 istek |

FCP bu yerel ölçümde 0,3 sn arttı; LCP, görünür tamamlanma ve bloklama iyileşti.
Kalan önemli maliyet global CSS'nin render engellemesi ve logo görselinin mobil
simülasyondaki aktarım süresidir. CSS inline seçeneği üretim için deneysel
olduğu ve büyük ortak CSS'yi her sayfanın HTML / RSC'sinde tekrar ettiği için
uygulanmadı ([Next.js belgesi](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss)).

## Davranış doğrulaması

Varsayılan `pnpm build` (Turbopack) de başarılı, 868 sayfa. Bu derleme ile
ek yerel ölçüm: 81; FCP / Speed Index 2,1 sn, LCP 4,7 sn, TBT 10 ms, CLS 0.
20 JS / 300 KB, 8 font / 111 KB, 4 görsel / 42 KB; RSC ön indirme yok.
Bu ek kontrol, webpack önce / sonra karşılaştırmasının yerine kullanılmaz.

- 390×844, 430×932 ve 1280×800: ilk ekran, doğru marka / logo, yatay taşma yok.
- Mobil ilk ekranda canvas, proje dokusu ve sprite isteği yok.
- Mobil menü açma / kapama ve body kaydırma kilidi çalışıyor.
- Proje alanına kaydırınca canvas yükleniyor; sonraki proje kontrolü ve yerel detay URL'si çalışıyor.
- TR / EN / RU anasayfalarında marka ve düzen doğru; sayfa hatası yok.
- Reduced-motion, Save-Data ve gerçek WebGL context loss: 15 kartlı HTML fallback.
- JavaScript kapalı mobilde ilk ekran / logo görünür, intro perde yok.
- 844×390 kısa yatay görünümde taşma ve dekoratif canvas yok.
- Lint: 0 hata, 10 önceden var olan uyarı (başlangıçtaki 18 uyarının sekizi kaldırıldı).
- Typecheck ve 630 çeviri kontrolü başarılı.
- Webpack üretim derlemesi başarılı, 868 sayfa.

## Yeniden ölçüm

Üretim build ve boş bir portta sunucu başlatıldıktan sonra:

```sh
npx --yes lighthouse http://localhost:3100/tr --only-categories=performance --output=json --output=html --output-path=tmp/lighthouse/audit --chrome-flags='--headless --no-sandbox' --quiet
```

Chrome otomatik bulunamazsa `--chrome-path` verilmelidir. Mobil profil varsayılandır.
Deploy sonrası yönlendirme içermeyen canlı TR / EN / RU URL'leri ayrıca ölçülmelidir.
