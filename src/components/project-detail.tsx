'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { type Project, getAdjacentProjects } from '@/lib/data';
import PageShell from './page-shell';
import ProjectPlaceholder from '@/components/project-placeholder';

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

  return (
    <PageShell>
      {/* Hero — screenshot showcase */}
      <section className={`pd-hero${hasPreviews && view === 'mobile' ? ' pd-hero-mobile' : ''}`}>
        {/* Görsel — önizleme yoksa jenerik stok görsel yerine arayüz iskeleti */}
        <div className="pd-hero-video">
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
          <span className="pd-hero-n">[{number}]</span>
          <h1 className="pd-hero-title">{title}</h1>
          <span className="pd-hero-year">{year}</span>
        </div>

        {/* Kategori etiketi — sol üst (sadece preview yoksa) */}
        {!hasPreviews && (
          <div className="pd-hero-tag">{td('mediaTag')}</div>
        )}
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
        {liveUrl && (
          <div className="pd-meta-item">
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
        <div className="pd-body-eyebrow">{td('caseStudy')}</div>
        <h2 className="pd-body-title">
          {title} — <span className="em">{summary}</span>
        </h2>

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
