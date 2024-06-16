import { Request, Router } from "express";

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

export interface AuthRequest extends Request {
  account?: {
    id: number,
    scopes: string[],
    token: string
  }
}
