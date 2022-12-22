import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../util/db';

class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {}
Job.init(
  {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'job',
  }
);

export default Job;
