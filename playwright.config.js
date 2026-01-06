import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  /* -------------------------------------------------
   * Execution behavior
   * ------------------------------------------------- */
  testDir: './tests',
  workers: 1,              // run tests sequentially
  fullyParallel: false,
  timeout: 30 * 1000,
  retries: 0,

  /* -------------------------------------------------
   * Reporters (single run = single report)
   * ------------------------------------------------- */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  /* -------------------------------------------------
   * Shared test settings
   * ------------------------------------------------- */
  use: {
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    },

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  /* -------------------------------------------------
   * Browser projects
   * ------------------------------------------------- */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
