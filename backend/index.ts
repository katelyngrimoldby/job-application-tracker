import express from 'express';
import cors from 'cors';
const app = express();
import { PORT, POSTGRES_URL } from './util/config';
import { connectToDatabase } from './util/db';

import userRouter from './routes/users';

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('working');
});

app.use('/api/users', userRouter);

const start = async () => {
  console.log(POSTGRES_URL);
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
