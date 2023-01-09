import { Sequelize } from 'sequelize';
import { createClient } from 'redis';
import { Umzug, SequelizeStorage } from 'umzug';
import { POSTGRES_URL, REDIS_URL } from './config';

console.log(POSTGRES_URL);

const sequelize = new Sequelize(POSTGRES_URL ? POSTGRES_URL : 'nodb:');
const redis = createClient({
  url: REDIS_URL,
});

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
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
