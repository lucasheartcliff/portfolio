# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run format       # ESLint fix + Prettier
npm run check-types  # TypeScript type checking (strict mode)
npm test             # Run all Jest tests
npm test -- --testPathPattern=ComponentName  # Run a single test file
npm run e2e:headless # Cypress E2E tests (starts dev server automatically)
```

Commit messages follow Conventional Commits (`@commitlint/config-conventional`). Husky runs lint-staged on pre-commit and `tsc --noEmit` on pre-push.

## Architecture

**Next.js 13 Pages Router** with SSG and locale-based routing (`/[locale]/index.tsx`). Root `pages/index.tsx` detects browser language and redirects.

**i18n**: next-i18next with two locales (`en`, `pt`). Translation files at `public/locales/{en,pt}/common.json`. All user-visible text uses `t()` from `useTranslation('common')`. SSG pages use `getStaticPaths` to generate per-locale paths and `getStaticProps` with `serverSideTranslations`.

**Theming**: `src/contexts/ThemeContext.tsx` (`ThemeProvider`/`useTheme`) tracks `'dark' | 'light'`, defaulting to the visitor's `prefers-color-scheme` and falling back to dark. A manual toggle (`ThemeToggle`, rendered in `Nav.tsx` and the article reader's `ArticleNav`) overrides this and persists the choice to `localStorage` (`theme` key). `_document.tsx` still runs a synchronous inline script before first paint (reads `localStorage`, then `matchMedia`, then defaults to dark) to stamp `data-theme` and the `dark` class on `<html>` and avoid a flash; `ThemeProvider` syncs its React state from that stamped value on mount. AntD's `ConfigProvider` in `_app.tsx` switches between `theme.darkAlgorithm`/`theme.defaultAlgorithm` based on the active theme. Colors are driven by CSS custom properties in `src/styles/global.css`, declared once under `:root, [data-theme='dark']` and again under `[data-theme='light']`; components consume them either via Tailwind color tokens (`text-fg`, `text-soft`, `text-muted`, `text-faint`, `border-hairline`, `bg-chip`/`fill-chip`/`stroke-chip`, mapped in `tailwind.config.js`) or inline `style={{ ... : 'var(--x)' }}`. `ImageLightbox`'s dark scrim and the mobile-nav drawer overlay stay dark-only by design regardless of page theme.

**Page composition**: `_app.tsx` (AntD ConfigProvider + i18n HOC) → page (`pages/[locale]/index.tsx` or `pages/articles/[slug].tsx`) → section components from `src/components/portfolio/*` (`Nav`, `Hero`, `Architecture`, `Stack`, `Languages`, `Projects`, `Articles`, `Contact`), each a self-contained `<section>` composed directly in the page — no shared page template or generic layout components. Shared small pieces (`Glass`, `Reveal`, `SectionLabel`, `Tag`, `Trans`, the `ACCENT`/`ACCENT_B` colors) live in `src/components/portfolio/atoms.tsx`.

**Profile data**: Static JSON at `public/assets/jsons/profile.json` imported directly. Dynamic data (GitHub repos, WakaTime stats, Dev.to articles) fetched client-side from API routes.

**API routes**:
- `/api/articles` — Dev.to articles proxy (shows drafts in dev)
- `/api/github/repos` — Pinned GitHub repos proxy
- `/api/wakatime/[stat]` — WakaTime stats proxy (languages, coding-time, activity, editors, code-activity)
- `/api/contact` — Email via nodemailer with rate limiting (1/min per IP)

**Animations**: `Reveal` (in `atoms.tsx`) wraps sections with an IntersectionObserver-triggered fade+slide-up. `RotatingRole` (in `Hero.tsx`) animates rotating role titles.

**Legacy code**: `src/components/` also has a handful of top-level components (`ProjectCard`, `ArticleCard`, `Navbar`, `Timeline`, etc.) from an earlier version of the site. Before touching one, confirm it's actually imported from a page — several are orphaned and never render. `ImageLightbox`, `LoadingScreen`, and `ReactiveBackground` are the ones still live outside of `portfolio/*`.

## Path Aliases

- `@/*` → `./src/*`
- `@/public/*` → `./public/*`

## Environment Variables

Public: `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_ANALYTICS_ID`, `NEXT_PUBLIC_DEVTO_USERNAME`
Server-only: `DEVTO_API_KEY`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`, `GITHUB_API_URL`, `GITHUB_PINNED_API_URL`, `GITHUB_BASE_URL`, `WAKATIME_LANGUAGES_URL`, `WAKATIME_CODING_TIME_URL`, `WAKATIME_ACTIVITY_URL`, `WAKATIME_EDITORS_URL`, `WAKATIME_CODE_ACTIVITY_URL`

## CI/CD

GitHub Actions (`.github/workflows/deploy.yml`): test → Docker build → push to GHCR → deploy via SSH. Triggers on push to `main` or `next` branches.
