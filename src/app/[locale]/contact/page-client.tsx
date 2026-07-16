'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import ContactScene from '@/components/scenes/contact';
import { Reveal } from '@/components/motion';

export default function ContactPageClient() {
  const t = useTranslations('contact');

  return (
    <PageShell>
      {/* Hero */}
      <section className="sp-hero">
        <Reveal variant="fadeIn">
          <div className="sp-hero-eyebrow">{t('eyebrow')}</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <h1 className="sp-hero-title">
            Projenizi<br />
            <span className="em">konuşalım.</span>
          </h1>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.2}>
          <p className="sp-hero-sub">
            Fikir aşamasından lansmana — her adımda yanınızdayız.
            Formu doldurun, en kısa sürede dönüş yapalım.
          </p>
        </Reveal>
      </section>

      {/* Info Cards */}
      <Reveal variant="fadeUp" delay={0.1}>
        <div className="cp-info-cards">
          <a href="mailto:hi@pitonstudios.com" className="cp-info-card" data-cursor="hover">
            <div className="cp-info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            </div>
            <div className="cp-info-label">{t('email')}</div>
            <div className="cp-info-value">hi@pitonstudios.com</div>
            <div className="cp-info-sub">En hızlı yanıt kanalı</div>
          </a>

          <a href="https://wa.me/905439500750" target="_blank" rel="noopener noreferrer" className="cp-info-card" data-cursor="hover">
            <div className="cp-info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="cp-info-label">{t('whatsapp')}</div>
            <div className="cp-info-value">+90 543 950 07 50</div>
            <div className="cp-info-sub">Hızlı ön görüşme</div>
          </a>

          <div className="cp-info-card">
            <div className="cp-info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="cp-info-label">{t('studio')}</div>
            <div className="cp-info-value">{t('studioLocation')}</div>
            <div className="cp-info-sub">Türkiye · Uzaktan çalışma</div>
          </div>
        </div>
      </Reveal>

      {/* Contact Form */}
      <Reveal variant="fadeUp" delay={0.2}>
        <ContactScene />
      </Reveal>

      {/* CTA */}
      <section className="sp-cta glass strong" style={{ marginTop: 24 }}>
        <div className="sp-cta-text">
          <h3>Projelerimize göz atın.</h3>
          <p>Neler yaptığımızı görmek için portföyümüzü inceleyin.</p>
        </div>
        <Link href="/projects" className="sp-cta-btn" data-cursor="hover" data-cursor-label="↗">
          <span>Projeler</span>
          <span>↗</span>
        </Link>
      </section>
    </PageShell>
  );
}
