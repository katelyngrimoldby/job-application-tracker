import express from 'express';
const app = express();
import { PORT, POSTGRES_URL } from './util/config';
import { connectToDatabase } from './util/db';

app.get('/', (_req, res) => {
  res.send('working');
});

const start = async () => {
  console.log(POSTGRES_URL);
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
