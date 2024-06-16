import dayjs from "dayjs";

import { TaskStatus } from "./models";

export interface ResultWithError<T, E> {
  data?: T,
  errCode?: E
}

export type TaskDto = {
  id: number,
  name: string,
  description: string,
  dueDate: dayjs.Dayjs,
  status: TaskStatus,
  completedDate?: dayjs.Dayjs
};
