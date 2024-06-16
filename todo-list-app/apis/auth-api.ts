import { ApiRequest, ApiResult } from "@app/types/api";

import { ApiErrorCode } from "@app/data/api";

import { executeApi } from "./utils";

export type AuthResponse = {
  accountId: number,
  token: string,
  expiry: string
};

export const loginWithEmailAndPassword = async (requestData: {
  username: string,
  password: string
}): Promise<ApiResult<AuthResponse, ApiErrorCode.INVALID_DATA | ApiErrorCode.INCORRECT_DATA>> => {
  const request: ApiRequest = {
    url: "/auth/login",
    method: "post",
    data: requestData
  };
  console.log("request", request);

  return executeApi(request);
};
