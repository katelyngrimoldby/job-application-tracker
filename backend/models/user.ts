import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyCreateAssociationMixin,
} from '@sequelize/core';
import {
  PrimaryKey,
  Attribute,
  NotNull,
  AutoIncrement,
  Table,
  HasMany,
} from '@sequelize/core/decorators-legacy';

import Application from './application';
import Interview from './interview';
import { ApplicationFile, InterviewFile } from './file';

@Table({ timestamps: false })
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare username: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare passwordHash: string;

  // One-to-Many associations
  @HasMany(() => Application, { foreignKey: 'userId', inverse: { as: 'user' } })
  declare applications?: NonAttribute<Application[]>;

  @HasMany(() => Interview, { foreignKey: 'userId', inverse: { as: 'user' } })
  declare interviews?: NonAttribute<Interview[]>;

  @HasMany(() => ApplicationFile, {
    foreignKey: 'userId',
    inverse: { as: 'user' },
  })
  declare applicationFiles?: NonAttribute<ApplicationFile[]>;

  @HasMany(() => InterviewFile, {
    foreignKey: 'userId',
    inverse: { as: 'user' },
  })
  declare interviewFiles?: NonAttribute<InterviewFile[]>;

  // application methods
  declare getApplications: HasManyGetAssociationsMixin<Application>;
  declare createApplication: HasManyCreateAssociationMixin<
    Application,
    'userId'
  >;
  declare addApplication: HasManyAddAssociationMixin<
    Application,
    Application['id']
  >;
  declare removeApplication: HasManyRemoveAssociationMixin<
    Application,
    Application['id']
  >;

  // interview methods
  declare getInterviews: HasManyGetAssociationsMixin<Interview>;
  declare createInterview: HasManyCreateAssociationMixin<Interview, 'userId'>;
  declare addInterview: HasManyAddAssociationMixin<Interview, Interview['id']>;
  declare removeInterview: HasManyRemoveAssociationMixin<
    Interview,
    Interview['id']
  >;

  // applicationFile methods
  declare getApplicationFiles: HasManyGetAssociationsMixin<ApplicationFile>;
  declare createApplicationFile: HasManyCreateAssociationMixin<
    ApplicationFile,
    'userId'
  >;
  declare addApplicationFile: HasManyAddAssociationMixin<
    ApplicationFile,
    ApplicationFile['id']
  >;
  declare removeApplicationFile: HasManyRemoveAssociationMixin<
    ApplicationFile,
    ApplicationFile['id']
  >;

  // interviewFile methods
  declare getInterviewFiles: HasManyGetAssociationsMixin<InterviewFile>;
  declare createInterviewFile: HasManyCreateAssociationMixin<
    InterviewFile,
    'userId'
  >;
  declare addInterviewFile: HasManyAddAssociationMixin<
    InterviewFile,
    InterviewFile['id']
  >;
  declare removeInterviewFile: HasManyRemoveAssociationMixin<
    InterviewFile,
    InterviewFile['id']
  >;
}

export default User;
