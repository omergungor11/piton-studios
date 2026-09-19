'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { track } from '@vercel/analytics';
import { Reveal } from '@/components/motion';
import type { ContactResponse } from '@/lib/contact';
import { Link } from '@/i18n/navigation';
import { LEGAL_READY } from '@/lib/legal';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactScene() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  // Bal kupu: gercek kullanici bu alani goremez, bot doldurur.
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorKey, setErrorKey] = useState<string>('error');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company, locale }),
      });

      const data = (await response.json()) as ContactResponse;

      if (data.ok) {
        setStatus('sent');
        // Donusum olayi — kisisel veri yok, yalnizca dil ve sayfa.
        track('contact_form_submit', { locale, path: window.location.pathname });
        setForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
        return;
      }

      // Durum "sent" olarak GOSTERILMEZ — gonderilmediyse kullanici bilmeli.
      setErrorKey(
        data.error === 'rateLimit'
          ? 'errorRateLimit'
          : data.error === 'validation'
            ? 'errorValidation'
            : 'errorSend'
      );
      setStatus('error');
    } catch {
      setErrorKey('errorSend');
      setStatus('error');
    }
  };

  return (
    <div className="contact-glass glass">
      <Reveal variant="fadeIn">
        <div className="eyebrow">{t('eyebrow')}</div>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.2}>
      <div className="contact-actions">
        <a href="https://wa.me/905439500750" target="_blank" rel="noopener noreferrer" className="contact-action-btn whatsapp" data-cursor="hover" data-cursor-label="Chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>{t('whatsapp')}</span>
        </a>
        <a href="tel:+905439500750" className="contact-action-btn phone" data-cursor="hover" data-cursor-label="Call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span>{t('call')}</span>
        </a>
        <a href="mailto:hi@pitonstudios.com" className="contact-action-btn mail-btn" data-cursor="hover" data-cursor-label="Mail">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>
          <span>{t('mail')}</span>
        </a>
      </div>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.25}>
      <div className="contact-socials">
        <a href="https://www.facebook.com/profile.php?id=100089359021738" target="_blank" rel="noopener noreferrer" className="contact-social-btn facebook" data-cursor="hover" data-cursor-label="Facebook" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a href="https://instagram.com/pitonstudios" target="_blank" rel="noopener noreferrer" className="contact-social-btn instagram" data-cursor="hover" data-cursor-label="Instagram" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/company/piton-studios" target="_blank" rel="noopener noreferrer" className="contact-social-btn linkedin" data-cursor="hover" data-cursor-label="LinkedIn" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a href="https://github.com/omergungor11" target="_blank" rel="noopener noreferrer" className="contact-social-btn github" data-cursor="hover" data-cursor-label="GitHub" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a href="https://www.upwork.com/freelancers/~014180d98345b05f82" target="_blank" rel="noopener noreferrer" className="contact-social-btn upwork" data-cursor="hover" data-cursor-label="Upwork" aria-label="Upwork">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
          </svg>
        </a>
        <a href="https://www.behance.net/pitonstudios" target="_blank" rel="noopener noreferrer" className="contact-social-btn behance" data-cursor="hover" data-cursor-label="Behance" aria-label="Behance">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
          </svg>
        </a>
        <a href="https://dribbble.com/omer-faruk-arlec" target="_blank" rel="noopener noreferrer" className="contact-social-btn dribbble" data-cursor="hover" data-cursor-label="Dribbble" aria-label="Dribbble">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
          </svg>
        </a>
        <a href="https://www.fiverr.com/users/pitonstudios/portfolio" target="_blank" rel="noopener noreferrer" className="contact-social-btn fiverr" data-cursor="hover" data-cursor-label="Fiverr" aria-label="Fiverr">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
          </svg>
        </a>
      </div>
      </Reveal>

      <Reveal variant="fadeUp" delay={0.3}>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-header">
          <span className="contact-form-tag">{t('formTag')}</span>
          <span className="contact-form-sub">{t('formSub')}</span>
        </div>
        <div className="contact-form-fields">
          <div className="contact-field">
            <label htmlFor="name">{t('name')}</label>
            <input id="name" type="text" placeholder={t('namePlaceholder')} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="contact-field">
            <label htmlFor="email">{t('email')}</label>
            <input id="email" type="email" placeholder={t('emailPlaceholder')} required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="contact-field">
            <label htmlFor="phone">{t('phone')}</label>
            <input id="phone" type="tel" placeholder={t('phonePlaceholder')} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="contact-field full">
            <label htmlFor="message">{t('message')}</label>
            <textarea id="message" placeholder={t('messagePlaceholder')} rows={4} required minLength={10} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
        </div>

        {/* Bal kupu — ekran okuyucudan ve gozden gizli, yalnizca botlar doldurur */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>

        <button type="submit" className="contact-submit" disabled={status === 'sending' || status === 'sent'} data-cursor="hover" data-cursor-label="Send">
          {status === 'idle' && <><span>{t('submit')}</span><span className="arrow-icon">↗</span></>}
          {status === 'sending' && <span>{t('sending')}</span>}
          {status === 'sent' && <span>{t('sent')}</span>}
          {status === 'error' && <span>{t(errorKey)}</span>}
        </button>

        {LEGAL_READY ? (
          <p className="contact-form-legal">
            {t.rich('formLegal', {
              link: (chunks) => (
                <Link href="/privacy" data-cursor="hover">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        ) : null}

        <div className="contact-form-status" role="status" aria-live="polite">
          {status === 'sent' && <span className="is-ok">{t('sentDetail')}</span>}
          {status === 'error' && (
            <span className="is-error">
              {t(errorKey)} —{' '}
              <a href="mailto:hi@pitonstudios.com">hi@pitonstudios.com</a>
            </span>
          )}
        </div>
      </form>
      </Reveal>
    </div>
  );
}
