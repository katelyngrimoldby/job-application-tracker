import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../util/db';

class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare id: CreationOptional<number>;
  declare positionTitle: string;
  declare company: string;
  declare location: string;
  declare applied: string;
  declare compensation: string;
  declare status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  declare interviews: string[];
  declare jobDescription: string;
  declare userId: number;
  declare notes: string;
  declare contacts: string[];
}
Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    positionTitle: {
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
      defaultValue: [],
    },
    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contacts: {
      type: DataTypes.ARRAY(DataTypes.DATE),
      defaultValue: [],
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
