# Portfolio Improvement Plan — lucasheartcliff.com.br
**Document version:** 1.2  
**Author:** Lucas Morais  
**Goal:** Transform the current portfolio into a senior-level, internationally-positioned personal brand site, with a fully functional Articles feature powered by Dev.to API mirroring, SEO-optimized canonical rendering, and full Docker containerization for portable deployment via `docker pull` or `docker compose`.

---

## Table of Contents

1. [Context & Current State](#1-context--current-state)
2. [Overall Objectives](#2-overall-objectives)
3. [Section 1 — Hero Section Overhaul](#3-section-1--hero-section-overhaul)
4. [Section 2 — Tech Stack / Skills Section](#4-section-2--tech-stack--skills-section)
5. [Section 3 — Projects Section Expansion](#5-section-3--projects-section-expansion)
6. [Section 4 — Articles Feature (Core Feature)](#6-section-4--articles-feature-core-feature)
7. [Section 5 — Certifications Curation](#7-section-5--certifications-curation)
8. [Section 6 — Experience Section Update](#8-section-6--experience-section-update)
9. [Design System Improvements](#9-design-system-improvements)
10. [SEO Strategy](#10-seo-strategy)
11. [Content Fixes](#11-content-fixes)
12. [Containerization & Docker Deployment](#12-containerization--docker-deployment)
13. [Implementation Order & Priorities](#13-implementation-order--priorities)

---

## 1. Context & Current State

The portfolio at `lucasheartcliff.com.br` is a **Next.js 13 (Pages Router)** application integrating a robust modern stack (**TypeScript, Tailwind CSS, Ant Design, `next-i18next`, Storybook, Cypress, Jest, and Husky/Semantic-Release**). It features the following existing sections:

- **About** — Bio, photo, social links (GitHub, WhatsApp, LinkedIn, Email, CV download)
- **Languages** — WakaTime-powered bar chart showing hours per language
- **Experiences** — Timeline of roles at Intelie and Grupo Fratelli
- **Educations** — Computer Science BS (UERJ) and IT Technical Education (IEPB)
- **Certifications** — List of Udemy/Alura courses with external links
- **Projects** — Three GitHub repos pulled automatically (Crypt Image, Centralized Data Persistence, Portfolio)

### What's missing or weak

- No hero section with a strong hook
- No tech stack/frameworks section (only raw language hours)
- Projects show no descriptions, context, or visuals
- No articles or blog feature
- No dark mode
- No scroll animations or micro-interactions
- No SEO optimization beyond basic meta tags
- Justified text alignment hurts mobile readability
- Title "Mid-level Software Developer" contradicts 9 years of experience
- Typo: "Techinical" in Education section
- WhatsApp contact is inappropriate for international audiences

---

## 2. Overall Objectives

1. Position Lucas as a **Senior Software Engineer** targeting international remote contracts
2. Make the portfolio a living, regularly updated site through the Articles feature
3. Improve SEO so the domain builds long-term authority
4. Elevate the visual design to match the quality of a senior-level candidate
5. Ensure all content is professional, accurate, and English-first
6. Make the portfolio fully containerized and deployable via `docker pull` or `docker compose up` — both as a personal DevOps showcase and for portability across environments

---

## 3. Section 1 — Hero Section Overhaul

### What to build

Replace the current flat About section with a proper full-viewport hero. This is the first thing every recruiter sees and must create an immediate strong impression.

### Required elements

- **Large name display** — "Lucas Morais" in a bold, high-contrast heading (H1, largest font size on the page)
- **Dynamic typed role** — A text cycling animation (using a library like `typed.js` or a simple CSS/React implementation) that rotates through:
  - `Backend Engineer`
  - `Microservices Architect`
  - `Java & Spring Boot Specialist`
  - `Full-Stack Developer`
- **Short positioning statement** — One concise sentence below the typed role. Example: *"9 years building scalable systems, modernizing legacy platforms, and designing backend architecture that drives operational efficiency."*
- **Profile photo** — Properly composed, fully visible (not cropped), with a subtle styled container (rounded, with a thin blue border or glow effect matching brand color)
- **CTA buttons** — Two visible action buttons:
  - Primary: `View Projects` (scrolls to Projects section)
  - Secondary: `Download CV` (same as existing CV download)
- **Social links row** — GitHub, LinkedIn, Email icons. Remove WhatsApp. Add a plain text or mailto link instead for international audiences.
- **Availability badge** — A small green pulsing dot + text: `Open to international remote opportunities`. This is a strong signal for recruiters landing on the page.

### Technical notes

- The hero should be `min-height: 100vh` on desktop, with content vertically centered
- On mobile, the photo should appear above the text, not beside it
- The brand blue (extracted from the logo) should be used as the accent color for the CTA button and typed text cursor

---

## 4. Section 2 — Tech Stack / Skills Section

### What to build

A new dedicated section placed between Languages and Experiences. The WakaTime chart stays as-is but represents only coding hours — this new section represents actual professional stack competency.

### Structure

Organize into four categories displayed as horizontal groups with technology icons and labels:

**Backend**
- Java, Spring Boot, Spring WebFlux, Hibernate, JUnit, Mockito, Python, Node.js

**Frontend**
- React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS

**Data & Messaging**
- PostgreSQL, MySQL, Aurora, DynamoDB, Kafka, Redis

**Cloud & Infrastructure**
- AWS (EKS, EC2, S3, CloudWatch), Docker, Kubernetes, Git, Linux

### Visual design

- Use `devicons` or `simple-icons` React libraries for official technology SVG icons
- Group each category with a subtle label above
- On hover, each icon should show the technology name in a tooltip
- Do NOT use progress bars or percentage scores — these are considered amateurish for senior roles as they imply subjective self-rating

---

## 5. Section 3 — Projects Section Expansion

### What to build

Keep the GitHub API integration for live data (stars, forks, language) but dramatically expand each project card.

### New card structure per project

Each project card must contain:

1. **Title** — Same as repo name
2. **Description** — 2–3 sentences explaining: what problem it solves, what the core technical approach is, and what makes it notable. This must be written manually and stored as local content in the codebase (not pulled from GitHub repo description, which is usually too short).
3. **Tech stack tags** — Small colored pill tags for each major technology used (e.g., `Java`, `Spring Boot`, `PostgreSQL`)
4. **GitHub stats row** — Stars and forks (keep existing)
5. **Action links** — `View on GitHub` button. If a live demo exists, add `Live Demo` as a second button.
6. **Architecture diagram (optional but recommended)** — For the Centralizer project, embed a simple SVG or image diagram showing the pattern. This is a major differentiator.

### Projects to feature and their descriptions

**Centralized Data Persistence (Centralizer)**
> A design pattern implementation for centralizing data persistence logic across microservices. Built to solve the problem of duplicated persistence code and inconsistent transaction handling in distributed Java systems. Currently under intellectual property registration with INPI (Brazil's patent office). Stack: Java, Spring Boot, JPA/Hibernate.

**Crypt Image**
> A Python tool for encrypting and steganographically embedding data within image files. Demonstrates knowledge of cryptographic principles and binary data manipulation. Stack: Python.

**Portfolio**
> This portfolio website itself, built with TypeScript and React. A living project that reflects current front-end development practices and design decisions. Stack: TypeScript, React.

### Layout change

Move from a flat list to a **card grid** (2 columns on desktop, 1 on mobile). Cards should have a subtle border, hover shadow elevation, and a top accent bar in the language color.

---

## 6. Section 4 — Articles Feature (Core Feature)

This is the most important new feature to implement. Below is the full technical and content specification.

### 6.1 — Publishing Strategy

Lucas will write articles on **Dev.to** as the primary platform (`dev.to/lucasheartcliff`). Articles will be cross-posted to **Hashnode** using its built-in auto-import feature. Portuguese-language articles targeting the Brazilian market can be manually cross-posted to **Tabnews**.

Medium is explicitly excluded due to its paywall model hurting SEO discoverability.

### 6.2 — SEO Canonical Strategy

**Goal:** The portfolio domain (`lucasheartcliff.com.br`) should receive the SEO authority, not Dev.to.

**Implementation:**

- Each article published on Dev.to must have its **canonical URL** set to the corresponding article page on the portfolio:
  - Example: `https://lucasheartcliff.com.br/articles/centralizer-pattern-microservices`
- The portfolio must render the **full article content** at that URL (not just a link out to Dev.to)
- Dev.to provides the full article body as HTML via its API — this content is rendered server-side or statically on the portfolio
- A `rel="canonical"` meta tag must be present in the `<head>` of each article page pointing to itself
- A `<meta name="robots" content="index, follow">` tag must be present

This way, Google indexes the portfolio domain as the original source, and Dev.to acts as a distribution channel.

### 6.3 — Dev.to API Integration

**Base URL:** `https://dev.to/api`

**Endpoints to use:**

```
GET https://dev.to/api/articles?username={username}&per_page=10
```

Returns an array of article objects. Each object contains:

```json
{
  "id": 12345,
  "title": "The Centralizer Pattern for Microservices",
  "description": "A short excerpt...",
  "published_at": "2025-06-01T12:00:00Z",
  "tag_list": ["java", "microservices", "architecture"],
  "reading_time_minutes": 8,
  "cover_image": "https://dev.to/...",
  "canonical_url": "https://lucasheartcliff.com.br/articles/...",
  "body_html": "<full article HTML content>",
  "url": "https://dev.to/lucasheartcliff/..."
}
```

**For individual article full content:**

```
GET https://dev.to/api/articles/{id}
```

Returns the same object with `body_html` populated — the full rendered HTML of the article.

**No API key is required** for fetching public articles from a public profile.

### 6.4 — Frontend Implementation

#### Articles list page (`/articles` or section on homepage)

- Fetch all articles from Dev.to API at build time using Next.js `getStaticProps` (or `getServerSideProps` for real-time), leveraging the existing `next-i18next` integration for language routing.
- Display as a **card grid** (2 columns desktop, 1 column mobile) using Tailwind CSS and Ant Design (`antd`) Card components.
- Each card contains:
  - Cover image (fallback to a branded placeholder with the portfolio's blue if no cover image exists)
  - Title (H3, bold)
  - Short description/excerpt (2 lines max, truncated with ellipsis)
  - Tags — rendered as small pill badges with subtle colors
  - Reading time — e.g., `8 min read`
  - Published date — formatted as `Jun 1, 2025`
  - A subtle `dev.to` source badge in the bottom right corner of the card
- Clicking a card navigates to the full article page at `/articles/{slug}`

#### Individual article page (`src/pages/articles/[slug].tsx`)

- Implement dynamic routing via Next.js `getStaticPaths` and `getStaticProps` in the Pages Router setup.
- Fetch the article from Dev.to API during server-side static generation.
- Render the `body_html` content inside a styled prose container (e.g., using the Tailwind Typography plugin `@tailwindcss/typography`).
  - Apply custom CSS to the prose container for consistent typography: font size, line height, code block styling, heading hierarchy, blockquote styling
- Page `<head>` must include:
  - `<title>{article title} | Lucas Morais</title>`
  - `<meta name="description" content="{article description}">`
  - `<link rel="canonical" href="https://lucasheartcliff.com.br/articles/{slug}">`
  - Open Graph tags: `og:title`, `og:description`, `og:image` (cover image), `og:url`
  - Twitter card tags
- Below the article content, render:
  - **Author card** — small section with photo, name, and one-liner bio with LinkedIn link
  - **"Read more on Dev.to"** link — secondary CTA, not primary
  - **Related articles** — 2–3 cards from the same tags

#### Caching strategy

- Cache the articles list response in `localStorage` with a TTL of 1 hour to avoid hitting the Dev.to API on every page load
- On cache miss or expiry, refetch from the API
- Show a skeleton loading state (animated placeholder cards) while fetching

### 6.5 — Content Plan: First 5 Articles to Write

These are recommended first articles based on Lucas's existing experience and knowledge. Writing these will immediately give the articles section real content and improve discoverability for relevant technical searches.

| # | Title | Platform | Language | Target Audience |
|---|-------|----------|----------|-----------------|
| 1 | The Centralizer Pattern: Solving Data Persistence Duplication in Microservices | Dev.to + Hashnode | English | International senior devs |
| 2 | Building a Gmail AI Organizer with n8n and Gemini | Dev.to + Hashnode | English | Automation / AI audience |
| 3 | 6 Years at the Same Company: What I Learned About Legacy System Modernization | Dev.to | English | Career / engineering culture |
| 4 | Reactive Programming with Spring WebFlux: Lessons from Production | Dev.to + Hashnode | English | Java / backend devs |
| 5 | Como trabalhar como PJ para empresas internacionais sendo brasileiro | Tabnews + Dev.to | Portuguese | Brazilian dev community |

---

## 7. Section 5 — Certifications Curation

### What to change

Split the current flat Certifications list into two separate subsections:

**Certifications** (keep, rename if needed)
- Unit Tests in Java — JUnit, Mockito and TDD
- Java Multithreading, Concurrency & Performance
- Any AWS or architecture-related certificates obtained in the future

**Courses** (demote visually or collapse by default)
- Communication: How to express yourself
- Oratory 1 & 2
- Vim Masterclass
- Python 3 Basics
- Learn Rust By Building Real Applications

The Courses subsection should be collapsed by default with a "Show all courses" toggle, so it doesn't visually compete with the high-signal certifications.

---

## 8. Section 6 — Experience Section Update

### What to change

- Update the current role title from **"Mid-level Software Developer"** to **"Senior Software Engineer"** or **"Software Engineer"** at minimum
- Each role entry, when expanded (the `>` arrow is already there), must show:
  - A 2–3 sentence description of responsibilities and achievements
  - Key technologies used in that role as tags
  - At least one quantifiable achievement if possible (e.g., "Reduced deployment time by X%", "Led migration of Y services to microservices architecture")
- The Grupo Fratelli entry should be fully fleshed out as well, not just a collapsed name

---

## 9. Design System Improvements

### Color

- Since the project uses **Tailwind CSS** and **Ant Design (`antd`)**, configure the brand color in `tailwind.config.js` (`theme.extend.colors`) and Ant Design's `ConfigProvider`.
- Extract the exact blue from the signature logo: e.g., `brand-blue: #3B3FF5`.
- Use this configured brand color consistently for: link hover states, section accent lines, button backgrounds, tag borders, active nav item, card top borders.
- All other accent colors currently on the page (Udemy purple, Alura teal) should be de-emphasized or replaced with the brand blue for visual consistency.

### Typography

- Fix `text-align: justify` → `text-align: left` everywhere (use Tailwind's `.text-left` utility), especially in the bio.
- Establish a clear type scale configuring `tailwind.config.js`:
  - H1: Hero name — largest, heaviest (`text-5xl` or similar)
  - H2: Section titles — consistent size and weight across all sections
  - H3: Card/item titles
  - Body: `text-base`, `leading-relaxed` for readability
- The bio and article prose should use a slightly warmer/softer body font if possible, configured via Tailwind.

### Dark Mode

> ⚠️ Dark mode implementation has been moved to a dedicated document: **`portfolio-dark-mode-plan.md`**. See that file for the full specification including color tokens, illustration handling, and component-level implementation details.

### Animations & Interactions

- Section titles should have a subtle **fade-up on scroll** reveal (use `IntersectionObserver` or a library like `framer-motion`)
- Project and article cards should have a **hover elevation** effect: `box-shadow` transition + slight `translateY(-4px)`
- The typed role text in the hero should have a realistic typing cursor animation
- Page transitions between routes (especially to article pages) should have a subtle fade

### Spacing

- Define a consistent spacing scale (multiples of 8px)
- Remove the large dead zone at the bottom of the Education section
- Ensure section padding is consistent: minimum `80px` top and bottom on desktop, `48px` on mobile

---

## 10. SEO Strategy

### Technical SEO

- Each page/route must have unique `<title>` and `<meta name="description">` tags
- Implement `react-helmet` or `@tanstack/react-router` meta management for dynamic head tags
- Add a `sitemap.xml` that includes all article URLs (regenerated when new articles are fetched)
- Add a `robots.txt` allowing all crawlers
- Ensure the site is fully rendered for crawlers — if it remains a pure CSR (client-side rendered) React SPA, consider migrating to Next.js or adding SSR/SSG for article pages specifically, as Google can struggle with CSR content for indexing

### Structured Data

Add JSON-LD structured data to article pages:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{article title}",
  "author": {
    "@type": "Person",
    "name": "Lucas Morais",
    "url": "https://lucasheartcliff.com.br"
  },
  "datePublished": "{published_at}",
  "image": "{cover_image}",
  "url": "https://lucasheartcliff.com.br/articles/{slug}"
}
```

Also add `Person` structured data on the homepage.

### Open Graph & Social Sharing

Every page must have full OG tags so links shared on LinkedIn, Twitter/X, and WhatsApp render rich previews:

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:url" content="..." />
<meta property="og:type" content="article" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 11. Content Fixes

These are small but important fixes that must be applied before any sharing or job applications:

| Location | Current | Fix |
|----------|---------|-----|
| Education section | "IT Techinical Education" | "IT Technical Education" |
| Experience section | "Mid-level Software Developer" | "Senior Software Engineer" |
| Contact icons | WhatsApp icon present | Remove WhatsApp; keep GitHub, LinkedIn, Email |
| Bio text | `text-align: justify` | `text-align: left` |
| Nav menu | "Educations" | "Education" (remove plural) |
| Nav menu | "Experiences" | "Experience" (remove plural) |

---

## 12. Containerization & Docker Deployment

The portfolio runs on **Next.js**, which has first-class support for Docker via its standalone output mode. The goal is to produce a production-ready Docker image that can be pulled from a public registry and run with a single command, and a `docker-compose.yml` for local development and self-hosted deployment.

This section also serves as a subtle portfolio signal: a senior engineer who ships their own site as a proper containerized artifact demonstrates real DevOps awareness.

---

### 12.1 — Next.js Standalone Output Configuration

Next.js must be configured to produce a standalone build, which bundles only the necessary files for production without requiring `node_modules` at runtime. This dramatically reduces the final image size.

In `next.config.js`, add the following (ensure you keep the existing `i18n` config from `next-i18next`, as standalone mode works correctly with it but requires manual copy of `next-i18next.config.js` in the Dockerfile):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // keep existing config, especially i18n
};

module.exports = nextConfig;
```

The standalone build outputs to `.next/standalone/`, which contains a self-contained Node.js server (`server.js`) and only the necessary dependencies. Static assets from `.next/static/` and the `public/` folder must be copied alongside it manually — this is handled in the Dockerfile.

---

### 12.2 — Dockerfile

The Dockerfile must follow a **multi-stage build** pattern to keep the final image small and production-safe. Three stages are used: dependency installation, build, and the final runtime image.

```dockerfile
# ─── Stage 1: Install dependencies ───────────────────────────────────────────
FROM node:20-alpine AS deps

# Install libc compatibility for Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files first for layer caching
COPY package.json package-lock.json* ./

# Install only production-relevant deps for the build
RUN npm ci

# ─── Stage 2: Build the Next.js application ───────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy installed dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy entire source
COPY . .

# Set environment to production for the build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run the Next.js build — produces .next/standalone output
RUN npm run build

# ─── Stage 3: Production runtime image ────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security best practices
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only what's needed to run the app
COPY --from=builder /app/public ./public

# Set correct permissions for Next.js cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output and static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the default Next.js port
EXPOSE 3000

# Set hostname to allow external access inside Docker
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the standalone Next.js server
CMD ["node", "server.js"]
```

**Why multi-stage?**
- The `deps` and `builder` stages contain all dev tooling, source code, and node_modules — none of which belong in production
- The final `runner` stage is a clean Alpine image with only ~30–50MB of application files
- Running as a non-root user (`nextjs`) is a security requirement for any production container

---

### 12.3 — .dockerignore

A `.dockerignore` file must exist at the project root to prevent unnecessary files from being sent to the Docker build context, speeding up builds significantly:

```
.git
.gitignore
.env*.local
node_modules
.next
out
README.md
Dockerfile
docker-compose*.yml
.dockerignore
*.log
.DS_Store
coverage
```

---

### 12.4 — Environment Variables Strategy

Next.js distinguishes between two types of environment variables:

- **Build-time variables** (prefixed with `NEXT_PUBLIC_`) — baked into the JavaScript bundle at build time. These are safe to expose in the browser.
- **Server-side variables** (no prefix) — only available in server-side code (API routes, `getServerSideProps`, Server Components). Never exposed to the client.

For this portfolio, the following environment variables must be defined:

| Variable | Type | Description |
|----------|------|-------------|
| `NEXT_PUBLIC_DEVTO_USERNAME` | Build-time | Dev.to username for API fetching (e.g. `lucasheartcliff`) |
| `NEXT_PUBLIC_SITE_URL` | Build-time | Full canonical base URL (e.g. `https://lucasheartcliff.com.br`) |
| `NEXT_PUBLIC_WAKATIME_API_KEY` | Build-time | WakaTime API key for the languages chart (if used client-side) |
| `WAKATIME_API_KEY` | Server-side | WakaTime key if fetched via a Next.js API route instead |

**Local development:** create a `.env.local` file at the project root (never committed to git):

```env
NEXT_PUBLIC_DEVTO_USERNAME=lucasheartcliff
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WAKATIME_API_KEY=your_key_here
```

**Docker runtime:** environment variables must be passed at `docker run` time or defined in `docker-compose.yml`. They must NOT be hardcoded into the Dockerfile or committed to the repository.

**Important:** because `NEXT_PUBLIC_*` variables are baked in at build time, if you need different values per environment (e.g. different `SITE_URL` for staging vs production), you must build separate images per environment, or use a runtime injection approach (advanced — document if needed).

---

### 12.5 — docker-compose.yml

A `docker-compose.yml` at the project root enables running the full stack with a single command: `docker compose up`. This is useful for local testing of the production build and for self-hosted deployment on a VPS.

```yaml
version: '3.8'

services:
  portfolio:
    # For local development: build from source
    build:
      context: .
      dockerfile: Dockerfile
    # For pulling from registry instead, comment out 'build' above and use:
    # image: lucasheartcliff/portfolio:latest
    container_name: portfolio
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - NEXT_PUBLIC_DEVTO_USERNAME=lucasheartcliff
      - NEXT_PUBLIC_SITE_URL=https://lucasheartcliff.com.br
      # Do not hardcode sensitive keys here — use a .env file reference instead:
      # env_file:
      #   - .env.production
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 15s
```

**To run locally (build from source):**
```bash
docker compose up --build
```

**To run from the published image:**
```bash
# Edit docker-compose.yml to use image: instead of build:
docker compose up
```

---

### 12.6 — Publishing to Docker Hub (or GitHub Container Registry)

The image must be published to a public registry so anyone can run the portfolio with `docker pull lucasheartcliff/portfolio`.

#### Option A: Docker Hub

1. Create a Docker Hub account at `hub.docker.com` with username `lucasheartcliff`
2. Create a public repository named `portfolio`
3. Build and push manually:

```bash
# Build the image with a versioned tag and a latest tag
docker build -t lucasheartcliff/portfolio:latest -t lucasheartcliff/portfolio:1.0.0 .

# Push both tags
docker push lucasheartcliff/portfolio:latest
docker push lucasheartcliff/portfolio:1.0.0
```

#### Option B: GitHub Container Registry (ghcr.io) — Recommended

Since the portfolio source is already on GitHub, GHCR is the more integrated option. The image lives alongside the code.

```bash
# Authenticate with GitHub token
echo $GITHUB_TOKEN | docker login ghcr.io -u lucasheartcliff --password-stdin

# Build and tag for GHCR
docker build -t ghcr.io/lucasheartcliff/portfolio:latest .

# Push
docker push ghcr.io/lucasheartcliff/portfolio:latest
```

The public pull command becomes:
```bash
docker pull ghcr.io/lucasheartcliff/portfolio:latest
```

---

### 12.7 — GitHub Actions CI/CD Pipeline

Automate the build and push process with a GitHub Actions workflow. Every push to `main` should trigger: lint → build → Docker image build → push to registry → (optionally) deploy to VPS.

Create the file `.github/workflows/deploy.yml`:

```yaml
name: Build & Deploy Portfolio

on:
  push:
    branches:
      - main

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    name: Build Docker image and push to GHCR
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          build-args: |
            NEXT_PUBLIC_DEVTO_USERNAME=lucasheartcliff
            NEXT_PUBLIC_SITE_URL=https://lucasheartcliff.com.br
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Optional: SSH into VPS and pull the new image
  deploy:
    name: Deploy to VPS
    runs-on: ubuntu-latest
    needs: build-and-push
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            docker pull ghcr.io/lucasheartcliff/portfolio:latest
            docker compose -f /opt/portfolio/docker-compose.yml up -d --force-recreate
```

**Required GitHub secrets** (set in repo Settings → Secrets):
- `VPS_HOST` — IP or domain of the VPS
- `VPS_USER` — SSH username (e.g. `ubuntu`)
- `VPS_SSH_KEY` — Private SSH key for the VPS

The `GITHUB_TOKEN` secret is automatically provided by GitHub Actions — no manual setup needed.

---

### 12.8 — Nginx Reverse Proxy (for VPS deployment)

If the portfolio is self-hosted on a VPS, an Nginx container should sit in front of Next.js to handle SSL termination, HTTP→HTTPS redirect, and caching of static assets. Add the following service to `docker-compose.yml`:

```yaml
services:
  portfolio:
    # ... (same as above)
    # Remove the ports mapping — Nginx will handle external traffic
    expose:
      - "3000"

  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro
    depends_on:
      - portfolio
```

Create `nginx/nginx.conf`:

```nginx
server {
    listen 80;
    server_name lucasheartcliff.com.br www.lucasheartcliff.com.br;

    # Redirect all HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lucasheartcliff.com.br www.lucasheartcliff.com.br;

    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    # Cache Next.js static assets aggressively
    location /_next/static/ {
        proxy_pass http://portfolio:3000;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Proxy all other requests to Next.js
    location / {
        proxy_pass http://portfolio:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

For SSL certificates, use **Certbot with Let's Encrypt**. Alternatively, if the portfolio is behind Cloudflare (recommended), Cloudflare handles SSL termination and the Nginx config can be simplified to HTTP only internally.

---

### 12.9 — Image Size Targets

After implementing the multi-stage Dockerfile, the expected image sizes are:

| Stage | Approximate Size |
|-------|-----------------|
| `deps` stage (intermediate) | ~400–600MB |
| `builder` stage (intermediate) | ~600–900MB |
| Final `runner` image | **~150–200MB** |

Run `docker images lucasheartcliff/portfolio` after building to verify. If the final image exceeds 250MB, review what's being copied in the final stage.

---

## 13. Implementation Order & Priorities

Implement in this exact order for maximum impact with minimum risk:

### Phase 1 — Quick Wins (1–3 days)
1. Fix all content typos and text alignment
2. Update title to Senior Software Engineer
3. Remove WhatsApp, fix contact section
4. Add descriptions and tech tags to the 3 existing project cards
5. Curate and split Certifications vs Courses

### Phase 2 — Design System (3–5 days)
1. Define CSS custom properties for brand color, spacing, typography
2. Apply brand blue consistently across all sections
3. Implement dark mode toggle with localStorage persistence
4. Add hover animations on cards
5. Add scroll-reveal on section headings
6. Fix hero section: add typed role, CTA buttons, availability badge

### Phase 3 — New Sections (3–5 days)
1. Build Tech Stack / Skills section with devicons
2. Expand Experience entries with descriptions and tech tags

### Phase 4 — Articles Feature (5–7 days)
1. Set up Dev.to account (`dev.to/lucasheartcliff`) and publish first article
2. Set canonical URLs on Dev.to to point to portfolio
3. Build articles list component with Dev.to API fetch + localStorage cache
4. Build individual article page route with full content rendering
5. Add meta/OG tags to article pages
6. Add JSON-LD structured data
7. Generate sitemap.xml including article URLs
8. Write and publish first 3 articles from the content plan

### Phase 5 — SEO & Performance (2–3 days)
1. Audit and fix all meta tags across all routes
2. Add `robots.txt` and `sitemap.xml` (Next.js has built-in `app/sitemap.ts` support)
3. Add JSON-LD structured data to article pages and homepage
4. Run Lighthouse audit and fix performance issues
5. Submit sitemap to Google Search Console

### Phase 6 — Containerization & CI/CD (2–3 days)
1. Add `output: 'standalone'` to `next.config.js`
2. Create `.dockerignore` at project root
3. Write multi-stage `Dockerfile` following the spec in Section 12
4. Write `docker-compose.yml` for local and VPS deployment
5. Test the production build locally: `docker compose up --build`
6. Create Docker Hub or GHCR repository (`lucasheartcliff/portfolio`)
7. Push first image manually and verify `docker pull` works publicly
8. Create `.github/workflows/deploy.yml` for automated build + push on every push to `main`
9. (Optional) Configure Nginx reverse proxy + SSL for VPS self-hosting
10. Add a **"Containerized with Docker"** badge to the portfolio's Projects section pointing to the public image — it's a conversation starter in interviews

---

*This document was created as a comprehensive implementation guide for an AI coding assistant or developer. Every section contains enough detail to implement without additional clarification. Sections are ordered by dependency — Phase 1 changes are prerequisites for Phase 2, the Articles Feature in Phase 4 depends on the design system being in place from Phase 2, and Phase 6 (Docker) can be done independently after the Next.js build is stable.*