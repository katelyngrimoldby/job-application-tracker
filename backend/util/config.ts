// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const POSTGRES_DB = process.env.POSTGRES_DB;

export const POSTGRES_USER = process.env.POSTGRES_USER;

export const POSTGRES_PASS = process.env.POSTGRES_PASS;

export const REDIS_URL = process.env.REDIS_URL;

export const PORT = process.env.PORT || 8080;

export const SECRET = process.env.SECRET;
