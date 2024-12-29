// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

console.log(process.env.DATABASE_URL);

const POSTGRES_DB = process.env.POSTGRES_DB;

const POSTGRES_USER = process.env.POSTGRES_USER;

const POSTGRES_PASS = process.env.POSTGRES_PASS;

const REDIS_URL = process.env.REDIS_URL;

const PORT = process.env.PORT || 8080;

const SECRET = process.env.SECRET;

export { PORT, SECRET, REDIS_URL, POSTGRES_USER, POSTGRES_PASS, POSTGRES_DB };
