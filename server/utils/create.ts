import { createError } from "nuxt/app";

export function createServiceError(code: number, message = "", error?: any) {
  return createError({
    statusCode: code,
    message,
    data: error,
  });
}

