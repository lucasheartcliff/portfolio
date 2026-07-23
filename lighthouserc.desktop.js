module.exports = {
  ci: {
    collect: {
      // A production build, not `next dev` — dev mode ships unminified JS
      // and skips caching headers, which tanks performance numbers for
      // reasons that have nothing to do with real-world behavior.
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 30000,
      url: ['http://localhost:3000/en', 'http://localhost:3000/pt'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        // --no-sandbox is required in containers that run Chrome as root
        // (e.g. most CI images); harmless elsewhere.
        chromeFlags: ['--no-sandbox'],
      },
    },
    assert: {
      assertions: {
        // Accessibility, best-practices, and SEO are deterministic (DOM/
        // markup checks, not wall-clock timing), so hold them to a real
        // bar. Performance *category* score mixes several timing metrics
        // that are highly sensitive to the CPU the audit happens to run
        // on — assert on it locally if you want a sanity check, but don't
        // wire it into anything that gates merges without a stable,
        // dedicated runner behind it.
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:performance': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/desktop',
    },
  },
};
