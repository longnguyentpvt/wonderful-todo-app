import dayjs from "dayjs";
import {
  NextFunction, Request, Response, Router
} from "express";

import { hello } from "@app/services/auth";
import { auth } from "@app/services/session-scope";

import { HealthCheckRp, TestAuthedRp } from "@app/types/api-response";
import { AppController, AuthRequest } from "@app/types/app";

class Ctrl implements AppController {
  healthCheck = async (
    req: Request<never, never, HealthCheckRp>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        path,
        query,
        body
      } = req;
      const time = dayjs().tz();

      res.status(200).send({
        path,
        query,
        body,
        time
      });
    } catch (e) {
      next(e);
    }
  };

  testAuthedApi = async (
    req: AuthRequest,
    res: Response<TestAuthedRp>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const time = dayjs();

      hello();

      res.status(200).send({
        success: true,
        time
      });
    } catch (e) {
      next(e);
    }
  };

  initRoute(): Router {
    const router = Router();
    router.post("/health-check", this.healthCheck);
    router.post("/authed/test", auth(), this.testAuthedApi);
    return router;
  }
}

export default Ctrl;
