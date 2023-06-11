import { SongService } from "../service/song";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!Array.isArray(body)) {
    return RestResult.fail("Expected an array of songIds", { code: 400 });
  }
  const songService = new SongService();
  const res = songService.findByIds(body);
  if (!res) {
    return RestResult.fail("Song not found", { code: 404 });
  }
  return RestResult.success(res);
});
