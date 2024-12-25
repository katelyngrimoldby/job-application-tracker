import 'dotenv/config';
import express from 'express';
const app = express();
import 'express-async-errors';
import path from 'path';
import tokenExtractor from './middleware/tokenExtractor';
import errorHandler from './middleware/errorHandler';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import applicationRouter from './routes/applications';
import interviewRouter from './routes/interviews';
import fileRouter from './routes/files';
import applicationFileRouter from './routes/applicationFiles';
import interviewFileRouter from './routes/interviewFiles';

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build/dist'));
}

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/applications', tokenExtractor, applicationRouter);
app.use('/api/interviews', tokenExtractor, interviewRouter);
app.use('/api/files', tokenExtractor, fileRouter);
app.use('/api/files/application', tokenExtractor, applicationFileRouter);
app.use('/api/files/interview', tokenExtractor, interviewFileRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });
}

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routes/testing');
  app.use('/api/testing', testingRouter);
}

app.use(errorHandler);

export default app;
