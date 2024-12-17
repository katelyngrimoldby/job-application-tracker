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
  Default,
  HasMany,
} from '@sequelize/core/decorators-legacy';
import { InterviewFile } from './file';

@Table({ timestamps: false })
class Interview extends Model<
  InferAttributes<Interview>,
  InferCreationAttributes<Interview>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @Default('Unknown')
  declare contact: CreationOptional<string>;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare time: Date;

  @Attribute(DataTypes.STRING)
  @Default('')
  declare website: CreationOptional<string>;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare notes: string;

  // foreign keys
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare applicationId: number;

  // One-to-many association
  @HasMany(() => InterviewFile, {
    foreignKey: 'interviewId',
    inverse: { as: 'interview' },
  })
  declare files?: NonAttribute<InterviewFile[]>;

  // File methods
  declare getFiles: HasManyGetAssociationsMixin<InterviewFile>;
  declare addFile: HasManyAddAssociationMixin<
    InterviewFile,
    InterviewFile['id']
  >;
  declare removeFiles: HasManyRemoveAssociationsMixin<
    InterviewFile,
    InterviewFile['id']
  >;
}

export default Interview;
