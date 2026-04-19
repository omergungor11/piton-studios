# Agent Instructions — Pixel Ninja

## Sub-Agent Types

### Frontend Agent
- **Scope**: `src/app/`, `src/components/`, `src/hooks/`, `src/styles/`
- **Validation**: `pnpm typecheck && pnpm lint`
- **Commit Prefix**: `feat(web)`, `fix(web)`, `refactor(web)`

### Backend Agent
- **Scope**: `src/app/api/`, `src/lib/supabase/`
- **Validation**: `pnpm typecheck && pnpm lint`
- **Commit Prefix**: `feat(api)`, `fix(api)`

### Database Agent
- **Scope**: `supabase/`, Supabase dashboard migrations
- **Validation**: Supabase client type generation
- **Commit Prefix**: `feat(db)`, `fix(db)`

### DevOps Agent
- **Scope**: Config files, `.env.example`, `next.config.ts`, `vercel.json`
- **Commit Prefix**: `chore(config)`, `chore(deploy)`

### Docs Agent
- **Scope**: `ninja-*` directories, CLAUDE.md, markdown files
- **Commit Prefix**: `docs(*)`

## Agent Rules

1. Always read task details before starting work
2. Never modify files outside your scope without approval
3. Run validation commands after every change
4. Update task tracking on completion
5. Follow code conventions strictly
6. Keep commits atomic and well-described

---

## Parallel Agent Orchestration

### 1. Directory Isolation

| Agent Task | Allowed Directory | Forbidden |
|------------|-------------------|-----------|
| Video components | `src/components/video/` | Other `src/components/*/` |
| UI components | `src/components/ui/` | Other `src/components/*/` |
| Layout | `src/components/layout/` | Other dirs |
| Pages | `src/app/(pages)/` | API routes |
| API | `src/app/api/` | Pages |

### 2. Shared Files

| File | Strategy |
|------|----------|
| `src/app/layout.tsx` | Read → Edit → Retry (max 3) |
| `tailwind.config.ts` | Same retry pattern |
| `package.json` | Only orchestrator installs packages |

### 3. Ordering Rules

```
Independent tasks → run in parallel (different directories)
Dependent tasks   → run sequentially
Shared file edits → retry pattern
Package install   → orchestrator only
```
