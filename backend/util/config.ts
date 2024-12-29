// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

let POSTGRES_USER: string | undefined;
let POSTGRES_PASS: string | undefined;
let POSTGRES_DB: string | undefined;

if (process.env.POSTGRES_URL) {
  const url = process.env.POSTGRES_URL.replace('postgresql://', '');

  POSTGRES_USER = url.substring(0, url.indexOf(':'));
  POSTGRES_PASS = url.substring(url.indexOf(':') + 1, url.indexOf('@'));
  POSTGRES_DB = url.substring(url.indexOf('/'));
} else {
  POSTGRES_DB = process.env.POSTGRES_DB;

  POSTGRES_USER = process.env.POSTGRES_USER;

  POSTGRES_PASS = process.env.POSTGRES_PASS;
}

const REDIS_URL = process.env.REDIS_URL;

const PORT = process.env.PORT || 8080;

const SECRET = process.env.SECRET;

export { PORT, SECRET, REDIS_URL, POSTGRES_USER, POSTGRES_PASS, POSTGRES_DB };
