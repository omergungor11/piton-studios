'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import SplitWords from '@/components/motion/split-words';
import { advanceProjectPreview, getProjectPreviewDistance, PROJECT_SCROLL_PX_PER_CARD } from '@/lib/project-cloud-scroll';
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
/** Uca gelindikten sonra sayfaya devretmeden once yutulan sure — momentum sicramasini onler. */
const EDGE_HOLD_MS = 450;
/** Dokunmatik: otomatik ilerleme araligi ve kullanici etkilesiminden sonra bekleme. */
const AUTO_ADVANCE_MS = 3600;
const AUTO_IDLE_MS = 6000;

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
  onFailure: () => void;
}

interface ExperienceBoundaryState {
  failed: boolean;
}

class ExperienceBoundary extends Component<ExperienceBoundaryProps, ExperienceBoundaryState> {
  state: ExperienceBoundaryState = { failed: false };

  static getDerivedStateFromError(): ExperienceBoundaryState {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
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
        {projects.map((project) => (
          <Link
            key={project.id}
            href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
            className={`${styles.fallbackCard} ${project.format === 'portrait' ? styles.fallbackCardPortrait : ''}`}
            onFocus={() => onFocus(project.slug)}
            onMouseEnter={() => onFocus(project.slug)}
            prefetch={false}
            role="listitem"
            data-cursor="hover"
          >
            <span className={styles.fallbackMedia}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 767px) 76vw, 420px"
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
 * Anasayfa akisinda ilk dort proje kisa bir sticky onizlemede gosterilir.
 * Proje alaninda kalip kaydiran ziyaretci tum kaydirilabilir seckide gezebilir.
 * Ilerleme kaynaklari:
 * - Masaustu: imlec proje gorsellerinin uzerindeyken tekerlek; uclara (0/1) gelince olay sayfaya
 *   devredilir, boylece ziyaretci asagi/yukari inmeye devam eder.
 * - Anasayfa mobil: proje alanindaki dikey/yatay hareket ilerletir; disindaki dokunuslar sayfayi kaydirir.
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
  const introRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const scrollIndexRef = useRef(0);
  const isHoveringRef = useRef(false);
  const lastInteractionRef = useRef(0);
  const edgeHitAtRef = useRef(0);
  const pageScrollOffsetRef = useRef(0);
  const [mode, setMode] = useState<ExperienceMode>('checking');
  const [sceneVisible, setSceneVisible] = useState(false);
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? '');
  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollCount = Math.max(1, Math.min(scrollCountProp, projects.length));
  const scrollSteps = Math.max(1, scrollCount - 1);
  const previewDistance = getProjectPreviewDistance(scrollCount);
  const titleId = `project-cloud-title-${variant}`;
  const isHome = variant === 'home';
  const isHeroTitle = titleAs === 'h1';
  const titleText = t('title');
  const titleAccent = t('titleAccent');
  const titleAccentIndex = titleText.indexOf(titleAccent);
  const titleSegments = isHome && titleAccentIndex >= 0
    ? [
        titleText.slice(0, titleAccentIndex),
        { text: titleAccent, className: styles.titleAccent },
        titleText.slice(titleAccentIndex + titleAccent.length),
      ]
    : undefined;

  const targetProgress = useMotionValue(0);
  const smoothProgress = useSpring(targetProgress, {
    stiffness: 105,
    damping: 28,
    mass: 0.35,
  });

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let activated = false;
    const evaluate = () => {
      if (activated) setMode(supportsImmersiveScene() ? 'webgl' : 'fallback');
    };
    // Ekran disindaki sahne icin WebGL yoklamasi, paket ve 15 doku yuklemesi yapma.
    // Ayrilan sticky alan, yukleme baslayinca sayfa yuksekliginin degismesini onler.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || activated) return;
      activated = true;
      evaluate();
      observer.disconnect();
    }, { rootMargin: '400px' });
    if (trackRef.current) observer.observe(trackRef.current);
    reducedMotionQuery.addEventListener('change', evaluate);
    return () => {
      observer.disconnect();
      reducedMotionQuery.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      setSceneVisible(entry.isIntersecting && !document.hidden);
    });
    const onVisibilityChange = () => {
      const rect = stage.getBoundingClientRect();
      setSceneVisible(!document.hidden && rect.bottom > 0 && rect.top < window.innerHeight);
    };
    observer.observe(stage);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

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
    isHoveringRef.current = false;
    targetProgress.set(clamp01(value));
    lastInteractionRef.current = Date.now();
  }, [targetProgress]);

  // Normal sayfa akisi ilk dort projeyi gosterir, sonra sticky sahne dogal olarak biter.
  // Proje alanindaki elle gezinme ayridir; sayfaya donunce secili proje geri sarilmaz.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isHome || mode !== 'webgl') return;
    let frame = 0;
    const syncProgress = () => {
      const next = advanceProjectPreview(
        -track.getBoundingClientRect().top,
        pageScrollOffsetRef.current,
        targetProgress.get(),
        scrollCount,
      );
      if (next.offset === pageScrollOffsetRef.current) return;
      pageScrollOffsetRef.current = next.offset;
      setProgress(next.progress);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncProgress);
    };
    syncProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome, mode, scrollCount, setProgress, targetProgress]);

  // Baslik, HUD ve kenarlar sayfaya aittir; yalnizca aradaki proje alani bulutu surer.
  const isProjectArea = useCallback((x: number, y: number) => {
    if (!isHome) return true;
    const panel = panelRef.current?.getBoundingClientRect();
    if (!panel) return false;
    const top = introRef.current?.getBoundingClientRect().bottom ?? panel.top;
    const bottom = hudRef.current?.getBoundingClientRect().top ?? panel.bottom;
    const sideInset = panel.width < 768 ? 16 : panel.width * 0.18;
    return x > panel.left + sideInset && x < panel.right - sideInset && y > top + 12 && y < bottom - 12;
  }, [isHome]);

  // Masaustu: proje alaninda tekerlek bulutu dondurur; uclarda sayfaya devreder.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || mode !== 'webgl') return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || !isProjectArea(event.clientX, event.clientY)) return;
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      const direction = Math.sign(delta);
      if (!direction) return;

      const current = targetProgress.get();
      const atEdge = (direction > 0 && current >= 0.999) || (direction < 0 && current <= 0.001);

      if (atEdge) {
        // Uca yeni gelindiyse momentumu kisa sure yut, sonra sayfaya birak.
        if (Date.now() - edgeHitAtRef.current < EDGE_HOLD_MS) {
          event.preventDefault();
          // Lenis defaultPrevented'a bakmaz — olay pencereye ulasirsa sayfa da kayar.
          event.stopPropagation();
        }
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      const next = clamp01(current + delta / (PROJECT_SCROLL_PX_PER_CARD * scrollSteps));
      if (next === 0 || next === 1) edgeHitAtRef.current = Date.now();
      setProgress(next);
    };

    panel.addEventListener('wheel', onWheel, { passive: false });
    return () => panel.removeEventListener('wheel', onWheel);
  }, [isProjectArea, mode, scrollSteps, setProgress, targetProgress]);

  // Dokunmatik: anasayfada proje alanindan baslayan dikey/yatay hareket ilerletir.
  // Alan disindan baslayan hareket, sonradan projelerin ustune gelse de sayfaya kalir.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || mode !== 'webgl') return;

    let startX = 0;
    let startY = 0;
    let startProgress = 0;
    let horizontal: boolean | null = null;
    let startedInProjectArea = false;
    let controlsProjects: boolean | null = null;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      startedInProjectArea = event.touches.length === 1 && !!touch && isProjectArea(touch.clientX, touch.clientY);
      controlsProjects = null;
      if (!touch || !startedInProjectArea) return;
      startX = touch.clientX;
      startY = touch.clientY;
      startProgress = targetProgress.get();
      horizontal = null;
      lastInteractionRef.current = Date.now();
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch || !startedInProjectArea || event.touches.length !== 1) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (horizontal === null) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        horizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (!horizontal && !isHome) return;
      const delta = horizontal ? -dx : -dy;
      if (controlsProjects === null) {
        // Bir uctan disari dogru baslayan jest dogrudan sayfaya birakilir.
        controlsProjects = !isHome || !((delta < 0 && startProgress <= 0.001) || (delta > 0 && startProgress >= 0.999));
      }
      if (!controlsProjects) return;
      if (isHome) {
        if (!event.cancelable) return;
        event.preventDefault();
        event.stopPropagation();
      }
      // Ekran genisliginin yarisi ≈ bir kart; saga kaydirmak geriye gider.
      const cardsPerWidth = 2;
      const next = horizontal
        ? startProgress - (dx / panel.clientWidth) * cardsPerWidth / scrollSteps
        : startProgress - dy / (PROJECT_SCROLL_PX_PER_CARD * scrollSteps);
      setProgress(next);
    };

    panel.addEventListener('touchstart', onTouchStart, { passive: true });
    panel.addEventListener('touchmove', onTouchMove, { passive: !isHome });
    return () => {
      panel.removeEventListener('touchstart', onTouchStart);
      panel.removeEventListener('touchmove', onTouchMove);
    };
  }, [isHome, isProjectArea, mode, scrollSteps, setProgress, targetProgress]);

  // Dokunmatik cihazlarda kutu gorunurken ve kullanici bir sure dokunmadiysa
  // ping-pong otomatik ilerleme — kaydirma kilidi olmadan sahne canli kalir.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || mode !== 'webgl' || scrollSteps < 1) return;
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    if (isHome) return;

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
  }, [isHome, mode, scrollSteps, targetProgress]);

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

    setProgress(nextIndex / scrollSteps);
  };

  const fallback = (
    <ProjectFallback hint={t('fallbackHint')} projects={projects} onFocus={setActiveSlug} />
  );

  return (
    <section
      ref={trackRef}
      className={`${styles.track} ${mode === 'fallback' ? styles.trackFallback : ''} ${isHome ? styles.trackHome : ''} ${isHome && mode !== 'fallback' ? styles.trackPreview : ''}`}
      style={isHome ? { '--cloud-preview-distance': `${previewDistance}px` } as CSSProperties : undefined}
      aria-labelledby={titleId}
    >
      <div ref={stageRef} className={styles.stage}>
        {/* Anasayfada diger sahneler gibi .glass kutu; tam sayfa varyantinda gorunmez sarmalayici */}
        <div ref={panelRef} className={isHome ? `${styles.panel} glass` : styles.panel}>
        <div className={styles.backdrop} aria-hidden="true" />

        <header ref={introRef} className={styles.intro}>
          <p className={styles.eyebrow} data-reveal={isHeroTitle ? 'fade-hero' : 'fade'}>{eyebrow ?? t('eyebrow')}</p>
          <SplitWords
            as={titleAs}
            id={titleId}
            className={styles.title}
            text={titleText}
            segments={titleSegments}
            hero={isHeroTitle}
          />
          <p
            className={styles.lede}
            data-reveal={isHeroTitle ? 'fade-hero' : 'fade'}
            style={{ '--reveal-delay': isHeroTitle ? '300ms' : '150ms' } as CSSProperties}
          >
            {t(isHome ? 'homeIntro' : 'intro')}
          </p>
          <p className={styles.touchNote}>{t('touchInteraction')}</p>
          {isHome ? (
            <Link href="/projects" className={styles.allLink} data-cursor="hover">
              {t('allProjects')} <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </header>

        {mode === 'webgl' && projects.length > 0 ? (
          <ExperienceBoundary fallback={fallback} onFailure={() => setMode('fallback')}>
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
                visible={sceneVisible}
              />
            </div>
          </ExperienceBoundary>
        ) : mode === 'fallback' ? (
          fallback
        ) : (
          <div className={styles.loading}>{t('loading')}</div>
        )}

        {activeProject && mode === 'webgl' ? (
          <aside ref={hudRef} className={styles.projectHud}>
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
