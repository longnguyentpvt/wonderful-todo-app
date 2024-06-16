import { Request, Router } from "express";
// eslint-disable-next-line import/no-unresolved
import { ParamsDictionary, Query } from "express-serve-static-core";

export interface AppController {
  initRoute: () => Router
}

export enum ApiErrorCode {
  SYSTEM_ERROR = "SYSTEM_ERROR",
  UNKNOWN = "UNKNOWN",
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALID_SCOPE = "INVALID_SCOPE",
  INVALID_DATA = "INVALID_DATA",
  EXISTED = "EXISTED",
  NOT_FOUND = "NOT_FOUND"
}

export interface ApiError extends Partial<Error> {
  rpCode?: ApiErrorCode,
  rpMessage?: string,
  statusCode?: number
}

export interface AuthRequest<
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Query,
  Locals extends Record<string, unknown> = Record<string, unknown>
  > extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  account: {
    id: number,
    scopes: string[],
    token: string
  }
}
