import mongoose from "mongoose";
import { ArtistModel, SongModel } from "../server/models";
import { run } from "./run";

async function createSong() {
  const artist = await ArtistModel.findOne({ name: "鹿野灸" });
  await SongModel.ensureIndexes();
  await SongModel.create({
    title: "大貔貅",
    originSinger: "佚名",
    artists: [{
      artist: new mongoose.Types.ObjectId(artist!.id),
    }],
    duration: 1000,
    relatedVideoPath: "https://www.bilibili.com/video/BV1Wk4y1h7Ji",
    sources: [
      {
        quality: "Standard",
        url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.mp3",
      },
      {
        quality: "High",
        url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88-hq.mp3",
      },
      {
        quality: "Lossless",
        url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.flac",
      },
    ],
    singingTime: "2023-03-10 19:48:00",
    // tag: ["Official"],
  });
}

run([createSong]);
