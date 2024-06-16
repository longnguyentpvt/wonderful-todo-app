import bodyParser from "body-parser";
import cors from "cors";
import express, {
  Application, NextFunction, Request, Response
} from "express";

import MainCtrl from "@app/controllers/main.ctrl";
import TasksCtrl from "@app/controllers/tasks.ctrl";

import { systemConfig } from "@app/data/configuration";

import { ApiError, ApiErrorCode } from "@app/types/app";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    systemConfig();

    this.initializeMiddlewares();

    this.initControllers();

    this.addErrorHandler();
  }

  private initControllers(): void {
    const mainCtrl = new MainCtrl();
    const tasksCtrl = new TasksCtrl();

    this.app.use("/test", mainCtrl.initRoute());
    this.app.use("/tasks", tasksCtrl.initRoute());
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "5mb" }));
  }

  private addErrorHandler(): void {
    this.app.use((err: ApiError, req: Request<never, never, unknown>, res: Response, next: NextFunction): void => {
      const {
        rpMessage,
        rpCode,
        message,
        statusCode,
        stack
      } = err;
      const {
        path,
        query,
        body
      } = req;
      const errorCode = rpCode ?? ApiErrorCode.SYSTEM_ERROR;
      const errorMessage = rpMessage ?? "Unexpected system error! Please report this to us.";
      const rpStatusCode = statusCode ?? 500;

      if (errorCode === ApiErrorCode.SYSTEM_ERROR) {
        console.error({
          stack,
          message,
          path,
          query,
          body
        });
      }

      res.status(rpStatusCode).send({
        errorCode,
        errorMessage
      });

      next();
    });
  }
}

export default new App().app;
