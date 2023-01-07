import supertest from 'supertest';
import app from '../app';
import { redis, sequelize, connectToDatabase } from '../util/db';
import { User, Job } from '../models';
import helper from '../util/testHelper';
import userService from '../services/userService';
import authService from '../services/authService';

const api = supertest(app);

describe('User authentication', () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await redis.FLUSHALL();
    await Job.truncate({ cascade: true });
    await User.truncate({ cascade: true });

    await userService.addNew(helper.initialUsers[0]);
  });

  describe('Logging in', () => {
    it('Logs the user in and saves their session to redis', async () => {
      const user = helper.initialUsers[0];
      const response = await api
        .post('/api/auth/login')
        .send({ username: user.username, password: user.password });

      const userId = response.body.id;

      expect(response.body).toEqual(
        expect.objectContaining({
          session: {
            token: expect.any(String),
            username: 'root',
            name: 'root',
          },
          id: userId,
        })
      );

      const session = await authService.getSession(userId);
      expect(session).toEqual(
        expect.objectContaining({
          token: expect.any(String),
          username: 'root',
          name: 'root',
        })
      );
    });

    it('Returns error when username is incorrect', async () => {
      const user = helper.initialUsers[0];

      const response = await api
        .post('/api/auth/login')
        .send({ username: 'wrong', password: user.password });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid username or password' });
    });

    it('Returns error when password is incorrect', async () => {
      const user = helper.initialUsers[0];

      const response = await api
        .post('/api/auth/login')
        .send({ username: user.username, password: 'wrong' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid username or password' });
    });
  });

  describe('Viewing session', () => {
    it('Returns session details for authorized user', async () => {
      const user = helper.initialUsers[0];
      const loginRes = await authService.login(user.username, user.password);

      const response = await api.get(`/api/auth/${loginRes.id}`);

      expect(response.body).toEqual(loginRes.session);
    });

    it('Returns 204 if invalid id is given', async () => {
      const response = await api.get('/api/auth/1');

      expect(response.status).toBe(204);
    });
  });

  describe('Logging out', () => {
    it('Returns 204', async () => {
      const user = helper.initialUsers[0];
      const loginRes = await authService.login(user.username, user.password);

      const response = await api
        .delete('/api/auth/logout')
        .set('Authorization', `bearer ${loginRes.session.token}`);

      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
