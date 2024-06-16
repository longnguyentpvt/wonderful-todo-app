import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Association
} from "sequelize";

import { TaskStatus } from "@app/types/models";

import sequelize from "../seq";
import { UserAccount } from "./UserAccount";

export class TodoTask
  extends Model<InferAttributes<TodoTask>, InferCreationAttributes<TodoTask>> {
  declare id: CreationOptional<number>;

  declare userId: ForeignKey<UserAccount["id"]>;

  declare summary: string;

  declare description: string;

  declare status: TaskStatus;

  declare dueDate: Date;

  declare completedAt: CreationOptional<Date>;

  declare deletedAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  declare createdAt: CreationOptional<Date>;

  declare owner?: NonAttribute<UserAccount>;

  declare static associations: {
    owner: Association<TodoTask, UserAccount>;
  };
}

TodoTask.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  summary: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  dueDate: { type: DataTypes.DATE },
  completedAt: { type: DataTypes.DATE },
  deletedAt: { type: DataTypes.DATE },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
}, {
  sequelize,
  modelName: "todo_task",
  freezeTableName: true,
  createdAt: "createdAt",
  updatedAt: "updatedAt"
});
