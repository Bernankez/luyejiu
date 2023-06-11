import { SongService } from "../service/song";

export default defineEventHandler(async (event) => {
  const songService = new SongService();
  const res = songService.find();
  return RestResult.success(res);
});
