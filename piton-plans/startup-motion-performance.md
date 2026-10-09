# Başlangıç animasyon yükü — TASK-114

## Kapsam

Kullanıcının rapora göre geliştirme ve push isteği. Başlangıç `fa0c98c`;
TASK-104..113 ve mevcut görsel düzenlemeler korunur. Tam Framer Motion parçası
anasayfanın ilk açılışında yaklaşık 39,5 KB, Lighthouse kapsam ölçümünde %73
kullanılmayan kod içeriyor.

Altı aktif Reveal çağrısı native CSS ve IntersectionObserver ile çalışır:
Spark, Manifesto, üç Contact grubu ve süreç sayfasının alt CTA'sı. Süre/delay,
beş varyant, %20 görünürlük eşiği, once ve div/li API'si korunur. Kullanılmayan
Stagger/StaggerItem export'ları kaldırılır. Proje bulutunun Framer Motion
spring/hook davranışı bu işin kapsamı dışında; paketin tamamen kalkması beklenmez.

Motion'un [resmi paket küçültme kılavuzu](https://motion.dev/docs/react-reduce-bundle-size)
ve [LazyMotion açıklaması](https://motion.dev/docs/react-lazy-motion) incelendi.
Yalnız görünürlükteki basit opacity/transform geçişlerini native tarayıcıya
taşımak bu repo için seçilen uygulama kararıdır. Ek feature chunk yükü, paket
kurulumu, lock/config/.env değişikliği yok. Önceki deneyde Türkçe ilk boyamayı
geciktiren font preload adayı tekrar uygulanmaz.

## Ajan ve doğrulama

- Başlangıç paket ajanı yalnız `src/components/motion.tsx` ve
  `src/components/motion/` içinde çalışır.
- Ana ajan ölçüm, entegrasyon/son inceleme, kayıt, commit/push ve Vercel kontrolünü yapar.
- Prepaint reveal bootstrap/fallback, JS kapalı içerik ve reduced-motion korunur.
  Eşik altındaki ilk IO callback animasyonu başlatmaz; tamamlanan transform none'dır.
- Her iki sürüm aynı Turbopack üretim build:
  `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 pnpm build`.
- Aynı Chrome/Lighthouse profilinde TR anasayfa/hizmetler/projeler üçer mobil
  tekrar, EN/RU/blog ve üç masaüstü kontrolü: 30 önce/sonra ölçümü.
- Düzen/gezinti, üç dil, filtreler/teslim örnekleri, animasyon geçişi ve hareket
  tercihi, JS kapalı içerik, görünmeyen GPU ve WebGL fallback kontrolü.
- Lint, typecheck, 630 çeviri kontrolü, üretim build. Git main push sonrası
  hedef Vercel proje/commit/yayın durumu ve canlı temel sayfalar doğrulanır.

Ham rapor/betik/görseller `tmp/startup-motion-2026-10-09/` altında tutulur.
Yerel simülasyon, kullanıcının bildirdiği canlı 43 ile doğrudan önce/sonra değildir.

## Sonuç — 2026-10-09

Aynı yerel üretim profilinde 30 nihai önce/sonra Lighthouse ölçümü. CSS fallback
düzeltmesinden önceki adayın 15 ölçümü de ayrı korunur: toplam 45. TR mobil ana sayfalar üçer
tekrar, EN/RU/blog ve masaüstü tek kontrol ölçümüdür.

Son matris sırasında harici CPU/GPU yükü arttı. Lighthouse CPU benchmark medyanı
4264.5 → 2415 düştü (aday 3764.5); RU/blog yavaş CPU uyarısı
verdi. Nihai skor/LCP/TBT kayıtları korunur, bu tur için güvenilir skor artışı
iddia edilmez. Kaynak transferleri bu zamanlama belirsizliğinden bağımsızdır.

| TR mobil | Başlangıç JavaScript önce → sonra | Azalma | Toplam transfer önce → sonra |
|---|---|---:|---|
| Anasayfa | 268,9 → 237,4 KB | %11,7 | 497,7 → 467,0 KB |
| Hizmetler | 271,7 → 232,3 KB | %14,5 | 461,7 → 423,2 KB |
| Projeler | 256,0 → 216,6 KB | %15,4 | 559,3 → 520,7 KB |

İlk aday mobil medyanları 86/87/87, masaüstü 98/99/98; başlangıç 86/87/86.
Yük altındaki son mobil medyanlar 86/87/87,
son masaüstü 98/87/91; EN/RU/blog 51/63/60.
Bunlar geçerli bir aynı-boşta-CPU önce/sonra kıyası olarak kullanılamaz.
Ana mobil matris CLS 0. Ham süreler ve kalibrasyon her çalıştırma için JSON'dadır.

### Değişiklik ve doğrulama

Altı Reveal çağrısı aynı opacity/transform, 0,9 sn easing ve gecikmelerle native
CSS'te çalışır. Gerçek %20 görünürlük eşiği uygulanır: eski Framer ilk callback
küçük oranla kesişiyorsa erken açılabiliyordu. Tamamlanınca transform none,
once sonrası gözlemci kapanır. CSS hydration fallback'ında implicit keyframe
başlangıcı kaldırıldı; kimlik matrisi/containing block bırakmadan transform none kalır. Kullanılmayan iki Stagger export'u kaldırıldı.
Proje spring/hook davranışı, ortak reveal bootstrap ve font preload'u değişmedi.
35 WOFF2 dosyasının içerik hash'i aynı.

Normal stilleri aynı kalan adayın 34 düzen karşılaştırmasında sıfır fark;
nihai build'de iki genişlikte 8 rota client navigation bu stillerle eşleşir; 23 genel ve 11 portfolyo/terminal/sprite
akışı başarılı. 11 ek native Reveal kontrolü (normal JS/CSS aynı kalan ilk dört kontrol adayda,
no-JS/fallback/gezinti/süreç kontrolleri nihai build'de): 390/1280 px gerçek eşik altı gizlilik,
ara animasyon/final transform ve once, tüm altı çağrı, statik/dinamik reduced-motion,
JS kapalı metin/linkler, IO hatası/hiç callback vermemesi/hydration engelinde
native wrapper CSS fallback'ı ve istemci gezinmesinde gözlemci cleanup.

Proje canvas'ı yakınken açılır; ekran dışında GPU draw sayısı 540/540
sabit. Gerçek context loss sonrası 15 kartlı fallback, kısa yatay telefon ve
JS kapalı ilk ekran doğrulandı. Dört mevcut scroll testi, lint (0 hata/10 mevcut
uyarı), typecheck, 630 çeviri kontrolü ve üretim build (868 sayfa) geçti.

Kalıcı veri: piton-docs/startup-motion-2026-10-09.json. Ham raporlar/betikler
tmp/startup-motion-2026-10-09/ altında. Yerel sonuç canlı 43/73 ile doğrudan
karşılaştırılmaz; gerçek kullanıcı INP/p75 ölçülmedi. LCP yaklaşık 4 sn çevresinde
kalıyorsa kalan font/CSS/render sırası ayrı ölçümle ele alınmalıdır.

### Yayın hedefi

Kullanıcı main push'u yetkilendirdi. GitHub omergungor11/piton-studios, main üretim dalı; Vercel pitonworks-projects/piton-studios
(prj_OuruE1zdrWG4QeKx3JiWB2ifTjGx), alan adı https://www.pitonstudios.com.
Yerel .vercel/project.json eski video-portfolio projesini gösterir; bu dosya
yazılmadı. Hedef Git bağlantısı ve üretim dalı API'den doğrulandı; yayın Git
entegre akışından izlenir. Push/deployment sonucu bu ölçümlerin yerine geçmez.

## Yayın doğrulaması

Kod commit'i `acc4992af1d85af197146d402c60f2377ffd68bc`, önceki 10 yerel
commit ile GitHub main'e pushlandı. Vercel üretim yayını
`dpl_9T5xDqZd6NLk4zbfQB9VxfgQnrc7` READY; www.pitonstudios.com ve
pitonstudios.com alias'ları bu commit'e bağlandı.

[Canlı site](https://www.pitonstudios.com) üzerinde 9 kontrol geçti: kök URL'nin
EN'e yönlendirmesi, TR/EN/RU anasayfa, 18 hizmet/31 proje, süreç ve iletişim,
mobil menüden proje listesine gezinme/scroll lock cleanup. Sayfa hatası veya
yatay taşma yok; yeni native wrapper'lar canlı HTML'de doğrulandı.

Canlı Lighthouse skor tekrarı aynı bilgisayardaki harici CPU/GPU yükü nedeniyle
ertelendi; yayın hazır olması puan artışı iddiası değildir. Yayın alan kullanıcı
verisi/p75 henüz ölçülmedi. Bu doğrulama kaydı yalnız dokümantasyon güncellemesidir.
