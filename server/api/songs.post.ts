import { SongService } from "../service/song";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!Array.isArray(body)) {
    throw createServiceError(400, "Expected an array of songIds");
  }
  const songService = new SongService();
  const res = songService.findByIds(body);
  if (!res) {
    throw createServiceError(404, "Song not found");
  }
  return res;
});
