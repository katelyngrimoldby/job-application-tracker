// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('jobs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    position_title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    company: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    applied: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    compensation: {
      type: DataTypes.TEXT,
      defaultValue: 'N/A',
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: 'applied',
    },
    interviews: {
      type: DataTypes.ARRAY(DataTypes.DATE),
    },
    job_description: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  await queryInterface.addColumn('jobs', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('jobs');
  await queryInterface.dropTable('users');
};

module.exports = { up, down };
