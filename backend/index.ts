import express from 'express';
import cors from 'cors';
const app = express();
import 'express-async-errors';
import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import tokenExtractor from './middleware/tokenExtractor';
import errorHandler from './middleware/errorHandler';
import authRouter from './routes/auth';
import userRouter from './routes/users';
import jobRouter from './routes/jobs';

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('working');
});

app.use('/api/auth', authRouter);
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
