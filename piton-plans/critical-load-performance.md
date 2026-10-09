# TASK-113 — Kritik ilk yükleme

2026-10-09. Başlangıç `31c9023`; TASK-106 ile sonraki TASK-107..112 kullanıcı
görünüm/akış güncellemeleri korunur. Canlıya yayın bu turda yapılmaz.

## Uygulama

- Anasayfa hizmet kartları sunucuda hazırlanır; istemcide yalnız grid yüksekliği
  davranışı kalır. Tüm hizmet ayrıntıları/çeviri namespace'i ilk paketten çıkar.
- Projeler listesi sunucuda küçük, çevrilmiş liste/preview/alan props'u üretir;
  istemci tüm portfolyo ve hizmet ayrıntılarını indirmez. Teslim akışı yalnız altı
  örnek projeyi alır. 31 tablo satırı, 39 önizleme ve filtreler korunur.
- Sahne metadata'sı büyük veri modülünden ayrılır. Görünmeyen terminalin sürekli
  zamanlayıcısı durur; içerik ve kullanıcıya görünen animasyon korunur.
- Space Grotesk variable bildirimleri; Latin ve Latin Extended preload korunur.
  Türkçe/Kiril davranışı/font dosyaları korunur. Yalnız Latin preload denemesi
  Türkçe ilk boyamayı geciktirdiği için geri alındı. Nippo/IBM dosyaları veya
  lisansları değişmez.
- Yılan kenarı sprite'ı boyut/DPR'a uygun Next image kaynağından düşük öncelikle
  yüklenir; 36 dilim, altı kare ve geometrisi korunur. İlk ekran metni beklemez.

## Ajan kapsamı

- Hizmet ajanı: yalnız `src/components/scenes/services.tsx` ve `service-grid.tsx`.
- Projeler ajanı: yalnız `src/app/[locale]/projects/`.
- Font ajanı: yalnız `src/lib/fonts.ts`.
- Ana ajan: slot entegrasyonu, ortak sahne/teslim verisi, terminal/sprite,
  ölçüm/akış kontrolleri ve proje kayıtları. Paket/lock/.env değişikliği yok.

## Kabul ve ölçüm

- Her iki sürüm varsayılan Turbopack üretim build. Yerel makinenin sistem TLS
  sertifikalarını kullanmak için iki derlemede de
  `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 pnpm build`; fontlar normal
  kaynaktan gelir, TLS doğrulaması açık kalır. İlk flagsiz denemede Google font
  indirmesi bağlantı hatası verdi; curl/Node ve sistem TLS'li build başarılıdır.
- Aynı Lighthouse/Chrome mobil profilinde anasayfa, hizmetler, projeler üçer
  tekrar; EN/RU anasayfa/blog ve masaüstü kontrolü. İstemci JS kadar HTML/RSC ve
  tüm kaynak transferi de karşılaştırılır; canlı/alan kullanıcı verisi iddiası yok.
- Mobil/masaüstü düzen, üç dil, menü/filtreler/preview/teslim adımları, terminal
  görünürlük/hareket tercihi, proje sticky/HUD/WebGL fallback doğrulanır.
- Lint, typecheck, content:check ve üretim build; skor/CLS gerilemesi varsa
  değişiklik veya ölçümün sebebi incelenir. Giriş/animasyonların görünümü korunur.

Ham ölçümler/betikler `tmp/critical-load-2026-10-09/` altında; sonuçlar aşağıda ve
`piton-docs/critical-load-2026-10-09.json` içinde kayıtlıdır.

## Sonuç — 2026-10-09

Nihai karşılaştırma başlangıç ve son kod arasında 30 Lighthouse ölçümüdür.
Anasayfa/hizmetler/projeler mobilde üçer tekrar, EN/RU anasayfa/blog ve üç
masaüstü kontrolü her iki sürümde yapılmıştır. Latin-only font denemesi ve
resize düzeltmesinin ara sürümü için 30 ek ölçüm korunmuştur: oturum toplamı 60.
Tabloda son sürüm kullanılır; ara sürümün daha iyi skoru seçilmez.

| TR mobil | Önce skor | Sonra skor | Önce → sonra LCP | İlk yükleme transferi |
|---|---:|---:|---|---|
| Anasayfa | 84 | 85 | 4,44 → 4,32 sn | 553,4 → 497,7 KB |
| Hizmetler | 87 | 87 | 4,02 → 4,02 sn | 461,4 → 461,7 KB |
| Projeler | 85 | 87 | 4,34 → 4,03 sn | 753,9 → 559,3 KB |

Anasayfa tekrarları 84/84/84 → 86/85/85;
hizmetler 87/87/87 → 87/87/87; projeler
85/85/85 → 87/87/87. Transfer medyanları
anasayfada %10,1, projelerde
%25,8 azaldı. Mobil ana matris CLS 0.
Hizmetlerin transferi/LCP'si büyük ölçüde aynı kaldı; bu sayfada bu turdan skor
artışı iddia edilmez. TBT medyanları sırasıyla 11,
19, 15 ms.

