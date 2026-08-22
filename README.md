# Portfolio

[![Tests](https://github.com/lucasheartcliff/portfolio/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/lucasheartcliff/portfolio/actions/workflows/test.yml)
[![Build & Deploy](https://github.com/lucasheartcliff/portfolio/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/lucasheartcliff/portfolio/actions/workflows/deploy.yml)
[![Lighthouse CI](https://github.com/lucasheartcliff/portfolio/actions/workflows/lighthouse.yml/badge.svg?branch=main)](https://github.com/lucasheartcliff/portfolio/actions/workflows/lighthouse.yml)
[![Performance (desktop)](https://img.shields.io/badge/Lighthouse%20Performance%20%28desktop%29-100-brightgreen)](#lighthouse-scores)
[![Performance (mobile)](https://img.shields.io/badge/Lighthouse%20Performance%20%28mobile%29-88-yellowgreen)](#lighthouse-scores)
[![Accessibility](https://img.shields.io/badge/Lighthouse%20Accessibility-100-brightgreen)](#lighthouse-scores)
[![Best Practices](https://img.shields.io/badge/Lighthouse%20Best%20Practices-96-brightgreen)](#lighthouse-scores)
[![SEO](https://img.shields.io/badge/Lighthouse%20SEO-100-brightgreen)](#lighthouse-scores)

A personal portfolio built with Next.js 13, TypeScript, and Tailwind CSS — architecture case studies with hand-drawn SVG diagrams, live GitHub/WakaTime/Dev.to data, a full article reader, and SEO/AI-agent-navigation tooling (canonical + hreflang, JSON-LD, `llms.txt`), served in 10 languages.

**Live**: [lucasheartcliff.com.br](https://lucasheartcliff.com.br)

---

## Features

### Page Sections

Composed directly in `src/pages/[locale]/index.tsx` from `src/components/portfolio/*` — no shared layout template, each section is a self-contained `<section>`:

- **Nav** — Sticky top bar with logo, section links, locale switcher, and theme toggle
- **Hero** — Name, animated rotating role titles, an "available for opportunities" badge, a live decorative system-monitor widget (CPU/MEM/RPS), social links, and the downloadable PDF resume
- **Architecture** — Three fixed case-study cards (event-driven pipelines, domain modeling, license/access control), each with a custom hand-drawn SVG diagram
- **Stack** — Tech categories (Backend, Frontend, Data & Messaging, Cloud & Infra) as chip grids with inline SVG category icons
- **Languages** — Custom SVG donut chart of programming-language time, sourced from WakaTime
- **Projects** — GitHub pinned-repository cards (via the GitHub GraphQL API) with language, stars, forks, description, and topic tags; paginated, section auto-hides when no repos are available
- **Articles** — Dev.to article cards sorted newest-first with tags, reading time, publish date, and a "New" badge for articles published within the last 30 days; section auto-hides when no articles are available
- **Contact** — Form with name, email, subject, and message; sends via [Resend](https://resend.com), rate-limited by IP

### Article Reader

Dedicated page (`/articles/[slug]`) that fetches and renders full Dev.to articles as Markdown with:
- Auto-generated aside navigation from article headings
- Cover image, tags, reading time, and publish date
- **Image lightbox** — click any image to expand it in a fullscreen overlay with zoom toggle
- **Font size controls** — persisted reader preference
- JSON-LD `Article` + `BreadcrumbList` structured data for SEO
- Draft preview support in development mode

### UI/UX

- **Theming** — `ThemeProvider`/`useTheme` (`src/contexts/ThemeContext.tsx`) tracks `dark`/`light`, defaulting to `prefers-color-scheme`; a synchronous inline script in `_document.tsx` stamps the theme before first paint to avoid a flash; manual toggle persists to `localStorage`
- **Reveal** — `IntersectionObserver`-triggered fade + slide-up on scroll (`src/components/portfolio/atoms.tsx`), with an `eager` mode that skips the animation for above-the-fold content
- **Responsive Design** — Mobile-first Tailwind layout

### Internationalization

- **Languages**: `pt`, `en` (default), `es`, `it`, `fr`, `de`, `zh`, `ru`, `ja`, `ko` — 10 locales, configured in `next-i18next.config.js`
- **Framework**: next-i18next, translation files at `public/locales/{locale}/common.json`
- **Routing**: URL-based (`/en`, `/pt`, …); root `/` does a server-side redirect based on `Accept-Language`

### Integrations

| Service | Purpose | API Route |
|---------|---------|-----------|
| **Dev.to** | Fetch published articles (and drafts in dev) | `/api/articles`, `/api/articles/[slug]` |
| **GitHub GraphQL API** | Fetch pinned repositories | `/api/github/repos` |
| **WakaTime** | Fetch coding time and language stats | `/api/wakatime/[stat]` (languages, coding-time, activity, editors, code-activity) |
| **Resend** | Send contact-form emails, rate-limited by IP | `/api/contact` |
| **Google Analytics** / **Vercel Analytics** | Page tracking | Configured in `_app.tsx` |

### SEO & AI-agent navigation

- Per-locale canonical URLs + `hreflang` alternates (all 10 locales + `x-default`) via `next-seo`
- OpenGraph and Twitter Card tags via the shared `<Meta>` component (`src/layouts/Meta.tsx`)
- JSON-LD structured data: `Person` (homepage, with `sameAs`/`knowsAbout`/`alumniOf`), `Article` + `BreadcrumbList` (article pages)
- `robots.txt` with explicit allow policies for AI crawlers (`GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`) alongside the general policy
- `llms.txt` generated at build time from `profile.json`, giving AI agents a structured Markdown summary without needing to parse HTML/JS
- `sitemap.xml` auto-generated by `next-sitemap` post-build

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 13 (Pages Router), React 18, TypeScript |
| **Styling** | Tailwind CSS 3, Ant Design 5 (`ConfigProvider` theme algorithm) |
| **Icons** | lucide-react, inline SVG |
| **Markdown** | react-markdown |
| **i18n** | next-i18next, react-i18next, i18next, next-language-detector |
| **Email** | Resend |
| **Analytics** | Google Analytics (`@next/third-parties`), Vercel Analytics |
| **Testing** | Jest, React Testing Library, Cypress, Playwright |
| **Linting** | ESLint (Airbnb TypeScript), Prettier, eslint-plugin-tailwindcss |
| **Git Hooks** | Husky, lint-staged, Commitlint (Conventional Commits) |
| **Build** | Next.js compiler, @next/bundle-analyzer |
| **Deployment** | Docker (multi-stage), Nginx reverse proxy, GitHub Actions CI/CD |

---

## Lighthouse Scores

Audited locally against a production build (`next build && next start`) — 3 runs each on `/en` and `/pt`, averaged — using [`lighthouserc.desktop.js`](lighthouserc.desktop.js) (desktop preset) and [`lighthouserc.mobile.js`](lighthouserc.mobile.js) (Lighthouse's default mobile emulation: 360×640, 4x CPU slowdown, throttled network — the same profile PageSpeed Insights reports as "Mobile"):

| Category | Desktop | Mobile |
|----------|:-------:|:------:|
| Performance | 100 | 88 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |

Mobile was audited for the first time alongside this table and came in well below desktop (80 performance), so it got a real optimization pass rather than just a number:

- **Self-hosted fonts** via `next/font/google` (`src/styles/fonts.ts`) instead of a `<link>` to `fonts.googleapis.com` — no third-party font request at all, and dropped an entirely unused Instrument Serif family that was being downloaded and never applied anywhere.
- **`Reveal eager` mode** (`src/components/portfolio/atoms.tsx`) — the hero section's content was wrapped in the same scroll-triggered fade-in as every other section, but the hero is fully above the fold on load; it was paying a hydration + `IntersectionObserver` + 900ms-transition tax to reveal content nobody had to scroll to see. `eager` skips that entirely for above-the-fold content. This was the single biggest fix: it was the LCP element, at 4.0s.
- **Removed `framer-motion` and `@ant-design/icons`** — both were imported only by the loading spinner shown before hydration on every page load, replaced with a plain CSS spinner + fade. Dropped the shared `_app.js` chunk from 133 kB to 88.3 kB.
- **Removed the unused `flag-icons` stylesheet** — imported globally but no flag icon is ever rendered (the locale switcher uses plain text). Dropped shared CSS from 13.5 kB to 6.83 kB.
- **Pointed the audit at the canonical URLs** (`/en/`, `/pt/` instead of `/en`, `/pt`) — `trailingSlash: true` means the bare path always 308-redirects to the trailing-slash form, which Lighthouse was counting as 610ms of pure waste on every run.

Best Practices is capped at 96/100 in *this* sandboxed environment specifically — the failing audit (`errors-in-console`) is network-level "failed to load resource" logs from Google Tag Manager, this project's own `/api/wakatime` and `/api/github` proxy routes (no real API credentials configured locally), and Vercel's insights script (only resolves when actually hosted on Vercel). None are real code defects; a deployment with real credentials and open internet access should score 100 there too.

Enforced in CI via the **Lighthouse CI** workflow (badge above) on every push/PR to `main`/`next`: Accessibility, Best Practices, and SEO are hard-gated (`error`, real `minScore` thresholds) since they're deterministic markup/DOM checks. Performance is `warn`-only — the performance *category* score mixes timing metrics that are sensitive to whatever CPU the audit happens to run on, so it's tracked but doesn't block merges without a dedicated, stable runner behind it. Re-run locally anytime with `yarn lighthouse` (both) or `yarn lighthouse:desktop` / `yarn lighthouse:mobile` individually.

---

## Browser Support

Targets are defined by the [`browserslist`](package.json) config and enforced at build time via Autoprefixer/PostCSS.

| Browser | Notes |
|---------|-------|
| Chrome / Edge (Chromium) | ✅ Supported — primary development and testing target |
| Firefox (desktop) | ⚠️ **Not officially supported for now** — noticeable scroll/animation jank (likely `backdrop-filter`/`filter: blur()` compositing cost on the animated background and glass-card surfaces) that hasn't been resolved yet |
| Safari (macOS / iOS) | ⚠️ **Not officially supported for now** — not verified against real hardware; excluded alongside Firefox out of caution rather than a confirmed issue |

Firefox and Safari are explicitly excluded from the `browserslist` targets while this is being worked on, alongside Internet Explorer 11 and Opera Mini. This is a temporary state, not a permanent decision — revisit once the Firefox performance issue is diagnosed and fixed.

---

## Project Structure

```
portfolio/
├── .github/workflows/
│   ├── test.yml                    # Lint + unit tests — the "Tests" badge
│   ├── deploy.yml                  # test → Docker build (GHCR) → SSH deploy
│   └── lighthouse.yml              # Lighthouse CI on push/PR
├── nginx/nginx.conf                # Reverse proxy with security headers and caching
├── Dockerfile                      # Multi-stage build (deps → build → standalone runner)
├── scripts/generate-llms-txt.js    # Generates public/llms.txt post-build
├── public/
│   ├── assets/
│   │   ├── images/                 # Profile photo, section illustrations
│   │   ├── jsons/profile.json      # Name, bio, skills, experience/education data
│   │   └── pdfs/                   # Downloadable CV
│   └── locales/{10 locales}/common.json # Translation files
├── src/
│   ├── components/
│   │   ├── ImageLightbox/          # Fullscreen image preview with zoom toggle
│   │   ├── LoadingScreen/          # Splash overlay shown briefly on first load
│   │   ├── ReactiveBackground/     # Animated canvas background
│   │   └── portfolio/              # Nav, Hero, Architecture, Stack, Languages,
│   │                                #   Projects, Articles, Contact, atoms.tsx
│   ├── contexts/ThemeContext.tsx   # ThemeProvider / useTheme
│   ├── layouts/Meta.tsx            # SEO meta tags (OG, Twitter, canonical, hreflang, JSON-LD)
│   ├── pages/
│   │   ├── [locale]/index.tsx      # Main portfolio page
│   │   ├── articles/[slug].tsx     # Article reader page
│   │   ├── api/articles.ts         # Dev.to articles list endpoint
│   │   ├── api/articles/[slug].ts  # Dev.to single article endpoint
│   │   ├── api/github/repos.ts     # GitHub pinned repos endpoint
│   │   ├── api/wakatime/[stat].ts  # WakaTime stats endpoint
│   │   ├── api/contact.ts          # Contact form email endpoint (Resend)
│   │   ├── index.tsx               # Locale-detecting redirect (SSR)
│   │   ├── _app.tsx                # ThemeProvider, AntD ConfigProvider, analytics
│   │   └── _document.tsx           # Custom HTML document, theme-flash script
│   ├── services/devto.ts           # Dev.to API client and types
│   ├── styles/{global.css,fonts.ts} # Tailwind base, CSS variables, self-hosted fonts
│   └── utils/                      # Helpers (locale, URL builders, formatting)
├── cypress/                        # Cypress E2E suite
├── e2e/                            # Playwright E2E suite
├── next-i18next.config.js          # i18n locale configuration
├── next-sitemap.config.js          # Sitemap + robots.txt generation config
├── tailwind.config.js              # Custom colors, fonts, dark mode config
└── jest.config.js                  # Test configuration
```

---

## Getting Started

### Prerequisites

- Node.js 18.x
- Yarn or npm

### Installation

```bash
git clone https://github.com/lucasheartcliff/portfolio.git
cd portfolio
cp local.env .env   # Copy and edit with your values
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

> For full configuration details (profile data, theming, i18n, Docker, CI/CD) see the **[Configuration Wiki](wiki/CONFIGURATION.md)**.

---

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Create production build (generates sitemap + `llms.txt` post-build) |
| `yarn start` | Start production server |
| `yarn test` | Run Jest unit tests |
| `yarn lint` | Run ESLint |
| `yarn format` | Fix linting and format JSON/YAML with Prettier |
| `yarn check-types` | TypeScript type checking (app + Cypress + Playwright projects) |
| `yarn build-stats` | Analyze bundle size |
| `yarn e2e:headless` | Run Cypress E2E tests (starts dev server automatically) |
| `yarn e2e:playwright` | Run Playwright E2E tests (builds + starts a production server automatically) |
| `yarn lighthouse` | Run Lighthouse CI (build + desktop + mobile) |
| `yarn clean` | Remove `.next` and `out` directories |

---

## Deployment

### Docker (Production)

```bash
docker compose up -d --build
```

This builds and starts both the Next.js app and an Nginx reverse proxy. The app runs on port 3000 internally; Nginx exposes ports 80/443.

`NEXT_PUBLIC_*` env vars (`NEXT_PUBLIC_URL`, `NEXT_PUBLIC_ANALYTICS_ID`, `NEXT_PUBLIC_DEVTO_USERNAME`) are inlined into the client bundle and into statically-generated pages at `next build` time, so they're passed as Docker **build args** (see `Dockerfile` `ARG`/`ENV` block) rather than only supplied at container runtime — a `docker-compose.yml` `env_file` alone has no effect on already-built output.

For manual builds:

```bash
docker build -t portfolio \
  --build-arg NEXT_PUBLIC_URL=https://yourdomain.com \
  .
docker run -p 3000:3000 --env-file .env.local portfolio
```

### CI/CD

- **`.github/workflows/test.yml`** — Install, lint, run unit tests. Runs on push/PR to `main`/`next`; this is the **Tests** badge above.
- **`.github/workflows/deploy.yml`** — Runs on push to `main`/`next`:
  1. **Test** — Install, lint, run unit tests (duplicated from `test.yml` so `build-and-push`/`deploy` can depend on it within the same workflow run)
  2. **Build & Push** — Build Docker image (with `NEXT_PUBLIC_*` build args), push to GitHub Container Registry (GHCR)
  3. **Deploy** — SSH into server, pull latest image, restart with `docker compose`
- **`.github/workflows/lighthouse.yml`** — Runs `yarn lighthouse` (Lighthouse CI) on push/PR to `main`/`next`; this is the **Lighthouse CI** badge above.

---

## Testing

- **Unit Tests**: 91 tests across 19 suites covering components, layouts, and utilities (`src/__tests__`)
- **Configuration**: `jest.config.js` with jsdom environment and path aliases
- **E2E**: Cypress (`cypress/e2e`) and Playwright (`e2e/`), with optional Percy visual regression testing configured for Cypress

```bash
yarn test              # Unit tests
yarn e2e:headless      # Cypress E2E tests
yarn e2e:playwright    # Playwright E2E tests
```

---

## License

MIT - see [LICENSE](LICENSE) for details.

**Author**: Lucas Morais ([@lucasheartcliff](https://github.com/lucasheartcliff))

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Ant Design](https://ant.design/) and [lucide-react](https://lucide.dev/)

---

**⭐ If you find this project useful, please consider giving it a star!**

---

## ☕ Support

If you enjoy this project and want to support my work, consider buying me a coffee!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/lucasheartcliff)
