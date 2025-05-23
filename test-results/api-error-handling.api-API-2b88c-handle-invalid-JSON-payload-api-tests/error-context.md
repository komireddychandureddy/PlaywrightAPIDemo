# Test info

- Name: API Error Handling Tests @api >> should handle invalid JSON payload
- Location: C:\Users\ADMIN\git\PlaywrightAPIDemo\tests\api\error-handling.api.spec.js:5:7

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: 500
Received array: [200, 201, 400]
    at C:\Users\ADMIN\git\PlaywrightAPIDemo\tests\api\error-handling.api.spec.js:14:29
```

# Test source

```ts
   1 |
   2 | import { test, expect } from '../fixtures/api-fixtures.js';
   3 |
   4 | test.describe('API Error Handling Tests @api', () => {
   5 |   test('should handle invalid JSON payload', async ({ apiContext }) => {
   6 |     const response = await apiContext.post('/posts', {
   7 |       data: 'invalid json string',
   8 |       headers: {
   9 |         'Content-Type': 'application/json'
  10 |       }
  11 |     });
  12 |     
  13 |     // JSONPlaceholder is lenient, but in real APIs this would be 400
> 14 |     expect([200, 201, 400]).toContain(response.status());
     |                             ^ Error: expect(received).toContain(expected) // indexOf
  15 |   });
  16 |
  17 |   test('should handle missing required fields', async ({ apiContext }) => {
  18 |     const response = await apiContext.post('/posts', {
  19 |       data: {
  20 |         // Missing required fields
  21 |       }
  22 |     });
  23 |     
  24 |     // JSONPlaceholder accepts empty posts, but real APIs would validate
  25 |     expect([200, 201, 400, 422]).toContain(response.status());
  26 |   });
  27 |
  28 |   test('should handle rate limiting gracefully', async ({ apiContext }) => {
  29 |     // Make multiple rapid requests to test rate limiting
  30 |     const requests = Array.from({ length: 10 }, (_, i) => 
  31 |       apiContext.get(`/posts/${i + 1}`)
  32 |     );
  33 |     
  34 |     const responses = await Promise.all(requests);
  35 |     
  36 |     responses.forEach(response => {
  37 |       // Should either succeed or return rate limit error
  38 |       expect([200, 429]).toContain(response.status());
  39 |     });
  40 |   });
  41 | });
```