import dayjs from "dayjs";
import {
  NextFunction, Response, Router
} from "express";

import { auth } from "@app/services/session-scope";
import {
  NewTaskError, getTasks, newTask, editTask, deleteTask, EditTaskErrror,
  DeleteTaskError
} from "@app/services/tasks-crud";

import { TestAuthedRp } from "@app/types/api-response";
import { ApiErrorCode, AppController, AuthRequest } from "@app/types/app";
import { TaskStatus } from "@app/types/models";
import { TaskDto } from "@app/types/services";

class Ctrl implements AppController {
  listTasksApi = async (
    req: AuthRequest<never, never, never, {
      page: string,
      pageSize?: string,
      filterName?: string,
      filterStatus?: TaskStatus
    }>,
    res: Response<{
      data: TaskDto[],
      countAll: number
    }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        page = "1",
        pageSize,
        filterName,
        filterStatus
      } = req.query;
      const pageNo = parseInt(page, 10);
      const size = pageSize ? parseInt(pageSize, 10) : undefined;

      const rp = await getTasks({
        page: pageNo,
        pageSize: size,
        filterName,
        filterStatus
      });
      res.status(200).send(rp);
    } catch (e) {
      next(e);
    }
  };

  newTaskApi = async (
    req: AuthRequest<never, never, {
      name: string,
      description: string,
      dueDate: string
    }>,
    res: Response<TaskDto>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        name, description, dueDate
      } = req.body;
      const {
        data,
        errCode
      } = await newTask(name, description, dueDate);

      if (errCode) {
        let rpCode = ApiErrorCode.SYSTEM_ERROR;
        let rpMessage = "";

        switch (errCode) {
          case NewTaskError.InvalidName:
            rpCode = ApiErrorCode.INVALID_DATA;
            rpMessage = "Name is invalid format!";
            break;
          case NewTaskError.InvalidDescirption:
            rpCode = ApiErrorCode.INVALID_DATA;
            rpMessage = "Description is invalid format!";
            break;
          case NewTaskError.InvalidDueDate:
            rpCode = ApiErrorCode.INVALID_DATA;
            break;
          default:
            rpMessage = "System Error!";
            break;
        }

        throw {
          statusCode: 400,
          rpCode,
          rpMessage
        };
      }

      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  };

  deleteTaskApi = async (
    req: AuthRequest<never, never, never, { id: string }>,
    res: Response<TestAuthedRp>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const time = dayjs();

      const { id } = req.query;

      const taskId = id ? parseInt(id, 10) : 0;
      const { data: success, errCode } = await deleteTask(taskId);
      if (errCode) {
        let rpCode = ApiErrorCode.SYSTEM_ERROR;
        let rpMessage = "";
        let statusCode = 400;

        switch (errCode) {
          case DeleteTaskError.TaskNotFound:
            rpCode = ApiErrorCode.NOT_FOUND;
            rpMessage = "Task does not exists!";
            statusCode = 404;
            break;
          default:
            rpMessage = "System Error!";
            break;
        }

        throw {
          statusCode,
          rpCode,
          rpMessage
        };
      }

      res.status(200).send({
        success: success ?? false,
        time
      });
    } catch (e) {
      next(e);
    }
  };

  editTaskApi = async (
    req: AuthRequest<never, never, {
      id: number,
      name: string,
      description: string,
      status: TaskStatus
    }>,
    res: Response<TaskDto>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        name, description, status, id
      } = req.body;
      const {
        data,
        errCode
      } = await editTask({
        id,
        name,
        description,
        status
      });

      if (errCode) {
        let rpCode = ApiErrorCode.SYSTEM_ERROR;
        let rpMessage = "";
        let statusCode = 400;

        switch (errCode) {
          case EditTaskErrror.InvalidName:
            rpCode = ApiErrorCode.INVALID_DATA;
            rpMessage = "Name is invalid format!";
            break;
          case EditTaskErrror.InvalidDescirption:
            rpCode = ApiErrorCode.INVALID_DATA;
            rpMessage = "Description is invalid format!";
            break;
          case EditTaskErrror.InvalidStatus:
            rpCode = ApiErrorCode.INVALID_DATA;
            rpMessage = "Status is invalid data!";
            break;
          case EditTaskErrror.TaskNotFound:
            rpCode = ApiErrorCode.NOT_FOUND;
            rpMessage = "Task does not exists!";
            statusCode = 404;
            break;
          default:
            rpMessage = "System Error!";
            break;
        }

        throw {
          statusCode,
          rpCode,
          rpMessage
        };
      }

      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  };

  initRoute(): Router {
    const router = Router();
    router.get("/list", auth(), this.listTasksApi);
    router.post("/new", auth(), this.newTaskApi);
    router.delete("/delete", auth(), this.deleteTaskApi);
    router.post("/update", auth(), this.editTaskApi);
    return router;
  }
}

export default Ctrl;
