import axios, { AxiosError, RawAxiosRequestHeaders, AxiosRequestConfig } from "axios";
// import {
//   getInfo, retrieveAuthToken
// } from "model/user-account";

import {
  ApiRequest,
  ApiResponse,
  ApiResultError
} from "@app/types/api";

import {
  API_HOST_URL,
  ApiErrorCode
} from "@app/data/api";

// import { retrieveAuthToken, getInfo, UserRole } from "@app/models/user-account";

import { EventEmitter, EVENT_EMITTER_NAME } from "@app/utils/event-emitter";

export const executeApi = async <T, E extends ApiResultError>(request: ApiRequest): Promise<ApiResponse<T, E>> => {
  const {
    url,
    method,
    params: tempParams,
    extraHeaders,
    authToken,
    download,
    timeout,
    onUploadProgress
  } = request;
  const { data } = request;

  const params = tempParams ?? {};

  // build header
  const headers: RawAxiosRequestHeaders = {
    ...extraHeaders
  };
  // headers["Content-Type"] = "application/json";

  let success = false;
  let apiResponse: T | undefined;
  let errorCode: ApiErrorCode | undefined;
  let statusCode: number | undefined;
  let errorMsg: string | undefined;
  if (authToken) {
    const secret = "TEST_TOKEN";
    if (secret) {
      headers["Access-Token"] = secret;
    } else {
      errorCode = ApiErrorCode.UNAUTHORIZED;
    }
  }

  if (!errorCode) {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        params,
        data,
        headers,
        onUploadProgress
      };
      if (timeout) {
        config.timeout = timeout;
      } else {
        config.timeout = 60000;
      }
      if (download) {
        config.responseType = "blob";
      }

      const apiVersion = "";
      const apiInstance = axios.create({ baseURL: `${ API_HOST_URL }${ apiVersion }` });
      const { data: responseData, status } = await apiInstance.request<T>(config);

      success = true;
      apiResponse = responseData;
      statusCode = status;
    } catch (e: unknown) {
      success = false;

      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError<{
          rpCode: ApiErrorCode,
          message: string,
          extraMsg: string
        }>;

        const errorResponse = axiosError.response;
        if (errorResponse) {
          const errorData = errorResponse.data;
          if (errorData) {
            errorCode = errorData.rpCode;
            errorMsg = errorData.message || errorData.extraMsg;
          }
        }

        statusCode = errorResponse?.status;
      }

      if (!errorCode) {
        errorCode = ApiErrorCode.SYSTEM_ERROR;
        errorMsg = "Wrong API!";
      }
    }
  }

  if (!success) {
    switch (statusCode) {
      case 401:
        EventEmitter.emit(EVENT_EMITTER_NAME.EVENT_UNAUTHORIZED_USER);
        break;
      default:
        break;
    }
  }

  return {
    data: apiResponse,
    errorCode: (errorCode as (ApiErrorCode.SYSTEM_ERROR | E)),
    errorMsg
  };
};
