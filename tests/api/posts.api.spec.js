import { test, expect } from '../fixtures/api-fixtures.js';

test.describe('Posts API Tests @api', () => {
  test('should get all posts', async ({ apiContext }) => {
    const response = await apiContext.get('/posts');
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(posts).toHaveLength(100);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
    expect(posts[0]).toHaveProperty('userId');
  });

  test('should get posts by user', async ({ apiContext }) => {
    const userId = 1;
    const response = await apiContext.get(`/posts?userId=${userId}`);
    
    expect(response.status()).toBe(200);
    
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
    
    // Verify all posts belong to the specified user
    posts.forEach(post => {
      expect(post.userId).toBe(userId);
    });
  });

  test('should create new post', async ({ apiContext, testData }) => {
    const response = await apiContext.post('/posts', {
      data: testData.validPost
    });
    
    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost.id).toBe(101); // JSONPlaceholder returns id 101 for new posts
    expect(createdPost.title).toBe(testData.validPost.title);
    expect(createdPost.body).toBe(testData.validPost.body);
    expect(createdPost.userId).toBe(testData.validPost.userId);
  });

  test('should get post comments', async ({ apiContext }) => {
    const postId = 1;
    const response = await apiContext.get(`/posts/${postId}/comments`);
    
    expect(response.status()).toBe(200);
    
    const comments = await response.json();
    expect(comments.length).toBeGreaterThan(0);
    expect(comments[0]).toHaveProperty('id');
    expect(comments[0]).toHaveProperty('name');
    expect(comments[0]).toHaveProperty('email');
    expect(comments[0]).toHaveProperty('body');
    expect(comments[0]).toHaveProperty('postId', postId);
  });
});
