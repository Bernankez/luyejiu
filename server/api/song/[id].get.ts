import { SongService } from "~/server/service/song";
import { createServiceError } from "~/server/utils/create";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    throw createServiceError(400, "songId is required");
  }
  const songService = new SongService();
  const song = await songService.findById(id);
  if (!song) {
    throw createServiceError(404, `Song:${id} not found`);
  }
  return song;
});
