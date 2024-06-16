import { DataTypes, Sequelize } from "sequelize";

import { TodoTask } from "./models/TodoTask";
import { UserAccount } from "./models/UserAccount";

export const init = (seq: Sequelize): void => {
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
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {
    sequelize: seq,
    modelName: "todo_task",
    freezeTableName: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  });

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
    sequelize: seq,
    modelName: "user_account",
    freezeTableName: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  });

  TodoTask.belongsTo(UserAccount, {
    foreignKey: "userId",
    as: "user"
  });
};
