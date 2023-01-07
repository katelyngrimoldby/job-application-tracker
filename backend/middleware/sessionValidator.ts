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

  const session = await authService.getSession(req.decodedToken.id);

  if (!session) {
    return res.status(401).json({ error: 'Session invalid' });
  }

  next();
};

export default sessionValidator;
