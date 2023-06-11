import { SongService } from "~/server/service/song";

export default defineEventHandler((event) => {
  const { page = 0, size = 10 } = getQuery(event);
  const songService = new SongService();
  const res = songService.findByPage({ page: page as number, size: size as number });
  return RestResult.success(res);
});
