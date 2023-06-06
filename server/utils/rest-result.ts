import type { Status } from "./type";

export class RestResult<T = unknown> {
  status: Status;
  code: number;
  message?: string;
  data?: T;

  constructor(status: Status, options?: { code?: number; message?: string; data?: T }) {
    this.status = status;
    const { code, message, data } = options || {};
    if (!isDefined(code)) {
      if (status === "SUCCESS") {
        this.code = 0;
      } else {
        this.code = -1;
      }
    } else {
      this.code = code;
    }
    this.message = message;
    this.data = data;
  }

  static success<D>(data: D, options?: { message?: string }) {
    const restResult = new RestResult<D>("SUCCESS", { message: options?.message, data });
    return {
      status: restResult.status as "SUCCESS",
      code: restResult.code,
      message: restResult.message,
      data: restResult.data as D,
    };
  }

  static fail<D>(message: string, options?: { code?: number; data?: D }) {
    const restResult = new RestResult("FAILURE", { message, code: options?.code, data: options?.data });
    return {
      status: restResult.status as "FAILURE",
      code: restResult.code,
      message: restResult.message!,
      data: restResult.data,
    };
  }
}
