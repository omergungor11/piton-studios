Local dev ortamini dogrula:

0. Port temizligi — eski process'leri kontrol et (3000)
1. Supabase baglantisi — .env.local'daki credentials ile test et
2. Next.js build kontrolu — `pnpm build` calistir
3. Video dosyalari — videos/ klasorundeki dosyalarin erisilebilirligini kontrol et
4. Lint + typecheck — `pnpm lint && pnpm typecheck`
5. Ozet rapor: her servis OK/FAIL, erisim URL'leri

NOT: Sunuculari baslatma — sadece build ve health check yap.
