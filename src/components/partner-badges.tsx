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
    // Resmi Meta "infinity" markasi — simple-icons/meta.svg
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" fill="#0081FB"/>
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
