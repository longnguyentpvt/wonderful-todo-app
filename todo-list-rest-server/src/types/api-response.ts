import dayjs from "dayjs";

export type HealthCheckRp = {
  path: string,
  query: string,
  body: unknown,
  time: string
};

export type TestAuthedRp = {
  success: boolean,
  time: dayjs.Dayjs
};
