import { redis, sequelize, connectToDatabase } from '../util/db';
import { User, Application, Interview } from '../models';
import helper from '../util/testHelper';
import { NextFunction, Response } from 'express';
import { RequestUserAuth } from '../types';
import userService from '../services/userService';
import authService from '../services/authService';
import tokenExtractor from '../middleware/tokenExtractor';

describe('Token extractor middleware', () => {
  let mockRequest: Partial<RequestUserAuth>;
  let mockResponse: Partial<Response>;
  const mockNext: NextFunction = jest.fn();

  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await redis.FLUSHALL();
    await Application.truncate({ cascade: true });
    await Interview.truncate({ cascade: true });
    await User.truncate({ cascade: true });

    await userService.addNew(helper.initialUsers[0]);

    mockRequest = { headers: {} };
    mockResponse = {
      status: jest.fn((_code) => mockResponse as Response),
      json: jest.fn(),
    };
  });

  it('Returns missing token error if authorization header missing', () => {
    tokenExtractor(
      mockRequest as RequestUserAuth,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({ error: 'Token missing' });
  });

  it('Returns invalid token error if verification fails', () => {
    mockRequest = {
      headers: {
        authorization: 'bearer ewst56ty9ihiu89huj',
      },
    };

    tokenExtractor(
      mockRequest as RequestUserAuth,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toBeCalledTimes(1);
    expect(mockNext).toBeCalledWith(
      expect.objectContaining({ name: 'JsonWebTokenError' })
    );
  });

  it('Saves token payload if valid token', async () => {
    const user = helper.initialUsers[0];
    const loginRes = await authService.login(user.username, user.password);

    mockRequest = {
      headers: {
        authorization: `bearer ${loginRes.accessToken}`,
      },
    };

    tokenExtractor(
      mockRequest as RequestUserAuth,
      mockResponse as Response,
      mockNext
    );

    expect(mockRequest.decodedToken).toEqual({
      exp: expect.any(Number),
      iat: expect.any(Number),
      id: loginRes.id,
      username: user.username,
      name: user.name,
    });

    expect(mockNext).toBeCalledTimes(2);
    expect(mockNext).toBeCalledWith();
  });

  it('Returns error if no refresh token exists', async () => {
    const user = helper.initialUsers[0];
    const loginRes = await authService.login(user.username, user.password);
    await authService.logout(loginRes.id);

    mockRequest = {
      headers: {
        authorization: `bearer ${loginRes.accessToken}`,
        userid: `${loginRes.id}`,
      },
    };
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
