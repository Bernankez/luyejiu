import mongoose from "mongoose";
import dayjs from "dayjs";
import { SongService } from "../../server/service/song";
import { ArtistService } from "../../server/service/artist";
import { SongQuality, SongTag } from "../../server/models/song.types";

export async function addSong() {
  const artistService = new ArtistService();
  const artist = await artistService.find({ name: "鹿野灸" });
  const songService = new SongService();
  await songService.create({
    title: "大貔貅",
    originSinger: ["ONER", "宋木子"],
    artists: [{
      artist: new mongoose.Types.ObjectId(artist[0].id),
    }],
    duration: 201,
    relatedVideoPath: ["https://www.bilibili.com/video/BV1Wk4y1h7Ji"],
    sources: [
      {
        quality: SongQuality.Standard,
        url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.mp3",
      },
      {
        quality: SongQuality.High,
        url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88-hq.mp3",
      },
      {
        quality: SongQuality.Lossless,
        url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.flac",
      },
    ],
    singingTime: dayjs("2023-03-10 19:48:00").toDate(),
    tag: [SongTag.Official],
  });
}
