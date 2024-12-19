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
import applicationFileService from '../services/applicationFileService';

const api = supertest(app);

describe('Application file management', () => {
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

    await applicationFileService.addNew(
      { ...helper.sampleFiles[0], applicationId },
      userId
    );
  });

  describe('Viewing all files', () => {
    beforeEach(async () => {
      await applicationFileService.addNew(
        { ...helper.sampleFiles[1], applicationId },
        userId
      );
    });

    it('Returns array of all files', async () => {
      const response = await api
        .get('/api/files/application')
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

  describe('Viewing one file', () => {
    let fileId: number;

    beforeEach(async () => {
      const files = await applicationFileService.getAll(userId);
      fileId = files[0].id;
    });

    it('Returns invalid perms error if incorrect user views file', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .get(`/api/files/application/${fileId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no file found', async () => {
      const response = await api
        .get(`/api/files/application/${fileId + 10}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('Returns file object if successful', async () => {
      const response = await api
        .get(`/api/files/application/${fileId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.body).toEqual({
        ...helper.sampleFiles[0],
        id: fileId,
        userId,
        applicationId,
      });
    });
  });

  describe('Adding new file', () => {
    it('Returns 404 error if application cannot be found', async () => {
      const response = await api
        .post('/api/files/application')
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.sampleFiles[1], applicationId: applicationId + 10 });

      expect(response.status).toBe(404);
    });

    it('Returns file object if successful', async () => {
      const response = await api
        .post('/api/files/application')
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.sampleFiles[1], applicationId });

      expect(response.body).toEqual({
        ...helper.sampleFiles[1],
        id: expect.any(Number),
        userId,
        applicationId,
      });
    });
  });

  describe('Updating an file', () => {
    let fileId: number;

    beforeEach(async () => {
      const files = await applicationFileService.getAll(userId);
      fileId = files[0].id;
    });

    it('Returns invalid perms error if incorrect user updates file', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .put(`/api/files/application/${fileId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`)
        .send({ ...helper.sampleFiles[1], applicationId });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no file found', async () => {
      const response = await api
        .put(`/api/files/application/${fileId + 10}`)
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.sampleFiles[1], applicationId });

      expect(response.status).toBe(404);
    });

    it('Returns updated file object if successful', async () => {
      const response = await api
        .put(`/api/files/application/${fileId}`)
        .set('authorization', `bearer ${userToken}`)
        .send({ ...helper.sampleFiles[1], applicationId });

      expect(response.body).toEqual({
        ...helper.sampleFiles[1],
        id: fileId,
        userId,
        applicationId,
      });
    });
  });

  describe('Deleting an file', () => {
    let fileId: number;

    beforeEach(async () => {
      const files = await applicationFileService.getAll(userId);
      fileId = files[0].id;
    });

    it('Returns invalid perms error if incorrect user views file', async () => {
      const user = helper.initialUsers[1];
      await userService.addNew(user);
      const userAuth = await authService.login(user.username, user.password);

      const response = await api
        .delete(`/api/files/application/${fileId}`)
        .set('authorization', `bearer ${userAuth.accessToken}`);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid Permissions' });
    });

    it('Returns 404 if no file found', async () => {
      const response = await api
        .delete(`/api/files/application/${fileId + 10}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(404);
    });

    it('returns 204 if successful', async () => {
      const response = await api
        .delete(`/api/files/application/${fileId}`)
        .set('authorization', `bearer ${userToken}`);

      expect(response.status).toBe(204);
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
