"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SCENES, type PreviewData, type Work } from "@/lib/data";
import BgStage from "@/components/bg-stage";
import Cursor from "@/components/cursor";
import { TopChrome, BottomChrome } from "@/components/chrome";
import Tweaks from "@/components/tweaks";
import { PreviewCard } from "@/components/scenes/works";

import HeroScene from "@/components/scenes/hero";
import ManifestoScene from "@/components/scenes/manifesto";
import WorksScene from "@/components/scenes/works";
import StoriesScene from "@/components/scenes/stories";
import CaseScene from "@/components/scenes/case-study";
import ReelScene from "@/components/scenes/reel";
import ServicesScene from "@/components/scenes/services";
import AboutScene from "@/components/scenes/about";
import ContactScene from "@/components/scenes/contact";

export default function Home() {
  const [preview, setPreviewState] = useState<PreviewData | null>(null);
  const [clock, setClock] = useState("");
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [theme, setThemeState] = useState("dark");
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
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

  const onNav = (idx: number) => {
    const el = sceneRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sceneState = (i: number) => {
    if (i === activeIdx) return "in";
    if (i < activeIdx) return "out";
    return "";
  };

  const setRef = (i: number) => (el: HTMLElement | null) => {
    sceneRefs.current[i] = el;
  };

  return (
    <>
      <BgStage active={SCENES[activeIdx]?.id} />
      <div className="grain" />
      <Cursor />
      <TopChrome clock={clock} activeIdx={activeIdx} onNav={onNav} />
      <BottomChrome activeIdx={activeIdx} progress={progress} />

      <main className="scenes">
        {SCENES.map((s, i) => {
          const state = sceneState(i);
          let inner = null;
          if (s.id === "hero") inner = <HeroScene clock={clock} />;
          else if (s.id === "note") inner = <ManifestoScene />;
          else if (s.id === "work")
            inner = <WorksScene onPreview={setPreview} />;
          else if (s.id === "stories") inner = <StoriesScene />;
          else if (s.id === "case") inner = <CaseScene />;
          else if (s.id === "reel") inner = <ReelScene />;
          else if (s.id === "services") inner = <ServicesScene />;
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
      <Tweaks open={tweaksOpen} theme={theme} setTheme={setTheme} />
    </>
  );
}
