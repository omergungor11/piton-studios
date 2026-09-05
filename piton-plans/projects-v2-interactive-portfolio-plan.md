# Projeler V2 — Interaktif 3B Portfolyo Plani

**Durum:** Anasayfa "Öne Çıkan Projeler" sahnesine entegre edildi (2026-09-04)  
**Yerel rota:** `/tr/projeler-v2` (dev-only tam sayfa prototip, guard duruyor)  
**Canli yayin:** Anasayfa sahnesi olarak — `src/components/projects-v2/project-cloud-section.tsx`

## 1. Hedef

Mevcut `/tr/projeler` sayfasini degistirmeden, gercek proje ekranlarini uc boyutlu bir
"yorgesel arsiv" icinde sunan ikinci bir portfolyo deneyimi olusturmak. Sayfa ilk
ekranda dogrudan portfolyoyu gosterecek; klasik hero + grid akisi yerine ziyaretci
kaydirarak, imleci hareket ettirerek ve mockup'lara dokunarak projeleri kesfedecek.

## 2. Gorsel tez

Son e-ticaret / web showcase kampanyasindaki **Dijital Secki**, **Web Vitrini** ve
**Infinite Scroll Tunnel** kompozisyonlari hareketli bir arayuze cevrilecek:

- Siyah sinematik bosluk ve mevcut Piton Studios grain/aurora atmosferi
- Gercek proje ekran goruntulerinden olusan genis, derinlikli mockup bulutu
- Ince kirmizi ve camgobegi isik hatlari; mevcut marka aksaniyla uyumlu cerceveler
- Teknik HUD dili: proje numarasi, disiplin, yil ve kaydirma ilerlemesi
- Buyuk ama geri planda kalan tipografi; portfolyo her zaman ana odak

## 3. Ana deneyim

1. Ziyaretci ilk ekranda 3B proje bulutunu ve secili projenin kunyesini gorur.
2. Dikey kaydirma tum kartlari iki kollu bir 3B helis uzerinde ilerletir. Her proje
   derinlikten donerek foreground'a gelir, odaktan gecer ve yeniden arka kola katilir;
   sabit kalan tek bir merkez karti yoktur.
3. Imlec hareketi sahneye hafif paralaks verir.
4. Bir mockup'in uzerine gelindiginde kart kameraya yaklasir, diger kartlar sakinlesir,
   cerceve isigi degisir ve proje kunyesi guncellenir.
5. Mockup'a veya "Projeyi ac" baglantisina tiklamak mevcut proje detay sayfasini acar.
6. Onceki/sonraki kontrolleri ve gercek HTML baglantisi, deneyimi klavye ile de
   kullanilabilir tutar.

## 4. Teknik mimari

- **Route:** `src/app/[locale]/projects-v2/`
- **Server katmani:** locale dogrulamasi, `noindex` metadata, yalnizca gelistirme
  ortaminda render etme
- **Client orkestrasyonu:** scroll ilerlemesi, aktif proje, HTML HUD ve erisilebilir
  kontroller
- **3B sahne:** React Three Fiber + Drei + Three.js; mevcut bagimliliklar kullanilir
- **Veri:** `WORKS` dizisindeki gercek proje kayitlari ve mevcut desktop/mobile WebP
  preview'lari; uydurma proje veya gorsel yok
- **Kod bolme:** WebGL sahnesi client-side dynamic import ile yalnizca V2 rotasinda
  yuklenir

## 5. Performans butcesi

- Ilk surumde 12–16 secilmis proje; tum 49+ kaydi ayni anda GPU'ya yuklememek
- Masaustunde Canvas DPR ust siniri `1.5`; mobil kompakt profilde netlik icin sabit
  `2x` render, antialias ve `highp` precision; golge, post-processing ve agir fizik yok
- Basit mesh/material ve mevcut yuksek cozunurluklu WebP preview'lari (yatayda
  1440x810, dikeyde 430x928)
- WebGL2 destekli mobil/dokunmatik cihazlarda sade atmosfer, 180 yildiz ve kompakt
  kamera/helis profiliyle optimize 3B spiral
- `prefers-reduced-motion`, Save-Data, WebGL2 yoklugu veya WebGL context kaybinda
  hafif HTML/CSS portfolyo seridi
- Canvas gorunmez oldugunda gereksiz animasyonu durdurma; sekme arka plandayken tarayici
  dongusune guvenme

## 6. Erisilebilirlik ve giris yontemleri

- Canvas dekoratif/alternatif bir kesif yuzeyi; aktif proje bilgisi gercek HTML olarak
  da bulunur
- Onceki/sonraki butonlari, odak gorunurlugu ve klavye ile proje acma
- Dokunmatik cihazlarda ilk dokunus projeyi odaklar; ayni projeye ikinci dokunus
  mevcut proje detay sayfasini acar
