import jwt from 'jsonwebtoken';
import { SECRET } from '../util/config';
import { Session } from '../models';
import { Response, NextFunction } from 'express';
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
    const session = await Session.findOne({
      where: { token: authorization.substring(7) },
    });

    req.decodedToken = jwt.verify(
      authorization.substring(7),
      SECRET ? SECRET : 'secret'
    ) as Signature;

    if (!session || session.userId != req.decodedToken.id) {
      return res.status(401).json({ error: 'Session invalid' });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default tokenExtractor;
