'use client';

import { useEffect, useRef } from 'react';

interface FloatingShape {
  id: number;
  size: number;
  x: number;
  y: number;
  rotation: number;
  duration: number;
  delay: number;
  shape: 'circle' | 'square' | 'hexagon';
  opacity: number;
}

const SHAPES: FloatingShape[] = [
  { id: 1, size: 180, x: 8, y: 15, rotation: 15, duration: 28, delay: 0, shape: 'circle', opacity: 0.55 },
  { id: 2, size: 120, x: 75, y: 10, rotation: -20, duration: 32, delay: 2, shape: 'hexagon', opacity: 0.45 },
  { id: 3, size: 90, x: 85, y: 45, rotation: 45, duration: 24, delay: 4, shape: 'square', opacity: 0.5 },
  { id: 4, size: 220, x: 20, y: 55, rotation: -10, duration: 36, delay: 1, shape: 'circle', opacity: 0.4 },
  { id: 5, size: 70, x: 50, y: 25, rotation: 30, duration: 22, delay: 3, shape: 'hexagon', opacity: 0.55 },
  { id: 6, size: 140, x: 65, y: 70, rotation: -35, duration: 30, delay: 5, shape: 'square', opacity: 0.45 },
  { id: 7, size: 100, x: 35, y: 80, rotation: 20, duration: 26, delay: 2, shape: 'circle', opacity: 0.5 },
  { id: 8, size: 60, x: 90, y: 85, rotation: -15, duration: 20, delay: 6, shape: 'hexagon', opacity: 0.5 },
];

function getClipPath(shape: FloatingShape['shape']): string {
  switch (shape) {
    case 'hexagon':
      return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
    case 'square':
      return 'none';
    default:
      return 'none';
  }
}

export default function FloatingGlass() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on scroll
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (layerRef.current) {
          const y = window.scrollY * 0.08;
          layerRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={layerRef} className="floating-glass-layer" aria-hidden="true">
      {SHAPES.map((s) => (
        <div
          key={s.id}
          className={`floating-shape floating-shape--${s.shape}`}
          style={{
            width: s.size,
            height: s.size,
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            borderRadius: s.shape === 'circle' ? '50%' : s.shape === 'square' ? '20%' : '0',
            clipPath: getClipPath(s.shape),
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            '--rotate-start': `${s.rotation}deg`,
            '--rotate-end': `${s.rotation + 180}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
