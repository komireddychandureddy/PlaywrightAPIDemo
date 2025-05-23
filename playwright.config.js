
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'results.xml' }],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      suiteTitle: true,
      environmentInfo: {
        'API_URL': 'https://jsonplaceholder.typicode.com',
        'Test Environment': process.env.NODE_ENV || 'development',
        'Browser': 'API Testing',
        'OS': process.platform
      }
    }]
  ],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'api-tests',
      testMatch: '**/*api*.spec.js',
    },
  ],
});