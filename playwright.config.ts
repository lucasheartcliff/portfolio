/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || '3000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: /perf\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        // Use the browser pre-installed in this environment instead of
        // downloading one — see PLAYWRIGHT_BROWSERS_PATH in the environment.
        launchOptions: {
          executablePath:
            process.env.PLAYWRIGHT_CHROMIUM_PATH || '/opt/pw-browsers/chromium',
        },
      },
    },
    {
      name: 'firefox',
      testMatch: /perf\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    // Run against a production build rather than `next dev`: the dev
    // server's on-demand route compilation shows a floating
    // <nextjs-portal> build-activity indicator that can intercept clicks
    // mid-navigation, causing flaky interactions in these tests.
    command: 'npm run build && npm run start',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
