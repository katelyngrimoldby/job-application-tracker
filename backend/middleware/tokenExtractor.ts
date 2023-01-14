import jwt from 'jsonwebtoken';
import { SECRET } from '../util/config';
import { Response, NextFunction } from 'express';
import { RequestUserAuth, Signature } from '../types';
import authService from '../services/authService';

interface RequestUserAuthHandler {
  (req: RequestUserAuth, res: Response, next: NextFunction): void;
}

const tokenExtractor: RequestUserAuthHandler = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ error: 'Token missing' });
  }

  if (!SECRET) {
    return res.status(500).json({ error: 'Missing env variable' });
  }

  try {
    req.decodedToken = jwt.verify(
      authorization.substring(7),
      SECRET ? SECRET : 'secret'
    ) as Signature;

    next();
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'TokenExpiredError') {
        if (!req.headers['userid']) {
          return res.status(401).json({ error: 'No refresh token' });
        }

        const session = await authService.getSession(
          Number(req.headers['userid'])
        );

        if (!session) {
          return res.status(401).json({ error: 'No refresh token' });
        }

        try {
          req.decodedToken = jwt.verify(
            session.accessToken,
            SECRET ? SECRET : 'secret'
          ) as Signature;

          next();
        } catch (err) {
          next(err);
        }
      }
      next(err);
    }
  }
};

export default tokenExtractor;
