'use client';

import type { ServiceFlowDef } from './flows';

/**
 * "Nasil calisir" akis diyagrami. HTML liste olarak isaretlenir (ekran okuyucu sirayi okur);
 * asamalar arasi isik cizgisi CSS ile. Masaustunde yatay, dar ekranda dikey.
 */
export default function ServiceFlow({
  def,
  label,
  title,
  caption,
  nodes,
}: {
  def: ServiceFlowDef;
  label: string;
  title: string;
  caption: string;
  nodes: Record<string, string>;
}) {
  return (
    <section className="sd-flow sd-section-fade">
      <div className="sd-section-header">
        <span className="sd-section-label">{label}</span>
        <h2 className="sd-section-title">{title}</h2>
        <p className="sd-flow-caption">{caption}</p>
      </div>
      <ol className="sv-flow-track" style={{ '--sv-stages': def.stages.length } as React.CSSProperties}>
        {def.stages.map((stage, i) => (
          <li key={i} className="sv-flow-stage">
            <span className="sv-flow-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <ul className="sv-flow-nodes">
              {stage.map((id) => (
                <li key={id} className={id === def.core ? 'sv-flow-node is-core' : 'sv-flow-node'}>
                  <span className="sv-flow-dot" aria-hidden="true" />
                  {nodes[id] ?? id}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
