import {
  Transaction,
  Sequelize,
  literal,
  WhereOptions,
  InferAttributes,
  Op
} from "sequelize";

import sequelize from "./seq";
import "./associations";

type TransactionCallback<T> = (t: Transaction) => PromiseLike<T>;

export const config = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.info("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:");
  }
};

export async function transaction<T>(callback: TransactionCallback<T>): Promise<T> {
  return sequelize.transaction(callback);
}

export * from "./models/UserAccount";
export * from "./models/TodoTask";

export const getSequelize = (): Sequelize => sequelize;

export {
  literal,
  Transaction,
  Op
};

export type {
  WhereOptions,
  InferAttributes
};
