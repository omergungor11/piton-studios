'use client';

import { type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import PageShell from '@/components/page-shell';
import MatrixRain from '@/components/matrix-rain';
import SplitWords from '@/components/motion/split-words';
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
        <div className="sp-hero-eyebrow" data-reveal="fade-hero">{t('eyebrow')}</div>
        <SplitWords
          as="h1"
          hero
          className="sp-hero-title"
          segments={[
            (t.raw('heading') as string).split('{accent}')[0],
            { text: t('headingAccent'), className: 'em' },
            (t.raw('heading') as string).split('{accent}')[1],
          ]}
        />
        <p className="sp-hero-sub" data-reveal="fade-hero" style={{ '--reveal-delay': '180ms' } as CSSProperties}>
          {t('desc')}
        </p>
      </section>

      {/* Hikaye + kod paneli. Eski "32+/4+/8+" sayaclari buradan kaldirildi —
          rakamlar artik StudioNumbers icinde, portfolyodan hesaplaniyor. */}
      <section className="ap-story glass" data-reveal="fade">
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

      <div data-reveal="fade">
        <SnakeBorder radius={28}>
          <StudioNumbers />
        </SnakeBorder>
      </div>

      <div data-reveal="fade">
        <StudioTimeline />
      </div>

      <div data-reveal="fade">
        <CapabilityMap />
      </div>

      {/* Degerler */}
      <section className="ap-values glass" data-reveal="fade">
        <div className="ap-values-title">{ts('values.title')}</div>
        <div className="ap-values-grid">
          {VALUE_KEYS.map((i) => (
            <div key={i} className="ap-value-card" data-cursor="hover" data-reveal="rise" style={{ '--i': i } as CSSProperties}>
              <div className="ap-value-n">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="ap-value-title">{values[i].title}</h3>
              <p className="ap-value-desc">{values[i].desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Takim */}
      <section className="ap-team glass" data-reveal="fade">
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

      {/* Musteriler */}
      <section className="ap-clients glass" data-reveal="fade">
        <div className="ap-clients-title">{ts('clients.title')}</div>
        <div className="ap-clients-grid">
          {CLIENTS.map((c, i) => (
            <div key={c} className="ap-client" data-reveal="rise" style={{ '--i': i } as CSSProperties}>
              {c}
            </div>
          ))}
        </div>
      </section>

      <div data-reveal="fade">
        <TestimonialsScene />
      </div>

      <div className="subpage-spark">
        <SparkScene hideStats sub={ts('cta.desc')} />
      </div>
    </PageShell>
  );
}
