'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { imageUrl } from '@/lib/media';
import { type Project, getAdjacentProjects } from '@/lib/data';
import PageShell from './page-shell';

interface Props {
  project: Project;
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

export default function ProjectDetail({ project }: Props) {
  const td = useTranslations('projectDetail');
  const tw = useTranslations('works');
  const ts = useTranslations('stories');

  const { prev, next } = getAdjacentProjects(
    project.type === 'work' ? project.slug : project.slug
  );

  const slug = project.type === 'work' ? project.slug : project.slug;
  const year = project.year;
  const role = project.role;
  const tags = project.tags;
  const image = imageUrl(project.image);

  const client       = project.type === 'work' ? project.client : project.client;
  const kind         = project.type === 'work' ? project.kind : undefined;
  const scope        = project.type === 'work' ? project.scope : undefined;
  const collaborator = project.type === 'work' ? project.collaborator : undefined;
  const number       = project.type === 'work' ? project.n : project.no;
  const previews     = project.type === 'work' ? project.previews : undefined;

  const hasPreviews  = !!(previews?.desktop);
  const hasMobile    = !!(previews?.mobile);

  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');

  const previewSrc = hasPreviews
    ? (view === 'mobile' && hasMobile ? previews!.mobile! : previews!.desktop!)
    : image;

  // Resolve translated content by slug, falling back to data.ts values
  const translationNs = project.type === 'work' ? tw : ts;
  const title = translationNs.has(`${slug}.title`) ? translationNs(`${slug}.title`) : project.title;
  const summary = project.type === 'work'
    ? (tw.has(`${slug}.summary`) ? tw(`${slug}.summary`) : project.summary)
    : (ts.has(`${slug}.sub`) ? ts(`${slug}.sub`) : project.sub);
  const body: string[] = translationNs.has(`${slug}.body`)
    ? (translationNs.raw(`${slug}.body`) as string[])
    : (project.type === 'work' ? project.body : project.body);

  return (
    <PageShell>
      {/* Hero image */}
      <section className="pd-hero">
        <div className="pd-hero-video">
          <img src={image} alt={title} />
          <div className="pd-hero-fade" />
        </div>
        <div className="pd-hero-overlay">
          <span className="pd-hero-n">[{number}]</span>
          <h1 className="pd-hero-title">{title}</h1>
          <span className="pd-hero-year">{year}</span>
        </div>
        <div className="pd-hero-tag">{td('mediaTag')}</div>
      </section>

      {/* Metadata bar */}
      <section className="pd-meta glass">
        {client && (
          <div className="pd-meta-item">
            <div className="pd-meta-k">{td('client')}</div>
            <div className="pd-meta-v">{client}</div>
          </div>
        )}
        <div className="pd-meta-item">
          <div className="pd-meta-k">{td('year')}</div>
          <div className="pd-meta-v">{year}</div>
        </div>
        {(kind || scope) && (
          <div className="pd-meta-item">
            <div className="pd-meta-k">{td('scope')}</div>
            <div className="pd-meta-v">{scope || kind}</div>
          </div>
        )}
        <div className="pd-meta-item">
          <div className="pd-meta-k">{td('role')}</div>
          <div className="pd-meta-v">{role}</div>
        </div>
        {collaborator && (
          <div className="pd-meta-item">
            <div className="pd-meta-k">{td('collab')}</div>
            <div className="pd-meta-v">{collaborator}</div>
          </div>
        )}
      </section>

      {/* Body */}
      <section className="pd-body">
        <div className="pd-body-eyebrow">{td('caseStudy')}</div>
        <h2 className="pd-body-title">
          {title} — <span className="em">{summary}</span>
        </h2>

        {/* Inline image / preview showcase */}
        <div className={`pd-inline-video glass${hasPreviews && view === 'mobile' ? ' pd-inline-mobile' : ''}`}>
          <img
            src={previewSrc}
            alt={title}
            style={{ objectPosition: 'top center' }}
          />
          {/* Desktop/Mobile toggle — görselin sağ üstünde */}
          {hasPreviews && hasMobile && (
            <div className="pd-preview-toggle">
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
          <div className="pd-inline-video-overlay">
            <span className="pd-inline-video-tag">[ {kind || tags[0] || 'PROJECT'} · {year} ]</span>
          </div>
        </div>

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

      {/* Related / Navigation */}
      <section className="pd-nav">
        <div className="pd-nav-head">
          <span className="pd-nav-tag">{td('moreWork')}</span>
          <Link
            href="/projects"
            className="pd-nav-all"
            data-cursor="hover"
            data-cursor-label="↗"
          >
            {td('viewAll')}
          </Link>
        </div>
        <div className="pd-nav-grid">
          {prev && (
            <Link
              href={{ pathname: '/projects/[slug]', params: { slug: prev.slug } }}
              className="pd-nav-card glass"
              data-cursor="hover"
              data-cursor-label="Prev"
            >
              <div className="pd-nav-card-media">
                <img src={prev.type === 'work' && prev.previews?.desktop ? prev.previews.desktop : imageUrl(prev.image)} alt={prev.title} />
              </div>
              <div className="pd-nav-card-info">
                <span className="pd-nav-dir">{td('prev')}</span>
                <span className="pd-nav-card-title">{prev.title}</span>
                <span className="pd-nav-card-kind">
                  {prev.type === 'work' ? prev.kind : prev.tags.join(' · ')}
                </span>
              </div>
            </Link>
          )}
          {next && (
            <Link
              href={{ pathname: '/projects/[slug]', params: { slug: next.slug } }}
              className="pd-nav-card glass next"
              data-cursor="hover"
              data-cursor-label="Next"
            >
              <div className="pd-nav-card-info" style={{ textAlign: 'right' }}>
                <span className="pd-nav-dir">{td('next')}</span>
                <span className="pd-nav-card-title">{next.title}</span>
                <span className="pd-nav-card-kind">
                  {next.type === 'work' ? next.kind : next.tags.join(' · ')}
                </span>
              </div>
              <div className="pd-nav-card-media">
                <img src={next.type === 'work' && next.previews?.desktop ? next.previews.desktop : imageUrl(next.image)} alt={next.title} />
              </div>
            </Link>
          )}
        </div>
      </section>
    </PageShell>
  );
}
