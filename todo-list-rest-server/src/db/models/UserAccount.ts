import {
  CreationOptional,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes
} from "sequelize";

import sequelize from "../seq";

export class UserAccount
  extends Model<InferAttributes<UserAccount>, InferCreationAttributes<UserAccount>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare email: string;

  declare password: string;

  declare createdAt: Date;

  declare updatedAt: Date;
}

UserAccount.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: DataTypes.BIGINT },
  email: { type: DataTypes.BIGINT },
  password: { type: DataTypes.BIGINT },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
}, {
  sequelize,
  modelName: "user_account",
  freezeTableName: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt"
});
