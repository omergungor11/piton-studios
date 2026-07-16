'use client';

import { useEffect, useState } from 'react';

type Phase = 'loading' | 'exit' | 'done';

const LOAD_MS = 450;
const EXIT_MS = 400;
const SEEN_KEY = 'piton-preloader-seen';

export default function Preloader() {
  const [count, setCount] = useState(0);
  // Always start in 'loading' so the first client render matches the
  // server-rendered HTML; the sessionStorage skip is applied after mount.
  const [phase, setPhase] = useState<Phase>('loading');

  // Count 0 → 100 over LOAD_MS, then trigger the exit animation.
  useEffect(() => {
    if (phase !== 'loading') return;
    if (sessionStorage.getItem(SEEN_KEY)) {
      setPhase('done');
      return;
    }
    sessionStorage.setItem(SEEN_KEY, '1');
    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min(1, (ts - startTs) / LOAD_MS);
      // ease-out so it slows near 100
      const eased = 1 - Math.pow(1 - p, 2);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPhase('exit');
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Remove the overlay after the exit animation finishes.
  useEffect(() => {
    if (phase !== 'exit') return;
    const id = setTimeout(() => setPhase('done'), EXIT_MS);
    return () => clearTimeout(id);
  }, [phase]);

  // Lock scroll while the intro is on screen.
  useEffect(() => {
    if (phase === 'done') {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`preloader ${phase === 'exit' ? 'is-exit' : ''}`} aria-hidden="true">
      <div className="preloader-stage">
        <img src="/logo.webp" alt="" className="preloader-logo" />
      </div>
      <div className="preloader-meta">
        <div className="preloader-count">{String(count).padStart(3, '0')}</div>
        <div className="preloader-bar"><span style={{ width: `${count}%` }} /></div>
        <div className="preloader-label">PİTON STUDIOS — LOADING</div>
      </div>
    </div>
  );
}
