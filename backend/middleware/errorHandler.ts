import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Username is already taken' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'No refresh token' });
  }
  if (
    err.message === 'Invalid Permissions' ||
    err.message === 'Invalid username or password'
  ) {
    return res.status(401).json({ error: err.message });
  }
  if (
    err.message === "Application doesn't exist" ||
    err.message === "Interview doesn't exist"
  ) {
    return res.status(404).end();
  }
  return res.status(400).json({ error: err.message });
  next(err);
};

export default errorHandler;
