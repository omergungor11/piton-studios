'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  bgColor?: string;
  glyphColor?: string;
  headColor?: string;
}

export default function MatrixRain({
  bgColor = '#04080F',
  glyphColor = '#2080D0',
  headColor = '#B0D8FF',
}: MatrixRainProps) {
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
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    };
    setup();

    let raf = 0;
    let last = 0;
    const STEP = 60;

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      if (ts - last < STEP) return;
      last = ts;

      // 8-digit hex: bgColor + '1A' = 10% alpha trail
      ctx.fillStyle = bgColor + '1A';
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px ui-monospace, "IBM Plex Mono", monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < cols; i++) {
        const g = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const head = Math.random() > 0.86;
        ctx.fillStyle = head ? headColor : glyphColor;
        ctx.fillText(g, x, y);

        if (y > height && Math.random() > 0.972) drops[i] = 0;
        drops[i] += 1;
      }
    };

    if (reduce) {
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      ctx.fillStyle = glyphColor + 'B3';
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
  }, [bgColor, glyphColor, headColor]);

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />;
}
