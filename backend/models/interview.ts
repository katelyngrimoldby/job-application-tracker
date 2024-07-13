import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import {
  Attribute,
  AutoIncrement,
  NotNull,
  PrimaryKey,
  Table,
  Default,
} from '@sequelize/core/decorators-legacy';

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

  @Attribute(DataTypes.ARRAY(DataTypes.TEXT))
  @NotNull
  declare files: string[];

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
}

export default Interview;
