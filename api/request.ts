import type { UseFetchOptions } from "#app";
import type { RestOptions } from "~/server/utils/rest-result";

export type UseFetchRequest = Parameters<typeof useFetch>[0];

export interface ResponseError {
  message: string;
  stack: string;
  statusCode: number;
  statusMessage: string;
  url: string;
}

export function request<T>(url: UseFetchRequest, options?: UseFetchOptions<T>) {
  return useFetch(url, {
    onRequest({ options }) {
      const { public: { apiBase } } = useRuntimeConfig();
      options.baseURL = apiBase;
    },
    onResponse({ response }) {
      const res = response._data as RestOptions<T>;
      if (res.status !== "SUCCESS") {
        handleError(res);
        return Promise.reject(res);
      }
      response._data = res.data;
    },
    onResponseError({ response }) {
      // TODO error type
      handleError(response as any);
      return Promise.reject(response);
    },
    ...options,
  });
}

function handleError(error: RestOptions | ResponseError) {
  consola.log("handleError", error);
  let statusCode: number;
  if ("statusCode" in error) {
    statusCode = error.statusCode;
  } else {
    statusCode = error.code;
  }
  const message = error.message;
  // @see https://juejin.cn/post/7173507227104313352
  // TODO message map
  consola.error("request error:" + ` ${statusCode}, ${message}`);
}
