import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
} from '@sequelize/core';
import {
  Attribute,
  AutoIncrement,
  NotNull,
  PrimaryKey,
  Table,
  CreatedAt,
  Default,
  HasMany,
} from '@sequelize/core/decorators-legacy';

import { Status } from '../types';
import Interview from './interview';
import BinFile from './binFile';

@Table({
  updatedAt: false,
})
class Application extends Model<
  InferAttributes<Application>,
  InferCreationAttributes<Application>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare positionTitle: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare company: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare location: string;

  @CreatedAt
  declare applyDate: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare assessmentDate: Date | null;

  @Attribute(DataTypes.DATE)
  declare interviewDate: Date | null;

  @Attribute(DataTypes.DATE)
  declare offerDate: Date | null;

  @Attribute(DataTypes.DATE)
  declare rejectionDate: Date | null;

  @Attribute(DataTypes.STRING)
  @Default('None')
  declare jobId: CreationOptional<string>;

  @Attribute(
    DataTypes.ENUM(
      'applied',
      'assessments',
      'interviewing',
      'offered',
      'rejected'
    )
  )
  @Default('applied')
  declare status: CreationOptional<Status>;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare notes: string;

  // Foreign key
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  // One-to-Many associations
  @HasMany(() => Interview, 'applicationId')
  declare interviews?: NonAttribute<Interview[]>;

  @HasMany(() => BinFile, 'applicationId')
  declare files?: NonAttribute<BinFile[]>;

  // Interview methods
  declare getInterviews: HasManyGetAssociationsMixin<Interview>;
  declare addInterview: HasManyAddAssociationMixin<Interview, Interview['id']>;

  // File methods
  declare getFiles: HasManyGetAssociationsMixin<BinFile>;
  declare addFile: HasManyAddAssociationMixin<BinFile, BinFile['id']>;
}

export default Application;
