import jwt from 'jsonwebtoken';
import { SECRET } from '../util/config';
import { Response, NextFunction } from 'express';
import { RequestUserAuth, Signature } from '../types';

interface RequestUserAuthHandler {
  (req: RequestUserAuth, res: Response, next: NextFunction): void;
}

const tokenExtractor: RequestUserAuthHandler = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (!(authorization && authorization.toLowerCase().startsWith('bearer '))) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    req.decodedToken = jwt.verify(
      authorization.substring(7),
      SECRET ? SECRET : 'secret'
    ) as Signature;

    next();
  } catch (err) {
    next(err);
  }
};

export default tokenExtractor;
