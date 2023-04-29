import type { Fn } from "@vueuse/core";
import mongoose from "mongoose";

export async function run(funcs: (Fn | (() => Promise<any>))[]) {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "mongodb",
  });

  for (const fn of funcs) {
    await fn();
  }

  await mongoose.disconnect();
}
