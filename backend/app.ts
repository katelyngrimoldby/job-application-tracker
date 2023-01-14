// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express from 'express';
const app = express();
import 'express-async-errors';
import path from 'path';
import tokenExtractor from './middleware/tokenExtractor';
import errorHandler from './middleware/errorHandler';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import jobRouter from './routes/jobs';

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build/dist'));
}

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/jobs', tokenExtractor, jobRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });
}

app.use(errorHandler);

export default app;
