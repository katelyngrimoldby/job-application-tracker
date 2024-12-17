import { DataTypes } from '@sequelize/core';
import type { Migration } from '../util/db';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('binfiles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    file_data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    belongs_to: {
      type: DataTypes.ENUM('application', 'interview'),
      defaultValue: 'application',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { table: 'users', key: 'id' },
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { table: 'applications', key: 'id' },
    },
    interview_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { table: 'interviews', key: 'id' },
    },
  });

  await queryInterface.removeColumn('applications', 'files');
  await queryInterface.removeColumn('interviews', 'files');
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('binfiles');
  await queryInterface.addColumn('applications', 'files', {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
  });
  await queryInterface.addColumn('interviews', 'files', {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
  });
};
