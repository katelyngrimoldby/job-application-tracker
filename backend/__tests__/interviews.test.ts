import supertest from 'supertest';
import app from '../app';
import { redis, sequelize, connectToDatabase } from '../util/db';
import { User, Application, Interview } from '../models';
import helper from '../util/testHelper';
import userService from '../services/userService';
import authService from '../services/authService';
import interviewService from '../services/interviewService';
import applicationService from '../services/applicationService';

const api = supertest(app);

describe('Interview management', () => {
  let userToken: string;
  let userId: number;
  let applicationId: number;

  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await redis.FLUSHALL();
    await Application.truncate({ cascade: true });
    await User.truncate({ cascade: true });
    await Interview.truncate({ cascade: true });

    const user = helper.initialUsers[0];

    await userService.addNew(user);
    const userAuth = await authService.login(user.username, user.password);
    userId = userAuth.id;
    userToken = userAuth.accessToken;

    const application = await applicationService.addNew(
      helper.initialApplications[0],
      userId
    );

    applicationId = application.id;

    await interviewService.addNew(
      { ...helper.initialInterviews[0], applicationId },
      userId
    );
  });

  describe('Viewing all interviews', () => {
    beforeEach(async () => {
      await interviewService.addNew(
        { ...helper.initialInterviews[1], applicationId },
        userId
      );
    });

    it('Returns array of all interviews', async () => {
      const response = await api
        .get('/api/interviews')
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toEqual({
        ...helper.initialInterviews[0],
        id: expect.any(Number),
        userId,
        applicationId,
        time: helper.initialInterviews[0].time.toISOString(),
      });
    });
  });

  describe('Viewing one interview', () => {
    let interviewId: number;

    beforeEach(async () => {
      const interviews = await interviewService.getAll(userId, undefined);
      interviewId = interviews[0].id;
    });

    it('Returns invalid perms error if incorrect user views interview', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/interviews/${interviewId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no interview found', async () => {
      const response = await api
        .get(`/api/applications/${interviewId + 10}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns interview object if successful', async () => {
      const response = await api
        .get(`/api/interviews/${interviewId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toEqual({
        ...helper.initialInterviews[0],
        id: expect.any(Number),
        userId,
        applicationId,
        time: helper.initialInterviews[0].time.toISOString(),
      });
    });
  });

  describe('Adding new interview', () => {
    it('Returns interview object if successful', async () => {
      const response = await api
        .post('/api/interviews')
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.initialInterviews[1], applicationId });

      expect(response.body).toEqual({
        ...helper.initialInterviews[1],
        id: expect.any(Number),
        userId,
        applicationId,
        time: helper.initialInterviews[1].time.toISOString(),
      });
    });
  });

  describe('Updating an interview', () => {
    let interviewId: number;

    beforeEach(async () => {
      const interviews = await interviewService.getAll(userId, undefined);
      interviewId = interviews[0].id;
    });

    it('Returns invalid perms error if incorrect user updates interview', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .put(`/api/interviews/${interviewId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`)
        .send({ ...helper.initialInterviews[1], applicationId });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no interview found', async () => {
      const response = await api
        .put(`/api/interviews/${interviewId + 10}`)
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.initialInterviews[1], applicationId });

      expect(response.status).toBe(404);
    });

    it('Returns updated interview object if successful', async () => {
      const response = await api
        .put(`/api/interviews/${interviewId}`)
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.initialInterviews[1], applicationId });

      expect(response.body).toEqual({
        ...helper.initialInterviews[1],
        id: expect.any(Number),
        userId,
        applicationId,
        time: helper.initialInterviews[1].time.toISOString(),
      });
    });
  });

  describe('Deleting an interview', () => {
    let interviewId: number;

    beforeEach(async () => {
      const interviews = await interviewService.getAll(userId, undefined);
      interviewId = interviews[0].id;
    });

    it('Returns invalid perms error if incorrect user views interview', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .delete(`/api/interviews/${interviewId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no interview found', async () => {
      const response = await api
        .delete(`/api/applications/${interviewId + 10}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('returns 204 if successful', async () => {
      const response = await api
        .delete(`/api/interviews/${interviewId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
