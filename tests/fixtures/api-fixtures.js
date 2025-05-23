import { test as base } from '@playwright/test';

export const test = base.extend({
  // Custom fixture for API context with authentication
  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Add auth headers if needed
        // 'Authorization': 'Bearer your-token-here'
      }
    });
    await use(context);
    await context.dispose();
  },

  // Custom fixture for test data
  testData: async ({}, use) => {
    const data = {
      validUser: {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '1-555-123-4567',
        website: 'johndoe.com'
      },
      validPost: {
        title: 'Test Post Title',
        body: 'This is a test post body content.',
        userId: 1
      }
    };
    await use(data);
  }
});

export { expect } from '@playwright/test';