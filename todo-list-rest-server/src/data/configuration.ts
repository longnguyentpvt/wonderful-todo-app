import dayjs from "dayjs";
import timezonePlugin from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dotenv from "dotenv";

dotenv.config();
const {
  PORT,
  ENV,
  DB_HOST,
  DB_PORT,
  DB_USN,
  DB_PASSWORD,
  DB_NAME
} = process.env;

export const systemConfig = (): void => {
  dayjs.extend(utc);
  dayjs.extend(timezonePlugin);
  dayjs.tz.setDefault("UTC");

  if (ENV === "production") {
    console.log = (): void => {
    };
    console.debug = (): void => {
    };

    // handle console error to log to system database
  }
};

export const configuration = {
  port: PORT,
  env: ENV,
  dbHost: DB_HOST ?? "localhost",
  dbPort: parseInt(DB_PORT ?? "1883", 10),
  dbUsn: DB_USN ?? "admin",
  dbPassword: DB_PASSWORD ?? "...",
  dbName: DB_NAME ?? "todo_app"
};
