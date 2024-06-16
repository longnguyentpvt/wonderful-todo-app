import { AxiosProgressEvent, RawAxiosRequestHeaders } from "axios";

import {
  ApiErrorCode
} from "@app/data/api";

export type ApiMethod = "get" | "post" | "put" | "delete";

export type ApiRequest = {
  url: string,
  method: ApiMethod,
  params?: Record<string, unknown>,
  data?: Record<string, unknown> | FormData,
  extraHeaders?: RawAxiosRequestHeaders,
  authToken?: boolean,
  timeout?: number,
  download?: boolean,
  onUploadProgress?: (ProgressEvent: AxiosProgressEvent) => void
};

export type ApiResultError = `${ ApiErrorCode }`;

export type ApiResult<T, E extends ApiResultError> = {
  data?: T,
  errorCode?: ApiErrorCode.SYSTEM_ERROR | E
};

export type ApiResponse<T, E extends ApiResultError> = {
  data?: T,
  errorCode?: ApiErrorCode.SYSTEM_ERROR | E,
  errorMsg?: string
};
