import { SongService } from "~/server/service/song";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    return RestResult.fail("songId is required", { code: 400 });
  }
  const songService = new SongService();
  const song = await songService.findById(id);
  if (!song) {
    return RestResult.fail(`Song:${id} not found`, { code: 404 });
  }
  return RestResult.success(song);
});
