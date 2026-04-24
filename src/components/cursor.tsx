'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const katanaRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const [mode, setMode] = useState('');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show cursor on devices with fine pointer (mouse)
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let raf: number;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (katanaRef.current) {
        katanaRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.('[data-cursor]') as HTMLElement | null;
      if (el) {
        setMode(el.dataset['cursor'] ?? '');
        setLabel(el.dataset['cursorLabel'] ?? '');
      }
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!related?.closest?.('[data-cursor]')) {
        setMode('');
        setLabel('');
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  const katanaActive = mode === 'hover' || mode === 'katana';

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} data-mode={mode}>
        <span style={{ color: mode === 'play' || mode === 'mail' ? 'inherit' : 'transparent' }}>
          {label}
        </span>
      </div>
      <div
        className="cursor-katana"
        ref={katanaRef}
        data-active={katanaActive ? 'true' : 'false'}
        aria-hidden="true"
      >
        <svg viewBox="0 0 120 120" width="120" height="120" fill="none">
          <g transform="translate(60 60) rotate(-38)">
            {/* blade */}
            <rect x="-12" y="-1.1" width="58" height="2.2" rx="1.1" fill="#E6E8EE" />
            <rect x="-12" y="-1.1" width="58" height="0.7" fill="#FFFFFF" opacity="0.65" />
            {/* kissaki (tip) */}
            <path d="M46 -1.1 L 52 0 L 46 1.1 Z" fill="#E6E8EE" />
            {/* habaki (blade collar) */}
            <rect x="-14" y="-1.6" width="2.5" height="3.2" fill="#CDD1DA" />
            {/* tsuba (guard) */}
            <rect x="-16.5" y="-4.2" width="2.5" height="8.4" rx="0.6" fill="#1A1A1F" />
            {/* tsuka (hilt) */}
            <rect x="-28" y="-1.8" width="11.5" height="3.6" rx="0.6" fill="#8F2A2A" />
            {/* hilt wrap (ito) stripes */}
            <rect x="-27" y="-1.6" width="0.9" height="3.2" fill="#1A1A1F" opacity="0.55" />
            <rect x="-24.5" y="-1.6" width="0.9" height="3.2" fill="#1A1A1F" opacity="0.55" />
            <rect x="-22" y="-1.6" width="0.9" height="3.2" fill="#1A1A1F" opacity="0.55" />
            <rect x="-19.5" y="-1.6" width="0.9" height="3.2" fill="#1A1A1F" opacity="0.55" />
            <rect x="-17" y="-1.6" width="0.9" height="3.2" fill="#1A1A1F" opacity="0.55" />
            {/* kashira (pommel cap) */}
            <rect x="-29.5" y="-2.2" width="1.8" height="4.4" rx="0.3" fill="#1A1A1F" />
          </g>
        </svg>
      </div>
    </>
  );
}
