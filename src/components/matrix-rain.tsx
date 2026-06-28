'use client';

import { useEffect, useRef } from 'react';

// Classic Matrix digital-rain rendered on a canvas that fills its parent.
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const GLYPHS =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ0123456789=+-*/<>{}[]$#@%&PTNSTUDIO'.split(
        ''
      );

    let width = 0;
    let height = 0;
    let fontSize = 14;
    let cols = 0;
    let drops: number[] = [];

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = width < 340 ? 12 : 15;
      cols = Math.max(1, Math.ceil(width / fontSize));
      drops = new Array(cols)
        .fill(0)
        .map(() => Math.floor((Math.random() * -height) / fontSize));
      // paint the base once so the first frames aren't empty
      ctx.fillStyle = '#03100a';
      ctx.fillRect(0, 0, width, height);
    };
    setup();

    let raf = 0;
    let last = 0;
    const STEP = 60; // ms between rain steps — the steppy Matrix cadence

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      if (ts - last < STEP) return;
      last = ts;

      // translucent fade leaves the green trails behind each glyph
      ctx.fillStyle = 'rgba(3, 14, 9, 0.10)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px ui-monospace, "JetBrains Mono", "IBM Plex Mono", monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < cols; i++) {
        const g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // bright leading head, with the rest fading to green via the trail
        const head = Math.random() > 0.86;
        ctx.fillStyle = head ? '#d8ffe9' : '#36e88f';
        ctx.fillText(g, x, y);

        if (y > height && Math.random() > 0.972) drops[i] = 0;
        drops[i] += 1;
      }
    };

    if (reduce) {
      // static-ish: a couple of frames so it reads as code, no motion loop
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      ctx.fillStyle = 'rgba(54, 232, 143, 0.7)';
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < height / fontSize; j += 2) {
          ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * fontSize, j * fontSize);
        }
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => setup());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
