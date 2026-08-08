"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SCENES, type PreviewData, type Work } from "@/lib/data";
import BgStage from "@/components/bg-stage";
import Cursor from "@/components/cursor";
import { TopChrome, BottomChrome } from "@/components/chrome";
import Tweaks from "@/components/tweaks";
import { PreviewCard } from "@/components/scenes/works";

import dynamic from "next/dynamic";
import FloatingGlass from "@/components/floating-glass";
import SnakeTrail from "@/components/snake-trail";
import FloatingActions from "@/components/floating-actions";

const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
});
import HeroScene from "@/components/scenes/hero";
import SparkScene from "@/components/scenes/spark";
import ManifestoScene from "@/components/scenes/manifesto";
import ServicesScene from "@/components/scenes/services";
import WorksScene from "@/components/scenes/works";
import AboutScene from "@/components/scenes/about";
import ContactScene from "@/components/scenes/contact";

export default function HomeClient() {
  const [showThree, setShowThree] = useState(false);
  const [preview, setPreviewState] = useState<PreviewData | null>(null);
  const [clock, setClock] = useState("");
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [theme, setThemeState] = useState("dark");
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set([0]));
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);

  const setPreview = useCallback(
    (w: Work | null, x?: number, y?: number) => {
      if (!w) {
        setPreviewState(null);
        return;
      }
      setPreviewState({ ...w, x, y });
    },
    []
  );

  const setTheme = useCallback((t: string) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  // Clock
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Europe/Istanbul",
        }).format(d)
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Theme init
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Start at top (hero)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mount the decorative Three.js background once the browser is idle,
  // so its bundle/CPU cost never competes with critical first-paint content.
  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
    const cancelRic = window.cancelIdleCallback ?? clearTimeout;
    const id = ric(() => setShowThree(true));
    return () => cancelRic(id);
  }, []);

  // Edit mode listener
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const t = e.data && e.data.type;
      if (t === "__activate_edit_mode") setTweaksOpen(true);
      if (t === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Scroll — track active scene + progress
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      let bestIdx = 0;
      let bestDist = Infinity;
      sceneRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - vh / 2);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActiveIdx(bestIdx);

      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Reveal each scene once it enters the viewport — and keep it revealed.
  // Decoupled from activeIdx so content never fades back out while in view
  // (the previous center-based logic hid most content on mobile).
  useEffect(() => {
    const els = sceneRefs.current;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(new Set(els.map((_, i) => i)));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = els.indexOf(entry.target as HTMLElement);
          if (idx < 0) return;
          setRevealed((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const onNav = (idx: number) => {
    const el = sceneRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setRef = (i: number) => (el: HTMLElement | null) => {
    sceneRefs.current[i] = el;
  };

  return (
    <>
      <BgStage active={SCENES[activeIdx]?.id} />
      {showThree && <ThreeScene />}
      <SnakeTrail />
      <FloatingGlass />
      <div className="grain" />
      <Cursor />
      <TopChrome clock={clock} activeIdx={activeIdx} onNav={onNav} />
      <BottomChrome activeIdx={activeIdx} progress={progress} />

      <main className="scenes">
        {SCENES.map((s, i) => {
          const state = revealed.has(i) ? "reveal" : "";
          let inner = null;
          if (s.id === "hero") inner = <HeroScene clock={clock} />;
          else if (s.id === "spark") inner = <SparkScene />;
          else if (s.id === "note") inner = <ManifestoScene />;
          else if (s.id === "services") inner = <ServicesScene />;
          else if (s.id === "work") inner = <WorksScene onPreview={setPreview} />;
          else if (s.id === "about") inner = <AboutScene />;
          else if (s.id === "contact") inner = <ContactScene />;
          return (
            <section
              key={s.id}
              className={`scene ${state}`}
              id={s.hash}
              ref={setRef(i)}
              data-screen-label={s.label}
            >
              <div className="inner">{inner}</div>
            </section>
          );
        })}
      </main>

      <PreviewCard data={preview} />
      <FloatingActions />
      <Tweaks open={tweaksOpen} theme={theme} setTheme={setTheme} />
    </>
  );
}
