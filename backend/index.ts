import express from 'express';
import cors from 'cors';
const app = express();
import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import tokenExtractor from './middleware/tokenExtractor';
import errorHandler from './middleware/errorHandler';
import { Response } from 'express';
import { RequestUserAuth } from './types';

import authService from './services/authService';
import userRouter from './routes/users';
import jobRouter from './routes/jobs';

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('working');
});

app.post('/api/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await authService.login(username, password);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

app.delete(
  '/api/logout',
  tokenExtractor,
  async (req: RequestUserAuth, res: Response) => {
    if (req.decodedToken) {
      const result = await authService.logout(req.decodedToken.id);

      return res.status(204).json(result);
    }
    return res.status(401).json({ error: 'Missing authentication' });
  }
);

app.use('/api/users', userRouter);
app.use('/api/jobs', tokenExtractor, jobRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
