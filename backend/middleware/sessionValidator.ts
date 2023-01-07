import { Response, NextFunction } from 'express';
import authService from '../services/authService';
import { RequestUserAuth } from '../types';

interface RequestUserAuthHandler {
  (req: RequestUserAuth, res: Response, next: NextFunction): void;
}

const sessionValidator: RequestUserAuthHandler = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (
    !(
      authorization &&
      authorization.toLowerCase().startsWith('bearer ') &&
      req.decodedToken
    )
  ) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const session = await authService.getSession(req.decodedToken.id);
    if (!session || session.token != authorization.substring(7)) {
      console.log('here2');
      return res.status(401).json({ error: 'Session invalid' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default sessionValidator;
