import { test, expect } from '../fixtures/api-fixtures.js';

test.describe('Users API Tests @api', () => {
  test('should get all users', async ({ apiContext }) => {
    const response = await apiContext.get('/users');
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    
    const users = await response.json();
    expect(users).toHaveLength(10);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  test('should get user by id', async ({ apiContext }) => {
    const userId = 1;
    const response = await apiContext.get(`/users/${userId}`);
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user.id).toBe(userId);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('should handle non-existent user', async ({ apiContext }) => {
    const response = await apiContext.get('/users/999');
    expect(response.status()).toBe(404);
  });

  test('should create new user', async ({ apiContext, testData }) => {
    const response = await apiContext.post('/users', {
      data: testData.validUser
    });
    
    expect(response.status()).toBe(201);
    
    const createdUser = await response.json();
    expect(createdUser.id).toBe(11); // JSONPlaceholder returns id 11 for new users
    expect(createdUser.name).toBe(testData.validUser.name);
    expect(createdUser.email).toBe(testData.validUser.email);
  });

  test('should update user', async ({ apiContext }) => {
    const userId = 1;
    const updateData = {
      name: 'Updated Name',
      email: 'updated@example.com'
    };
    
    const response = await apiContext.put(`/users/${userId}`, {
      data: updateData
    });
    
    expect(response.status()).toBe(200);
    
    const updatedUser = await response.json();
    expect(updatedUser.id).toBe(userId);
    expect(updatedUser.name).toBe(updateData.name);
    expect(updatedUser.email).toBe(updateData.email);
  });

  test('should delete user', async ({ apiContext }) => {
    const userId = 1;
    const response = await apiContext.delete(`/users/${userId}`);
    expect(response.status()).toBe(200);
  });
});
