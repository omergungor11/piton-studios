# Lenis + kaydırma ve metin animasyonları planı (TASK-078)

Tarih: 2026-09-19 · Kaynak: kullanıcı isteği ("lenis ekle, scroll efektini geliştir, başlık ve açıklamalara animasyon")

## Hedef

- Tüm sitede Lenis ile yumuşak (inertial) kaydırma — dokunmatikte doğal kaydırma korunur.
- Başlıklarda kelime kelime maskeli yükselme, açıklamalarda bulanıklıktan netleşen fade, kartlarda sıralı giriş,
  hero görsellerinde hafif paralaks. Tek, merkezi ve hafif bir sistem; sayfalar yalnızca işaretlenir.

## Mevcut durum ve çakışma riskleri (inceleme sonucu)

| Bileşen | Risk | Çözüm |
|---|---|---|
| Anasayfa sticky sahneleri + `home-client` scroll dinleyicileri | Lenis native `window` kaydırmasını kullanır → dinleyiciler çalışmaya devam eder | Değişiklik yok; sahne menüsü `scrollIntoView` → `lenis.scrollTo` |
| 3B proje bulutu (tekerleği yakalar) | Lenis `defaultPrevented`'a bakmaz → bulut dönerken sayfa da kayar | Bulut olayı tükettiğinde `stopPropagation`; uçlarda sayfaya bırakır (Lenis devralır) |
| Yılan scrollbar (sürükleme) | `window.scrollTo` Lenis hedefini bozar | `lenis.scrollTo(y, { immediate: true })` |
| Mega menü paneli / mobil menü (iç kaydırma) | Lenis tekerleği yutar | `data-lenis-prevent`; mobil menü açıkken `lenis.stop()` |
| Sayfa geçişi | Eski kaydırma hedefi taşınır | Yol değişince `scrollTo(0, immediate)` |
| `animation-timeline: view()` (sd-section-fade) | Native scroll → uyumlu | Değişiklik yok |
| framer-motion `Reveal` (anasayfa) | Uyumlu; çift animasyon riski | Zaten `Reveal` ile sarılı öğeye `data-reveal` eklenmez |
| LCP (hero başlığı) | JS'e bağlı gizleme LCP'yi geciktirir | Hero varyantları saf CSS animasyonu (JS beklemez); diğerleri IntersectionObserver |
| Erişilebilirlik | Hareket hassasiyeti | `prefers-reduced-motion`: Lenis kapalı (respectReducedMotion), tüm reveal'ler anında görünür |
| JS yüklenmezse | İçerik gizli kalabilir | `reveal-ready` sınıfını satır içi script ekler; 3 sn içinde gözlemci bağlanmazsa kaldırır |

## Sistem (Faz 0 — ana oturum)

- `src/components/motion/smooth-scroll.tsx`: `ReactLenis` kökü (lerp 0.1, anchors, stopInertiaOnNavigate),
  rota değişiminde başa dönüş, `useScrollLock(open)` kancası, `[data-parallax]` sürücüsü.
- `src/components/motion/reveal-observer.tsx`: tek IntersectionObserver + MutationObserver; `[data-reveal]`
  görünür olunca `is-revealed` ekler.
- `src/components/motion/split-words.tsx`: `<SplitWords as="h1" text="…" />` — kelimeleri maske içinde böler
  (sunucu bileşeni uyumlu, metin DOM'da kalır → SEO/ekran okuyucu etkilenmez). `segments` ile `.em` vurgulu parça.
- CSS (globals.css "Hareket sistemi"): varyantlar

| `data-reveal` | Etki | Kullanım |
|---|---|---|
| `words` / `words-hero` | Kelimeler maskeden yükselir (45 ms aralık) | Sayfa ve bölüm başlıkları (`SplitWords`) |
| `fade` / `fade-hero` | 22px yukarı + blur(6px) → net | Açıklamalar, lead paragrafları, eyebrow |
| `rise` | Kartlar için yukarı + hafif ölçek; `--i` ile sıralı gecikme | Kart ızgaraları |
| `mask` | Aşağıdan yukarı clip-path açılımı | Görseller, sahneler |
| `line` | Soldan uzayan çizgi | Vurgu çizgileri |

  `-hero` varyantları sayfa açılışında saf CSS ile oynar (ekranın üstündeki içerik için).
  Gecikme: `style={{ '--reveal-delay': '120ms' }}`, sıra: `style={{ '--i': index }}`.
- `data-parallax="0.08"`: sarmalayıcının ilk çocuğu kaydırmayla hafifçe kayar (yalnızca transform).

## Uygulama (Faz 1 — 3 paralel ajan, dosya izolasyonu)

| Ajan | Dosyalar (yalnızca bunlar) |
|---|---|
| A — Anasayfa | `src/components/scenes/*.tsx` (hero, spark, manifesto, services, process, about, contact, testimonials, stories), `projects-v2/project-cloud-section.tsx` yalnızca başlık bölümü |
| B — Hizmet/sektör/çözüm | `service-detail.tsx`, `service-visuals/service-flow.tsx`, `landing-view.tsx`, `related-solutions.tsx`, `services/page-client.tsx`, `sectors/page.tsx`, `sectors/[slug]/page.tsx`, `solutions/page.tsx`, `locations/page.tsx` |
| C — Diğer iç sayfalar | `projects/page-client.tsx`, `project-detail.tsx`, `blog/page.tsx`, `blog/[slug]/page.tsx`, `blog/tag/[tag]/page.tsx`, `pricing-content.tsx`, `about/page-client.tsx`, `contact/page-client.tsx`, `faq/page-client.tsx`, `not-found` bileşeni, hukuki sayfa |

Kurallar: metin/içerik/sınıf adı/yerleşim değişmez; yalnızca `SplitWords` ve `data-reveal`/`data-parallax`
eklenir. globals.css, layout, nav, motion sistemi dosyalarına dokunulmaz (CSS ihtiyacı rapor edilir).
Git yok, sunucu başlatılmaz (port çakışması); `pnpm typecheck` ve `pnpm lint` serbest.
Ekranın üstündeki (above-the-fold) başlık/açıklama `-hero` varyantı kullanır. Aşırıya kaçılmaz: her bölümde
başlık + açıklama + (varsa) kart ızgarası; tablo, form, SSS cevapları, uzun gövde metni animasyonsuz kalır.

## Doğrulama (Faz 2 — ana oturum)

- Masaüstü + 390px: tekerlek, dokunmatik, yılan sürükleme, 3B bulut, mega menü iç kaydırma, mobil menü kilidi,
  anchor linkleri, sayfa geçişinde başa dönüş.
- Reduced-motion: Lenis kapalı, içerik anında görünür.
- Performans: anasayfa ve bir hizmet sayfasında trace — LCP ve CLS gerilemesi yok.
- typecheck / lint / build / content:check.
