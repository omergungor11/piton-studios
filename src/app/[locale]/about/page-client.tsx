'use client';

import { useTranslations } from 'next-intl';
import PageShell from '@/components/page-shell';
import MatrixRain from '@/components/matrix-rain';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import StudioNumbers from '@/components/about/studio-numbers';
import SnakeBorder from '@/components/snake-border';
import StudioTimeline from '@/components/about/studio-timeline';
import CapabilityMap from '@/components/about/capability-map';
import TestimonialsScene from '@/components/scenes/testimonials';
import SparkScene from '@/components/scenes/spark';

/**
 * Musteri adlari ozel isim — cevrilmiyor, kodda duruyor.
 * Yetenek/teknoloji listesi artik burada degil: CapabilityMap onu WORKS'teki
 * `tags` alanindan turetiyor, boylece elle guncelleme gerekmiyor.
 */
const CLIENTS = [
  'Velis LTD', 'BT Elevator', 'Gel Gez Gör', 'Nexos Investment',
  'Ambalaj Cini', 'ISUZU Bursa', 'Alert Mühendislik', 'Aydin Transfer',
];

const VALUE_KEYS = [0, 1, 2, 3] as const;

export default function AboutPageClient() {
  const t = useTranslations('about');
  const ts = useTranslations('aboutSections');

  const values = ts.raw('values.items') as { title: string; desc: string }[];

  return (
    <PageShell>
      <section className="sp-hero is-wide">
        <Reveal variant="fadeIn">
          <div className="sp-hero-eyebrow">{t('eyebrow')}</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <h1 className="sp-hero-title">
            {(t.raw('heading') as string).split('{accent}')[0]}
            <span className="em">{t('headingAccent')}</span>
            {(t.raw('heading') as string).split('{accent}')[1]}
          </h1>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.2}>
          <p className="sp-hero-sub">{t('desc')}</p>
        </Reveal>
      </section>

      {/* Hikaye + kod paneli. Eski "32+/4+/8+" sayaclari buradan kaldirildi —
          rakamlar artik StudioNumbers icinde, portfolyodan hesaplaniyor. */}
      <Reveal variant="fadeUp" delay={0.1}>
        <section className="ap-story glass">
          <div className="ap-story-content">
            <p className="ap-story-text">{ts('story.p1')}</p>
            <p className="ap-story-text">{ts('story.p2')}</p>
            <blockquote className="ap-story-quote">
              <p>{t('quote')}</p>
              <cite>{t('quoteAuthor')}</cite>
            </blockquote>
          </div>

          <div className="about-media code-panel" aria-hidden="true">
            <span className="about-media-tag">[ CODE · SYSTEM ]</span>
            <MatrixRain bgColor="#04080F" glyphColor="#2080D0" headColor="#B0D8FF" />
            <div className="code-core">
              <span>PTN://STUDIO</span>
              <strong>creative_system.online</strong>
            </div>
            <div className="about-media-fade" />
            <div className="about-media-caption">
              <span>{t('location')}</span>
              <span>{t('mediaCaption')}</span>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.1}>
        <SnakeBorder radius={28}>
          <StudioNumbers />
        </SnakeBorder>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.1}>
        <StudioTimeline />
      </Reveal>

      <Reveal variant="fadeUp" delay={0.1}>
        <CapabilityMap />
      </Reveal>

      {/* Degerler */}
      <Reveal variant="fadeUp" delay={0.1}>
        <section className="ap-values glass">
          <div className="ap-values-title">{ts('values.title')}</div>
          <Stagger className="ap-values-grid" staggerDelay={0.08}>
            {VALUE_KEYS.map((i) => (
              <StaggerItem key={i}>
                <div className="ap-value-card" data-cursor="hover">
                  <div className="ap-value-n">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="ap-value-title">{values[i].title}</h3>
                  <p className="ap-value-desc">{values[i].desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      {/* Takim */}
      <Reveal variant="fadeUp" delay={0.1}>
        <section className="ap-team glass">
          <div className="ap-team-title">{ts('team.title')}</div>
          <div className="ap-team-card" data-cursor="hover">
            <div className="ap-team-avatar">ÖG</div>
            <div className="ap-team-info">
              <h3 className="ap-team-name">Ömer Güngör</h3>
              <div className="ap-team-role">{ts('team.role')}</div>
              <p className="ap-team-desc">{ts('team.desc')}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Musteriler */}
      <Reveal variant="fadeUp" delay={0.1}>
        <section className="ap-clients glass">
          <div className="ap-clients-title">{ts('clients.title')}</div>
          <Stagger className="ap-clients-grid" staggerDelay={0.05}>
            {CLIENTS.map((c) => (
              <StaggerItem key={c}>
                <div className="ap-client">{c}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.1}>
        <TestimonialsScene />
      </Reveal>

      <div className="subpage-spark">
        <SparkScene hideStats sub={ts('cta.desc')} />
      </div>
    </PageShell>
  );
}
