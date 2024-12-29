import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { createClient } from 'redis';
import { Umzug, SequelizeStorage } from 'umzug';
import {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASS,
  REDIS_URL,
  POSTGRES_HOST,
} from './config';
import {
  Application,
  User,
  Interview,
  ApplicationFile,
  InterviewFile,
} from '../models';

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASS,
  host: POSTGRES_HOST,
  define: {
    underscored: true,
  },
  models: [User, Application, Interview, ApplicationFile, InterviewFile],
});
const redis = createClient({
  url: REDIS_URL,
});

const migrator = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.queryInterface,
  logger: console,
});

const runMigrations = async () => {
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};
const rollbackMigration = async () => {
  await sequelize.authenticate();
  await migrator.down();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await redis.connect();
    await runMigrations();
    console.log('connected to the database');
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }

  return null;
};

export { sequelize, redis, connectToDatabase, rollbackMigration };

export type Migration = typeof migrator._types.migration;
