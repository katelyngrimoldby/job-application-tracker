// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require('sequelize');

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('jobs', 'notes', {
    type: DataTypes.TEXT,
    allowNull: true,
  });

  await queryInterface.addColumn('jobs', 'contacts', {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [],
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('jobs', 'notes');
  await queryInterface.removeColumn('jobs', 'contacts');
};

module.exports = { up, down };
