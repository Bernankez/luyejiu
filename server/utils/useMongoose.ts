import mongoose from "mongoose";
import consola from "consola";
import { ref } from "vue";

export function useMongoose() {
  const client = ref<typeof mongoose>();

  async function connect() {
    const config = useRuntimeConfig();
    const { mongodbHost = "localhost", mongodbPort = 27017, mongodbUser, mongodbDatabase = "luyejiu", mongodbPassword, mongodbSRV = false } = config;
    const url = `mongodb${mongodbSRV ? "+srv" : ""}://${mongodbHost}${(!mongodbSRV && mongodbPort) ? `:${mongodbPort}` : ""}`;
    try {
      const res = await mongoose.connect(url, {
        dbName: mongodbDatabase,
        user: mongodbUser,
        pass: mongodbPassword,
        retryWrites: true,
        writeConcern: {
          w: "majority",
        },
      });
      client.value = res;
      return res;
    } catch (e) {
      consola.error("useMongoose: failed to connect to mongodb", e);
    }
  }

  async function disconnect() {
    await client.value?.disconnect();
  }

  return {
    connect,
    disconnect,
    client,
  };
}
