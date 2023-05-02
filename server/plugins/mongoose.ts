import consola from "consola";
import { artist } from "../dao/artist";
import { song } from "../dao/song";
import { useMongoose } from "../useMongoose";

export default defineNitroPlugin(async (nitroApp) => {
  const { connect, client } = useMongoose();
  await connect();

  consola.info("server:plugins:mongoose: mongoose connected");

  await Promise.allSettled([song.ensureIndexes(), artist.ensureIndexes()]);

  consola.info("server:plugins:mongoose: indexes ensured");

  client.value?.connection.on("disconnected", () => {
    consola.info("server:plugins:mongoose: mongoose disconnected");
  });
});
