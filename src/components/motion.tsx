'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import styles from './motion/native-reveal.module.css';

const HIDDEN_TRANSFORMS = {
  fadeUp: 'translateY(28px)',
  fadeIn: 'none',
  scaleIn: 'scale(0.96)',
  slideLeft: 'translateX(40px)',
  slideRight: 'translateX(-40px)',
} as const;

interface RevealProps {
  children: ReactNode;
  variant?: keyof typeof HIDDEN_TRANSFORMS;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  /** Liste icinde kullanilirken 'li' — ol/ul'nin dogrudan cocugu div olamaz. */
  as?: 'div' | 'li';
}

export function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.9,
  className,
  once = true,
  as: Component = 'div',
}: RevealProps): ReactElement {
  const elementRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const setElement = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let disposed = false;
    let revealed = false;
    let observer: IntersectionObserver | null = null;
    let failOpenTimer: number | undefined;
    const clearTimer = () => {
      window.clearTimeout(failOpenTimer);
      failOpenTimer = undefined;
    };
    const stopObserving = () => {
      observer?.disconnect();
      observer = null;
      clearTimer();
    };
    const showContent = () => {
      if (disposed) return;
      revealed = true;
      setVisible(true);
    };

    if (typeof window.matchMedia !== 'function') {
      showContent();
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observe = () => {
      stopObserving();
      if (reducedMotion.matches || typeof IntersectionObserver === 'undefined' || (once && revealed)) {
        showContent();
        return;
      }

      try {
        observer = new IntersectionObserver(([entry]) => {
          if (disposed) return;
          clearTimer();
          // Baslangic bildirimi esigin altinda da gelebilir; erken acilmasin.
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            showContent();
            if (once) stopObserving();
          } else if (!once) {
            setVisible(false);
          }
        }, { threshold: 0.2 });
        observer.observe(element);
        element.setAttribute('data-native-reveal-observed', 'true');
        // Gozlemci hic bildirim vermezse icerik sakli kalmasin.
        failOpenTimer = window.setTimeout(() => {
          stopObserving();
          showContent();
        }, 3000);
      } catch {
        stopObserving();
        showContent();
      }
    };

    observe();
    reducedMotion.addEventListener('change', observe);
    return () => {
      disposed = true;
      stopObserving();
      reducedMotion.removeEventListener('change', observe);
      element.removeAttribute('data-native-reveal-observed');
    };
  }, [Component, once]);

  const style = {
    '--native-reveal-duration': `${duration}s`,
    '--native-reveal-delay': `${delay}s`,
    '--native-reveal-transform': HIDDEN_TRANSFORMS[variant],
  } as CSSProperties;

  return (
    <Component
      ref={setElement}
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      data-native-reveal-state={visible ? 'visible' : 'pending'}
      style={style}
    >
      {children}
    </Component>
  );
}
