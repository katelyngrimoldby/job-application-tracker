// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const POSTGRES_URL = process.env.POSTGRES_URL;

export const PORT = process.env.PORT || 3000;
