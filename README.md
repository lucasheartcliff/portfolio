# 💼 Portfolio

A modern, multilingual portfolio website built with Next.js and TypeScript, showcasing professional experiences, technical skills, certifications, and projects. Features a fully responsive design with internationalization support for 6 languages.

🔗 **Live Preview**: [https://lucasheartcliff.com.br](https://lucasheartcliff.com.br)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Internationalization](#-internationalization)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## ✨ Features

### Core Features
* 🔍 **About Section** - Personal introduction with professional summary
* 📊 **Interactive Charts** - Visual representation of programming language experience using ApexCharts
* 👨‍💻 **Career Timeline** - Chronological display of professional roles and achievements
* 🎓 **Certifications** - Showcase of completed courses and certifications from platforms like Udemy and Alura
* 📁 **Projects Gallery** - Portfolio of personal and professional projects with GitHub links
* 📄 **PDF Resume** - Downloadable resume generated with React-PDF

### Technical Features
* 🌐 **Multilingual Support** - Full i18n implementation supporting 6 languages (EN, PT, FR, ES, DE, IT)
* 📱 **Fully Responsive** - Mobile-first design that works seamlessly across all devices
* 🎨 **Modern UI/UX** - Clean, professional design with Tailwind CSS
* ⚡ **Static Site Generation** - Optimized performance with Next.js SSG
* 🔍 **SEO Optimized** - Meta tags, sitemaps, and structured data
* ♿ **Accessibility** - WCAG compliant with semantic HTML

### Upcoming Features
* 🔜 **Blog Platform** - Medium-like article publishing system (see [GitHub Issues](https://github.com/lucasheartcliff/portfolio/issues))

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 13.x (React 18)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.x
- **UI Components**: [Ant Design](https://ant.design/) 5.x
- **Charts**: [ApexCharts](https://apexcharts.com/) with React wrapper
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)

### Internationalization
- **i18n Framework**: [next-i18next](https://github.com/i18next/next-i18next)
- **Supported Languages**: English, Portuguese, French, Spanish, German, Italian
- **Language Detection**: Automatic browser language detection

### Development Tools
- **Linting**: ESLint with Airbnb TypeScript config
- **Formatting**: Prettier
- **Git Hooks**: Husky + lint-staged
- **Commit Convention**: Commitlint (Conventional Commits)

### Testing
- **Unit Testing**: Jest + React Testing Library
- **E2E Testing**: Cypress
- **Visual Testing**: Percy (optional)

### Build & Deployment
- **Build Tool**: Next.js built-in compiler
- **Bundle Analyzer**: @next/bundle-analyzer
- **Deployment**: Netlify (configured with `netlify.toml`)
- **CI/CD**: GitHub Actions

---

## 📂 Project Structure

```
portfolio/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD workflows
├── cypress/                # E2E tests
├── public/
│   ├── assets/            # Images, icons, and static files
│   ├── locales/           # Translation files (en, pt, fr, es, de, it)
│   └── *.png              # Favicons and app icons
├── src/
│   ├── components/        # Reusable React components
│   │   ├── CertificateCard/
│   │   ├── LanguageChart/
│   │   ├── Navbar/
│   │   ├── ProjectCard/
│   │   ├── Timeline/
│   │   └── ...
│   ├── layouts/           # Page layout components
│   ├── pages/             # Next.js pages (file-based routing)
│   │   ├── [locale]/      # Localized routes
│   │   ├── _app.tsx       # Custom App component
│   │   └── _document.tsx  # Custom Document component
│   ├── services/          # API services and data fetching
│   ├── styles/            # Global styles and Tailwind config
│   ├── templates/         # Page templates
│   └── utils/             # Utility functions and helpers
├── .eslintrc              # ESLint configuration
├── jest.config.js         # Jest configuration
├── next.config.js         # Next.js configuration
├── next-i18next.config.js # i18n configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v14.x, v16.x, or v18.x (see `.nvmrc`)
- **Package Manager**: npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lucasheartcliff/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and navigate to: `http://localhost:3000`

---

## 📜 Available Scripts

### Development
```bash
npm run dev              # Start development server on localhost:3000
npm run build            # Create production build
npm run start            # Start production server
npm run export           # Export static HTML (SSG)
npm run build-prod       # Clean, build, and export for production
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run format           # Fix linting issues and format code with Prettier
npm run check-types      # Type-check TypeScript files
```

### Testing
```bash
npm run test             # Run Jest unit tests
npm run cypress          # Open Cypress test runner (interactive)
npm run cypress:headless # Run Cypress tests in headless mode
npm run e2e              # Start dev server and run E2E tests
npm run e2e:headless     # Start dev server and run E2E tests (headless)
```

### Build Analysis
```bash
npm run build-stats      # Analyze bundle size with webpack-bundle-analyzer
```

### Utilities
```bash
npm run clean            # Remove .next and out directories
```

---

## 🌐 Internationalization

This portfolio supports **6 languages** with automatic detection:

| Language | Code | Flag |
|----------|------|------|
| English (Default) | `en` | 🇺🇸 |
| Portuguese | `pt` | 🇧🇷 |
| French | `fr` | 🇫🇷 |
| Spanish | `es` | 🇪🇸 |
| German | `de` | 🇩🇪 |
| Italian | `it` | 🇮🇹 |

### How It Works
- **Automatic Detection**: The app detects the user's browser language on first visit
- **Manual Selection**: Users can switch languages via the language selector in the navbar
- **URL-based Routing**: Each language has its own route (e.g., `/en`, `/pt`, `/fr`)
- **Translation Files**: Located in `public/locales/{locale}/common.json`

### Adding a New Language
1. Add the locale code to `next-i18next.config.js`
2. Create a new folder in `public/locales/{locale}/`
3. Add translation file: `public/locales/{locale}/common.json`
4. Update the language selector component

---

## 🧪 Testing

### Unit Tests (Jest)
```bash
npm run test
```
- Tests are located in `src/__tests__/` and co-located with components
- Configuration: `jest.config.js`
- Coverage threshold: 30% (branches, functions, lines, statements)

### E2E Tests (Cypress)
```bash
npm run e2e              # Interactive mode
npm run e2e:headless     # Headless mode (CI)
```
- Tests are located in `cypress/` directory
- Configuration: `cypress.config.js`
- Base URL: `http://localhost:3000`

### Visual Testing (Percy - Optional)
```bash
npx percy exec -- npm run e2e:headless
```
- Requires `PERCY_TOKEN` environment variable
- Captures visual snapshots for regression testing

---

## 🚢 Deployment

### Netlify (Recommended)
This project is configured for Netlify deployment:

1. **Connect your repository** to Netlify
2. **Build settings** (auto-detected from `netlify.toml`):
   - Build command: `npm run build-prod`
   - Publish directory: `out`
3. **Deploy**: Netlify will automatically deploy on every push to `main`

### Manual Deployment
```bash
npm run build-prod       # Creates static export in /out directory
```
Upload the `out/` directory to any static hosting service (Vercel, GitHub Pages, AWS S3, etc.)

### Environment Variables
If needed, create a `.env.local` file:
```env
# Add any environment variables here
# Example: NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. **CI Basic** (`.github/workflows/ci-basic.yml`)
Runs on every push and pull request to `main`:
- ✅ Install dependencies
- ✅ Lint code
- ✅ Run unit tests
- ✅ Build production bundle

#### 2. **CI** (`.github/workflows/CI.yml`)
Comprehensive testing across multiple Node versions:
- ✅ Build with Node 14.x, 16.x, 18.x
- ✅ Validate commit messages (commitlint)
- ✅ Type checking
- ✅ Unit tests
- ✅ E2E tests with Percy

#### 3. **Release** (`.github/workflows/release.yml`)
Automated semantic versioning and changelog generation:
- 📝 Generates CHANGELOG.md
- 🏷️ Creates GitHub releases
- 🔢 Bumps version numbers

#### 4. **Update Dependencies** (`.github/workflows/update-deps.yml`)
Automated dependency updates (scheduled)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow
1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and commit using conventional commits:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Run tests**: `npm run test && npm run e2e:headless`
5. **Push to your fork**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Commit Convention
This project uses [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Code Quality Standards
- ✅ All tests must pass
- ✅ Code must pass linting (`npm run lint`)
- ✅ TypeScript must compile without errors (`npm run check-types`)
- ✅ Maintain or improve code coverage (30% minimum)

---

## 📚 Additional Resources

### Key Sections Overview
- **Languages**: Visual representation of programming language proficiency over time
- **Experiences**: Professional timeline showing roles at companies like Intelie by Viasat
- **Certifications**: Courses completed on platforms like Udemy and Alura
- **Projects**: Sample applications including Crypt Image, Data Persistence, and this portfolio

### Customization Guide
To customize this portfolio for your own use:
1. Update personal information in translation files (`public/locales/*/common.json`)
2. Replace images in `public/assets/`
3. Modify color scheme in `tailwind.config.js`
4. Update experiences, certifications, and projects data in `src/services/`

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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
