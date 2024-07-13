// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('@sequelize/core');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('applications', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      position_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apply_date: {
        type: DataTypes.DATE,
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
        type: DataTypes.STRING,
        defaultValue: 'None',
      },
      status: {
        type: DataTypes.ENUM(
          'applied',
          'assessments',
          'interviewing',
          'offered',
          'rejected'
        ),
        defaultValue: 'applied',
      },
      files: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('applications');
  },
};
