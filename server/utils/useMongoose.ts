import mongoose from "mongoose";
import consola from "consola";
import { ref } from "vue";

export function useMongoose() {
  const client = ref<typeof mongoose>();

  async function connect() {
    const config = useRuntimeConfig();
    try {
      const res = await mongoose.connect(`mongodb://${config.mongodbHost}:${config.mongodbPort}`, {
        dbName: config.mongodbDatabase,
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
