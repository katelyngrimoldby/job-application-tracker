import supertest from 'supertest';
import app from '../app';
import { redis, sequelize, connectToDatabase } from '../util/db';
import { User, Job } from '../models';
import helper from '../util/testHelper';
import userService from '../services/userService';

const api = supertest(app);

describe('User management', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await redis.FLUSHALL();
    await Job.truncate({ cascade: true });
    await User.truncate({ cascade: true });

    await userService.addNew(helper.initialUsers[0]);
  });

  describe('Registering users', () => {
    it('Returns username error if non-unique username used', async () => {
      const response = await api
        .post('/api/users')
        .send(helper.initialUsers[0]);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Username is already taken' });
    });

    it('Returns error if password too short', async () => {
      const response = await api
        .post('/api/users')
        .send({ username: 'test', name: 'test', password: '3456' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Password must be at least five (5) characters long',
      });
    });

    it('Returns user information on successful registration', async () => {
      const user = helper.initialUsers[1];

      const response = await api.post('/api/users').send(user);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        username: user.username,
        name: user.name,
        id: expect.any(Number),
        passwordHash: expect.any(String),
      });
    });
  });

  describe('Viewing users', () => {
    it('Returns array of users', async () => {
      const response = await api.get('/api/users');

      expect(response.body).toHaveLength(1);
    });

    it('Returns object with user id, username, and name', async () => {
      const response = await api.get('/api/users');

      expect(Object.keys(response.body[0])).toEqual(['id', 'username', 'name']);
    });

    it('Omits passwordHash', async () => {
      const response = await api.get('/api/users');

      expect(Object.keys(response.body[0])).toEqual(
        expect.not.arrayContaining(['passwordHash'])
      );
    });
  });

  describe('Viewing one user', () => {
    let userId: number;

    beforeEach(async () => {
      const users = await userService.getAll();

      userId = users[0].id;
    });

    it("Returns 404 if user doesn't exist", async () => {
      const response = await api.get('/api/users/1');

      expect(response.status).toBe(404);
    });

    it('Returns object with user id, username, and name', async () => {
      const response = await api.get(`/api/users/${userId}`);

      expect(Object.keys(response.body)).toEqual(['id', 'username', 'name']);
    });

    it('Omits passwordHash', async () => {
      const response = await api.get(`/api/users/${userId}`);

      expect(Object.keys(response.body)).toEqual(
        expect.not.arrayContaining(['passwordHash'])
      );
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
