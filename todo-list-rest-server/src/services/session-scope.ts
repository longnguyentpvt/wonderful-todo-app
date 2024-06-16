import {
  RequestHandler, Response, NextFunction
} from "express";

import { ApiError, ApiErrorCode, AuthRequest } from "@app/types/app";

export const auth = (allowScopes?: string[]): RequestHandler => (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Access-Token");
  if (!token) {
    const error: ApiError = {
      statusCode: 401,
      rpCode: ApiErrorCode.UNAUTHORIZED,
      rpMessage: "Token is required!"
    };

    throw error;
  }

  console.debug(allowScopes);

  req.account = {
    id: 0,
    scopes: ["write"],
    token
  };

  next();
};
