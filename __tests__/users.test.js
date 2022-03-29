const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const mockUser = {
    email: 'mock@user.com',
    password: '1234567',
  };

  test('should create a new user', async () => {
    const resp = await request(app).post('/api/v1/users').send(mockUser);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...mockUser,
    });
  });
});
