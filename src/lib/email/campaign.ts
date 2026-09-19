import type { Locale } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo';
import {
  button,
  cards,
  darkPanel,
  divider,
  emailLayout,
  escapeHtml,
  eyebrow,
  footer,
  heading,
  paragraph,
  signature,
  subheading,
  type RenderedEmail,
} from './layout';

/**
 * Firmalara gonderilecek kampanya / bulten e-postasi.
 *
 * Toplu gonderim Resend Broadcasts ile yapilacaksa `unsubscribeUrl` varsayilani Resend'in
 * yer tutucusudur; Resend her aliciya ozel abonelikten cikma linkiyle degistirir.
 *
 * Hukuk (6563 sayili Kanun / Ticari Iletisim Yonetmeligi): ticari elektronik iletide gonderenin
 * kimligi ve kolay ret (abonelikten cikma) secenegi zorunludur; tacir/esnafa gonderimde de
 * IYS kaydi gerekir. Ret linki bu sablondan kaldirilmamali. Icerikte uydurma rakam/musteri yok.
 */

export type CampaignInput = {
  lang: Locale;
  subject: string;
  preheader: string;
  /** Koyu seritteki etiket, ornegin "Bülten · Eylül 2026". */
  label: string;
  eyebrow?: string;
  title: string;
  /** Aliciya hitap; verilmezse genel selamlama kullanilmaz. */
  greeting?: string;
  intro: string[];
  sectionsTitle?: string;
  sections?: { eyebrow?: string; title: string; body: string; href?: string; linkLabel?: string }[];
  highlight?: { eyebrow?: string; title: string; body: string; href?: string; linkLabel?: string };
  cta: { label: string; href: string };
  closing?: string;
  signature: { name: string; role: string };
  /** Neden bu e-postayi aldigini aciklayan alt bilgi notu. */
  reason: string;
  unsubscribeUrl?: string;
};

export const RESEND_UNSUBSCRIBE_URL = '{{{RESEND_UNSUBSCRIBE_URL}}}';

