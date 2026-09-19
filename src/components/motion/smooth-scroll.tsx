'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

/**
 * Lenis yumusak kaydirma (plan: piton-plans/motion-plan.md).
 *
 * - Pencerenin kendi kaydirmasini kullanir: sticky sahneler, scroll dinleyicileri ve
 *   `animation-timeline: view()` degismeden calisir.
 * - Dokunmatikte dogal kaydirma korunur (syncTouch kapali); reduced-motion'da Lenis yumusatmayi kapatir.
 * - Kendi icinde kaydirilan alanlar `data-lenis-prevent` ile isaretlenir (mega menu, mobil menu).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: { offset: -96 },
        stopInertiaOnNavigate: true,
      }}
    >
      <RouteReset />
      <ParallaxDriver />
      {children}
    </ReactLenis>
  );
}

/** Sayfa gecisinde onceki kaydirma hedefi tasinmasin; hash'li adreste (#contact) Lenis anchors devreye girer. */
function RouteReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

/** Menu vb. acikken sayfa kaydirmasini durdurur. */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [locked, lenis]);
}

/**
 * `[data-parallax="0.08"]` sarmalayicisinin ilk cocugunu kaydirmayla hafifce kaydirir. Olcum
 * sarmalayicidan yapilir (donusum uygulanan cocuktan degil) — geri besleme olmaz. Yalnizca transform.
 */
function ParallaxDriver() {
  const items = useRef<HTMLElement[]>([]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const collect = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        items.current = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
      });
    };
    collect();
    const mo = new MutationObserver(collect);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  useLenis(() => {
    if (!reduced.current) applyParallax(items.current);
  });

  return null;
}

/** Bilesen disinda: DOM stili dogrudan yazilir (her karede React render'i tetiklenmesin). */
function applyParallax(items: HTMLElement[]) {
  const vh = window.innerHeight;
  for (const el of items) {
    const child = el.firstElementChild as HTMLElement | null;
    if (!child) continue;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > vh + 200) continue;
    const speed = Number(el.dataset.parallax) || 0.08;
    const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
    child.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  }
}
