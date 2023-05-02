import type { AnyFn } from "@vueuse/core";
import { loadConfig } from "c12";
import mongoose from "mongoose";

await loadConfig({
  dotenv: true,
});

export async function run(funcs: AnyFn[]) {
  const { NUXT_MONGODB_HOST = "localhost", NUXT_MONGODB_PORT = 27017, NUXT_MONGODB_DATABASE = "luyejiu", NUXT_MONGODB_USER, NUXT_MONGODB_PASSWORD } = process.env;
  let url = "";
  if (NUXT_MONGODB_USER && NUXT_MONGODB_PASSWORD) {
    url = `mongodb://${NUXT_MONGODB_USER}:${NUXT_MONGODB_PASSWORD}@${NUXT_MONGODB_HOST}:${NUXT_MONGODB_PORT}/${NUXT_MONGODB_DATABASE}`;
  } else {
    url = `mongodb://${NUXT_MONGODB_HOST}:${NUXT_MONGODB_PORT}/${NUXT_MONGODB_DATABASE}`;
  }
  await mongoose.connect(url);

  for (const func of funcs) {
    await func();
  }

  await mongoose.disconnect();
}