EN anasayfa 86 → 86, RU anasayfa
83 → 86, blog
89 → 89. Bunlar tek kontrol ölçümüdür.
Son masaüstü skorları 98/98/97; CLS yaklaşık 0,01 ve TBT 0.

### Uygulanan sınırlar

- Hizmet sahnesi Server Component; altı kart metni/ikonları sunucuda üretilir.
  ServiceGrid yalnız eşit yüksekliği yönetir. Anasayfa provider'ından services,
  servicesList ve servicesPage çıkarıldı. Sahne metadata'sı lib/scenes.ts içinde.
- Projeler server'da 31 satır, 39 önizleme, altı alan ve altı teslim örneği için
  küçük props üretir. İstemcinin WORKS/SERVICES/studio-stats runtime bağı kaldırıldı;
  works/areas çeviri katalogları istemci provider'ında bulunmaz. Liste JSON-LD korunur.
- Sprite native responsive srcset seçimi + Next image cache üzerinden Low
  öncelikle gelir. Mobil 1,75 DPR ölçümünde High 167.980 → Low
  24.630 B.
  36 dilim, altı kare, oranlar ve yol aynı; decode tamamlanınca CSS kaynağı yazılır,
  eski async istek cleanup/generation kontrolüyle atlanır. Resize/DPR değişiminde
  geometri ve uygun kaynak tekrar seçilir. Public sprite dosyası değiştirilmedi.
- Terminal yalnız görünür ve sekme açıkken ilerler; çıkınca timeout temizlenir,
  dönüşte mevcut karakterden sürer. Reduced-motion'da 21 satır statik görünür.
- Space Grotesk variable 300–700 bildirimi: font-face toplamı 45 → 36.
  35 WOFF2 dosyasının SHA-256 içerikleri başlangıçla aynı. Nippo/IBM, font
  binary'leri ve lisanslar korunur. Font transferi azaltıldı iddiası yok.

Latin-only preload EN/RU'da 19.224 B tasarruf sağladı, ancak Türkçe hizmetlerde
FCP 1,51 →
1,67 sn oldu.
Türkçe için Latin Extended preload geri alındı; son FCP 1,52 sn.
Bu deney ve ara sonuçlar JSON'da ayrı tutulur.

### Doğrulama

17 rota × 390/1280 px: 34 karşılaştırma, computed stil ve ölçülerde sıfır fark;
sayfa hatası/taşma yok. 23 genel akış: menü ve scroll lock, iki genişlikte sekiz
rotalık istemci gezinmesi, niyetle prefetch/Save-Data, üç dilde hizmet filtreleri,
hero kırılımı, JS kapalı ilk ekran, proje mobil toggle ve tema.

11 özel kontrol: üç dilde 31 satırın yerel metni/disiplini/yılı/müşterisi ve sırası,
39 önizleme ve Mobile kaynakları, altı alanın tüm slug kümeleri (29/13/1/1/2/11),
altı klavye odaklı teslim örneği, anasayfa altı hizmetin metin/listeleri ve
iki sütun/eşit yüksekliği, üç sprite çözünürlüğü/altı kare ve DPR değişimi.
Terminal ekran dışında 0 DOM mutasyonu; görünürken ilerler, gizlilik olayında
ve ekran dışında durur, reduced-motion'da zamanlayıcısız 21 satır gösterir.
Sekme gizliliği testinde document.hidden + visibilitychange simülasyonu kullanıldı.

Proje canvas'ı yakında açılır, HUD çalışır, ekran dışında GPU çizimi durur;
gerçek WebGL context loss sonrası 15 kartlı HTML fallback çalışır. 75 px
önizleme politikası için dört mevcut scroll testi geçti. Lint 0 hata /
10 mevcut uyarı, typecheck, 630 çeviri kontrolü ve varsayılan Turbopack build
(868 sayfa) başarılı. Yalnız bu oturumun test süreçleri kapatıldı.

### Ölçüm sınırı ve kalan darboğaz

Bunlar aynı yerel makinede Chrome/Lighthouse simülasyonudur; canlı 43/73
ölçümleriyle doğrudan önce/sonra değildir. Profil, ham süreler, kaynak ayrımı ve
çalışan kodun hash'leri piton-docs/critical-load-2026-10-09.json içinde; ham
HTML/JSON/görseller ve tekrar betikleri tmp/critical-load-2026-10-09/ altında.
Gerçek kullanıcı INP/p75 ölçülmedi. Push/deploy yapılmadı.

LCP hâlâ yaklaşık 4 sn: küçük transfer kazancı her sayfada büyük skor
artışına dönüşmedi. Anasayfanın ilk yüklemesindeki Framer Motion parçası
yaklaşık 39,5 KB ve Lighthouse'a göre %73'ü bu anda kullanılmıyor. Sonraki
bağımsız iş, görünür animasyonları koruyarak bu başlangıç motorunu ve kritik
CSS/font sırasını ölçerek küçültmek olabilir. Font preload değişikliği yalnız
bayt kazancı için tekrar uygulanmamalı; Türkçe ilk boyama da ölçülmeli.
