# Pixel Ninja - Task Index

## Dashboard

| Phase | Name | Total | Done | In Progress | Pending | Blocked |
|-------|------|-------|------|-------------|---------|---------|
| 0 | Project Setup | 7 | 0 | 0 | 7 | 0 |
| 1 | Core Infrastructure | 0 | 0 | 0 | 0 | 0 |
| 2 | Frontend / UI | 0 | 0 | 0 | 0 | 0 |
| **Total** | | **7** | **0** | **0** | **7** | **0** |

**Progress**: 0/7 (0%)

---

## Phase 0: Project Setup

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-001 | Next.js + pnpm init | devops | S | PENDING | - |
| TASK-002 | Meta directories (ninja-tasks, ninja-docs, ninja-config, ninja-plans) | docs | S | PENDING | - |
| TASK-003 | .claude/ hooks, commands, settings | devops | M | PENDING | TASK-001 |
| TASK-004 | CLAUDE.md master configuration | docs | M | PENDING | TASK-002 |
| TASK-005 | Supabase setup + env config | devops | M | PENDING | TASK-001 |
| TASK-006 | Lint, format, TypeScript config | devops | S | PENDING | TASK-001 |
| TASK-007 | Git repo init + first commit | devops | S | PENDING | TASK-001..006 |

## Phase 1: Core Infrastructure

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-008 | Supabase Storage bucket + video upload | backend | M | PENDING | TASK-007 |
| TASK-009 | Supabase DB schema (projects, videos, categories) | database | M | PENDING | TASK-007 |
| TASK-010 | Video optimization pipeline (compression, thumbnails) | backend | L | PENDING | TASK-008 |
| TASK-011 | API routes (projects CRUD, video serve) | backend | M | PENDING | TASK-009 |
<!-- Task'lar detaylandirilacak -->

## Phase 2: Frontend / UI

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-012 | Design system + global styles (tasarimdan) | frontend | M | PENDING | TASK-007 |
| TASK-013 | Video player component (lazy load, autoplay) | frontend | L | PENDING | TASK-008 |
| TASK-014 | Portfolio grid + video lightbox | frontend | L | PENDING | TASK-013 |
| TASK-015 | Landing page + navigation | frontend | M | PENDING | TASK-012 |
| TASK-016 | Responsive + performance optimization | frontend | M | PENDING | TASK-014,015 |
| TASK-017 | Vercel deployment + domain setup | devops | S | PENDING | TASK-016 |
<!-- Task'lar detaylandirilacak -->
