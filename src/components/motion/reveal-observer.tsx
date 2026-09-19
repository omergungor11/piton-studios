'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    __revealMounted?: boolean;
  }
}

/**
 * Tek gozlemci: `[data-reveal]` ogeleri gorunur alana girince `is-revealed` alir (bir kez).
 * Yeni eklenen ogeler (sayfa gecisi, istemci render) MutationObserver ile yakalanir.
 * `-hero` varyantlari saf CSS ile oynar, burada izlenmez. Stiller: globals.css "Hareket sistemi".
 */
export default function RevealObserver() {
  useEffect(() => {
    window.__revealMounted = true;
    const root = document.documentElement;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('reveal-ready');
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      root.classList.remove('reveal-ready');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    let raf = 0;
    const scan = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document
          .querySelectorAll('[data-reveal]:not(.is-revealed):not([data-reveal$="-hero"])')
          .forEach((el) => io.observe(el));
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

/**
 * <head> icinde, ilk boyamadan once calisir: animasyonlu ogeler en bastan gizli baslar (titreme olmaz).
 * Gozlemci 3 sn icinde baglanmazsa (JS hatasi) sinif kaldirilir, icerik gorunur kalir.
 */
export const REVEAL_BOOT_SCRIPT =
  "(function(){var d=document.documentElement;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('reveal-ready');try{if(!sessionStorage.getItem('piton-preloader-seen'))d.classList.add('is-preloading')}catch(e){}setTimeout(function(){d.classList.remove('is-preloading')},2500);setTimeout(function(){if(!window.__revealMounted)d.classList.remove('reveal-ready')},3000)})();";
