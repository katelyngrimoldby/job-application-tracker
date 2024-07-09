import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../util/db';

class Interview extends Model<
  InferAttributes<Interview>,
  InferCreationAttributes<Interview>
> {
  declare id: CreationOptional<number>;
  declare applicationId: number;
  declare contact: string;
  declare time: string;
  declare website: string;
  declare files: string[];
  declare notes: string;
  declare userId: number;
}

Interview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    applicationId: {
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
    modelName: 'interview',
  }
);

export default Interview;
