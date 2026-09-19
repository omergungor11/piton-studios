'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '@vercel/analytics';

/**
 * Teklif sihirbazi (fiyatlar sayfasi). Birkac soruyla uygun paketi ve mevcut fiyat bandini
 * gosterir; yeni rakam uretmez — bantlar ve fiyat etkenleri `pricingPage` metinlerinden gelir.
 * Sonuctaki buton cevaplari ozet olarak iletisim formunun mesaj alanina tasir (`?brief=`).
 */

export type WizardPackageKey = 'template' | 'corporate' | 'ecommerce' | 'webapp' | 'ai';

export interface WizardPackage {
  name: string;
  price: string;
  priceLabel: string;
  desc: string;
  includes: string[];
}

type Option = { label: string; hint?: string };

export interface WizardCopy {
  eyebrow: string;
  title: string;
  lead: string;
  step: string;
  back: string;
  restart: string;
  resultEyebrow: string;
  resultTitle: string;
  driversTitle: string;
  noDrivers: string;
  includesLabel: string;
  cta: string;
  ctaNote: string;
  questions: {
    need: { q: string; options: Record<Need, Option> };
    design: { q: string; options: Record<Design, Option> };
    languages: { q: string; options: Record<Languages, Option> };
    timeline: { q: string; options: Record<Timeline, Option> };
    content: { q: string; options: Record<Content, Option> };
  };
  drivers: Record<'multi' | 'urgent' | 'content' | 'integrations' | 'custom', string>;
  brief: { intro: string; package: string; outro: string };
}

type Need = 'showcase' | 'ecommerce' | 'webapp' | 'automation';
type Design = 'template' | 'custom';
type Languages = 'one' | 'multi';
type Timeline = 'urgent' | 'normal' | 'flexible';
type Content = 'ready' | 'help';
type QuestionKey = keyof WizardCopy['questions'];
type Answers = Partial<{ need: Need; design: Design; languages: Languages; timeline: Timeline; content: Content }>;

/** Sorulacak sorular cevaplara gore degisir: tasarim sorusu yalnizca tanitim sitesinde anlamli. */
function questionsFor(answers: Answers): QuestionKey[] {
  if (answers.need === 'automation') return ['need', 'timeline'];
  return ['need', ...(answers.need === 'showcase' ? (['design'] as const) : []), 'languages', 'timeline', 'content'];
}

function packageFor(answers: Answers): WizardPackageKey {
  switch (answers.need) {
    case 'ecommerce':
      return 'ecommerce';
    case 'webapp':
      return 'webapp';
    case 'automation':
      return 'ai';
    default:
      return answers.design === 'template' ? 'template' : 'corporate';
  }
}

function driversFor(answers: Answers): (keyof WizardCopy['drivers'])[] {
  const list: (keyof WizardCopy['drivers'])[] = [];
  if (answers.design === 'custom') list.push('custom');
  if (answers.languages === 'multi') list.push('multi');
  if (answers.need === 'ecommerce' || answers.need === 'webapp' || answers.need === 'automation') list.push('integrations');
  if (answers.content === 'help') list.push('content');
  if (answers.timeline === 'urgent') list.push('urgent');
  return list;
}

