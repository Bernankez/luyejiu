import mongoose from "mongoose";
import consola from "consola";
import { ref } from "vue";

export function useMongoose() {
  const client = ref<typeof mongoose>();

  async function connect() {
    const config = useRuntimeConfig();
    const { mongodbHost, mongodbPort, mongodbUser, mongodbDatabase, mongodbPassword } = config;
    let url = "";
    if (mongodbUser && mongodbPassword) {
      url = `mongodb://${mongodbUser}:${mongodbPassword}@${mongodbHost}:${mongodbPort}`;
    } else {
      url = `mongodb://${mongodbHost}:${mongodbPort}`;
    }
    try {
      const res = await mongoose.connect(url, {
        dbName: mongodbDatabase,
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
