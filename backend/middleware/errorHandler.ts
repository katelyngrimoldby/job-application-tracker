import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ error: 'Username is already taken' });
  }

  if (
    err.message === 'Invalid Permissions' ||
    err.message === 'Invalid username or password'
  ) {
    res.status(401).json({ error: err.message });
  }

  res.status(400).json({ error: err.message });
  next(err);
};

export default errorHandler;
