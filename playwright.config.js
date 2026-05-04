// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'mobile',
      use: { 
        ...devices['Pixel 5'],
        browserName: 'chromium'
      },
    },
    {
      name: 'tablet',
      use: { 
        ...devices['iPad Mini'],
        browserName: 'chromium'
      },
    },
    {
      name: 'desktop',
      use: { 
        ...devices['Desktop Chrome'],
        browserName: 'chromium'
      },
    },
  ],
});
