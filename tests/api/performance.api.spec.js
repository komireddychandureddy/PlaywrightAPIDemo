import { test, expect } from '../fixtures/api-fixtures.js';

test.describe('API Performance Tests @api', () => {
  test('should respond within acceptable time limits', async ({ apiContext }) => {
    const startTime = Date.now();
    
    const response = await apiContext.get('/posts');
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(2000); // Should respond within 2 seconds
  });

  test('should handle concurrent requests', async ({ apiContext }) => {
    const concurrentRequests = 5;
    const requests = Array.from({ length: concurrentRequests }, (_, i) => 
      apiContext.get(`/users/${i + 1}`)
    );
    
    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const endTime = Date.now();
    
    responses.forEach(response => {
      expect(response.status()).toBe(200);
    });
    
    const totalTime = endTime - startTime;
    console.log(`Concurrent requests completed in: ${totalTime}ms`);
  });
});
