import { TodoTask } from "./models/TodoTask";
import { UserAccount } from "./models/UserAccount";

TodoTask.belongsTo(UserAccount, {
  foreignKey: "userId",
  as: "user"
});
