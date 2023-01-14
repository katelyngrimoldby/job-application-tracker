import supertest from 'supertest';
import app from '../app';
import { redis, sequelize, connectToDatabase } from '../util/db';
import { User, Job } from '../models';
import helper from '../util/testHelper';
import userService from '../services/userService';
import authService from '../services/authService';
import jobService from '../services/jobService';

const api = supertest(app);

describe('Job application management', () => {
  let userToken: string;
  let userId: number;

  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await redis.FLUSHALL();
    await Job.truncate({ cascade: true });
    await User.truncate({ cascade: true });

    const user = helper.initialUsers[0];

    await userService.addNew(user);
    const userAuth = await authService.login(user.username, user.password);
    userId = userAuth.id;
    userToken = userAuth.accessToken;

    await jobService.addNew(helper.initialJobs[0], userId);
  });

  describe('Viewing all job applications', () => {
    beforeEach(async () => {
      await jobService.addNew(helper.initialJobs[1], userId);
    });

    it('Returns array of jobs', async () => {
      const response = await api
        .get('/api/jobs')
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toEqual({
        ...helper.initialJobs[1],
        id: expect.any(Number),
        userId,
      });
    });
  });

  describe('Viewing one application', () => {
    let jobId: number;

    beforeEach(async () => {
      const jobs = await jobService.getAll(userId, undefined, undefined);

      jobId = jobs[0].id;
    });

    it('Returns invalid perms error if incorrect user views job', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/jobs/${jobId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no job found', async () => {
      const response = await api
        .get(`/api/jobs/${jobId + 1}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns job object if successful', async () => {
      const response = await api
        .get(`/api/jobs/${jobId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toEqual({
        ...helper.initialJobs[0],
        id: expect.any(Number),
        userId,
      });
    });
  });

  describe('Adding new job', () => {
    it('Returns job object if successful', async () => {
      const response = await api
        .post('/api/jobs')
        .set('authorization', `bearer ${userToken}`)
        .send(helper.initialJobs[1]);

      expect(response.body).toEqual({
        ...helper.initialJobs[1],
        id: expect.any(Number),
        userId,
      });
    });
  });

  describe('Updating job', () => {
    let jobId: number;

    beforeEach(async () => {
      const jobs = await jobService.getAll(userId, undefined, undefined);

      jobId = jobs[0].id;
    });

    it('Returns invalid perms error if incorrect user updates job', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .put(`/api/jobs/${jobId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`)
        .send(helper.initialJobs[1]);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no job found', async () => {
      const response = await api
        .put(`/api/jobs/${jobId + 1}`)
        .set('authorization', `bearer ${userToken}`)
        .send(helper.initialJobs[1]);

      expect(response.status).toBe(404);
    });

    it('Returns updated job object if successful', async () => {
      const response = await api
        .put(`/api/jobs/${jobId}`)
        .set('authorization', `bearer ${userToken}`)
        .send(helper.initialJobs[1]);

      expect(response.body).toEqual({
        ...helper.initialJobs[1],
        id: jobId,
        userId,
      });
    });
  });

  describe('Deleting jobs', () => {
    let jobId: number;

    beforeEach(async () => {
      const jobs = await jobService.getAll(userId, undefined, undefined);

      jobId = jobs[0].id;
    });

    it('Returns invalid perms error if incorrect user deletes job', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .delete(`/api/jobs/${jobId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no job found', async () => {
      const response = await api
        .delete(`/api/jobs/${jobId + 1}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns 204 if successful', async () => {
      const response = await api
        .delete(`/api/jobs/${jobId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
