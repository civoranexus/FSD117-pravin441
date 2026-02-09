// tests/blog-api.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Post = require('../models/Post');

describe('Blog API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  describe('POST /api/posts', () => {
    test('creates a new blog post', async () => {
      const newPost = {
        title: 'Test Blog Post',
        content: 'This is test content for Civora Nexus blog',
        category: 'Technology',
        tags: ['testing', 'nodejs'],
        published: true
      };

      const response = await request(app)
        .post('/api/posts')
        .send(newPost)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(newPost.title);
      expect(response.body.data.slug).toBe('test-blog-post');
      expect(response.body.data.author.name).toBe('Pravin Sharma');
    });

    test('auto-generates slug from title', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({
          title: 'Learning Node.js at Civora Nexus!',
          content: 'Content here'
        })
        .expect(201);

      expect(response.body.data.slug).toBe('learning-node-js-at-civora-nexus');
    });

    test('validates required fields', async () => {
      const response = await request(app)
        .post('/api/posts')
        .send({ title: 'Only title' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/posts', () => {
    beforeEach(async () => {
      await Post.create([
        {
          title: 'Post 1',
          content: 'Content 1',
          category: 'Technology',
          published: true
        },
        {
          title: 'Post 2',
          content: 'Content 2',
          category: 'Business',
          published: true
        },
        {
          title: 'Draft Post',
          content: 'Draft content',
          published: false
        }
      ]);
    });

    test('returns all published posts', async () => {
      const response = await request(app)
        .get('/api/posts')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(2);
    });

    test('filters by category', async () => {
      const response = await request(app)
        .get('/api/posts?category=Technology')
        .expect(200);

      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].category).toBe('Technology');
    });

    test('paginates results', async () => {
      const response = await request(app)
        .get('/api/posts?page=1&limit=1')
        .expect(200);

      expect(response.body.data.length).toBe(1);
      expect(response.body.pagination.pages).toBe(2);
    });

    test('searches posts', async () => {
      const response = await request(app)
        .get('/api/posts?search=Post 1')
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].title).toContain('Post 1');
    });
  });

  describe('PATCH /api/posts/:id/like', () => {
    test('increments like count', async () => {
      const post = await Post.create({
        title: 'Likeable Post',
        content: 'Content',
        published: true
      });

      const response = await request(app)
        .patch(`/api/posts/${post._id}/like`)
        .expect(200);

      expect(response.body.likes).toBe(1);

      // Like again
      const response2 = await request(app)
        .patch(`/api/posts/${post._id}/like`)
        .expect(200);

      expect(response2.body.likes).toBe(2);
    });
  });
});