'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import type { ProjectCloudItem } from '@/components/projects-v2/project-cloud-canvas';
import styles from './project-cloud-section.module.css';

const ProjectCloudCanvas = dynamic(
  () => import('@/components/projects-v2/project-cloud-canvas'),
  {
    ssr: false,
    loading: () => <div className={styles.loading} aria-hidden="true" />,
  }
);

export interface ProjectCloudSectionProps {
  projects: ProjectCloudItem[];
  /**
   * `home`: anasayfa sahnesi — alt chrome ile cakismamak icin HUD yukari alinir,
   * "tum projeler" baglantisi gosterilir. `page`: bagimsiz tam sayfa deneyimi.
   */
  variant?: 'home' | 'page';
  /** Anasayfada hero zaten h1 tasidigi icin sahne basligi h2 olur. */
  titleAs?: 'h1' | 'h2';
  /** Varsayilan `projectCloud.eyebrow` cevirisinin yerine gecer (or. yerel prototip etiketi). */
  eyebrow?: string;
}

interface NavigatorConnection {
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NavigatorConnection;
}

type ExperienceMode = 'checking' | 'webgl' | 'fallback';

interface ExperienceBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ExperienceBoundaryState {
  failed: boolean;
}

class ExperienceBoundary extends Component<ExperienceBoundaryProps, ExperienceBoundaryState> {
  state: ExperienceBoundaryState = { failed: false };

  static getDerivedStateFromError(): ExperienceBoundaryState {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function supportsImmersiveScene(): boolean {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

  if (reducedMotion || saveData) return false;

  const probe = document.createElement('canvas');
  const context = probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
  context?.getExtension('WEBGL_lose_context')?.loseContext();
  return context !== null;
}

interface ProjectFallbackProps {
  hint: string;
  projects: ProjectCloudItem[];
  onFocus: (slug: string) => void;
}

function ProjectFallback({ hint, projects, onFocus }: ProjectFallbackProps) {
  return (
    <div className={styles.fallback} aria-label={hint}>
      <p className={styles.fallbackHint}>{hint}</p>
      <div className={styles.fallbackRail} role="list">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
            className={`${styles.fallbackCard} ${project.format === 'portrait' ? styles.fallbackCardPortrait : ''}`}
            onFocus={() => onFocus(project.slug)}
            onMouseEnter={() => onFocus(project.slug)}
            role="listitem"
            data-cursor="hover"
          >
            <span className={styles.fallbackMedia}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 767px) 76vw, 420px"
                priority={index === 0}
              />
            </span>
            <span className={styles.fallbackMeta}>
              <span>[{project.number}]</span>
              <strong>{project.title}</strong>
              <small>{project.kind} · {project.year}</small>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ProjectCloudSection({
  projects,
  variant = 'page',
  titleAs = 'h1',
  eyebrow,
}: ProjectCloudSectionProps) {
  const t = useTranslations('projectCloud');
  const router = useRouter();
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const scrollIndexRef = useRef(0);
  const isHoveringRef = useRef(false);
  const [mode, setMode] = useState<ExperienceMode>('checking');
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? '');

  const Title = titleAs;
  const titleId = `project-cloud-title-${variant}`;
  const isHome = variant === 'home';

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.35,
  });

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluate = () => setMode(supportsImmersiveScene() ? 'webgl' : 'fallback');
    evaluate();

    reducedMotionQuery.addEventListener('change', evaluate);

    return () => {
      reducedMotionQuery.removeEventListener('change', evaluate);
    };
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    progressRef.current = latest;
    stageRef.current?.style.setProperty('--v2-progress', String(latest));

    if (progressTextRef.current) {
      progressTextRef.current.textContent = `${String(Math.round(latest * 100)).padStart(3, '0')}%`;
    }

    if (projects.length === 0) return;
    const nextIndex = Math.round(latest * Math.max(0, projects.length - 1));
    if (nextIndex === scrollIndexRef.current) return;

