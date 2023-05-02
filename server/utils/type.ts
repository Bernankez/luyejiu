export type ModelOmit<T extends Record<string, any>> = Omit<T, "_id" | "id" | "createdAt" | "updatedAt">;
