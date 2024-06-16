import {
  CreationOptional,
  Model,
  InferAttributes,
  InferCreationAttributes
} from "sequelize";

export class UserAccount
  extends Model<InferAttributes<UserAccount>, InferCreationAttributes<UserAccount>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare email: string;

  declare password: string;

  declare createdAt: Date;

  declare updatedAt: Date;
}
