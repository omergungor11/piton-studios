'use client';

import { useState, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { type Project, getAdjacentProjects } from '@/lib/data';
import PageShell from './page-shell';
import ProjectPlaceholder from '@/components/project-placeholder';
import RelatedSolutions, { type RelatedSolution } from '@/components/related-solutions';
import SplitWords from '@/components/motion/split-words';

interface Props {
  project: Project;
  relatedSolutions?: RelatedSolution[];
}

interface CaseStudy {
  challenge: string;
  solution: string;
  highlights: string[];
  stack: string[];
  outcome: string;
}

function IconDesktop() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  );
}

function IconMobile() {
  return (
    <svg width="9" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
    </svg>
  );
}

export default function ProjectDetail({ project, relatedSolutions = [] }: Props) {
  const td = useTranslations('projectDetail');
  const tw = useTranslations('works');
  const ts = useTranslations('stories');

  const { prev, next } = getAdjacentProjects(
    project.type === 'work' ? project.slug : project.slug
  );

  const slug         = project.type === 'work' ? project.slug : project.slug;
  const year         = project.year;
  const role         = project.role;
  const tags         = project.tags;
  const client       = project.type === 'work' ? project.client : project.client;
  const kind         = project.type === 'work' ? project.kind : undefined;
  const scope        = project.type === 'work' ? project.scope : undefined;
  const collaborator = project.type === 'work' ? project.collaborator : undefined;
  const liveUrl      = project.type === 'work' ? project.url : undefined;
  const number       = project.type === 'work' ? project.n : project.no;
  const previews     = project.type === 'work' ? project.previews : undefined;
  const hasPreviews  = !!(previews?.desktop);
  const hasMobile    = !!(previews?.mobile);

  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');

  // Yalnizca hasPreviews dalinda okunuyor; onizleme yoksa ProjectPlaceholder ciziliyor.
  const heroSrc = hasPreviews
    ? (view === 'mobile' && hasMobile ? previews!.mobile! : previews!.desktop!)
    : '';

  const translationNs = project.type === 'work' ? tw : ts;
  const title   = translationNs.has(`${slug}.title`)   ? translationNs(`${slug}.title`)   : project.title;
  const summary = project.type === 'work'
    ? (tw.has(`${slug}.summary`) ? tw(`${slug}.summary`) : project.summary)
    : (ts.has(`${slug}.sub`)     ? ts(`${slug}.sub`)     : project.sub);
  const body: string[] = translationNs.has(`${slug}.body`)
    ? (translationNs.raw(`${slug}.body`) as string[])
    : (project.type === 'work' ? project.body : project.body);

  // Opsiyonel teknik vaka calismasi: works.{slug}.caseStudy (rakamsiz, repodan dogrulanmis).
  const caseStudy = project.type === 'work' && tw.has(`${slug}.caseStudy.challenge`)
    ? (tw.raw(`${slug}.caseStudy`) as CaseStudy)
    : null;

  // pd-meta-item'lar kosullu render edildigi icin sirali --i burada elle sayilir.
  let metaIndex = 0;

  return (
    <PageShell>
      {/* Hero — screenshot showcase */}
      <section className={`pd-hero${hasPreviews && view === 'mobile' ? ' pd-hero-mobile' : ''}`}>
        {/* Görsel — önizleme yoksa jenerik stok görsel yerine arayüz iskeleti */}
        <div className="pd-hero-video" data-parallax="0.08">
          {hasPreviews ? (
            <Image
              src={heroSrc}
              alt={title}
              fill
              priority
              sizes="(max-width: 700px) 100vw, 1200px"
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
          ) : (
            <ProjectPlaceholder label={kind} />
          )}
          <div className="pd-hero-fade" />
        </div>

        {/* Desktop / Mobile toggle — sağ üst */}
        {hasPreviews && hasMobile && (
          <div className="pd-hero-toggle">
            <button
              className={`pd-ptoggle-btn ${view === 'desktop' ? 'is-active' : ''}`}
              onClick={() => setView('desktop')}
            >
              <IconDesktop /> Desktop
            </button>
            <button
              className={`pd-ptoggle-btn ${view === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setView('mobile')}
            >
              <IconMobile /> Mobile
            </button>
          </div>
        )}

        {/* Proje bilgisi — alt sol */}
        <div className="pd-hero-overlay">
          <span className="pd-hero-n" data-reveal="fade-hero">[{number}]</span>
          <SplitWords as="h1" hero className="pd-hero-title" text={title} />
          <span className="pd-hero-year" data-reveal="fade-hero" style={{ '--reveal-delay': '180ms' } as CSSProperties}>
            {year}
          </span>
        </div>

        {/* Kategori etiketi — sol üst (sadece preview yoksa) */}
        {!hasPreviews && (
          <div className="pd-hero-tag">{td('mediaTag')}</div>
        )}
      </section>

      {/* Metadata bar */}
      <section className="pd-meta glass">
        {client && (
          <div className="pd-meta-item" data-reveal="rise" style={{ '--i': metaIndex++ } as CSSProperties}>
            <div className="pd-meta-k">{td('client')}</div>
            <div className="pd-meta-v">{client}</div>
          </div>
        )}
        <div className="pd-meta-item" data-reveal="rise" style={{ '--i': metaIndex++ } as CSSProperties}>
          <div className="pd-meta-k">{td('year')}</div>
          <div className="pd-meta-v">{year}</div>
        </div>
        {(kind || scope) && (
          <div className="pd-meta-item" data-reveal="rise" style={{ '--i': metaIndex++ } as CSSProperties}>
            <div className="pd-meta-k">{td('scope')}</div>
            <div className="pd-meta-v">{scope || kind}</div>
          </div>
        )}
        <div className="pd-meta-item" data-reveal="rise" style={{ '--i': metaIndex++ } as CSSProperties}>
          <div className="pd-meta-k">{td('role')}</div>
          <div className="pd-meta-v">{role}</div>
        </div>
        {collaborator && (
          <div className="pd-meta-item" data-reveal="rise" style={{ '--i': metaIndex++ } as CSSProperties}>
            <div className="pd-meta-k">{td('collab')}</div>
            <div className="pd-meta-v">{collaborator}</div>
          </div>
        )}
        {liveUrl && (
          <div className="pd-meta-item" data-reveal="rise" style={{ '--i': metaIndex++ } as CSSProperties}>
            <div className="pd-meta-k">{td('live')}</div>
            <div className="pd-meta-v">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="pd-live-link" data-cursor="hover" data-cursor-label="↗">
                {td('visit')} ↗
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Body */}
      <section className="pd-body">
        <div className="pd-body-eyebrow" data-reveal="fade">{td('caseStudy')}</div>
        <SplitWords as="h2" className="pd-body-title" segments={[`${title} — `, { text: summary, className: 'em' }]} />

        <div className="pd-body-text">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="pd-tags">
            {tags.map((tag) => (
              <span key={tag} className="pd-tag">{tag}</span>
            ))}
          </div>
        )}
      </section>

      {caseStudy && (
        <section className="pd-case" aria-label={td('caseStudy')}>
          <div className="pd-case-grid">
            <div className="pd-case-block glass" data-reveal="rise" style={{ '--i': 0 } as CSSProperties}>
              <h3 className="pd-case-k">{td('caseChallenge')}</h3>
              <p>{caseStudy.challenge}</p>
            </div>
            <div className="pd-case-block glass" data-reveal="rise" style={{ '--i': 1 } as CSSProperties}>
              <h3 className="pd-case-k">{td('caseSolution')}</h3>
              <p>{caseStudy.solution}</p>
            </div>
          </div>
          <div className="pd-case-block glass" data-reveal="rise" style={{ '--i': 2 } as CSSProperties}>
            <h3 className="pd-case-k">{td('caseHighlights')}</h3>
            <ul className="pd-case-list">
              {caseStudy.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            <h3 className="pd-case-k">{td('caseStack')}</h3>
            <div className="pd-tags">
              {/* lang="en": uppercase donusumunde Turkce "İ" (TYPESCRİPT) olusmasin */}
              {caseStudy.stack.map((s) => (
                <span key={s} className="pd-tag" lang="en">{s}</span>
              ))}
            </div>
          </div>
          <div className="pd-case-block pd-case-outcome glass" data-reveal="rise" style={{ '--i': 3 } as CSSProperties}>
            <h3 className="pd-case-k">{td('caseOutcome')}</h3>
            <p>{caseStudy.outcome}</p>
          </div>
        </section>
      )}

      <RelatedSolutions items={relatedSolutions} />

      {/* Navigation */}
      <section className="pd-nav">
        <div className="pd-nav-bar">
          {prev ? (
            <Link
              href={{ pathname: '/projects/[slug]', params: { slug: prev.slug } }}
              className="pd-nav-link pd-nav-prev"
              data-cursor="hover"
            >
              <span className="pd-nav-arrow">←</span>
              <span className="pd-nav-info">
                <span className="pd-nav-dir">{td('prev')}</span>
                <span className="pd-nav-link-title">{prev.title}</span>
                <span className="pd-nav-link-kind">{prev.type === 'work' ? prev.kind : prev.tags[0]}</span>
              </span>
            </Link>
          ) : <span />}

          <Link href="/projects" className="pd-nav-all" data-cursor="hover" data-cursor-label="↗">
            {td('viewAll')}
          </Link>

          {next ? (
            <Link
              href={{ pathname: '/projects/[slug]', params: { slug: next.slug } }}
              className="pd-nav-link pd-nav-next"
              data-cursor="hover"
            >
              <span className="pd-nav-info" style={{ textAlign: 'right' }}>
                <span className="pd-nav-dir">{td('next')}</span>
                <span className="pd-nav-link-title">{next.title}</span>
                <span className="pd-nav-link-kind">{next.type === 'work' ? next.kind : next.tags[0]}</span>
              </span>
              <span className="pd-nav-arrow">→</span>
            </Link>
          ) : <span />}
        </div>
      </section>
    </PageShell>
  );
}
