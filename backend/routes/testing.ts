import express from 'express';
import {
  User,
  Application,
  Interview,
  ApplicationFile,
  InterviewFile,
} from '../models';
import { redis } from '../util/db';

const testingRouter = express.Router();

testingRouter.delete('/reset', async (_req, res) => {
  await redis.FLUSHALL();
  await Application.truncate({ cascade: true });
  await User.truncate({ cascade: true });
  await Interview.truncate({ cascade: true });
  await ApplicationFile.truncate({ cascade: true });
  await InterviewFile.truncate({ cascade: true });

  res.status(204).end();
});

export default testingRouter;
