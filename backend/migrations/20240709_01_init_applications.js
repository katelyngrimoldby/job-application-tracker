// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('applications', {
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
      assessment_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      interview_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      offer_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rejection_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      job_id: {
        type: DataTypes.TEXT,
        defaultValue: 'None',
      },
      status: {
        type: DataTypes.TEXT,
        defaultValue: 'applied',
      },
      files: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('applications');
  },
};
