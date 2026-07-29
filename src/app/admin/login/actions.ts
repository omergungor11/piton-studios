'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth';

export type LoginState = { error?: string };

export async function authenticate(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin',
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      // Kullaniciya hangi alanin yanlis oldugu SOYLENMEZ — hesap numaralandirmayi
      // (account enumeration) engellemek icin tek ve genel bir mesaj.
      return { error: 'E-posta veya şifre hatalı. Çok sayıda başarısız denemeden sonra giriş 15 dakika kilitlenir.' };
    }

    // signIn basarili oldugunda NEXT_REDIRECT firlatir — yutulmamali.
    throw error;
  }
}
