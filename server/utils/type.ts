export type ModelOmit<T extends Record<string, any>> = Omit<T, "_id" | "id" | "createdAt" | "updatedAt">;

export type Status = "SUCCESS" | "FAILURE";

export type MaybePromise<T> = T | Promise<T>;
