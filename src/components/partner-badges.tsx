'use client';

/* ------------------------------------------------------------------ */
/* Partner/trust-bar bileşeni.                                         */
/* variant:                                                             */
/*   'trust-bar' – anasayfa about bölümü altı (tam şerit)             */
/*   'footer'    – sayfa footer'ında kompakt satır                     */
/*   'service'   – servis detay sayfasında tek rozet                   */
/* ------------------------------------------------------------------ */

type Variant = 'trust-bar' | 'footer' | 'service';

interface Props {
  variant?: Variant;
  filter?: string[]; // partner id'lerine göre filtre
}

/* ── SVG İkon Bileşenleri ─────────────────────────────────────────── */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function MetaIcon() {
  return (
    <svg width="20" height="12" viewBox="0 0 40 24" aria-hidden="true">
      <path d="M5.8 5.2C3.6 5.2 1.8 6.4.8 8.2 0 9.6 0 11.4 0 12c0 .7.1 2.4 1.2 3.8C2.3 17.4 4 18.4 6 18.4c1.6 0 2.8-.5 4-1.4.9-.7 1.5-1.5 2.3-2.8l1-1.6c.5-.8.9-1.4 1.3-1.9.1.2.3.5.5.9l.7 1.2c.7 1.2 1.3 2 1.8 2.6 1.2 1.3 2.4 2 4.4 2 2 0 3.6-.9 4.6-2.4 1-1.4 1.4-3 1.4-4.2 0-1.4-.4-2.9-1.3-4.2-1-1.4-2.6-2.4-4.7-2.4-1.5 0-2.8.5-3.9 1.5-.8.7-1.5 1.6-2.2 2.8l-.5.8-.5-.8C15 7.2 13.1 5.2 10.2 5.2c-1.7 0-3.2.7-4.4 2zm4.4 1.8c1.1 0 2 .4 2.9 1.4.6.7 1.2 1.6 2 2.9l.4.7-.4.7c-.8 1.3-1.4 2.2-2 2.9-.9 1-1.8 1.4-2.9 1.4-1.4 0-2.4-.7-3.1-1.8-.7-1.1-.9-2.3-.9-3.2 0-.8.2-2 .9-3.1.7-1.1 1.7-1.9 3.1-1.9zm14 0c1.4 0 2.4.7 3.1 1.8.6.9.9 2.1.9 3.2 0 1-.2 2.2-.9 3.2-.7 1.1-1.7 1.8-3.1 1.8-1.2 0-2.1-.5-3-1.5-.6-.7-1.2-1.6-2-2.9l-.4-.7.4-.7c.7-1.2 1.3-2.1 1.9-2.8.9-1.1 1.9-1.4 3.1-1.4z" fill="#0082FB"/>
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 116 100" aria-hidden="true" fill="currentColor">
      <path d="M57.5 0L115 100H0L57.5 0z"/>
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 109 113" aria-hidden="true">
      <path d="M63.7 110.2c-2.4 3-7.4 1.4-7.6-2.4L54 65H97c3.6 0 5.5 4.2 3.3 6.9L63.7 110.2z" fill="#3ECF8E"/>
      <path d="M45.3 2.8c2.4-3 7.4-1.4 7.6 2.4L55 48H12c-3.6 0-5.5-4.2-3.3-6.9L45.3 2.8z" fill="currentColor" opacity=".9"/>
    </svg>
  );
}

function AnthropicIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 80 60" aria-hidden="true" fill="currentColor">
      <path d="M45.6 0H33.6L0 60h15.2l6.4-13.2h36.8L64.8 60H80L45.6 0zm-20.8 35.6L33.6 18l8.8 17.6H24.8z"/>
    </svg>
  );
}

/* ── Partner listesi ──────────────────────────────────────────────── */

export const PARTNERS = [
  { id: 'google',    name: 'Google Partner',   group: 'certified', icon: <GoogleIcon /> },
  { id: 'meta',      name: 'Meta Partner',      group: 'certified', icon: <MetaIcon /> },
  { id: 'vercel',    name: 'Vercel',            group: 'tech',      icon: <VercelIcon /> },
  { id: 'supabase',  name: 'Supabase',          group: 'tech',      icon: <SupabaseIcon /> },
  { id: 'anthropic', name: 'Anthropic',         group: 'tech',      icon: <AnthropicIcon /> },
] as const;

type PartnerId = typeof PARTNERS[number]['id'];

/* ── Ana bileşen ─────────────────────────────────────────────────── */

export default function PartnerBadges({ variant = 'trust-bar', filter }: Props) {
  const visible = filter
    ? PARTNERS.filter((p) => (filter as string[]).includes(p.id))
    : PARTNERS;

  const certified = visible.filter((p) => p.group === 'certified');
  const tech      = visible.filter((p) => p.group === 'tech');

  if (variant === 'footer') {
    return (
      <div className="pf-partners">
        {visible.map((p) => (
          <span key={p.id} className="pf-badge" title={p.name}>
            {p.icon}
            <span className="pf-badge-name">{p.name}</span>
          </span>
        ))}
      </div>
    );
  }

  if (variant === 'service') {
    return (
      <div className="ps-badges">
        {visible.map((p) => (
          <span key={p.id} className="ps-badge">
            {p.icon}
            <span>{p.name}</span>
          </span>
        ))}
      </div>
    );
  }

  // trust-bar (anasayfa)
  return (
    <div className="pt-bar">
      <span className="pt-label">Çalıştığımız ortaklar</span>
      <div className="pt-groups">
        {certified.length > 0 && (
          <div className="pt-group">
            <span className="pt-group-label">Sertifikalı</span>
            <div className="pt-badges">
              {certified.map((p) => (
                <span key={p.id} className="pt-badge pt-badge-cert">
                  {p.icon}
                  <span>{p.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}
        {certified.length > 0 && tech.length > 0 && (
          <span className="pt-divider" aria-hidden="true" />
        )}
        {tech.length > 0 && (
          <div className="pt-group">
            <span className="pt-group-label">Teknoloji</span>
            <div className="pt-badges">
              {tech.map((p) => (
                <span key={p.id} className="pt-badge">
                  {p.icon}
                  <span>{p.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
