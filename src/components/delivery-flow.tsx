"use client";

import '@/styles/delivery-flow.css';
import '@/styles/page-scoped/delivery-flow-motion.css';

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/components/navigation/intent-link";

/**
 * Teslim Akisi — projeler sayfasindaki interaktif surec seridi.
 *
 * Alti adim; her adimda ne yapildigi, ciktisi, musteriden gerekeni ve o adimi
 * temsil eden gercek bir proje var. Ornek projeler bilerek farkli disiplinlerden
 * secildi (web app, SaaS, AI/ML, otomasyon, e-ticaret) — is yalnizca site degil.
 *
 * Etkilesim: dugum uzerinde hover (masaustu) / tap (mobil) -> kart degisir,
 * ray o dugume kadar dolar. Klavyeyle de gezilebilir (focus ayni isi yapar).
 * Mobilde serit yatay kayar: secili dugum ortalanir ve onceki/sonraki
 * butonlari ekranin disinda kalan adimlara (05, 06) gecisi saglar.
 */

const STEPS = [
  { id: "discovery" },
  { id: "design" },
  { id: "build" },
  { id: "test" },
  { id: "launch" },
  { id: "grow" },
];

interface DeliveryFlowProps {
  examples: Readonly<Record<string, { slug: string; title: string; kind: string }>>;
}

export default function DeliveryFlow({ examples }: DeliveryFlowProps) {
  const t = useTranslations("delivery");
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Serit tasiyorsa (mobil) secili dugumu ortala; yalnizca yatay kaydirir.
  useEffect(() => {
    const wrap = wrapRef.current;
    const node = nodeRefs.current[active];
    if (!wrap || !node || wrap.scrollWidth <= wrap.clientWidth) return;
    const w = wrap.getBoundingClientRect();
    const n = node.getBoundingClientRect();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    wrap.scrollBy({
      left: n.left + n.width / 2 - (w.left + w.width / 2),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active]);

  const step = STEPS[active];
  const work = examples[step.id];
  const workTitle = work?.title;
  const workKind = work?.kind;

  const items = t.raw(`steps.${step.id}.items`) as string[];

  return (
    <section className="df glass" aria-labelledby="df-title">
      <header className="df-head">
        <div className="df-eyebrow">{t("eyebrow")}</div>
        <h3 className="df-title" id="df-title">
          {t.rich("title", {
            accent: (chunks) => <span className="em">{chunks}</span>,
          })}
        </h3>
        <p className="df-desc">{t("desc")}</p>
      </header>

      {/* Adim seridi */}
      <div className="df-track-wrap" ref={wrapRef}>
        <div className="df-track" role="tablist" aria-label={t("trackLabel")}>
          <div className="df-rail" aria-hidden="true">
            <span
              className="df-rail-fill"
              style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
            />
          </div>

          {STEPS.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`df-node ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}
              onPointerEnter={(e) => {
                // Dokunmatikte kaydirma baslangici adimi degistirmesin.
                if (e.pointerType === "mouse") setActive(i);
              }}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              data-cursor="hover"
            >
              <span className="df-node-dot" aria-hidden="true" />
              <span className="df-node-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="df-node-name">{t(`steps.${s.id}.name`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobil adim gecisi — serit ekrana sigmadiginda gorunur (CSS) */}
      <div className="df-stepper">
        <button
          type="button"
          className="df-step-btn"
          onClick={() => setActive((a) => a - 1)}
          disabled={active === 0}
          aria-label={t("prevStep")}
        >
          <span aria-hidden="true">←</span>
        </button>
        <span className="df-step-count" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          className="df-step-btn"
          onClick={() => setActive((a) => a + 1)}
          disabled={active === STEPS.length - 1}
          aria-label={t("nextStep")}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Adim karti — key ile her degisimde yeniden mount, gecis animasyonu icin */}
      <div className="df-card" key={step.id}>
        <div className="df-card-top">
          <span className="df-card-n">
            {String(active + 1).padStart(2, "0")}
          </span>
          <h4 className="df-card-title">{t(`steps.${step.id}.name`)}</h4>
          <span className="df-card-dur">{t(`steps.${step.id}.duration`)}</span>
        </div>

        <p className="df-card-detail">{t(`steps.${step.id}.detail`)}</p>

        <div className="df-card-grid">
          <div className="df-block">
            <span className="df-block-k">{t("labelWhat")}</span>
            <ul className="df-list">
              {items.map((item) => (
                <li key={item}>
                  <span className="df-bullet" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="df-block">
            <span className="df-block-k">{t("labelOutput")}</span>
            <p className="df-block-v">{t(`steps.${step.id}.output`)}</p>
          </div>

          <div className="df-block">
            <span className="df-block-k">{t("labelYou")}</span>
            <p className="df-block-v">{t(`steps.${step.id}.you`)}</p>
          </div>
        </div>

        {work && workTitle && (
          <Link
            href={{ pathname: "/projects/[slug]", params: { slug: work.slug } }}
            className="df-example"
            data-cursor="hover"
            data-cursor-label="View ↗"
          >
            <span className="df-example-k">{t("labelExample")}</span>
            <span className="df-example-v">{workTitle}</span>
            <span className="df-example-kind">{workKind}</span>
            <span className="df-example-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
