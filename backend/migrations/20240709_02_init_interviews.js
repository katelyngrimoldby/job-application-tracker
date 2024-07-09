// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('interviews', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      application_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'applications', key: 'id' },
      },
      contact: {
        type: DataTypes.TEXT,
        defaultValue: 'Unknown',
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      website: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      files: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('interviews');
  },
};
