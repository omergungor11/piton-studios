import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema, type ContactResponse } from '@/lib/contact';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Bildirimlerin gidecegi adres. Resend'te dogrulanmis bir alan adi yoksa
 * `onboarding@resend.dev` yalnizca Resend hesabinin sahibine gonderebilir —
 * bu yuzden Resend hesabi bu adresle acilmali.
 */
const NOTIFY_TO = process.env.CONTACT_NOTIFY_EMAIL ?? 'pitonstudios@gmail.com';

/** Dogrulanmis alan adi varsa oradan, yoksa Resend'in test gondericisinden. */
const FROM = process.env.CONTACT_FROM_EMAIL ?? 'Piton Studios <onboarding@resend.dev>';

/** Ziyaretciye otomatik yanit yalnizca dogrulanmis alan adiyla mumkun. */
const CAN_AUTO_REPLY = Boolean(process.env.CONTACT_FROM_EMAIL);

// ---------- Hiz siniri ----------
// Bellek ici; serverless'ta her instance kendi sayacini tutar. Mutlak degil ama
// tek bir IP'nin formu doldurmasini pratikte engelliyor ve sifir altyapi istiyor.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, { count: number; since: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.since > WINDOW_MS) {
    hits.set(ip, { count: 1, since: now });
    return false;
  }

  entry.count++;
  return entry.count > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const AUTO_REPLY: Record<string, { subject: string; body: string }> = {
  tr: {
    subject: 'Mesajınızı aldık — Piton Studios',
    body: 'Mesajınız bize ulaştı. Genellikle 24 saat içinde dönüş yapıyoruz.',
  },
  en: {
    subject: 'We received your message — Piton Studios',
    body: 'Your message reached us. We usually reply within 24 hours.',
  },
  ru: {
    subject: 'Мы получили ваше сообщение — Piton Studios',
    body: 'Ваше сообщение получено. Обычно мы отвечаем в течение 24 часов.',
  },
};

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'validation' }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, error: 'validation' }, 400);
  }

  const { name, email, phone, message, locale, company } = parsed.data;

  // Bal kupu doldurulmus: bota basarili gibi cevap ver, hicbir sey gonderme.
  if (company) {
    return json({ ok: true }, 200);
  }

  // Hiz siniri DOGRULAMADAN SONRA sayilir. Aksi halde e-postasini uc kez yanlis
  // yazan kullanici 10 dakika kilitleniyordu; sinirlamak istedigimiz sey gecerli
  // gonderim denemeleri.
  if (rateLimited(clientIp(request))) {
    return json({ ok: false, error: 'rateLimit' }, 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sessizce yutma — lead kaybolmasin diye kullaniciya acik hata donuyoruz.
    console.error('[contact] RESEND_API_KEY tanimli degil; mesaj gonderilemedi.', {
      from: email,
    });
    return json({ ok: false, error: 'notConfigured' }, 500);
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:1.7;color:#111">
      <h2 style="margin:0 0 16px;font-size:16px">Yeni iletişim formu mesajı</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>İsim</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>E-posta</strong></td><td>${escapeHtml(email)}</td></tr>
        ${phone ? `<tr><td><strong>Telefon</strong></td><td>${escapeHtml(phone)}</td></tr>` : ''}
        <tr><td><strong>Dil</strong></td><td>${locale}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px;font-size:14px">Mesaj</h3>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
      <hr style="margin:24px 0;border:0;border-top:1px solid #ddd" />
      <p style="font-size:12px;color:#666;margin:0">${SITE.url} · iletişim formu</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: `Yeni mesaj: ${name}`,
      html,
      // Doğrudan "Yanıtla" ile gönderene dönebilmek için.
      replyTo: email,
    });

    if (error) {
      console.error('[contact] Resend hatasi:', error);
      return json({ ok: false, error: 'sendFailed' }, 502);
    }
  } catch (error) {
    console.error('[contact] gonderim istisnasi:', error);
    return json({ ok: false, error: 'sendFailed' }, 502);
  }

  // Otomatik yanit best-effort: basarisiz olursa asil bildirimi gecersiz kilmaz.
  if (CAN_AUTO_REPLY) {
    const reply = AUTO_REPLY[locale] ?? AUTO_REPLY.tr;
    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: reply.subject,
        html: `<div style="font-family:ui-monospace,Menlo,monospace;font-size:14px;line-height:1.7">
          <p>${escapeHtml(name)},</p>
          <p>${reply.body}</p>
          <p style="color:#666;font-size:12px">Piton Studios · ${SITE.url}</p>
        </div>`,
      });
    } catch (error) {
      console.error('[contact] otomatik yanit gonderilemedi:', error);
    }
  }

  return json({ ok: true }, 200);
}
