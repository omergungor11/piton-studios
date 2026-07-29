import type { DefaultSession } from 'next-auth';

/** Oturuma rol ve id alanlarini ekler — panel yetkilendirmesi buna dayanir. */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
  }
}

export {};
