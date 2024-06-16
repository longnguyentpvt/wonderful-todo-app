import { ApiRequest, ApiResult } from "@app/types/api";
import { TaskStatus } from "@app/types/model";

import { ApiErrorCode } from "@app/data/api";

import { executeApi } from "./utils";

export type TaskInfo = {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: TaskStatus;
};

export const getTasks = async (requestData: {
  page: number,
  pageSize?: number,
  filterName?: string,
  filterStatus?: TaskStatus
}): Promise<ApiResult<{
  data: TaskInfo[],
  countAll: number
}, ApiErrorCode.INVALID_DATA>> => {
  const request: ApiRequest = {
    url: "/tasks/list",
    params: requestData,
    method: "get",
    authToken: true
  };
  return executeApi(request);
};

export const newTask = async (requestData: {
  name: string,
  description: string,
  dueDate: string
}): Promise<ApiResult<TaskInfo, ApiErrorCode.INVALID_DATA>> => {
  const request: ApiRequest = {
    url: "/tasks/new",
    data: requestData,
    method: "post",
    authToken: true
  };
  return executeApi(request);
};

export const editTask = async (requestData: {
  id: number,
  name?: string,
  description?: string,
  status?: TaskStatus
}): Promise<ApiResult<TaskInfo, ApiErrorCode.INVALID_DATA | ApiErrorCode.NOT_FOUND>> => {
  const request: ApiRequest = {
    url: "/tasks/update",
    data: requestData,
    method: "post",
    authToken: true
  };
  return executeApi(request);
};

export const deleteTask = async (requestData: {
  id: number
}): Promise<ApiResult<boolean, ApiErrorCode.INVALID_DATA | ApiErrorCode.NOT_FOUND>> => {
  const request: ApiRequest = {
    url: "/tasks/delete",
    params: requestData,
    method: "delete",
    authToken: true
  };
  return executeApi(request);
};
