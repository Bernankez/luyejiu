import type { MaybePromise } from "./type";

export interface RestOptions<T = unknown> {
  status: "SUCCESS" | "FAILURE";
  code: number;
  message?: string;
  data?: T;
}

export function success<T>(data: MaybePromise<T>, options?: { message?: string }) {
  const { message } = options || {};
  if (data instanceof Promise) {
    return data.then((res) => {
      return {
        status: "SUCCESS" as const,
        code: 0,
        message,
        data: res,
      };
    });
  }

  return {
    status: "SUCCESS" as const,
    message,
    data,
  };
}

export function fail<T>(message: string, options?: { code?: number; data?: MaybePromise<T> }) {
  const { code = -1, data } = options || {};
  if (data instanceof Promise) {
    return data.then((res) => {
      return {
        status: "FAILURE" as const,
        code,
        message,
        data: res,
      };
    });
  }

  return {
    status: "FAILURE" as const,
    code,
    message,
    data,
  };
}

export const RestResult = {
  success,
  fail,
};