export default function PriceWizard({
  copy,
  packages,
  contactPath,
}: {
  copy: WizardCopy;
  packages: Record<WizardPackageKey, WizardPackage>;
  contactPath: string;
}) {
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const questions = questionsFor(answers);
  const done = index >= questions.length;
  const current = questions[index];
  const pkgKey = packageFor(answers);
  const pkg = packages[pkgKey];
  const drivers = driversFor(answers);

  // Adim degisince odak soru basligina gecsin (klavye ve ekran okuyucu kullanicilari icin).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [index]);

  useEffect(() => {
    if (done) track('price_wizard_complete', { package: pkgKey });
  }, [done, pkgKey]);

  const briefHref = useMemo(() => {
    const lines = [copy.brief.intro, ''];
    for (const key of questionsFor(answers)) {
      const value = answers[key];
      if (!value) continue;
      const q = copy.questions[key];
      lines.push(`${q.q} ${(q.options as Record<string, Option>)[value].label}`);
    }
    lines.push(copy.brief.package.replace('{name}', pkg.name).replace('{price}', pkg.price), '', copy.brief.outro);
    return `${contactPath}?brief=${encodeURIComponent(lines.join('\n'))}#contact`;
  }, [answers, copy, contactPath, pkg]);

  const choose = (key: QuestionKey, value: string) => {
    // Onceki bir cevap degisirse sonraki sorular gecersiz olabilir: yalnizca oncekiler korunur.
    const kept: Answers = {};
    for (const k of questions.slice(0, index)) (kept as Record<string, string | undefined>)[k] = answers[k];
    const next = { ...kept, [key]: value } as Answers;
    setAnswers(next);
    setIndex(index + 1);
  };

  const restart = () => {
    setAnswers({});
    setIndex(0);
  };

  return (
    <section className="pw glass strong" aria-labelledby="pw-title">
      <div className="pw-head">
        <p className="pw-eyebrow">{copy.eyebrow}</p>
        <h2 id="pw-title" className="pricing-section-title">{copy.title}</h2>
        <p className="pricing-section-lead">{copy.lead}</p>
      </div>

      {!done && current ? (
        <div className="pw-step" role="group" aria-labelledby="pw-question">
          <div className="pw-progress" aria-hidden="true">
            <span style={{ width: `${(index / questions.length) * 100}%` }} />
          </div>
          <p className="pw-count">
            {copy.step.replace('{current}', String(index + 1)).replace('{total}', String(questions.length))}
          </p>
          <h3 id="pw-question" ref={headingRef} tabIndex={-1} className="pw-question">
            {copy.questions[current].q}
          </h3>
          <div className="pw-options">
            {Object.entries(copy.questions[current].options as Record<string, Option>).map(([value, option]) => (
              <button
                key={value}
                type="button"
                className="pw-option"
                aria-pressed={answers[current] === value}
                onClick={() => choose(current, value)}
                data-cursor="hover"
              >
                <span className="pw-option-label">{option.label}</span>
                {option.hint && <span className="pw-option-hint">{option.hint}</span>}
              </button>
            ))}
          </div>
          {index > 0 && (
            <button type="button" className="pw-link" onClick={() => setIndex(index - 1)}>
              ← {copy.back}
            </button>
          )}
        </div>
      ) : (
        <div className="pw-result" aria-live="polite">
          <p className="pw-eyebrow">{copy.resultEyebrow}</p>
          <h3 ref={headingRef} tabIndex={-1} className="pw-result-title">
            {copy.resultTitle.replace('{name}', pkg.name)}
          </h3>
          <p className="pricing-band">
            <span className="pricing-band-value">{pkg.price}</span>
            <span className="pricing-band-label">{pkg.priceLabel}</span>
          </p>
          <p className="pricing-card-desc">{pkg.desc}</p>

          <div className="pw-result-grid">
            <div className="pricing-includes">
              <span className="pricing-includes-label">{copy.includesLabel}</span>
              <ul>
                {pkg.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="pw-drivers">
              <span className="pricing-includes-label">{copy.driversTitle}</span>
              {drivers.length ? (
                <ul>
                  {drivers.map((d) => (
                    <li key={d}>{copy.drivers[d]}</li>
                  ))}
                </ul>
              ) : (
                <p className="pricing-card-desc">{copy.noDrivers}</p>
              )}
            </div>
          </div>

          <div className="pw-actions">
            <a href={briefHref} className="pw-cta" data-cursor="hover">
              {copy.cta} →
            </a>
            <button type="button" className="pw-link" onClick={restart}>
              ↺ {copy.restart}
            </button>
          </div>
          <p className="pw-note">{copy.ctaNote}</p>
        </div>
      )}
    </section>
  );
}
