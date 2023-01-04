import jwt from 'jsonwebtoken';
import { SECRET } from '../util/config';
import { Response, NextFunction } from 'express';
import authService from '../services/authService';
import { RequestUserAuth, Signature } from '../types';

interface RequestUserAuthHandler {
  (req: RequestUserAuth, res: Response, next: NextFunction): void;
}

const tokenExtractor: RequestUserAuthHandler = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    req.decodedToken = jwt.verify(
      authorization.substring(7),
      SECRET ? SECRET : 'secret'
    ) as Signature;

    const session = await authService.getSession(req.decodedToken.id);

    if (!session || session.token != authorization.substring(7)) {
      return res.status(401).json({ error: 'Session invalid' });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default tokenExtractor;
