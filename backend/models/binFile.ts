import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from '@sequelize/core';
import {
  PrimaryKey,
  Attribute,
  NotNull,
  AutoIncrement,
  Table,
  Default,
} from '@sequelize/core/decorators-legacy';

@Table({ timestamps: false })
class BinFile extends Model<
  InferAttributes<BinFile>,
  InferCreationAttributes<BinFile>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare filename: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare fileData: string;

  @Attribute(DataTypes.ENUM('application', 'interview'))
  @Default('application')
  declare belongsTo: CreationOptional<'application' | 'interview'>;

  // foriegn keys
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;

  @Attribute(DataTypes.INTEGER)
  declare applicationId: number | null;

  @Attribute(DataTypes.INTEGER)
  declare interviewId: number | null;
}

export default BinFile;
