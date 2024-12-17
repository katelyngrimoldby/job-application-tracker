import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationsMixin,
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
import { ApplicationFile } from './file';

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
  @HasMany(() => Interview, {
    foreignKey: 'applicationId',
    inverse: { as: 'application' },
  })
  declare interviews?: NonAttribute<Interview[]>;

  @HasMany(() => ApplicationFile, {
    foreignKey: 'applicationId',
    inverse: { as: 'application' },
  })
  declare files?: NonAttribute<ApplicationFile[]>;

  // Interview methods
  declare getInterviews: HasManyGetAssociationsMixin<Interview>;
  declare addInterview: HasManyAddAssociationMixin<Interview, Interview['id']>;
  declare removeInterviews: HasManyRemoveAssociationsMixin<
    Interview,
    Interview['id']
  >;

  // File methods
  declare getFiles: HasManyGetAssociationsMixin<ApplicationFile>;
  declare addFile: HasManyAddAssociationMixin<
    ApplicationFile,
    ApplicationFile['id']
  >;
  declare removeFiles: HasManyRemoveAssociationsMixin<
    ApplicationFile,
    ApplicationFile['id']
  >;
}

export default Application;
