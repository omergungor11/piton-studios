import { SITE, SITE_URL, type Locale } from '@/lib/site';
import { LEGAL_READY } from '@/lib/legal';
import { absoluteUrl } from '@/lib/seo';

/**
 * E-posta tasarim sistemi. Iletisim formu bildirimi, ziyaretciye otomatik yanit ve kampanya
 * e-postalari ayni iskeleti ve parcalari kullanir.
 *
 * E-posta istemcileri (Gmail, Outlook, Apple Mail) modern CSS'in cogunu yok sayar: yerlesim
 * tablo tabanli, stiller satir ici, kart 600px. Marka dili siteden: koyu serit (--bg), sicak
 * kirik beyaz (--ink) ve kirmizi vurgu (--accent, oklch → hex). Web fontu yalnizca destekleyen
 * istemcide yuklenir; digerlerinde sistem fontuna duser.
 *
 * Onizleme (yalnizca gelistirme ortami): /api/email-preview
 */

export type RenderedEmail = { subject: string; html: string; text: string };

export const EMAIL_COLORS = {
  page: '#EFECE6',
  card: '#FFFFFF',
  soft: '#F7F5F1',
  band: '#0A0A0A',
  bandInk: '#F2EFE9',
  bandMuted: '#9A968F',
  ink: '#0B0B0B',
  body: '#3A3835',
  muted: '#77736C',
  line: '#E4E0D8',
  /** Acik zeminde okunur vurgu (globals.css acik tema --accent). */
  accent: '#B71727',
  /** Koyu zeminde vurgu (globals.css koyu tema --accent). */
  accentBright: '#D33A3E',
} as const;

const C = EMAIL_COLORS;
const SANS = "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const LOGO_URL = `${SITE_URL}/email/logo.png`;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Kullanici metnini satir sonlarini koruyarak HTML'e cevirir. */
export function textToHtml(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br>');
}

// ---------- Icerik parcalari ----------

export function eyebrow(text: string): string {
  return `<p style="margin:0 0 14px;font-family:${MONO};font-size:11px;line-height:1.4;letter-spacing:0.14em;text-transform:uppercase;color:${C.accent};">${escapeHtml(text)}</p>`;
}

export function heading(text: string): string {
  return `<h1 class="h1" style="margin:0 0 16px;font-family:${SANS};font-size:32px;line-height:1.15;font-weight:700;letter-spacing:-0.01em;color:${C.ink};">${escapeHtml(text)}</h1>`;
}

export function subheading(text: string): string {
  return `<h2 style="margin:8px 0 12px;font-family:${SANS};font-size:20px;line-height:1.3;font-weight:700;color:${C.ink};">${escapeHtml(text)}</h2>`;
}

/** `html` guvenilir icerik olmali — kullanici metni icin once escapeHtml. */
export function paragraph(html: string, opts: { muted?: boolean; small?: boolean } = {}): string {
  const size = opts.small ? 13 : 16;
  return `<p style="margin:0 0 16px;font-family:${SANS};font-size:${size}px;line-height:1.65;color:${opts.muted ? C.muted : C.body};">${html}</p>`;
}

export function button(label: string, href: string, variant: 'primary' | 'secondary' = 'primary'): string {
  const primary = variant === 'primary';
  // Cerceve td'de degil a'da: border-collapse tablolarda td kenarligi kose yuvarlamasini bozar.
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display:inline-table;border-collapse:separate;margin:8px 8px 8px 0;"><tr><td style="border-radius:999px;background:${primary ? C.accent : C.card};"><a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 26px;border:1px solid ${primary ? C.accent : C.ink};border-radius:999px;font-family:${SANS};font-size:15px;line-height:1;font-weight:600;color:${primary ? '#FFFFFF' : C.ink};text-decoration:none;">${escapeHtml(label)}&nbsp;&rarr;</a></td></tr></table>`;
}

export function details(rows: { label: string; value: string; href?: string }[]): string {
  const body = rows
    .map((row, i) => {
      const border = i ? `border-top:1px solid ${C.line};` : '';
      const value = row.href
        ? `<a href="${escapeHtml(row.href)}" style="color:${C.ink};text-decoration:underline;">${escapeHtml(row.value)}</a>`
        : escapeHtml(row.value);
      return `<tr><td width="112" style="${border}padding:12px 12px 12px 0;vertical-align:top;font-family:${MONO};font-size:11px;line-height:1.6;letter-spacing:0.1em;text-transform:uppercase;color:${C.muted};">${escapeHtml(row.label)}</td><td style="${border}padding:12px 0;vertical-align:top;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.ink};word-break:break-word;">${value}</td></tr>`;
    })
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px;border-top:1px solid ${C.line};border-bottom:1px solid ${C.line};">${body}</table>`;
}

