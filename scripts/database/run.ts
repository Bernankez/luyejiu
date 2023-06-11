import type { AnyFn } from "@vueuse/core";
import { loadConfig } from "c12";
import mongoose from "mongoose";
import consola from "consola";

await loadConfig({
  dotenv: true,
});

export async function run(funcs: AnyFn[]) {
  const { NUXT_MONGODB_HOST = "localhost", NUXT_MONGODB_PORT = 27017, NUXT_MONGODB_DATABASE = "luyejiu", NUXT_MONGODB_USER, NUXT_MONGODB_PASSWORD, NUXT_MONGODB_SRV = false } = process.env;
  const url = `mongodb${NUXT_MONGODB_SRV ? "+srv" : ""}://${NUXT_MONGODB_HOST}${(!NUXT_MONGODB_SRV && NUXT_MONGODB_PORT) ? `:${NUXT_MONGODB_PORT}` : ""}`;
  await mongoose.connect(url, {
    dbName: NUXT_MONGODB_DATABASE,
    user: NUXT_MONGODB_USER,
    pass: NUXT_MONGODB_PASSWORD,
    retryWrites: true,
    writeConcern: {
      w: "majority",
    },
  });

  for (const func of funcs) {
    const res = await func();
    consola.success(res);
  }

  await mongoose.disconnect();
}
