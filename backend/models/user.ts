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
  HasManyCountAssociationsMixin,
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
  @HasMany(() => Application, 'userId')
  declare applications?: NonAttribute<Application[]>;

  @HasMany(() => Interview, 'userId')
  declare interviews?: NonAttribute<Interview[]>;

  // application methods
  declare getApplications: HasManyGetAssociationsMixin<Application>;
  declare addApplication: HasManyAddAssociationMixin<
    Application,
    Application['id']
  >;
  declare removeApplication: HasManyRemoveAssociationMixin<
    Application,
    Application['id']
  >;
  declare countApplications: HasManyCountAssociationsMixin<Application>;

  // interview methods
  declare getInterviews: HasManyGetAssociationsMixin<Interview>;
  declare addInterview: HasManyAddAssociationMixin<Interview, Interview['id']>;
  declare removeInterview: HasManyRemoveAssociationMixin<
    Interview,
    Interview['id']
  >;
  declare countInterviews: HasManyCountAssociationsMixin<Interview>;
}

export default User;
