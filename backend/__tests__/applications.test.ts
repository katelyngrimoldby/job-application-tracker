import supertest from 'supertest';
import app from '../app';
import { redis, sequelize, connectToDatabase } from '../util/db';
import {
  User,
  Application,
  Interview,
  ApplicationFile,
  InterviewFile,
} from '../models';
import helper from '../util/testHelper';
import userService from '../services/userService';
import authService from '../services/authService';
import applicationService from '../services/applicationService';
import interviewService from '../services/interviewService';
import applicationFileService from '../services/applicationFileService';

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
    await ApplicationFile.truncate({ cascade: true });
    await InterviewFile.truncate({ cascade: true });

    const user = helper.initialUsers[0];

    await userService.addNew(user);
    const userAuth = await authService.login(user.username, user.password);
    userId = userAuth.id;
    userToken = userAuth.accessToken;

    await applicationService.addNew(helper.initialApplications[0], userId);
  });

  describe('Viewing all job applications', () => {
    beforeEach(async () => {
      await applicationService.addNew(helper.initialApplications[1], userId);
    });
    it('Returns array of applications', async () => {
      const response = await api
        .get('/api/applications')
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toEqual({
        ...helper.initialApplications[0],
        id: expect.any(Number),
        userId,
        applyDate: expect.any(String),
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: null,
      });
    });
  });

  describe('Viewing one application', () => {
    let applicationId: number;

    beforeEach(async () => {
      const applications = await applicationService.getAll(userId);

      applicationId = applications[0].id;
    });

    it('Returns invalid perms error if incorrect user views application', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/applications/${applicationId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no application found', async () => {
      const response = await api
        .get(`/api/applications/${applicationId + 1}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns application object if successful', async () => {
      const response = await api
        .get(`/api/applications/${applicationId}`)
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
      });
    });
  });

  describe('Viewing all interviews for an application', () => {
    let applicationId: number;

    beforeEach(async () => {
      const applications = await applicationService.getAll(userId);

      applicationId = applications[0].id;

      await interviewService.addNew(
        { ...helper.initialInterviews[0], applicationId },
        userId
      );
      await interviewService.addNew(
        { ...helper.initialInterviews[1], applicationId },
        userId
      );
    });

    it('Returns invalid perms error is incorrect user view interviews', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/applications/${applicationId}/interviews`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if interviews cannot be found', async () => {
      const response = await api
        .get(`/api/applications/${applicationId + 10}/interviews`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns empty array if applications does not have interviews', async () => {
      await applicationService.addNew(helper.initialApplications[1], userId);

      const applications = await applicationService.getAll(userId);

      const response = await api
        .get(`/api/applications/${applications[1].id}/interviews`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toStrictEqual([]);
    });

    it('Returns array of interviews if successful', async () => {
      const response = await api
        .get(`/api/applications/${applicationId}/interviews`)
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

  describe('Viewing all files for an application', () => {
    let applicationId: number;

    beforeEach(async () => {
      const applications = await applicationService.getAll(userId);

      applicationId = applications[0].id;

      await applicationFileService.addNew(
        { ...helper.sampleFiles[0], applicationId },
        userId
      );
      await applicationFileService.addNew(
        { ...helper.sampleFiles[1], applicationId },
        userId
      );
    });

    it('Returns invalid perms error if incorrect user views files', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/applications/${applicationId}/files`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if files cannot be found', async () => {
      const response = await api
        .get(`/api/applications/${applicationId + 10}/files`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns empty array if application does not have files', async () => {
      await applicationService.addNew(helper.initialApplications[1], userId);

      const applications = await applicationService.getAll(userId);

      const response = await api
        .get(`/api/applications/${applications[1].id}/files`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toStrictEqual([]);
    });

    it('Returns array of files if successful', async () => {
      const response = await api
        .get(`/api/applications/${applicationId}/files`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toEqual({
        ...helper.sampleFiles[0],
        id: expect.any(Number),
        userId,
        applicationId,
      });
    });
  });

  describe('Adding new application', () => {
    it('Returns application object if successful', async () => {
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
      });
    });
  });

  describe('Updating an application', () => {
    let applicationId: number;

    beforeEach(async () => {
      const applications = await applicationService.getAll(userId);

      applicationId = applications[0].id;
    });

    it('Returns invalid perms error if incorrect user updates application', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .put(`/api/applications/${applicationId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`)
        .send(helper.initialApplications[1]);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no application found', async () => {
      const response = await api
        .put(`/api/applications/${applicationId + 1}`)
        .set('authorization', `bearer ${userToken}`)
        .send(helper.initialApplications[1]);

      expect(response.status).toBe(404);
    });

    it('Returns updated application object if successful', async () => {
      const response = await api
        .put(`/api/applications/${applicationId}`)
        .set('authorization', `bearer ${userToken}`)
        .send(helper.initialApplications[2]);

      expect(response.body).toEqual({
        ...helper.initialApplications[2],
        id: applicationId,
        userId,
        applyDate: expect.any(String),
        assessmentDate: null,
        interviewDate: null,
        offerDate: null,
        rejectionDate: expect.any(String),
      });
    });
  });

  describe('Deleting an application', () => {
    let applicationId: number;

    beforeEach(async () => {
      const jobs = await applicationService.getAll(userId);

      applicationId = jobs[0].id;
    });

    it('Returns invalid perms error if incorrect user deletes application', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .delete(`/api/applications/${applicationId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no application found', async () => {
      const response = await api
        .delete(`/api/applications/${applicationId + 1}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns 204 if successful', async () => {
      const response = await api
        .delete(`/api/applications/${applicationId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
