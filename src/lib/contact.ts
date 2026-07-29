import { z } from 'zod';
import { locales } from '@/i18n/config';

/**
 * Iletisim formu sozlesmesi — istemci ve sunucu ayni semayi kullanir.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'tooShort').max(120, 'tooLong'),
  email: z.string().trim().email('invalidEmail').max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'tooShort').max(5000, 'tooLong'),
  locale: z.enum(locales).default('tr'),
  /**
   * Bal kupu (honeypot). Gercek kullanici goremez, bot doldurur.
   *
   * Sema burada REDDETMEZ — dolu gelen istek dogrulamayi gecer, sonra handler
   * icinde basariliymis gibi 200 ile cevaplanir ama e-posta gonderilmez.
   * Amac bota "yakalandin" sinyali vermemek; 400 donseydi bot alanı bos birakip
   * tekrar denerdi.
   */
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: 'validation' | 'rateLimit' | 'notConfigured' | 'sendFailed' };
