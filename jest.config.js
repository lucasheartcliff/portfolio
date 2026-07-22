const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  moduleNameMapper: {
    // More specific alias first: @/public/* must not fall through to the
    // general @/* rule below, or it resolves into src/public instead of
    // the real public/ directory.
    '^@/public/(.*)$': '<rootDir>/public/$1',

    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/src/$1',

    // @vercel/analytics ships ESM that jest doesn't transform; stub it.
    '^@vercel/analytics/next$': '<rootDir>/__mocks__/vercelAnalytics.tsx',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/**/_*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
