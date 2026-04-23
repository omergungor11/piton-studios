'use client';

import { useEffect, useRef } from 'react';
import { videoUrl } from '@/lib/media';

interface BgStageProps {
  active: string;
}

export default function BgStage({ active }: BgStageProps) {
  const vidRef = useRef<HTMLVideoElement>(null);

  // Subtle parallax + zoom based on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!vidRef.current) return;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? y / max : 0;
      const scale = 1.05 + p * 0.06;
      const ty = -p * 24;
      vidRef.current.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep the video playing no matter what (tab blur, stalls, etc.)
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const ensurePlay = () => {
      if (v.paused) v.play().catch(() => {});
    };
    ensurePlay();
    const onPause = () => ensurePlay();
    const onEnded = () => {
      v.currentTime = 0;
      ensurePlay();
    };
    const onVisibility = () => {
      if (!document.hidden) ensurePlay();
    };
    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', ensurePlay);
    const id = setInterval(ensurePlay, 2000);
    return () => {
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', ensurePlay);
      clearInterval(id);
    };
  }, []);

  return (
    <div className="bg-stage" data-scene={active}>
      <video
        ref={vidRef}
        src={videoUrl('hero.mp4')}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="bg-veil" />
    </div>
  );
}
