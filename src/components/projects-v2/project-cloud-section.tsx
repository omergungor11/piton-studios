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
import { useMotionValue, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
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

/** Kaydirmanin one getirdigi proje sayisi; kalanlar helisin arka kollarinda durur. */
const DEFAULT_SCROLL_COUNT = 7;
/** Bir kartin one gelmesi icin gereken tekerlek mesafesi (px). */
const WHEEL_PX_PER_CARD = 150;
/** Uca gelindikten sonra sayfaya devretmeden once yutulan sure — momentum sicramasini onler. */
const EDGE_HOLD_MS = 450;
/** Dokunmatik: otomatik ilerleme araligi ve kullanici etkilesiminden sonra bekleme. */
const AUTO_ADVANCE_MS = 3600;
const AUTO_IDLE_MS = 6000;
const MOBILE_SCROLL_QUERY = '(max-width: 767px), (max-height: 519px) and (pointer: coarse)';

export interface ProjectCloudSectionProps {
  projects: ProjectCloudItem[];
  /**
   * `home`: anasayfa sahnesi — .glass kutu, "tum projeler" baglantisi.
   * `page`: bagimsiz tam sayfa deneyimi (dev-only prototip rotasi).
   */
  variant?: 'home' | 'page';
  /** Anasayfada hero zaten h1 tasidigi icin sahne basligi h2 olur. */
  titleAs?: 'h1' | 'h2';
  /** Varsayilan `projectCloud.eyebrow` cevirisinin yerine gecer (or. yerel prototip etiketi). */
  eyebrow?: string;
  /** Kaydirmayla one gelen proje sayisi (varsayilan 7). */
  scrollCount?: number;
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

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

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

/**
 * Sahne sayfa kaydirmasini kilitlemez. Ilerleme uc kaynaktan gelir:
 * - Masaustu: imlec kutunun uzerindeyken tekerlek; uclara (0/1) gelince olay sayfaya
 *   devredilir, boylece ziyaretci asagi/yukari inmeye devam eder.
 * - Anasayfa mobil: bolum sticky kalirken dikey sayfa kaydirmasi ilerlemeyi surer.
 * - Tam sayfa dokunmatik: yatay kaydirma ve etkilesim yokken otomatik ilerleme.
 * - HUD onceki/sonraki dugmeleri (klavye dahil).
 */
export default function ProjectCloudSection({
  projects,
  variant = 'page',
  titleAs = 'h1',
  eyebrow,
  scrollCount: scrollCountProp = DEFAULT_SCROLL_COUNT,
}: ProjectCloudSectionProps) {
  const t = useTranslations('projectCloud');
  const router = useRouter();
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const scrollIndexRef = useRef(0);
  const isHoveringRef = useRef(false);
  const lastInteractionRef = useRef(0);
  const edgeHitAtRef = useRef(0);
  const [mode, setMode] = useState<ExperienceMode>('checking');
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? '');
  const [scrollIndex, setScrollIndex] = useState(0);
  const [mobileScrollEnabled, setMobileScrollEnabled] = useState(false);

  const scrollCount = Math.max(1, Math.min(scrollCountProp, projects.length));
  const scrollSteps = Math.max(1, scrollCount - 1);
  const Title = titleAs;
  const titleId = `project-cloud-title-${variant}`;
  const isHome = variant === 'home';

  const targetProgress = useMotionValue(0);
  const smoothProgress = useSpring(targetProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.35,
  });
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
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

  useEffect(() => {
    const query = window.matchMedia(MOBILE_SCROLL_QUERY);
    const sync = () => setMobileScrollEnabled(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!isHome || !mobileScrollEnabled || mode !== 'webgl') return;
    targetProgress.set(sectionScrollProgress.get());
  }, [isHome, mobileScrollEnabled, mode, sectionScrollProgress, targetProgress]);

  useMotionValueEvent(sectionScrollProgress, 'change', (latest) => {
    if (!isHome || !mobileScrollEnabled || mode !== 'webgl') return;
    isHoveringRef.current = false;
    lastInteractionRef.current = Date.now();
    targetProgress.set(latest);
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    progressRef.current = latest;
    stageRef.current?.style.setProperty('--v2-progress', String(latest));

    if (progressTextRef.current) {
      progressTextRef.current.textContent = `${String(Math.round(latest * 100)).padStart(3, '0')}%`;
    }

    if (projects.length === 0) return;
    const nextIndex = Math.round(latest * scrollSteps);
    if (nextIndex === scrollIndexRef.current) return;

    scrollIndexRef.current = nextIndex;
    setScrollIndex(nextIndex);
    if (!isHoveringRef.current) setActiveSlug(projects[nextIndex].slug);
  });

  const setProgress = useCallback((value: number) => {
    targetProgress.set(clamp01(value));
    lastInteractionRef.current = Date.now();
  }, [targetProgress]);

  // Masaustu: kutu uzerinde tekerlek bulutu dondurur; uclarda sayfaya devreder.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || mode !== 'webgl') return;
    if (isHome && mobileScrollEnabled) return;

    const onWheel = (event: WheelEvent) => {
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      const direction = Math.sign(delta);
      if (!direction) return;

      const current = targetProgress.get();
      const atEdge = (direction > 0 && current >= 0.999) || (direction < 0 && current <= 0.001);

      if (atEdge) {
        // Uca yeni gelindiyse momentumu kisa sure yut, sonra sayfaya birak.
        if (Date.now() - edgeHitAtRef.current < EDGE_HOLD_MS) event.preventDefault();
        return;
      }

      event.preventDefault();
      const next = clamp01(current + delta / (WHEEL_PX_PER_CARD * scrollSteps));
      if (next === 0 || next === 1) edgeHitAtRef.current = Date.now();
      setProgress(next);
    };

    panel.addEventListener('wheel', onWheel, { passive: false });
    return () => panel.removeEventListener('wheel', onWheel);
  }, [isHome, mobileScrollEnabled, mode, scrollSteps, setProgress, targetProgress]);

  // Dokunmatik: yatay kaydirma ilerletir (dikey kaydirma sayfaya kalir).
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || mode !== 'webgl') return;
    if (isHome && mobileScrollEnabled) return;

    let startX = 0;
    let startY = 0;
    let startProgress = 0;
    let horizontal: boolean | null = null;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      startProgress = targetProgress.get();
      horizontal = null;
      lastInteractionRef.current = Date.now();
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (horizontal === null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        horizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (!horizontal) return;
      // Ekran genisliginin yarisi ≈ bir kart; saga kaydirmak geriye gider.
      const cardsPerWidth = 2;
      const next = startProgress - (dx / panel.clientWidth) * cardsPerWidth / scrollSteps;
      setProgress(next);
    };

    panel.addEventListener('touchstart', onTouchStart, { passive: true });
    panel.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      panel.removeEventListener('touchstart', onTouchStart);
      panel.removeEventListener('touchmove', onTouchMove);
    };
  }, [isHome, mobileScrollEnabled, mode, scrollSteps, setProgress, targetProgress]);

  // Dokunmatik cihazlarda kutu gorunurken ve kullanici bir sure dokunmadiysa
  // ping-pong otomatik ilerleme — kaydirma kilidi olmadan sahne canli kalir.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || mode !== 'webgl' || scrollSteps < 1) return;
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    if (isHome && mobileScrollEnabled) return;

    let visible = false;
    let direction = 1;
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.5 }
    );
    observer.observe(stage);

    const timer = window.setInterval(() => {
      if (!visible || document.hidden) return;
      if (Date.now() - lastInteractionRef.current < AUTO_IDLE_MS) return;
      const index = scrollIndexRef.current;
      if (index >= scrollSteps) direction = -1;
      else if (index <= 0) direction = 1;
      targetProgress.set(clamp01((index + direction) / scrollSteps));
    }, AUTO_ADVANCE_MS);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [isHome, mobileScrollEnabled, mode, scrollSteps, targetProgress]);

  const activeIndex = Math.max(0, projects.findIndex((project) => project.slug === activeSlug));
  const activeProject = projects[activeIndex] ?? projects[0];

  const openProject = useCallback((slug: string) => {
    router.push({ pathname: '/projects/[slug]', params: { slug } });
  }, [router]);

  const handleSceneFocus = useCallback((slug: string | null) => {
    isHoveringRef.current = slug !== null;
    lastInteractionRef.current = Date.now();
    const nextSlug = slug ?? projects[scrollIndexRef.current]?.slug;
    if (nextSlug) setActiveSlug(nextSlug);
  }, [projects]);

  const moveProject = (direction: -1 | 1) => {
    if (projects.length === 0) return;
    const nextIndex = (scrollIndexRef.current + direction + scrollCount) % scrollCount;
    isHoveringRef.current = false;
    setActiveSlug(projects[nextIndex].slug);

    const track = trackRef.current;
    if (isHome && mobileScrollEnabled && track) {
      const trackTop = window.scrollY + track.getBoundingClientRect().top;
      const scrollDistance = Math.max(0, track.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: trackTop + scrollDistance * (nextIndex / scrollSteps),
        behavior: 'smooth',
      });
      return;
    }

    setProgress(nextIndex / scrollSteps);
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
        <div ref={panelRef} className={isHome ? `${styles.panel} glass` : styles.panel}>
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
                scrollCount={scrollCount}
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
                {String(scrollIndex + 1).padStart(2, '0')} / {String(scrollCount).padStart(2, '0')}
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
