// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const POSTGRES_URL = process.env.POSTGRES_URL;

export const REDIS_URL = process.env.REDIS_URL;

export const PORT = process.env.PORT || 8080;

export const SECRET = process.env.SECRET;