    scrollIndexRef.current = nextIndex;
    if (!isHoveringRef.current) setActiveSlug(projects[nextIndex].slug);
  });

  const activeIndex = Math.max(0, projects.findIndex((project) => project.slug === activeSlug));
  const activeProject = projects[activeIndex] ?? projects[0];

  const openProject = useCallback((slug: string) => {
    router.push({ pathname: '/projects/[slug]', params: { slug } });
  }, [router]);

  const handleSceneFocus = useCallback((slug: string | null) => {
    isHoveringRef.current = slug !== null;
    const nextSlug = slug ?? projects[scrollIndexRef.current]?.slug;
    if (nextSlug) setActiveSlug(nextSlug);
  }, [projects]);

  const moveProject = (direction: -1 | 1) => {
    if (projects.length === 0) return;
    const nextIndex = (activeIndex + direction + projects.length) % projects.length;
    setActiveSlug(projects[nextIndex].slug);

    const track = trackRef.current;
    if (!track) return;
    const trackTop = window.scrollY + track.getBoundingClientRect().top;
    const scrollDistance = Math.max(0, track.offsetHeight - window.innerHeight);
    const projectProgress = nextIndex / Math.max(1, projects.length - 1);
    window.scrollTo({
      top: trackTop + scrollDistance * projectProgress,
      behavior: 'smooth',
    });
  };

  const fallback = (
    <ProjectFallback hint={t('fallbackHint')} projects={projects} onFocus={setActiveSlug} />
  );

  return (
    <section
      ref={trackRef}
      className={`${styles.track} ${mode === 'fallback' ? styles.trackFallback : ''} ${isHome ? styles.trackHome : ''}`}
      aria-labelledby={titleId}
    >
      <div ref={stageRef} className={styles.stage}>
        {/* Anasayfada diger sahneler gibi .glass kutu; tam sayfa varyantinda gorunmez sarmalayici */}
        <div className={isHome ? `${styles.panel} glass` : styles.panel}>
        <div className={styles.backdrop} aria-hidden="true" />

        <header className={styles.intro}>
          <p className={styles.eyebrow}>{eyebrow ?? t('eyebrow')}</p>
          <Title id={titleId} className={styles.title}>{t('title')}</Title>
          <p className={styles.lede}>{t('intro')}</p>
          <p className={styles.touchNote}>{t('touchInteraction')}</p>
          {isHome ? (
            <Link href="/projects" className={styles.allLink} data-cursor="hover">
              {t('allProjects')} <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </header>

        {mode === 'webgl' && projects.length > 0 ? (
          <ExperienceBoundary fallback={fallback}>
            <div
              className={styles.canvas}
              data-cursor="play"
              data-cursor-label="View"
              aria-hidden="true"
            >
              <ProjectCloudCanvas
                projects={projects}
                activeSlug={activeProject?.slug ?? ''}
                progressRef={progressRef}
                onFocus={handleSceneFocus}
                onSelect={openProject}
                onContextLost={() => setMode('fallback')}
                stars={!isHome}
              />
            </div>
          </ExperienceBoundary>
        ) : mode === 'fallback' ? (
          fallback
        ) : (
          <div className={styles.loading}>{t('loading')}</div>
        )}

        {activeProject && mode === 'webgl' ? (
          <aside className={styles.projectHud}>
            <span className={styles.projectNumber}>[{activeProject.number}]</span>
            <div className={styles.projectCopy}>
              <p className={styles.projectTitle}>{activeProject.title}</p>
              <p>{activeProject.kind} · {activeProject.year}</p>
            </div>
            <div className={styles.projectNav}>
              <button
                type="button"
                onClick={() => moveProject(-1)}
                aria-label={t('previousProject')}
                data-cursor="hover"
              >
                ←
              </button>
              <span>
                {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => moveProject(1)}
                aria-label={t('nextProject')}
                data-cursor="hover"
              >
                →
              </button>
            </div>
            <Link
              href={{ pathname: '/projects/[slug]', params: { slug: activeProject.slug } }}
              className={styles.projectLink}
              data-cursor="hover"
            >
              {t('openProject')} <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        ) : null}

        {mode === 'webgl' ? (
          <div className={styles.interactionHint} aria-hidden="true">
            <span>{t('interaction')}</span>
            <i />
            <span ref={progressTextRef} className={styles.progressText}>000%</span>
          </div>
        ) : null}

        <div className={styles.veil} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
