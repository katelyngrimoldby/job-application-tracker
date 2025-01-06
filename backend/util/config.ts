// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const POSTGRES_DB = process.env.POSTGRES_DB;

const POSTGRES_USER = process.env.POSTGRES_USER;

const POSTGRES_PASS = process.env.POSTGRES_PASS;

const POSTGRES_HOST = process.env.POSTGRES_HOST || '127.0.0.1';

const REDIS_URL = process.env.REDIS_URL;

const PORT = process.env.PORT || 8080;

const SECRET = process.env.SECRET;

export {
  PORT,
  SECRET,
  REDIS_URL,
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_DB,
  POSTGRES_HOST,
};
