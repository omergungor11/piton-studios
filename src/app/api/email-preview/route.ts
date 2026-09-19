import { locales, type Locale } from '@/lib/site';
import { renderContactAutoReply, renderContactNotification } from '@/lib/email/contact';
import { renderCampaign, sampleCampaign } from '@/lib/email/campaign';
import type { RenderedEmail } from '@/lib/email/layout';

/**
 * E-posta sablonu onizlemesi — YALNIZCA gelistirme ortaminda.
 * /api/email-preview                       → liste
 * /api/email-preview?t=auto-reply&l=en     → HTML
 * /api/email-preview?t=campaign&format=text → duz metin
 */
export const dynamic = 'force-dynamic';

const SAMPLE = {
  name: 'Ayşe Yılmaz',
  email: 'ayse@ornek.com',
  phone: '+90 532 000 00 00',
  message: 'Merhaba,\nFirmamız için çok dilli bir kurumsal site ve teklif formu düşünüyoruz. Süre ve bütçe hakkında bilgi alabilir miyiz?',
};

const TEMPLATES: Record<string, (locale: Locale) => RenderedEmail> = {
  notification: (locale) => renderContactNotification({ ...SAMPLE, locale }),
  'auto-reply': (locale) => renderContactAutoReply({ ...SAMPLE, locale }),
  campaign: (locale) => renderCampaign(sampleCampaign(locale)),
};

export function GET(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not found', { status: 404 });
  }

  const params = new URL(request.url).searchParams;
  const render = TEMPLATES[params.get('t') ?? ''];
  const locale = (locales as readonly string[]).includes(params.get('l') ?? '') ? (params.get('l') as Locale) : 'tr';

  if (!render) {
    const links = Object.keys(TEMPLATES)
      .flatMap((t) => locales.map((l) => `<li><a href="?t=${t}&l=${l}">${t} · ${l}</a> — <a href="?t=${t}&l=${l}&format=text">text</a></li>`))
      .join('');
    return new Response(`<!doctype html><meta charset="utf-8"><title>E-posta önizleme</title><body style="font-family:system-ui;padding:32px"><h1>E-posta şablonları</h1><ul>${links}</ul></body>`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const email = render(locale);
  if (params.get('format') === 'text') {
    return new Response(`Subject: ${email.subject}\n\n${email.text}`, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  return new Response(email.html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