- `prefers-reduced-motion` icin donmeyen, kaydirilabilir 2B alternatif
- Metin ve kontroller en az mevcut site kontrast/olcu sistemini korur

## 7. Yerel prototip guvenceleri

- Rota navigasyona ve sitemap'e eklenmeyecek.
- `NODE_ENV !== development` durumunda sayfa `404` dondurecek.
- Metadata `noindex, nofollow` olacak.
- Mevcut `/projeler` sayfasi ve canli portfolyo davranisi degismeyecek.

## 8. Uygulama fazlari

### Faz A — Anlamli ilk dilim (tamamlandi)

- Yerel rota ve noindex/production guard
- Gercek preview'lardan temel 3B mockup bulutu
- Marka atmosferi, temel hover ve proje acma
- Ilk yerel tarayici onizlemesi

### Faz B — Tam prototip (tamamlandi)

- Scroll-driven rotasyon, kamera ve aktif proje senkronizasyonu
- Hover/tap odagi, onceki/sonraki HTML kontrolleri
- WebGL2 destekli mobilde optimize 3B spiral ve ilk dokunus/ikinci dokunus etkilesimi
- Reduced-motion, Save-Data, WebGL2 veya context failure durumlarinda HTML fallback
- Yuklenme, bos veri ve WebGL desteklenmiyor durumlari

### Faz C — Dogrulama (tamamlandi)

- TypeScript, ESLint ve production build
- Masaustu ile 390x844 ve 430x932 portre telefon profilleri, ayrica kisa-yatay telefon
  profili; console/error-overlay kontrolu
- Proje tiklama, scroll, hover, klavye ve reduced-motion kontrolu
- Performans ve GPU bellek icin secili proje sayisini yeniden ayarlama

### Faz D — Anasayfa entegrasyonu (tamamlandi, 2026-09-04)

- Karar: V2 mevcut `/projeler` sayfasinin yerini almadi; anasayfadaki 6'li slider'in
  yerine "Öne Çıkan Projeler" sahnesi oldu (`variant="home"`, h2 baslik, alt chrome
  offset'i, masaustunde "Tüm projeleri gör" baglantisi)
- Ortak bilesen + `src/lib/project-cloud.ts` + `projectCloud` cevirileri
- `/projeler-v2` rotasi dev-only kaldi (asagidaki eski Faz D maddeleri ona ait)

### Faz D (eski) — Ayri rota olarak canliya gecis (uygulanmadi)

- Production guard'i kaldirma
- V2'nin mevcut sayfanin yerini mi alacagi, yoksa ayri deney olarak mi kalacagi karari
- Navigasyon, sitemap, canonical/hreflang ve analytics entegrasyonu
- Canli cihazlarda Lighthouse + WebGL uyumluluk testi

## 9. Kabul kriterleri

- [x] `/tr/projeler-v2` yerelde acilir ve ilk ekranda gercek proje mockup bulutu gorunur.
- [x] Kaydirma tum kartlari spiral yolda hareket ettirir ve odagi sirayla degistirir.
- [x] Her secili proje mevcut detay sayfasina gider.
- [x] WebGL2 destekli mobilde optimize 3B spiral calisir; reduced-motion, Save-Data,
  WebGL2/context failure durumlarinda icerik HTML fallback ile kaybolmaz.
- [x] Mevcut projeler sayfasi, navigasyon ve sitemap etkilenmez.
- [x] Typecheck, lint, build ve tarayici dogrulamasi tamamlanir.

## 10. Uygulama sonucu

- 15 proje: 12 yatay, 3 dikey mockup; mevcut yuksek cozunurluklu preview'larin
  transfer butcesi yaklasik 874 KiB.
- Scroll mesafesi masaustunde `430svh`, mobil/kisa ekranlarda `576svh`; aktif kart
  `round(progress * (N - 1))` ile helis foreground'una senkron.
- Onceki/sonraki kontrolleri ilgili projenin gercek scroll konumuna yumusak gecis yapar.
- Canvas DPR masaustunde `1–1.5`, mobil kompakt profilde sabit `2x`; antialias acik,
  post-processing, golge ve fizik kullanilmadi.
- Mobil WebGL profili 390x844 ve 430x932 portre ekranlar ile kisa-yatay telefonlarda
  kompakt kamera/helis ve sade atmosfer kullanir; ilk dokunus odaklar, ikinci dokunus
  proje detayini acar. Mobil kalite kontrolunde CSS alani 375x844 iken Canvas'in
  750x1688 backing resolution ile gercek `2x` cizdigi dogrulandi.
- Production build basarili. HTTP smoke testi: V2 yerel slug production'da 404,
  mevcut projeler sayfasi 200.
- Bilinen uyarilar: React Three Fiber'in kullandigi deprecated `THREE.Clock` uyarisi ve
  repoda onceden var olan 18 ESLint uyarisi; yeni hata yok.
