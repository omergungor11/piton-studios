import type { Locale } from '@/lib/site';
import { SITE } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
import {
  button,
  details,
  emailLayout,
  escapeHtml,
  eyebrow,
  footer,
  heading,
  paragraph,
  quote,
  signature,
  steps,
  type RenderedEmail,
} from './layout';

/** Iletisim formu e-postalari: ekibe bildirim (TR) ve ziyaretciye otomatik yanit (tr/en/ru). */

type ContactEmailInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale: Locale;
};

const LANG_LABEL: Record<Locale, string> = { tr: 'Türkçe', en: 'English', ru: 'Русский' };

export function renderContactNotification(input: ContactEmailInput & { receivedAt?: Date }): RenderedEmail {
  const when = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Istanbul',
  }).format(input.receivedAt ?? new Date());
  const phone = input.phone?.trim();
  // wa.me ulke kodu ister; yalnizca uluslararasi bicimde yazilmis numarada gosterilir.
  const whatsapp = phone?.startsWith('+') ? `https://wa.me/${phone.replace(/\D/g, '')}` : undefined;
  const subject = `Yeni mesaj: ${input.name} (${input.locale.toUpperCase()})`;

  const content = [
    eyebrow('Yeni iletişim formu mesajı'),
    heading(`${input.name} size yazdı`),
    paragraph(`${escapeHtml(when)} · ${LANG_LABEL[input.locale]} · pitonstudios.com`, { muted: true, small: true }),
    details([
      { label: 'İsim', value: input.name },
      { label: 'E-posta', value: input.email, href: `mailto:${input.email}` },
      ...(phone ? [{ label: 'Telefon', value: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}` }] : []),
      { label: 'Dil', value: LANG_LABEL[input.locale] },
    ]),
    quote('Mesaj', input.message),
    button('E-postayla yanıtla', `mailto:${input.email}?subject=${encodeURIComponent('Piton Studios — mesajınız hakkında')}`),
    whatsapp ? button('WhatsApp', whatsapp, 'secondary') : '',
  ].join('');

  const text = [
    `Yeni iletişim formu mesajı — ${when}`,
    '',
    `İsim: ${input.name}`,
    `E-posta: ${input.email}`,
    ...(phone ? [`Telefon: ${phone}`] : []),
    `Dil: ${LANG_LABEL[input.locale]}`,
    '',
    'Mesaj:',
    input.message,
  ].join('\n');

  return {
    subject,
    text,
    html: emailLayout({
      lang: 'tr',
      title: subject,
      preheader: input.message.slice(0, 140),
      label: 'Yeni lead',
      content,
      footer: footer('tr', {
        note: 'Bu bildirim pitonstudios.com iletişim formundan geldi. “Yanıtla” doğrudan gönderene gider.',
      }),
    }),
  };
}

const AUTO_REPLY: Record<
  Locale,
  {
    subject: string;
    label: string;
    eyebrow: string;
    greeting: (firstName: string) => string;
    intro: string;
    stepsTitle: string;
    steps: { title: string; body: string }[];
    messageLabel: string;
    cta: string;
    replyHint: string;
    team: string;
    role: string;
  }
> = {
  tr: {
    subject: 'Mesajınızı aldık — Piton Studios',
    label: 'Mesaj alındı',
    eyebrow: 'Mesajınız bize ulaştı',
    greeting: (n) => `Teşekkürler, ${n}.`,
    intro: 'Projeniz hakkında yazdığınız için teşekkür ederiz. Genellikle 24 saat içinde dönüş yapıyoruz.',
    stepsTitle: 'Bundan sonra ne olacak?',
    steps: [
      { title: 'İnceleme', body: 'Mesajınızı okuyup ihtiyacınızı ve hedeflerinizi değerlendiriyoruz.' },
      { title: 'Dönüş', body: 'E-posta ya da telefonla size ulaşıp gerekiyorsa kısa bir görüşme planlıyoruz.' },
      { title: 'Yol haritası', body: 'Kapsam netleşince süre ve bütçeyi içeren net bir teklif hazırlıyoruz.' },
    ],
    messageLabel: 'Gönderdiğiniz mesaj',
    cta: 'Projelerimize göz atın',
    replyHint: 'Eklemek istediğiniz bir şey varsa bu e-postayı yanıtlamanız yeterli.',
    team: 'Piton Studios ekibi',
    role: 'Tasarım · Yazılım · Yapay zeka',
  },
  en: {
    subject: 'We received your message — Piton Studios',
    label: 'Message received',
    eyebrow: 'Your message reached us',
    greeting: (n) => `Thanks, ${n}.`,
    intro: 'Thank you for telling us about your project. We usually reply within 24 hours.',
    stepsTitle: 'What happens next?',
    steps: [
      { title: 'Review', body: 'We read your message and look at your needs and goals.' },
      { title: 'Reply', body: 'We get back to you by email or phone and set up a short call if needed.' },
      { title: 'Roadmap', body: 'Once the scope is clear, we prepare a clear proposal with timeline and budget.' },
    ],
    messageLabel: 'Your message',
    cta: 'Explore our projects',
    replyHint: 'If you want to add anything, simply reply to this email.',
    team: 'The Piton Studios team',
    role: 'Design · Engineering · AI',
  },
  ru: {
    subject: 'Мы получили ваше сообщение — Piton Studios',
    label: 'Сообщение получено',
    eyebrow: 'Ваше сообщение получено',
    greeting: (n) => `Спасибо, ${n}.`,
    intro: 'Благодарим, что рассказали о своём проекте. Обычно мы отвечаем в течение 24 часов.',
    stepsTitle: 'Что дальше?',
    steps: [
      { title: 'Анализ', body: 'Читаем сообщение и разбираемся в ваших задачах и целях.' },
      { title: 'Ответ', body: 'Связываемся по почте или телефону и при необходимости назначаем короткий созвон.' },
      { title: 'План', body: 'Когда объём работ ясен, готовим предложение со сроками и бюджетом.' },
    ],
    messageLabel: 'Ваше сообщение',
    cta: 'Посмотреть наши проекты',
    replyHint: 'Если хотите что-то добавить, просто ответьте на это письмо.',
    team: 'Команда Piton Studios',
    role: 'Дизайн · Разработка · ИИ',
  },
};

export function renderContactAutoReply(input: ContactEmailInput): RenderedEmail {
  const copy = AUTO_REPLY[input.locale] ?? AUTO_REPLY.tr;
  const firstName = input.name.trim().split(/\s+/)[0] ?? input.name;
  const projectsUrl = absoluteUrl(input.locale, '/projects');

  const content = [
    ...[eyebrow(copy.eyebrow), heading(copy.greeting(firstName)), paragraph(escapeHtml(copy.intro))],
    `<p style="margin:24px 0 4px;font-family:'Space Grotesk',-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:17px;font-weight:700;color:#0B0B0B;">${escapeHtml(copy.stepsTitle)}</p>`,
    steps(copy.steps),
    quote(copy.messageLabel, input.message),
    button(copy.cta, projectsUrl),
    paragraph(escapeHtml(copy.replyHint), { muted: true, small: true }),
    signature(copy.team, copy.role),
  ].join('');

  const text = [
    copy.greeting(firstName),
    '',
    copy.intro,
    '',
    `${copy.stepsTitle}`,
    ...copy.steps.map((s, i) => `${i + 1}. ${s.title} — ${s.body}`),
    '',
    `${copy.messageLabel}:`,
    input.message,
    '',
    `${copy.cta}: ${projectsUrl}`,
    copy.replyHint,
    '',
    copy.team,
    `${SITE.name} · ${SITE.email}`,
  ].join('\n');

  return {
    subject: copy.subject,
    text,
    html: emailLayout({
      lang: input.locale,
      title: copy.subject,
      preheader: copy.intro,
      label: copy.label,
      content,
      footer: footer(input.locale),
    }),
  };
}
