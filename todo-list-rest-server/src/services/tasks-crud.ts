import dayjs from "dayjs";

import {
  InferAttributes, Op, TodoTask, WhereOptions
} from "@app/db";

import { TaskStatus } from "@app/types/models";
import { ResultWithError, TaskDto } from "@app/types/services";

export enum NewTaskError {
  InvalidName = 1,
  InvalidDescirption,
  InvalidDueDate
}

export enum EditTaskErrror {
  TaskNotFound = 1,
  InvalidName,
  InvalidDescirption,
  InvalidStatus
}

export enum DeleteTaskError {
  TaskNotFound
}

const DEFAULT_USER_ID = 1;

const toTaskDto = (task: TodoTask): TaskDto => {
  const {
    id, summary, description, dueDate, status, completedAt
  } = task;

  return {
    id,
    name: summary,
    description,
    dueDate: dayjs(dueDate),
    completedDate: dayjs(completedAt),
    status
  };
};

const validateName = (name: string): boolean => !!name && name.length <= 255;
const validateDescription = (description: string): boolean => !!description && description.length <= 2000;
const validateDueDate = (date: dayjs.Dayjs): boolean => date.isValid() && date.isBefore(dayjs());

export const getTasks = async (data: {
  filterName?: string,
  filterStatus?: TaskStatus,
  page: number,
  pageSize?: number
}): Promise<{
  data: TaskDto[],
  countAll: number
}> => {
  const {
    filterName, filterStatus, page, pageSize
  } = data;
  const limit = pageSize || 50;
  const offset = (page - 1) * limit;

  const whereStatement: WhereOptions<TodoTask> = {};
  whereStatement.userId = DEFAULT_USER_ID;

  if (filterName) {
    whereStatement.summary = { [Op.like]: `%${ filterName }%` };
  }
  if (filterStatus) {
    whereStatement.status = filterStatus;
  }

  const {
    rows: tasks,
    count
  } = await TodoTask.findAndCountAll({
    where: whereStatement,
    limit,
    offset
  });

  const dtos = tasks.map(toTaskDto);
  return {
    data: dtos,
    countAll: count
  };
};

export const newTask = async (name: string, description: string, dueDate: string): Promise<ResultWithError<TaskDto, NewTaskError>> => {
  const validName = validateName(name);
  if (!validName) {
    return { errCode: NewTaskError.InvalidName };
  }
  const validDesc = validateDescription(description);
  if (!validDesc) {
    return { errCode: NewTaskError.InvalidDescirption };
  }

  const dueDayJs = dayjs(dueDate);
  const validDueDate = validateDueDate(dueDayJs);
  if (!validDueDate) {
    return { errCode: NewTaskError.InvalidDueDate };
  }

  const task = await TodoTask.create({
    userId: DEFAULT_USER_ID,
    summary: name,
    description,
    dueDate: dueDayJs.toDate(),
    status: TaskStatus.Pending
  });

  const dto = toTaskDto(task);
  return { data: dto };
};

export const editTask = async (data: {
  id: number,
  name?: string,
  description?: string,
  status?: TaskStatus
}): Promise<ResultWithError<TaskDto, EditTaskErrror>> => {
  const now = dayjs();
  const {
    name, description, status, id: taskId
  } = data;

  const task = await TodoTask.findByPk(taskId);
  if (task === null) {
    return { errCode: EditTaskErrror.TaskNotFound };
  }

  const updateStatement: InferAttributes<TodoTask> = {} as InferAttributes<TodoTask>;

  if (name) {
    const validName = validateName(name);
    if (!validName) {
      return { errCode: EditTaskErrror.InvalidName };
    }
    updateStatement.summary = name;
  }

  if (description) {
    const validDesc = validateDescription(description);
    if (!validDesc) {
      return { errCode: EditTaskErrror.InvalidDescirption };
    }
    updateStatement.description = description;
  }

  if (status) {
    if (Object.values(TaskStatus).indexOf(status) < 0) {
      return { errCode: EditTaskErrror.InvalidStatus };
    }

    updateStatement.status = status;
    if (status === "Done") {
      updateStatement.completedAt = now.toDate();
    } else {
      updateStatement.completedAt = null;
    }
  }

  await TodoTask.update(updateStatement, {
    where: { id: taskId }
  });

  const uppdatedTask = await TodoTask.findByPk(taskId);
  if (!uppdatedTask) {
    throw new Error("Task not found");
  }

  const dto = toTaskDto(uppdatedTask);
  return { data: dto };
};

export const deleteTask = async (taskId: number): Promise<ResultWithError<boolean, DeleteTaskError>> => {
  const task = await TodoTask.findByPk(taskId);
  if (task === null) {
    return { errCode: DeleteTaskError.TaskNotFound };
  }

  const affectedRows = await TodoTask.destroy({ where: { id: taskId } });
  return { data: affectedRows > 0 };
};
