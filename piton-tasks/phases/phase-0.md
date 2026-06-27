# Phase 0: Project Setup

## TASK-001: Next.js + pnpm Init

**Agent**: devops
**Complexity**: S
**Status**: PENDING
**Dependencies**: -

### Description
Next.js 15 App Router projesi olustur, pnpm ile baslangiç kurulumunu yap.

### Acceptance Criteria
- [ ] `pnpm create next-app` ile proje olusturuldu
- [ ] App Router enabled
- [ ] TypeScript strict mode
- [ ] Tailwind CSS configured
- [ ] `src/` dizin yapisi kullanildi

---

## TASK-002: Meta Directories

**Agent**: docs
**Complexity**: S
**Status**: PENDING
**Dependencies**: -

### Description
Proje yonetim dizinlerini olustur (tasks, docs, config, plans).

### Acceptance Criteria
- [ ] `piton-tasks/` with task-index.md, phases/, active/
- [ ] `piton-docs/` with MEMORY.md, CHANGELOG.md
- [ ] `piton-config/` with workflow.md, conventions.md, tech-stack.md, agent-instructions.md
- [ ] `piton-plans/` directory created

---

## TASK-003: Claude Code Setup

**Agent**: devops
**Complexity**: M
**Status**: PENDING
**Dependencies**: TASK-001

### Description
.claude/ dizinini hooks, commands ve settings ile yapilandir.

### Acceptance Criteria
- [ ] protect-files.sh hook calisiyor
- [ ] 4 slash command olusturuldu (cold-start, git-full, turn-off, local-testing)
- [ ] settings.local.json pnpm + Next.js izinleriyle yapilandirildi

---

## TASK-004: CLAUDE.md Configuration

**Agent**: docs
**Complexity**: M
**Status**: PENDING
**Dependencies**: TASK-002

### Description
Ana CLAUDE.md dosyasini proje bilgileri, conventions ve referanslarla yaz.

### Acceptance Criteria
- [ ] Proje aciklamasi ve workspace layout
- [ ] Slash commands dokumante edildi
- [ ] Code conventions ozetlendi
- [ ] Referans dizinleri tablosu

---

## TASK-005: Supabase Setup + Env Config

**Agent**: devops
**Complexity**: M
**Status**: PENDING
**Dependencies**: TASK-001

### Description
Supabase client kurulumu, .env.local template olustur, Storage bucket yapilandir.

### Acceptance Criteria
- [ ] `@supabase/supabase-js` kuruldu
- [ ] `.env.local.example` olusturuldu (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [ ] Supabase client helper (src/lib/supabase/)
- [ ] .env.local .gitignore'da

---

## TASK-006: Lint, Format, TypeScript Config

**Agent**: devops
**Complexity**: S
**Status**: PENDING
**Dependencies**: TASK-001

### Description
ESLint, Prettier ve TypeScript strict yapilandirmasi.

### Acceptance Criteria
- [ ] ESLint Next.js rules ile yapilandirildi
- [ ] Prettier configured
- [ ] TypeScript strict mode enabled
- [ ] `pnpm lint` ve `pnpm typecheck` script'leri calisiyor

---

## TASK-007: Git Repo Init + First Commit

**Agent**: devops
**Complexity**: S
**Status**: PENDING
**Dependencies**: TASK-001..006

### Description
Git repo olustur, .gitignore yaz, ilk commit at.

### Acceptance Criteria
- [ ] .gitignore (node_modules, .env, .next, dist, videos/*.mp4)
- [ ] Tum Phase 0 dosyalari commit edildi
- [ ] Remote repo baglandi (opsiyonel)
