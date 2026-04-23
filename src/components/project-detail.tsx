'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type Project, getAdjacentProjects } from '@/lib/data';
import PageShell from './page-shell';

interface Props {
  project: Project;
}

export default function ProjectDetail({ project }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
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
  const video = project.type === 'work' ? project.video : project.video;

  const client = project.type === 'work' ? project.client : project.client;
  const kind = project.type === 'work' ? project.kind : undefined;
  const scope = project.type === 'work' ? project.scope : undefined;
  const collaborator = project.type === 'work' ? project.collaborator : undefined;
  const number = project.type === 'work' ? project.n : project.no;

  // Resolve translated content by slug, falling back to data.ts values
  const translationNs = project.type === 'work' ? tw : ts;
  const title = translationNs.has(`${slug}.title`) ? translationNs(`${slug}.title`) : project.title;
  const summary = project.type === 'work'
    ? (tw.has(`${slug}.summary`) ? tw(`${slug}.summary`) : project.summary)
    : (ts.has(`${slug}.sub`) ? ts(`${slug}.sub`) : project.sub);
  const body: string[] = translationNs.has(`${slug}.body`)
    ? (translationNs.raw(`${slug}.body`) as string[])
    : (project.type === 'work' ? project.body : project.body);

  // Ensure video plays
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, [slug]);

  return (
    <PageShell>
      {/* Hero video */}
      <section className="pd-hero" data-cursor="play" data-cursor-label="Play">
        <div className="pd-hero-video">
          <video
            ref={videoRef}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
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

        {/* Inline video showcase */}
        <div className="pd-inline-video glass" data-cursor="play" data-cursor-label="Play">
          <video src={video} autoPlay muted loop playsInline preload="auto" />
          <div className="pd-inline-video-overlay">
            <span className="pd-inline-video-tag">[ {kind || tags[0] || 'VIDEO'} · {year} ]</span>
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
              href={`/projects/${prev.type === 'work' ? prev.slug : prev.slug}`}
              className="pd-nav-card glass"
              data-cursor="hover"
              data-cursor-label="Prev"
            >
              <div className="pd-nav-card-media">
                <video
                  src={prev.type === 'work' ? prev.video : prev.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
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
              href={`/projects/${next.type === 'work' ? next.slug : next.slug}`}
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
                <video
                  src={next.type === 'work' ? next.video : next.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            </Link>
          )}
        </div>
      </section>
    </PageShell>
  );
}
