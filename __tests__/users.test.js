const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

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
    firstName: 'adria',
    lastName: 'ivanitsky',
  };

  test('should create a new user', async () => {
    const resp = await request(app).post('/api/v1/users').send(mockUser);
    expect(resp.body).toEqual({
      id: expect.any(String),
      email: 'mock@user.com',
      firstName: expect.any(String),
      lastName: expect.any(String),
    });
  });

  test('signs in an existing user', async () => {
    const user = await UserService.create({
      email: 'adria',
      password: 'someregrets',
    });
    const resp = await request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'adria', password: 'someregrets' });

    expect(resp.body).toEqual({
      message: 'sign in successful',
      user,
    });
  });
});
