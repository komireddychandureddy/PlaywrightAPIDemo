
export class ApiHelpers {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async createUser(userData) {
    const response = await this.apiContext.post('/users', { data: userData });
    return { response, user: await response.json() };
  }

  async createPost(postData) {
    const response = await this.apiContext.post('/posts', { data: postData });
    return { response, post: await response.json() };
  }

  async getUserPosts(userId) {
    const response = await this.apiContext.get(`/posts?userId=${userId}`);
    return { response, posts: await response.json() };
  }

  async validateUserStructure(user) {
    const requiredFields = ['id', 'name', 'username', 'email'];
    const optionalFields = ['phone', 'website', 'address', 'company'];
    
    requiredFields.forEach(field => {
      expect(user).toHaveProperty(field);
    });

    if (user.email) {
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }

    return true;
  }

  async validatePostStructure(post) {
    const requiredFields = ['id', 'title', 'body', 'userId'];
    
    requiredFields.forEach(field => {
      expect(post).toHaveProperty(field);
    });

    expect(typeof post.id).toBe('number');
    expect(typeof post.userId).toBe('number');
    expect(post.title.length).toBeGreaterThan(0);
    expect(post.body.length).toBeGreaterThan(0);

    return true;
  }
}
