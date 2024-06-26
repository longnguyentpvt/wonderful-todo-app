export enum ApiErrorCode {
  SYSTEM_ERROR = "SYSTEM_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALID_SCOPE = "INVALID_SCOPE",
  INCORRECT_DATA = "INCORRECT_DATA",
  INVALID_DATA = "INVALID_DATA",
  EXISTED = "EXISTED",
  NOT_FOUND = "NOT_FOUND"
}

export const API_HOST_URL = process.env.NEXT_PUBLIC_API_HOST_URL;
