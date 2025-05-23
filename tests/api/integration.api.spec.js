import { test, expect } from '../fixtures/api-fixtures.js';
import { ApiHelpers } from '../utils/api-helpers.js';

test.describe('API Integration Tests @api', () => {
  test('should create user and their posts workflow', async ({ apiContext, testData }) => {
    const helpers = new ApiHelpers(apiContext);
    
    // Step 1: Create a user
    const { response: userResponse, user } = await helpers.createUser(testData.validUser);
    expect(userResponse.status()).toBe(201);
    await helpers.validateUserStructure(user);
    
    // Step 2: Create a post for that user
    const postData = { ...testData.validPost, userId: user.id };
    const { response: postResponse, post } = await helpers.createPost(postData);
    expect(postResponse.status()).toBe(201);
    await helpers.validatePostStructure(post);
    
    // Step 3: Verify the post belongs to the user
    expect(post.userId).toBe(user.id);
    
    // Step 4: Get all posts by the user
    const { response: postsResponse, posts } = await helpers.getUserPosts(user.id);
    expect(postsResponse.status()).toBe(200);
    
    // Note: JSONPlaceholder doesn't actually persist data, 
    // so this test demonstrates the workflow rather than actual persistence
  });

  test('should handle user deletion cascade', async ({ apiContext }) => {
    const userId = 1;
    
    // Get user's posts before deletion
    const postsResponse = await apiContext.get(`/posts?userId=${userId}`);
    expect(postsResponse.status()).toBe(200);
    const posts = await postsResponse.json();
    expect(posts.length).toBeGreaterThan(0);
    
    // Delete the user
    const deleteResponse = await apiContext.delete(`/users/${userId}`);
    expect(deleteResponse.status()).toBe(200);
    
    // In a real API, user's posts might be deleted or reassigned
    // JSONPlaceholder doesn't actually delete, so this is conceptual
  });
});
