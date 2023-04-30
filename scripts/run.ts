import type { Fn } from "@vueuse/core";
import mongoose from "mongoose";

export async function run(funcs: (Fn | (() => Promise<any>))[]) {
  const inst = await mongoose.connect("mongodb://localhost:27017", {
    dbName: "mongodb",
  });
  // const config = useRuntimeConfig();
  // const inst = await mongoose.connect(`mongodb://${config.mongodbHost}:${config.mongodbPort}`, {
  //   dbName: config.mongodbDatabase,
  // });

  for (const fn of funcs) {
    await fn();
  }

  await inst.disconnect();
}
