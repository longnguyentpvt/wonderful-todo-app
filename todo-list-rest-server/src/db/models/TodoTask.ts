import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Association
} from "sequelize";

import { TaskStatus } from "@app/types/models";

import { UserAccount } from "./UserAccount";

export class TodoTask
  extends Model<InferAttributes<TodoTask>, InferCreationAttributes<TodoTask>> {
  declare id: CreationOptional<number>;

  declare userId: ForeignKey<UserAccount["id"]>;

  declare summary: string;

  declare description: string;

  declare status: TaskStatus;

  declare dueDate: Date;

  declare completedAt: CreationOptional<Date | null>;

  declare updatedAt: CreationOptional<Date>;

  declare createdAt: CreationOptional<Date>;

  declare owner?: NonAttribute<UserAccount>;

  declare static associations: {
    owner: Association<TodoTask, UserAccount>;
  };
}
