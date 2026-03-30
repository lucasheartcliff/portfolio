# Portfolio

A personal portfolio website built with Next.js 13, TypeScript, and Tailwind CSS. Showcases professional experience, technical skills, certifications, articles, and open-source projects with bilingual support (English and Portuguese).

**Live**: [lucasheartcliff.com.br](https://lucasheartcliff.com.br)

---

## Features

### Page Sections

- **Hero** — Name, animated rotating role titles (Framer Motion), social links (GitHub, LinkedIn, Email), availability badge, and downloadable PDF resume
- **About** — Professional summary with profile photo
- **Languages** — Interactive horizontal bar chart (ApexCharts) showing programming language experience time sourced from WakaTime
- **Tech Stack** — Grid of technologies organized by category (Backend, Frontend, Database, DevOps, Infrastructure) with devicon images
- **Experience** — Collapsible career timeline with company grouping, date ranges, duration calculation, tech tag pills, and scrollable overflow
- **Education** — Same timeline format for academic background
- **Certifications** — Collapsible panels separating certifications and courses, with platform badges and external links
- **Articles** — Dev.to article cards sorted newest-first with tags, reading time, publish date, and a **"New" badge** for articles published within the last 30 days. Section auto-hides when no articles are available
- **Projects** — GitHub pinned repository cards with language, stars, forks, description, and topic tags. Paginated with "Show more" button. Section auto-hides when no repos are available
- **Contact** — Form with name, email, subject, and message fields. Sends email via Nodemailer (SMTP/Gmail). Rate-limited by IP. Currently hidden, ready to enable

### Article Reader

Dedicated page (`/articles/[slug]`) that fetches and renders full Dev.to articles as Markdown with:
- Auto-generated aside navigation from article headings
- Cover image, tags, reading time, and publish date
- **Image lightbox** — Click any image (including the cover) to expand it in a fullscreen overlay with zoom toggle, Escape/click-outside to close
- **Font size controls** — −/+ stepper buttons (12px–28px, default 22px) with localStorage persistence for reader preference
- Justified text for improved readability
- JSON-LD structured data for SEO
- Draft preview support in development mode

### UI/UX

- **Dark Mode** — Toggle in navbar, persisted in localStorage, respects system `prefers-color-scheme`, applies Tailwind `dark:` classes and Ant Design dark algorithm
- **Scroll Animations** — `Reveal` component wraps sections with Framer Motion fade-in + slide-up triggered on scroll (viewport intersection, fires once)
- **Scroll-to-Top Button** — Appears after 300px scroll, smooth scrolls to top
- **Aside Navigation** — Collapsible side panel with section links, scroll-spy active state highlighting, and smooth scroll-to-section
- **Loading Screen** — Animated splash screen with spinner and name on initial page load
- **Custom Scrollbar** — `react-custom-scrollbars-2` with styled vertical track, hidden horizontal track
- **Responsive Design** — Mobile-first layout using Tailwind breakpoints, hidden decorative images on mobile

### Internationalization

- **Languages**: English (default), Portuguese
- **Framework**: next-i18next with `public/locales/{en,pt}/common.json`
- **Routing**: URL-based (`/en`, `/pt`) with automatic browser language detection
- **Coverage**: All UI strings, section titles, role names, experience descriptions, certifications, and form labels

### Integrations

| Service | Purpose | API Route |
|---------|---------|-----------|
| **Dev.to** | Fetch published articles (and drafts in dev) | `/api/articles`, `/api/articles/[slug]` |
| **GitHub** | Fetch pinned repositories via berrysauce API | `/api/github/repos` |
| **WakaTime** | Fetch coding time and language stats | `/api/wakatime/[stat]` (languages, coding-time, activity, editors, code-activity) |
| **Nodemailer** | Send contact form emails via SMTP | `/api/contact` |
| **Google Analytics** | Page tracking via `@next/third-parties` | Configured in `_app.tsx` |

### SEO

- `next-sitemap` auto-generates `sitemap.xml` and `robots.txt` post-build
- `<Meta>` component sets OpenGraph and Twitter Card tags per page
- JSON-LD structured data for Person (homepage) and Article (article pages)
- Canonical URL support for articles

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 13 (Pages Router), React 18, TypeScript |
| **Styling** | Tailwind CSS 3, Ant Design 5 |
| **Animations** | Framer Motion |
| **Charts** | ApexCharts (react-apexcharts) |
| **Markdown** | react-markdown |
| **i18n** | next-i18next, react-i18next, i18next |
| **Scrolling** | react-custom-scrollbars-2 |
| **Email** | Nodemailer |
| **Analytics** | Google Analytics (@next/third-parties) |
| **Testing** | Jest, React Testing Library, Cypress |
| **Linting** | ESLint (Airbnb TypeScript), Prettier, eslint-plugin-tailwindcss |
| **Git Hooks** | Husky, lint-staged, Commitlint (Conventional Commits) |
| **Build** | Next.js compiler, @next/bundle-analyzer |
| **Deployment** | Docker (multi-stage), Nginx reverse proxy, GitHub Actions CI/CD |

---

## Project Structure

```
portfolio/
├── .github/workflows/deploy.yml   # CI/CD: test → Docker build → SSH deploy
├── nginx/nginx.conf                # Reverse proxy with security headers and caching
├── Dockerfile                      # Multi-stage build (deps → build → standalone runner)
├── public/
│   ├── assets/
│   │   ├── images/                 # Profile photo, section illustrations
│   │   ├── jsons/profile.json      # Experience, education, certifications, tech stack data
│   │   └── pdfs/                   # Downloadable CV
│   └── locales/{en,pt}/common.json # Translation files
├── src/
│   ├── components/
│   │   ├── ArticleCard/            # Dev.to article card with cover, tags, reading time, "New" badge
│   │   ├── ImageLightbox/          # Fullscreen image preview with zoom toggle
│   │   ├── ArticleGrid/            # Responsive article grid
│   │   ├── AsideNav/               # Collapsible side navigation with scroll spy
│   │   ├── CertificateCard/        # Certification entry with platform badge
│   │   ├── ContactForm/            # Email contact form
│   │   ├── DarkModeToggle/         # Sun/moon toggle button
│   │   ├── Footer/                 # "Made with ❤ by" footer
│   │   ├── Icon/                   # Colored background icon wrapper
│   │   ├── LanguageChart/          # ApexCharts horizontal bar chart
│   │   ├── LanguageSelector/       # Dropdown with flag icons
│   │   ├── Link/                   # Locale-aware link and SocialLink
│   │   ├── LoadingScreen/          # Animated splash screen
│   │   ├── logo/                   # <Logo /> angle-bracket title
│   │   ├── Navbar/                 # Sticky top bar with logo, language, dark mode
│   │   ├── ProjectCard/            # GitHub repo card with stats
│   │   ├── ProjectGrid/            # Paginated project grid
│   │   ├── Reveal/                 # Scroll-triggered Framer Motion animation
│   │   ├── Scroll/                 # Custom scrollbar wrapper
│   │   ├── ScrollToTopButton/      # Floating back-to-top button
│   │   ├── TechStack/              # Tech category grid with devicons
│   │   ├── Timeline/               # Collapsible parent-child timeline
│   │   ├── Timeline/Item/          # Timeline entry with duration and tech tags
│   │   └── TypedRole/              # Animated rotating role titles
│   ├── layouts/
│   │   ├── Block.tsx               # Flex section block
│   │   ├── Meta.tsx                # SEO meta tags (OG, Twitter, canonical)
│   │   └── Row.tsx                 # Responsive row wrapper
│   ├── pages/
│   │   ├── [locale]/index.tsx      # Main portfolio page
│   │   ├── [locale]/articles/[slug].tsx # Article reader page
│   │   ├── api/articles.ts         # Dev.to articles list endpoint
│   │   ├── api/articles/[slug].ts  # Dev.to single article endpoint
│   │   ├── api/github/repos.ts     # GitHub pinned repos endpoint
│   │   ├── api/wakatime/[stat].ts  # WakaTime stats endpoint
│   │   ├── api/contact.ts          # Contact form email endpoint
│   │   ├── _app.tsx                # DarkModeContext, ConfigProvider, GA
│   │   └── _document.tsx           # Custom HTML document
│   ├── services/devto.ts           # Dev.to API client and types
│   ├── styles/global.css           # Tailwind base, CSS variables, prose styling
│   ├── templates/Main.tsx          # Main layout (Navbar + Scroll + ScrollToTop)
│   └── utils/                      # Helpers (locale, URL builders, formatting)
├── next-i18next.config.js          # i18n locale configuration
├── next-sitemap.config.js          # Sitemap generation config
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

> For full configuration details see the **[Configuration Wiki](wiki/CONFIGURATION.md)**.

> For full configuration details (profile data, theming, i18n, Docker, CI/CD) see the **[Configuration Wiki](wiki/CONFIGURATION.md)**.

---

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Create production build (generates sitemap post-build) |
| `yarn start` | Start production server |
| `yarn test` | Run Jest unit tests |
| `yarn lint` | Run ESLint |
| `yarn format` | Fix linting and format JSON/YAML with Prettier |
| `yarn check-types` | TypeScript type checking |
| `yarn build-stats` | Analyze bundle size |
| `yarn e2e` | Run Cypress E2E tests (starts dev server) |
| `yarn e2e:headless` | Run Cypress E2E tests in headless mode |
| `yarn clean` | Remove `.next` and `out` directories |

---

## Deployment

### Docker (Production)

```bash
docker compose up -d --build
```

This builds and starts both the Next.js app and an Nginx reverse proxy. The app runs on port 3000 internally; Nginx exposes ports 80/443.

For manual builds:

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.local portfolio
```

### CI/CD

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on push to `main`/`next`:

1. **Test** — Install, lint, run unit tests
2. **Build & Push** — Build Docker image, push to GitHub Container Registry (GHCR)
3. **Deploy** — SSH into server, pull latest image, restart with `docker compose`

---

## Testing

- **Unit Tests**: 122 tests across 32 suites covering all components, layouts, and utilities
- **Configuration**: `jest.config.js` with jsdom environment and path aliases
- **E2E**: Cypress with optional Percy visual regression testing

```bash
yarn test              # Unit tests
yarn e2e:headless      # E2E tests
```

---

## License

MIT - see [LICENSE](LICENSE) for details.

**Author**: Lucas Morais ([@lucasheartcliff](https://github.com/lucasheartcliff))

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts powered by [ApexCharts](https://apexcharts.com/)
- Icons from [Ant Design](https://ant.design/)

---

**⭐ If you find this project useful, please consider giving it a star!**

---

## ☕ Support

If you enjoy this project and want to support my work, consider buying me a coffee!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/lucasheartcliff)