export function renderCampaign(input: CampaignInput): RenderedEmail {
  const unsubscribeUrl = input.unsubscribeUrl ?? RESEND_UNSUBSCRIBE_URL;

  const content = [
    input.eyebrow ? eyebrow(input.eyebrow) : '',
    heading(input.title),
    input.greeting ? paragraph(escapeHtml(input.greeting)) : '',
    ...input.intro.map((p) => paragraph(escapeHtml(p))),
    input.sections?.length ? `${divider()}${input.sectionsTitle ? subheading(input.sectionsTitle) : ''}${cards(input.sections)}` : '',
    input.highlight ? darkPanel(input.highlight) : '',
    `<div style="padding:8px 0 4px;">${button(input.cta.label, input.cta.href)}</div>`,
    input.closing ? paragraph(escapeHtml(input.closing), { muted: true }) : '',
    signature(input.signature.name, input.signature.role),
  ].join('');

  const text = [
    input.title,
    '',
    ...(input.greeting ? [input.greeting, ''] : []),
    ...input.intro.flatMap((p) => [p, '']),
    ...(input.sections ?? []).flatMap((s) => [`• ${s.title}: ${s.body}${s.href ? ` (${s.href})` : ''}`]),
    ...(input.highlight ? ['', `${input.highlight.title} — ${input.highlight.body}${input.highlight.href ? ` (${input.highlight.href})` : ''}`] : []),
    '',
    `${input.cta.label}: ${input.cta.href}`,
    ...(input.closing ? ['', input.closing] : []),
    '',
    `${input.signature.name} — ${input.signature.role}`,
    '',
    input.reason,
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join('\n');

  return {
    subject: input.subject,
    text,
    html: emailLayout({
      lang: input.lang,
      title: input.subject,
      preheader: input.preheader,
      label: input.label,
      content,
      footer: footer(input.lang, { note: input.reason, unsubscribeUrl }),
    }),
  };
}

/**
 * Onizleme ve ilk kampanya icin ornek icerik. Iddialar sitedeki dogrulanmis bilgilerle sinirli
 * (Ambalaj Cini %30 buyume: Google Ads + Meta). Gondermeden once metni kampanyaya gore duzenleyin.
 */
export function sampleCampaign(lang: Locale): CampaignInput {
  const url = (href: Parameters<typeof absoluteUrl>[1]) => absoluteUrl(lang, href);
  const service = (slug: string) => url({ pathname: '/services/[slug]', params: { slug } });

  if (lang === 'tr') {
    return {
      lang,
      subject: 'İşletmeniz için web, yazılım ve yapay zeka — Piton Studios',
      preheader: 'Web sitesi, özel yazılım ve otomasyonla işinizi büyütmenin üç yolu.',
      label: 'Piton Studios · Bülten',
      eyebrow: 'Dijital büyüme',
      title: 'Web sitenizden daha fazlası: işinizi büyüten dijital altyapı',
      greeting: 'Merhaba,',
      intro: [
        'Piton Studios olarak işletmelere web tasarım, özel yazılım ve yapay zeka entegrasyonunu tek ekipten sunuyoruz.',
        'Aşağıda en sık başladığımız üç alanı kısaca özetledik.',
      ],
      sectionsTitle: 'Nereden başlayabiliriz?',
      sections: [
        { eyebrow: 'Web', title: 'Hızlı ve çok dilli kurumsal site', body: 'Next.js ile hızlı yüklenen, arama motorlarına ve yapay zeka aramalarına hazır web siteleri.', href: service('web-design'), linkLabel: 'Web tasarım' },
        { eyebrow: 'Yazılım', title: 'Özel yazılım, ERP ve CRM', body: 'Excel ve dağınık araçları, iş akışınıza göre tasarlanmış tek bir sisteme taşıyoruz.', href: service('erp-crm'), linkLabel: 'ERP & CRM' },
        { eyebrow: 'Otomasyon', title: 'WhatsApp ve yapay zeka otomasyonu', body: 'Tekrarlayan yazışma ve operasyon işlerini otomatikleştirerek ekibinize zaman kazandırıyoruz.', href: service('whatsapp-chatbot'), linkLabel: 'WhatsApp & Chatbot' },
      ],
      highlight: {
        eyebrow: 'Vaka · Ambalaj Cini',
        title: 'Google Ads ve Meta reklamlarıyla %30 büyüme',
        body: 'Yeni teknolojilerle yenilenen site ve birlikte yönetilen reklam kampanyalarıyla ölçülebilir büyüme.',
        href: url({ pathname: '/projects/[slug]', params: { slug: 'ambalaj-cini' } }),
        linkLabel: 'Vaka çalışmasını okuyun',
      },
      cta: { label: 'Projenizi konuşalım', href: url('/contact') },
      closing: 'Sorularınız için bu e-postayı yanıtlamanız da yeterli.',
      signature: { name: 'Piton Studios', role: 'Tasarım · Yazılım · Yapay zeka' },
      reason: 'Bu e-postayı, işletmenizin dijital altyapısıyla ilgili olabileceğini düşündüğümüz için aldınız.',
    };
  }

  return {
    lang,
    subject: lang === 'ru' ? 'Веб, разработка и ИИ для вашего бизнеса — Piton Studios' : 'Web, software and AI for your business — Piton Studios',
    preheader: lang === 'ru' ? 'Три способа развить бизнес с помощью сайта, ПО и автоматизации.' : 'Three ways to grow with a website, custom software and automation.',
    label: 'Piton Studios · Newsletter',
    eyebrow: lang === 'ru' ? 'Цифровой рост' : 'Digital growth',
    title: lang === 'ru' ? 'Больше, чем сайт: цифровая основа для роста' : 'More than a website: digital infrastructure that grows your business',
    greeting: lang === 'ru' ? 'Здравствуйте,' : 'Hello,',
    intro: [
      lang === 'ru'
        ? 'Piton Studios объединяет веб-дизайн, разработку ПО и интеграцию ИИ в одной команде.'
        : 'Piton Studios brings web design, custom software and AI integration together in one team.',
    ],
    sections: [
      { eyebrow: 'Web', title: lang === 'ru' ? 'Быстрый многоязычный сайт' : 'Fast, multilingual website', body: lang === 'ru' ? 'Сайты на Next.js, готовые к поиску и ИИ-ответам.' : 'Next.js sites ready for search engines and AI answers.', href: service('web-design'), linkLabel: lang === 'ru' ? 'Веб-дизайн' : 'Web design' },
      { eyebrow: 'Software', title: 'ERP & CRM', body: lang === 'ru' ? 'Переносим таблицы и разрозненные инструменты в одну систему.' : 'We move spreadsheets and scattered tools into one system built around your workflow.', href: service('erp-crm'), linkLabel: 'ERP & CRM' },
    ],
    cta: { label: lang === 'ru' ? 'Обсудить проект' : "Let's talk about your project", href: url('/contact') },
    signature: { name: 'Piton Studios', role: lang === 'ru' ? 'Дизайн · Разработка · ИИ' : 'Design · Engineering · AI' },
    reason: lang === 'ru'
      ? 'Вы получили это письмо, потому что мы считаем его полезным для цифровой инфраструктуры вашей компании.'
      : 'You received this email because we believe it is relevant to your company’s digital infrastructure.',
  };
}
