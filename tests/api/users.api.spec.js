
import { test, expect, allure } from '../fixtures/api-fixtures.js';

test.describe('Users API Tests @api', () => {
  test.beforeEach(async () => {
    allure.suite('Users API');
    allure.parentSuite('API Tests');
  });

  test('should get all users', async ({ apiContext }) => {
    allure.description('Test to verify getting all users from the API');
    allure.severity('critical');
    allure.story('Get Users');
    allure.feature('Users Management');

    await allure.step('Send GET request to /users', async () => {
      const response = await apiContext.get('/users');
      
      await allure.step('Verify response status is 200', async () => {
        expect(response.status()).toBe(200);
      });

      await allure.step('Verify content type is JSON', async () => {
        expect(response.headers()['content-type']).toContain('application/json');
      });
      
      await allure.step('Verify response contains 10 users', async () => {
        const users = await response.json();
        expect(users).toHaveLength(10);
      });

      await allure.step('Verify user structure', async () => {
        const users = await response.json();
        expect(users[0]).toHaveProperty('id');
        expect(users[0]).toHaveProperty('name');
        expect(users[0]).toHaveProperty('email');
      });

      // Attach response to allure report
      allure.attachment('Users Response', JSON.stringify(await response.json(), null, 2), 'application/json');
    });
  });

  test('should get user by id', async ({ apiContext }) => {
    allure.description('Test to verify getting a specific user by ID');
    allure.severity('critical');
    allure.story('Get User by ID');
    allure.feature('Users Management');
    allure.parameter('userId', '1');

    const userId = 1;
    
    await allure.step(`Send GET request to /users/${userId}`, async () => {
      const response = await apiContext.get(`/users/${userId}`);
      
      await allure.step('Verify response status is 200', async () => {
        expect(response.status()).toBe(200);
      });
      
      await allure.step('Verify user data', async () => {
        const user = await response.json();
        expect(user.id).toBe(userId);
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        
        allure.attachment('User Response', JSON.stringify(user, null, 2), 'application/json');
      });
    });
  });

  test('should handle non-existent user', async ({ apiContext }) => {
    allure.description('Test to verify proper error handling for non-existent user');
    allure.severity('normal');
    allure.story('Error Handling');
    allure.feature('Users Management');
    allure.parameter('userId', '999');

    await allure.step('Send GET request to non-existent user', async () => {
      const response = await apiContext.get('/users/999');
      
      await allure.step('Verify 404 response', async () => {
        expect(response.status()).toBe(404);
      });
    });
  });

  test('should create new user', async ({ apiContext, testData }) => {
    allure.description('Test to verify user creation functionality');
    allure.severity('critical');
    allure.story('Create User');
    allure.feature('Users Management');

    await allure.step('Send POST request to create user', async () => {
      allure.attachment('User Data', JSON.stringify(testData.validUser, null, 2), 'application/json');
      
      const response = await apiContext.post('/users', {
        data: testData.validUser
      });
      
      await allure.step('Verify response status is 201', async () => {
        expect(response.status()).toBe(201);
      });
      
      await allure.step('Verify created user data', async () => {
        const createdUser = await response.json();
        expect(createdUser.id).toBe(11);
        expect(createdUser.name).toBe(testData.validUser.name);
        expect(createdUser.email).toBe(testData.validUser.email);
        
        allure.attachment('Created User Response', JSON.stringify(createdUser, null, 2), 'application/json');
      });
    });
  });

  test('should update user', async ({ apiContext }) => {
    allure.description('Test to verify user update functionality');
    allure.severity('critical');
    allure.story('Update User');
    allure.feature('Users Management');
    allure.parameter('userId', '1');

    const userId = 1;
    const updateData = {
      name: 'Updated Name',
      email: 'updated@example.com'
    };
    
    await allure.step('Send PUT request to update user', async () => {
      allure.attachment('Update Data', JSON.stringify(updateData, null, 2), 'application/json');
      
      const response = await apiContext.put(`/users/${userId}`, {
        data: updateData
      });
      
      await allure.step('Verify response status is 200', async () => {
        expect(response.status()).toBe(200);
      });
      
      await allure.step('Verify updated user data', async () => {
        const updatedUser = await response.json();
        expect(updatedUser.id).toBe(userId);
        expect(updatedUser.name).toBe(updateData.name);
        expect(updatedUser.email).toBe(updateData.email);
        
        allure.attachment('Updated User Response', JSON.stringify(updatedUser, null, 2), 'application/json');
      });
    });
  });

  test('should delete user', async ({ apiContext }) => {
    allure.description('Test to verify user deletion functionality');
    allure.severity('normal');
    allure.story('Delete User');
    allure.feature('Users Management');
    allure.parameter('userId', '1');

    const userId = 1;
    
    await allure.step(`Send DELETE request to /users/${userId}`, async () => {
      const response = await apiContext.delete(`/users/${userId}`);
      
      await allure.step('Verify response status is 200', async () => {
        expect(response.status()).toBe(200);
      });
    });
  });
});