import { TaskStatus } from "@app/types/model";

export type TaskInfo = {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: TaskStatus;
};
