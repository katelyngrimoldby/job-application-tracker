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
import interviewFileService from '../services/interviewFileService';

const api = supertest(app);

describe('Interview file management', () => {
  let userToken: string;
  let userId: number;
  let applicationId: number;
  let interviewId: number;

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

    const application = await applicationService.addNew(
      helper.initialApplications[0],
      userId
    );

    applicationId = application.id;

    const interview = await interviewService.addNew(
      { ...helper.initialInterviews[0], applicationId },
      userId
    );

    interviewId = interview.id;

    await interviewFileService.addNew(
      { ...helper.sampleFiles[0], interviewId },
      userId
    );
  });

  describe('Viewing all files', () => {
    beforeEach(async () => {
      await interviewFileService.addNew(
        { ...helper.sampleFiles[1], interviewId },
        userId
      );
    });

    it('Returns array of all files', async () => {
      const response = await api
        .get('/api/files/interview')
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toEqual({
        ...helper.sampleFiles[0],
        fileData: expect.any(Object),
        id: expect.any(Number),
        userId,
        interviewId,
      });
    });
  });

  describe('Viewing one file', () => {
    let fileId: number;

    beforeEach(async () => {
      const files = await interviewFileService.getAll(userId);
      fileId = files[0].id;
    });

    it('Returns invalid perms error if incorrect user views file', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/files/interview/${fileId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no file found', async () => {
      const response = await api
        .get(`/api/files/interview/${fileId + 10}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns file object if successful', async () => {
      const response = await api
        .get(`/api/files/interview/${fileId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toEqual({
        ...helper.sampleFiles[0],
        fileData: expect.any(Object),
        id: fileId,
        userId,
        interviewId,
      });
    });
  });

  describe('Adding new file', () => {
    it('Returns 404 error if interview cannot be found', async () => {
      const response = await api
        .post('/api/files/interview')
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.sampleFiles[1], interviewId: interviewId + 10 });

      expect(response.status).toBe(404);
    });

    it('Returns file object if successful', async () => {
      const response = await api
        .post('/api/files/interview')
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.sampleFiles[1], interviewId });

      expect(response.body).toEqual({
        ...helper.sampleFiles[1],
        fileData: expect.any(Object),
        id: expect.any(Number),
        userId,
        interviewId,
      });
    });
  });

  describe('Updating an file', () => {
    let fileId: number;

    beforeEach(async () => {
      const files = await interviewFileService.getAll(userId);
      fileId = files[0].id;
    });

    it('Returns invalid perms error if incorrect user updates file', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .put(`/api/files/interview/${fileId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`)
        .send({ ...helper.sampleFiles[1], interviewId });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no file found', async () => {
      const response = await api
        .put(`/api/files/interview/${fileId + 10}`)
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.sampleFiles[1], interviewId });

      expect(response.status).toBe(404);
    });

    it('Returns updated file object if successful', async () => {
      const response = await api
        .put(`/api/files/interview/${fileId}`)
        .set('authorization', `bearer ${userToken}`)
        .send({
          ...helper.sampleFiles[1],
          interviewId,
        });

      expect(response.body).toEqual({
        ...helper.sampleFiles[1],
        fileData: expect.any(Object),
        id: fileId,
        userId,
        interviewId,
      });
    });
  });

  describe('Deleting an file', () => {
    let fileId: number;

    beforeEach(async () => {
      const files = await interviewFileService.getAll(userId);
      fileId = files[0].id;
    });

    it('Returns invalid perms error if incorrect user views file', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .delete(`/api/files/interview/${fileId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no file found', async () => {
      const response = await api
        .delete(`/api/files/interview/${fileId + 10}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('returns 204 if successful', async () => {
      const response = await api
        .delete(`/api/files/interview/${fileId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
