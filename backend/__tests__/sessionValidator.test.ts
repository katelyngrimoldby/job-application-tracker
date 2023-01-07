import { redis, sequelize, connectToDatabase } from '../util/db';
import { User, Job } from '../models';
import helper from '../util/testHelper';
import { NextFunction, Response } from 'express';
import { RequestUserAuth } from '../types';
import userService from '../services/userService';
import authService from '../services/authService';
import tokenExtractor from '../middleware/tokenExtractor';
import sessionValidator from '../middleware/sessionValidator';

describe('Session validation middleware', () => {
  let mockRequest: Partial<RequestUserAuth>;
  let mockResponse: Partial<Response>;
  const mockNext: NextFunction = jest.fn();

  beforeAll(async () => {
    await connectToDatabase();
  });

  beforeEach(async () => {
    await redis.FLUSHALL();
    await Job.truncate({ cascade: true });
    await User.truncate({ cascade: true });

    await userService.addNew(helper.initialUsers[0]);

    const user = helper.initialUsers[0];
    const loginRes = await authService.login(user.username, user.password);

    mockRequest = {
      headers: { authorization: `bearer ${loginRes.session.token}` },
    };
    mockResponse = {
      status: jest.fn((_code) => mockResponse as Response),
      json: jest.fn(),
    };

    tokenExtractor(
      mockRequest as RequestUserAuth,
      mockResponse as Response,
      mockNext
    );
  });

  it('Returns invalid session error if access revoked', async () => {
    if (!mockRequest.decodedToken) {
      return false;
    }

    await redis.del(mockRequest.decodedToken.id.toString());

    await sessionValidator(
      mockRequest as RequestUserAuth,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toBeCalledWith(401);
    expect(mockResponse.json).toBeCalledWith({ error: 'Session invalid' });
  });

  it('Calls mockNext if session valid', async () => {
    await sessionValidator(
      mockRequest as RequestUserAuth,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toBeCalledTimes(3);
    expect(mockNext).toBeCalledWith();
  });

  afterAll(async () => {
    await sequelize.close();
    await redis.disconnect();
  });
});
