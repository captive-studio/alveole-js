import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  reporter: [['list']],
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
