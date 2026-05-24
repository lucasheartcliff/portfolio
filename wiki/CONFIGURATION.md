# Configuration Wiki

This guide walks you through every configuration file and environment variable needed to set up, customize, and deploy the portfolio.

---

## Table of Contents

- [1. Environment Variables](#1-environment-variables)
- [2. Profile Data](#2-profile-data)
- [3. Internationalization (i18n)](#3-internationalization-i18n)
- [4. Styling & Theming](#4-styling--theming)
- [5. SEO & Sitemap](#5-seo--sitemap)
- [6. Docker & Deployment](#6-docker--deployment)
- [7. CI/CD Pipeline](#7-cicd-pipeline)
- [8. Adding Content](#8-adding-content)

---

## 1. Environment Variables

Copy the template and fill in your values:

```bash
cp local.env.local .env.local
```

### Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_URL` | Yes | Public URL of your site. Used for SEO canonical URLs, OpenGraph tags, and sitemap generation. Example: `https://yourdomain.com` |
| `NEXT_PUBLIC_ANALYTICS_ID` | No | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`). Omit to disable tracking. |
| `NEXT_PUBLIC_DEVTO_USERNAME` | Yes | Your [Dev.to](https://dev.to) username. Used to fetch your published articles for the Articles section. |
| `DEVTO_API_KEY` | No | Dev.to API key. **Only needed if** you want draft article preview in development mode. Generate at [dev.to/settings/extensions](https://dev.to/settings/extensions). |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Yes | Your GitHub username. Used to fetch pinned repositories for the Projects section. |
| `GITHUB_TOKEN` | No | GitHub personal access token (classic) with `public_repo` scope. Improves API rate limits. Generate at [github.com/settings/tokens](https://github.com/settings/tokens). |
| `SMTP_USER` | No | Gmail address for the contact form. Only needed if the Contact section is enabled. |
| `SMTP_PASS` | No | Gmail app password (not your regular password). See [Google App Passwords](https://support.google.com/accounts/answer/185833). |
| `CONTACT_EMAIL` | No | Email address that receives messages from the contact form. |
| `ANALYZE` | No | Set to `true` to enable webpack bundle analyzer when running `yarn build-stats`. |

### Minimal `.env.local` for local development

```env
NEXT_PUBLIC_URL=http://localhost:3000/
NEXT_PUBLIC_DEVTO_USERNAME=your_devto_username
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
```

---

## 2. Profile Data

All personal/professional content is stored in a single JSON file:

```
public/assets/jsons/profile.json
```

### Schema

```jsonc
{
  "firstName": "Your",
  "lastName": "Name",
  "username": "github_username",       // Used for social links and API calls
  "logoTitle": "YourBrand",            // Displayed in the navbar logo
  "introductionBio": "Short intro...", // Hero section paragraph
  "bio": "Longer bio...",              // About section paragraph
  "email": "you@example.com",         // Mailto link and contact form recipient
  "phone": "5500000000000",           // Not currently displayed

  "skills": ["Skill 1", "Skill 2"],   // Not currently displayed visually

  "techStack": {
    "Category Name": ["Tech1", "Tech2"]
    // Category names become section headers
    // Tech names must match devicon identifiers for icons to load
    // See: https://devicon.dev/ for available icon names
  },

  "experience": [
    {
      "title": "Company Name",
      "startDate": "2020-01-01T00:00:00.000Z",
      "endDate": "2024-01-01T00:00:00.000Z",   // Omit for current position
      "description": "Role description...",      // Optional, supports \n line breaks
      "techTags": ["Java", "React"],             // Optional tech pills
      "children": [                              // Optional nested roles
        {
          "title": "Senior Engineer",
          "startDate": "2022-01-01T00:00:00.000Z",
          "description": "...",
          "techTags": ["Java"]
        }
      ]
    }
  ],

  "education": [
    {
      "title": "Degree - Institution",
      "startDate": "2018-01-01T00:00:00.000Z",
      "endDate": "2024-01-01T00:00:00.000Z"
    }
  ],

  "certification": [
    {
      "name": "Certificate Name",
      "platform": "udemy",    // Determines the badge icon ("udemy", "alura", "cisco", etc.)
      "url": "https://...",   // Link to certificate
      "type": "certification" // "certification" or "course" — controls which panel it appears in
    }
  ]
}
```

### Images

Replace the following files in `public/assets/images/`:

| File | Purpose | Recommended Size |
|------|---------|-----------------|
| `profile.jpeg` | Profile photo (About section) | 320×320px, square |
| `cover.png` | Hero illustration (light mode) | 512×480px |
| `cover-dark.png` | Hero illustration (dark mode) | 512×480px |
| `languages.png` / `languages-dark.png` | Languages section decoration | 576×576px |
| `experience.png` / `experience-dark.png` | Experience section decoration | 576×576px |
| `education.png` / `education-dark.png` | Education section decoration | 576×576px |
| `certificate.png` / `certificate-dark.png` | Certifications section decoration | 576×448px |

> Decorative images are hidden on mobile viewports and displayed alongside their respective sections on `md:` breakpoints and above.

### Resume PDF

Replace `public/assets/pdfs/CV ATS Model.pdf` with your own PDF. The download button in the Hero section links to this file.

---

## 3. Internationalization (i18n)

### Configuration

The i18n setup is in `next-i18next.config.js`:

```js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['pt', 'en'],
    localeDetection: true,
  },
};
```

### Translation Files

Located at `public/locales/{locale}/common.json`. Every UI string displayed by the `t()` function must have a key in these files.

**To add a new language:**

1. Add the locale code to the `locales` array in `next-i18next.config.js`
2. Create `public/locales/{locale}/common.json` with all translation keys (copy `en/common.json` as a starting point)
3. Add the locale entry with its flag in `src/components/LanguageSelector/index.tsx`

### What gets translated

- All section headings (About, Experience, Education, etc.)
- Hero subtitle, bio, availability badge, button labels
- Experience descriptions, certification names, timeline labels
- UI elements (Show more, min read, Download CV, etc.)

> **Note**: Articles from Dev.to are fetched in their original language and are **not** translated.

---

## 4. Styling & Theming

### Global CSS

`src/styles/global.css` defines:

- **CSS variables**: `--color-primary` for light and dark modes
- **Link styles**: Primary-colored links with bottom-border hover
- **Prose styles**: Article body typography (headings, paragraphs, code blocks, blockquotes, images, lists)

### Changing the Primary Color

Edit `src/styles/global.css`:

```css
:root {
  --color-primary: #253db6;   /* Light mode */
}
.dark {
  --color-primary: #5c7cfa;   /* Dark mode */
}
```

The primary color is referenced in `tailwind.config.js` as `primary: 'var(--color-primary)'` and can be used anywhere as `text-primary`, `bg-primary`, `border-primary`, etc.

### Tailwind Config

`tailwind.config.js` key settings:

| Setting | Value | Notes |
|---------|-------|-------|
| `darkMode` | `'class'` | Dark mode toggled by `.dark` class on `<html>` |
| `content` | `./src/**/*.{js,ts,jsx,tsx}` | Scans all source files for class names |
| `colors.primary` | `var(--color-primary)` | Dynamic primary color from CSS variables |

### Adding Custom Fonts

1. Add font files to `public/assets/fonts/`
2. Add `@font-face` declaration in `global.css`
3. Add the font family name to `tailwind.config.js → theme.fontFamily`

---

## 5. SEO & Sitemap

### Meta Tags

The `<Meta>` component (`src/layouts/Meta.tsx`) automatically sets:

- `<title>`, `<meta name="description">`
- OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- Canonical URL (when provided)

### Sitemap

`next-sitemap.config.js` runs automatically after `yarn build`:

```js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
};
```

Output: `public/sitemap.xml` and `public/robots.txt`.

### Structured Data

- **Homepage**: JSON-LD `Person` schema with name, job title, email, and social links
- **Article pages**: JSON-LD `Article` schema with headline, description, author, and publish date

---

## 6. Docker & Deployment

### Docker Compose (Recommended)

```bash
# Build and start in background
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

The `docker-compose.yml` defines two services:

| Service | Image | Ports | Notes |
|---------|-------|-------|-------|
| `portfolio` | Built from `Dockerfile` | 3000 (internal) | Reads env from `local.env.local` |
| `nginx` | `nginx:alpine` | 80, 443 | Reverse proxy with `nginx/nginx.conf` |

### Dockerfile

Multi-stage build for minimal image size:

1. **deps** — Install Node.js dependencies
2. **builder** — Build the Next.js app (`yarn build`)
3. **runner** — Standalone Node.js server (no `node_modules`, minimal footprint)

### Nginx

`nginx/nginx.conf` includes:
- Reverse proxy to the Next.js app
- Security headers (X-Frame-Options, CSP, etc.)
- Static asset caching
- Gzip compression

> **Important**: Update `server_name` in `nginx.conf` with your domain before deploying.

### Manual Docker Build

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.local portfolio
```

---

## 7. CI/CD Pipeline

### GitHub Actions

`.github/workflows/deploy.yml` triggers on push to `main` or `next` branches:

| Stage | Steps |
|-------|-------|
| **Test** | `yarn install` → `yarn lint` → `yarn test` |
| **Build** | Build Docker image → Push to GitHub Container Registry (GHCR) |
| **Deploy** | SSH into server → Pull latest image → `docker compose up -d` |

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `GHCR_TOKEN` | GitHub token with `write:packages` scope for pushing Docker images |
| `DEPLOY_HOST` | Server IP or hostname |
| `DEPLOY_USER` | SSH username |
| `DEPLOY_KEY` | SSH private key for authentication |

### Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production deployment |
| `next` | Staging/preview deployment |

---

## 8. Adding Content

### Adding a New Experience Entry

Edit `public/assets/jsons/profile.json` → `experience` array. For a company with multiple roles, use `children`:

```json
{
  "title": "Company Name",
  "startDate": "2024-01-01T00:00:00.000Z",
  "children": [
    {
      "title": "Senior Role",
      "startDate": "2025-01-01T00:00:00.000Z",
      "description": "What you did...",
      "techTags": ["Java", "React"]
    },
    {
      "title": "Mid-level Role",
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2025-01-01T00:00:00.000Z",
      "description": "What you did...",
      "techTags": ["Java"]
    }
  ]
}
```

### Adding a New Certification

Add to the `certification` array in `profile.json`:

```json
{
  "name": "AWS Certified Solutions Architect",
  "platform": "aws",
  "url": "https://link-to-certificate",
  "type": "certification"
}
```

### Adding a Tech Stack Category

Add a new key to the `techStack` object in `profile.json`:

```json
{
  "techStack": {
    "Mobile": ["Flutter", "React Native", "Swift"]
  }
}
```

Technology names must match [devicon](https://devicon.dev/) identifiers for icons to render.

### Articles

Articles are automatically fetched from Dev.to based on your `NEXT_PUBLIC_DEVTO_USERNAME`. No manual configuration needed. Articles published within the last 30 days automatically display a **"New"** badge.

### Projects

Projects are automatically fetched from your GitHub pinned repositories. Pin the repos you want to showcase on your GitHub profile.
