import supertest from 'supertest';
import app from '../app';
import { redis, sequelize, connectToDatabase } from '../util/db';
import { User, Application, Interview } from '../models';
import helper from '../util/testHelper';
import userService from '../services/userService';
import authService from '../services/authService';
import applicationService from '../services/applicationService';
import toNewApplication from '../util/parsers/applicationParser';
import interviewService from '../services/interviewService';

const api = supertest(app);

describe('Job application management', () => {
  let userToken: string;
  let userId: number;

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

    await applicationService.addNew(helper.initialApplications[0], userId);
  });

  describe('Viewing all job applications', () => {
    beforeEach(async () => {
      await applicationService.addNew(
        toNewApplication(helper.initialApplications[1]),
        userId
      );
    });
    it('Returns array of jobs', async () => {
      const response = await api
        .get('/api/applications')
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toEqual({
        ...helper.initialApplications[1],
        id: expect.any(Number),
        userId,
        applyDate: expect.any(String),
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: null,
        files: expect.any(Array<string>),
      });
    });
  });

  describe('Viewing one application', () => {
    let jobId: number;

    beforeEach(async () => {
      const jobs = await applicationService.getAll(
        userId,
        undefined,
        undefined
      );

      jobId = jobs[0].id;
    });

    it('Returns invalid perms error if incorrect user views job', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/applications/${jobId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no job found', async () => {
      const response = await api
        .get(`/api/applications/${jobId + 1}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns job object if successful', async () => {
      const response = await api
        .get(`/api/applications/${jobId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toEqual({
        ...helper.initialApplications[0],
        id: expect.any(Number),
        userId,
        applyDate: expect.any(String),
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: null,
        files: [],
      });
    });
  });

  describe('Viewing all interviews for a job', () => {
    let jobId: number;

    beforeEach(async () => {
      const jobs = await applicationService.getAll(
        userId,
        undefined,
        undefined
      );

      jobId = jobs[0].id;

      await interviewService.addNew(
        { ...helper.initialInterviews[0], applicationId: jobId },
        userId
      );
      await interviewService.addNew(
        { ...helper.initialInterviews[1], applicationId: jobId },
        userId
      );
    });

    it('Returns invalid perms error is incorrect user view interviews', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/applications/${jobId}/interviews`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if job interviews cannot be found', async () => {
      const response = await api
        .get(`/api/applications/${jobId + 10}/interviews`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns empty array if job does not have interviews', async () => {
      await applicationService.addNew(helper.initialApplications[1], userId);

      const jobs = await applicationService.getAll(
        userId,
        undefined,
        undefined
      );

      const response = await api
        .get(`/api/applications/${jobs[0].id}/interviews`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toStrictEqual([]);
    });

    it('Returns array of interviews if successful', async () => {
      const response = await api
        .get(`/api/applications/${jobId}/interviews`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toEqual({
        ...helper.initialInterviews[0],
        id: expect.any(Number),
        userId,
        applicationId: jobId,
        time: helper.initialInterviews[0].time.toISOString(),
        files: expect.any(Array<string>),
      });
    });
  });

  describe('Adding new job', () => {
    it('Returns job object if successful', async () => {
      const response = await api
        .post('/api/applications')
        .set('authorization', `bearer ${userToken}`)
        .send(helper.initialApplications[1]);

      expect(response.body).toEqual({
        ...helper.initialApplications[1],
        id: expect.any(Number),
        userId,
        applyDate: expect.any(String),
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: null,
        files: expect.any(Array<string>),
      });
    });
  });

  describe('Updating job', () => {
    let jobId: number;

    beforeEach(async () => {
      const jobs = await applicationService.getAll(
        userId,
        undefined,
        undefined
      );

      jobId = jobs[0].id;
    });

    it('Returns invalid perms error if incorrect user updates job', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .put(`/api/applications/${jobId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`)
        .send(helper.initialApplications[1]);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no job found', async () => {
      const response = await api
        .put(`/api/applications/${jobId + 1}`)
        .set('authorization', `bearer ${userToken}`)
        .send(helper.initialApplications[1]);

      expect(response.status).toBe(404);
    });

    it('Returns updated job object if successful', async () => {
      const response = await api
        .put(`/api/applications/${jobId}`)
        .set('authorization', `bearer ${userToken}`)
        .send(helper.initialApplications[2]);

      expect(response.body).toEqual({
        ...helper.initialApplications[2],
        id: jobId,
        userId,
        applyDate: expect.any(String),
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: expect.any(String),
        files: expect.any(Array<string>),
      });
    });
  });

  describe('Deleting jobs', () => {
    let jobId: number;

    beforeEach(async () => {
      const jobs = await applicationService.getAll(
        userId,
        undefined,
        undefined
      );

      jobId = jobs[0].id;
    });

    it('Returns invalid perms error if incorrect user deletes job', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .delete(`/api/applications/${jobId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no job found', async () => {
      const response = await api
        .delete(`/api/applications/${jobId + 1}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns 204 if successful', async () => {
      const response = await api
        .delete(`/api/applications/${jobId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
