
import { test, expect, allure } from '../fixtures/api-fixtures.js';

test.describe('Posts API Tests @api', () => {
  test.beforeEach(async () => {
    allure.suite('Posts API');
    allure.parentSuite('API Tests');
  });

  test('should get all posts', async ({ apiContext }) => {
    allure.description('Test to verify getting all posts from the API');
    allure.severity('critical');
    allure.story('Get Posts');
    allure.feature('Posts Management');

    await allure.step('Send GET request to /posts', async () => {
      const response = await apiContext.get('/posts');
      
      await allure.step('Verify response status is 200', async () => {
        expect(response.status()).toBe(200);
      });
      
      await allure.step('Verify response contains 100 posts', async () => {
        const posts = await response.json();
        expect(posts).toHaveLength(100);
      });

      await allure.step('Verify post structure', async () => {
        const posts = await response.json();
        expect(posts[0]).toHaveProperty('id');
        expect(posts[0]).toHaveProperty('title');
        expect(posts[0]).toHaveProperty('body');
        expect(posts[0]).toHaveProperty('userId');
        
        allure.attachment('First Post Sample', JSON.stringify(posts[0], null, 2), 'application/json');
      });
    });
  });

  test('should get posts by user', async ({ apiContext }) => {
    allure.description('Test to verify getting posts filtered by user ID');
    allure.severity('normal');
    allure.story('Filter Posts by User');
    allure.feature('Posts Management');
    allure.parameter('userId', '1');

    const userId = 1;
    
    await allure.step('Send GET request with userId filter', async () => {
      const response = await apiContext.get(`/posts?userId=${userId}`);
      
      await allure.step('Verify response status is 200', async () => {
        expect(response.status()).toBe(200);
      });
      
      await allure.step('Verify posts belong to specified user', async () => {
        const posts = await response.json();
        expect(posts.length).toBeGreaterThan(0);
        
        posts.forEach(post => {
          expect(post.userId).toBe(userId);
        });
        
        allure.attachment('User Posts', JSON.stringify(posts, null, 2), 'application/json');
      });
    });
  });

  test('should create new post', async ({ apiContext, testData }) => {
    allure.description('Test to verify post creation functionality');
    allure.severity('critical');
    allure.story('Create Post');
    allure.feature('Posts Management');

    await allure.step('Send POST request to create post', async () => {
      allure.attachment('Post Data', JSON.stringify(testData.validPost, null, 2), 'application/json');
      
      const response = await apiContext.post('/posts', {
        data: testData.validPost
      });
      
      await allure.step('Verify response status is 201', async () => {
        expect(response.status()).toBe(201);
      });
      
      await allure.step('Verify created post data', async () => {
        const createdPost = await response.json();
        expect(createdPost.id).toBe(101);
        expect(createdPost.title).toBe(testData.validPost.title);
        expect(createdPost.body).toBe(testData.validPost.body);
        expect(createdPost.userId).toBe(testData.validPost.userId);
        
        allure.attachment('Created Post Response', JSON.stringify(createdPost, null, 2), 'application/json');
      });
    });
  });

  test('should get post comments', async ({ apiContext }) => {
    allure.description('Test to verify getting comments for a specific post');
    allure.severity('normal');
    allure.story('Get Post Comments');
    allure.feature('Posts Management');
    allure.parameter('postId', '1');

    const postId = 1;
    
    await allure.step('Send GET request to get post comments', async () => {
      const response = await apiContext.get(`/posts/${postId}/comments`);
      
      await allure.step('Verify response status is 200', async () => {
        expect(response.status()).toBe(200);
      });
      
      await allure.step('Verify comments structure and data', async () => {
        const comments = await response.json();
        expect(comments.length).toBeGreaterThan(0);
        expect(comments[0]).toHaveProperty('id');
        expect(comments[0]).toHaveProperty('name');
        expect(comments[0]).toHaveProperty('email');
        expect(comments[0]).toHaveProperty('body');
        expect(comments[0]).toHaveProperty('postId', postId);
        
        allure.attachment('Post Comments', JSON.stringify(comments, null, 2), 'application/json');
      });
    });
  });
});