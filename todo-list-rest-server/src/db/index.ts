import {
  Transaction,
  literal,
  WhereOptions,
  InferAttributes,
  Op,
  Sequelize
} from "sequelize";

import { configuration } from "@app/data/configuration";

import { init } from "./associations";

const {
  dbName,
  dbUsn,
  dbPassword,
  dbHost,
  dbPort
} = configuration;

type TransactionCallback<T> = (t: Transaction) => PromiseLike<T>;

let sequelize: Sequelize | null = null;

export const config = async (): Promise<void> => {
  try {
    if (sequelize) return;

    sequelize = new Sequelize(dbName, dbUsn, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: "mysql",
      pool: {
        max: 3,
        min: 0,
        idle: 5000,
        acquire: 10000,
        evict: 30000
      },
      define: {
        charset: "utf8mb4_unicode_ci",
        underscored: true
      },
      sync: { force: false },
      logging: console.log
    });

    init(sequelize);

    await sequelize.authenticate();
    console.info("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:");
  }
};

export const close = async (): Promise<void> => {
  if (!sequelize) return;

  await sequelize.close();
  sequelize = null;
};

export async function transaction<T>(callback: TransactionCallback<T>): Promise<T> {
  if (!sequelize) throw new Error("Database is not configured.");

  return sequelize.transaction(callback);
}

export * from "./models/UserAccount";
export * from "./models/TodoTask";

export const getSequelize = (): Sequelize | null => sequelize;

export {
  literal,
  Transaction,
  Op
};

export type {
  WhereOptions,
  InferAttributes
};
