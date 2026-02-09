// tests/auth.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('Authentication System', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  const testUser = {
    name: 'Pravin Sharma',
    email: 'pravin@civoranexus.com',
    password: 'password123'
  };

  describe('POST /api/auth/register', () => {
    test('registers a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user.password).toBeUndefined();
    });

    test('hashes password before saving', async () => {
      await request(app)
        .post('/api/auth/register')
        .send(testUser);

      const user = await User.findOne({ email: testUser.email }).select('+password');
      expect(user.password).not.toBe(testUser.password);
      expect(user.password.length).toBeGreaterThan(20); // bcrypt hash
    });

    test('prevents duplicate email registration', async () => {
      await request(app)
        .post('/api/auth/register')
        .send(testUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('validates email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...testUser, email: 'invalid-email' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('validates password length', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...testUser, password: '12345' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/auth/register').send(testUser);
    });

    test('logs in with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe(testUser.email);
    });

    test('rejects invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@email.com',
          password: testUser.password
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('rejects invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('updates last login timestamp', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      const user = await User.findOne({ email: testUser.email });
      expect(user.lastLogin).toBeDefined();
    });
  });

  describe('Protected Routes', () => {
    let token;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      token = response.body.token;
    });

    test('GET /api/auth/me returns user data with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(testUser.email);
    });

    test('rejects request without token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('rejects request with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_token_here')
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    test('PUT /api/auth/updateprofile updates user data', async () => {
      const response = await request(app)
        .put('/api/auth/updateprofile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Pravin Kumar Sharma',
          bio: 'Full Stack Developer at Civora Nexus'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Pravin Kumar Sharma');
      expect(response.body.data.bio).toContain('Civora Nexus');
    });

    test('PUT /api/auth/updatepassword changes password', async () => {
      const response = await request(app)
        .put('/api/auth/updatepassword')
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: testUser.password,
          newPassword: 'newpassword123'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();

      // Try logging in with new password
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'newpassword123'
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
    });
  });
});