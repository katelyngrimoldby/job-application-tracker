const { DataTypes } = require('@sequelize/core');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('interviews', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      contact: {
        type: DataTypes.STRING,
        defaultValue: 'Unknown',
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      website: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      files: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      application_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { table: 'applications', key: 'id' },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { table: 'users', key: 'id' },
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('interviews');
  },
};
