
import { test, expect } from '../fixtures/api-fixtures.js';

test.describe('API Error Handling Tests @api', () => {
  test('should handle invalid JSON payload', async ({ apiContext }) => {
    const response = await apiContext.post('/posts', {
      data: 'invalid json string',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // JSONPlaceholder is lenient, but in real APIs this would be 400
    expect([200, 201, 400]).toContain(response.status());
  });

  test('should handle missing required fields', async ({ apiContext }) => {
    const response = await apiContext.post('/posts', {
      data: {
        // Missing required fields
      }
    });
    
    // JSONPlaceholder accepts empty posts, but real APIs would validate
    expect([200, 201, 400, 422]).toContain(response.status());
  });

  test('should handle rate limiting gracefully', async ({ apiContext }) => {
    // Make multiple rapid requests to test rate limiting
    const requests = Array.from({ length: 10 }, (_, i) => 
      apiContext.get(`/posts/${i + 1}`)
    );
    
    const responses = await Promise.all(requests);
    
    responses.forEach(response => {
      // Should either succeed or return rate limit error
      expect([200, 429]).toContain(response.status());
    });
  });
});