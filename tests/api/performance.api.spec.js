
import { test, expect, allure } from '../fixtures/api-fixtures.js';

test.describe('API Performance Tests @api', () => {
  test.beforeEach(async () => {
    allure.suite('Performance Tests');
    allure.parentSuite('API Tests');
  });

  test('should respond within acceptable time limits', async ({ apiContext }) => {
    allure.description('Test to verify API response time is within acceptable limits');
    allure.severity('normal');
    allure.story('Response Time');
    allure.feature('Performance');

    await allure.step('Measure API response time', async () => {
      const startTime = Date.now();
      
      const response = await apiContext.get('/posts');
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      await allure.step('Verify response status and time', async () => {
        expect(response.status()).toBe(200);
        expect(responseTime).toBeLessThan(2000); // Should respond within 2 seconds
        
        allure.parameter('Response Time (ms)', responseTime.toString());
        console.log(`API Response Time: ${responseTime}ms`);
      });
    });
  });

  test('should handle concurrent requests', async ({ apiContext }) => {
    allure.description('Test to verify API can handle concurrent requests efficiently');
    allure.severity('critical');
    allure.story('Concurrent Requests');
    allure.feature('Performance');
    allure.parameter('Concurrent Requests', '5');

    await allure.step('Execute concurrent requests', async () => {
      const concurrentRequests = 5;
      const requests = Array.from({ length: concurrentRequests }, (_, i) => 
        apiContext.get(`/users/${i + 1}`)
      );
      
      const startTime = Date.now();
      const responses = await Promise.all(requests);
      const endTime = Date.now();
      
      await allure.step('Verify all requests succeeded', async () => {
        responses.forEach((response, index) => {
          expect(response.status()).toBe(200);
        });
        
        const totalTime = endTime - startTime;
        allure.parameter('Total Time (ms)', totalTime.toString());
        console.log(`Concurrent requests completed in: ${totalTime}ms`);
      });
    });
  });
});