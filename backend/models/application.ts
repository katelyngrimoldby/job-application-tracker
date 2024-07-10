import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../util/db';

import { Status } from '../types';

class Application extends Model<
  InferAttributes<Application>,
  InferCreationAttributes<Application>
> {
  declare id: CreationOptional<number>;
  declare positionTitle: string;
  declare company: string;
  declare location: string;
  declare assessmentDate: string;
  declare interviewDate: string;
  declare offerDate: string;
  declare rejectionDate: string;
  declare jobId: string;
  declare status: Status;
  declare files: string[];
  declare userId: number;
  declare notes: string;
}
Application.init(
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
    assessmentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    interviewDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    offerDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rejectionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    jobId: {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: 'applyDate',
    updatedAt: false,
    modelName: 'application',
  }
);

export default Application;
