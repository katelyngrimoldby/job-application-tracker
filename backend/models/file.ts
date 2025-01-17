import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from '@sequelize/core';
import {
  PrimaryKey,
  Attribute,
  NotNull,
  AutoIncrement,
  Table,
} from '@sequelize/core/decorators-legacy';

@Table.Abstract
class BinFile<M extends BinFile<M>> extends Model<
  InferAttributes<M>,
  InferCreationAttributes<M>
> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare filename: string;

  @Attribute(DataTypes.BLOB)
  @NotNull
  declare fileData: Buffer<ArrayBuffer>;
  get fileBuff(): NonAttribute<Buffer<ArrayBuffer>> {
    const data = this.fileData;
    return data;
  }

  // Foriegn key
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare userId: number;
}

@Table({ timestamps: false })
class ApplicationFile extends BinFile<ApplicationFile> {
  // Foriegn keys
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare applicationId: number;
}
@Table({ timestamps: false })
class InterviewFile extends BinFile<InterviewFile> {
  // Foriegn keys
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare interviewId: number;
}

export { ApplicationFile, InterviewFile };
