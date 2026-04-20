'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const [mode, setMode] = useState('');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show cursor on devices with fine pointer (mouse)
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

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

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} data-mode={mode}>
        <span style={{ color: mode === 'play' || mode === 'mail' ? 'inherit' : 'transparent' }}>
          {label}
        </span>
      </div>
    </>
  );
}
