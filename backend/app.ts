import express from 'express';
import cors from 'cors';
const app = express();
import 'express-async-errors';
import tokenExtractor from './middleware/tokenExtractor';
import sessionValidator from './middleware/sessionValidator';
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
app.use('/api/jobs', tokenExtractor, sessionValidator, jobRouter);

app.use(errorHandler);

export default app;