export function quote(label: string, text: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;"><tr><td style="background:${C.soft};border-left:3px solid ${C.accentBright};border-radius:0 12px 12px 0;padding:20px 24px;"><p style="margin:0 0 8px;font-family:${MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.muted};">${escapeHtml(label)}</p><p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};">${textToHtml(text)}</p></td></tr></table>`;
}

export function steps(items: { title: string; body: string }[]): string {
  const rows = items
    .map(
      (item, i) =>
        `<tr><td width="46" style="vertical-align:top;padding:0 0 18px;"><span style="display:inline-block;width:30px;height:30px;line-height:30px;border-radius:999px;background:${C.band};color:${C.bandInk};text-align:center;font-family:${MONO};font-size:11px;">${String(i + 1).padStart(2, '0')}</span></td><td style="vertical-align:top;padding:4px 0 18px;"><p style="margin:0 0 4px;font-family:${SANS};font-size:15px;line-height:1.4;font-weight:600;color:${C.ink};">${escapeHtml(item.title)}</p><p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.6;color:${C.muted};">${escapeHtml(item.body)}</p></td></tr>`
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 16px;">${rows}</table>`;
}

export function cards(items: { eyebrow?: string; title: string; body: string; href?: string; linkLabel?: string }[]): string {
  return items
    .map(
      (item) =>
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px;border-collapse:separate;"><tr><td style="border:1px solid ${C.line};border-radius:14px;padding:20px 22px;">${item.eyebrow ? `<p style="margin:0 0 6px;font-family:${MONO};font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:${C.accent};">${escapeHtml(item.eyebrow)}</p>` : ''}<p style="margin:0 0 6px;font-family:${SANS};font-size:16px;line-height:1.35;font-weight:600;color:${C.ink};">${escapeHtml(item.title)}</p><p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.6;color:${C.muted};">${escapeHtml(item.body)}</p>${item.href ? `<p style="margin:10px 0 0;font-family:${SANS};font-size:14px;font-weight:600;"><a href="${escapeHtml(item.href)}" style="color:${C.accent};text-decoration:none;">${escapeHtml(item.linkLabel ?? item.href)}&nbsp;&rarr;</a></p>` : ''}</td></tr></table>`
    )
    .join('');
}

/** Koyu vurgu paneli — kampanyada one cikan vaka ya da teklif icin. */
export function darkPanel(input: { eyebrow?: string; title: string; body: string; href?: string; linkLabel?: string }): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:12px 0 24px;"><tr><td style="background:${C.band};border-radius:16px;padding:28px;">${input.eyebrow ? `<p style="margin:0 0 10px;font-family:${MONO};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.accentBright};">${escapeHtml(input.eyebrow)}</p>` : ''}<p style="margin:0 0 10px;font-family:${SANS};font-size:22px;line-height:1.25;font-weight:700;color:${C.bandInk};">${escapeHtml(input.title)}</p><p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.bandMuted};">${escapeHtml(input.body)}</p>${input.href ? `<p style="margin:16px 0 0;font-family:${SANS};font-size:15px;font-weight:600;"><a href="${escapeHtml(input.href)}" style="color:${C.bandInk};text-decoration:underline;">${escapeHtml(input.linkLabel ?? input.href)}&nbsp;&rarr;</a></p>` : ''}</td></tr></table>`;
}

export function divider(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:12px 0 24px;"><div style="height:1px;line-height:1px;font-size:0;background:${C.line};">&nbsp;</div></td></tr></table>`;
}

export function signature(name: string, role: string): string {
  return `<p style="margin:24px 0 0;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.ink};"><strong style="font-weight:600;">${escapeHtml(name)}</strong><br><span style="color:${C.muted};font-size:14px;">${escapeHtml(role)}</span></p>`;
}

// ---------- Alt bilgi ----------

const FOOTER_COPY: Record<Locale, { tagline: string; location: string; privacy: string; unsubscribe: string }> = {
  tr: { tagline: 'Tasarım, kod ve yapay zeka — tek çatı altında.', location: 'Türkiye', privacy: 'Gizlilik', unsubscribe: 'Abonelikten çık' },
  en: { tagline: 'Design, code and AI under one roof.', location: 'Türkiye', privacy: 'Privacy', unsubscribe: 'Unsubscribe' },
  ru: { tagline: 'Дизайн, код и ИИ под одной крышей.', location: 'Турция', privacy: 'Конфиденциальность', unsubscribe: 'Отписаться' },
};

export function footer(lang: Locale, opts: { note?: string; unsubscribeUrl?: string } = {}): string {
  const copy = FOOTER_COPY[lang];
  const link = (href: string, label: string) =>
    `<a href="${escapeHtml(href)}" style="color:${C.body};text-decoration:underline;">${escapeHtml(label)}</a>`;
  const links = [
    link(absoluteUrl(lang, '/'), 'pitonstudios.com'),
    link(`mailto:${SITE.email}`, SITE.email),
    ...(LEGAL_READY ? [link(absoluteUrl(lang, '/privacy'), copy.privacy)] : []),
  ].join(' &nbsp;·&nbsp; ');
  const small = `margin:0;font-family:${SANS};font-size:12px;line-height:1.7;color:${C.muted};`;

  return [
    `<p style="margin:0 0 4px;font-family:${SANS};font-size:13px;line-height:1.5;font-weight:600;color:${C.ink};">${escapeHtml(SITE.name)} <span style="font-weight:400;color:${C.muted};">— ${escapeHtml(copy.tagline)}</span></p>`,
    `<p style="${small}">${links} &nbsp;·&nbsp; ${escapeHtml(copy.location)}</p>`,
    opts.note ? `<p style="${small}margin-top:10px;">${escapeHtml(opts.note)}</p>` : '',
    opts.unsubscribeUrl ? `<p style="${small}margin-top:10px;">${link(opts.unsubscribeUrl, copy.unsubscribe)}</p>` : '',
  ].join('');
}

// ---------- Iskelet ----------

export function emailLayout(input: {
  lang: Locale;
  title: string;
  /** Gelen kutusunda konunun yaninda gorunen onizleme metni. */
  preheader: string;
  /** Koyu seridin sagindaki kucuk etiket. */
  label: string;
  content: string;
  footer: string;
}): string {
  // Onizleme metninden sonra govdenin gelen kutusu onizlemesine sizmamasi icin bosluk dolgusu.
  const filler = '&#847;&zwnj;&nbsp;'.repeat(60);

  return `<!doctype html>
<html lang="${input.lang}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(input.title)}</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&amp;family=Space+Grotesk:wght@400;600;700&amp;display=swap" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; background: ${C.page}; -webkit-text-size-adjust: 100%; }
  table { border-collapse: collapse; }
  img { border: 0; outline: none; text-decoration: none; }
  @media (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .h1 { font-size: 26px !important; }
    .band-label { display: none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(input.preheader)}${filler}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
<tr><td class="px" style="background:${C.band};border-radius:16px 16px 0 0;padding:26px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:middle;"><a href="${escapeHtml(absoluteUrl(input.lang, '/'))}" style="text-decoration:none;"><img src="${LOGO_URL}" width="32" height="32" alt="" style="display:inline-block;vertical-align:middle;"><span style="display:inline-block;vertical-align:middle;padding-left:12px;font-family:${SANS};font-size:14px;line-height:32px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${C.bandInk};">${escapeHtml(SITE.name)}</span></a></td>
<td class="band-label" align="right" style="vertical-align:middle;font-family:${MONO};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.bandMuted};">${escapeHtml(input.label)}</td>
</tr></table>
</td></tr>
<tr><td style="background:${C.accentBright};height:3px;line-height:3px;font-size:0;">&nbsp;</td></tr>
<tr><td class="px" style="background:${C.card};padding:44px 40px 36px;">${input.content}</td></tr>
<tr><td class="px" style="background:${C.soft};border-top:1px solid ${C.line};border-radius:0 0 16px 16px;padding:24px 40px 28px;">${input.footer}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
