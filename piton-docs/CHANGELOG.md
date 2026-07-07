# Changelog

## 2026-07-07

### Fixed
- Added missing `works` translation entries (title/summary/body) for 11 project slugs in `tr.json` and `en.json` — previously these fell back to `data.ts` raw fields, leaking English summaries into Turkish pages and Turkish body text into English pages

## 2026-07-06

### Added
- 3 new portfolio projects: Mindloop (personal 3D interactive site), Dental Health (healthcare clinic), Securify (SaaS security landing page)
- Desktop/mobile WebP previews for all 3 new projects (`public/assets/previews/`)

## 2026-06-27

### Changed
- **Rebrand: Pixel Ninja → Piton Studios** across all content, locales (EN/TR/RU), components, package name, emails/domains/socials, and the project folder
- Renamed meta directories `ninja-*` → `piton-*`
- Hero rewritten around the new name (ninja wordplay dropped)

### Added
- New brand logo (tech-globe `public/logo.webp`) used as favicon, header/footer mark, and hero feature
- Replaced ninja-silhouette favicon (`icon.svg`) with `icon.png` + `apple-icon.png`

## 2026-04-19

### Added
- Project scaffold with Claude Code workflow (piton-* meta directories)
- CLAUDE.md master configuration for Piton Studios
- Task tracking system (Phase 0-2 planned)
- Slash commands (cold-start, git-full, turn-off, local-testing)
- protect-files.sh hook for sensitive file protection
