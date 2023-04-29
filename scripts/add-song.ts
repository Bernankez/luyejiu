import type { ObjectId } from "mongoose";
import mongoose from "mongoose";
import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import type { Ref } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
abstract class Base {

}

@index({ id: 1, title: 1, originSinger: 1, artist: 1 })
@modelOptions({ schemaOptions: { collection: "song" } })
class Song {
  public _id!: ObjectId;

  @prop()
  public coverPath?: string;

  @prop({ required: true })
  title!: string;

  @prop()
  public originSinger?: string;

  @prop({ ref: () => Artist })
  public artist!: Ref<Artist>[];

  @prop()
  public songwriter?: string;

  @prop()
  public album?: string;

  @prop()
  public lyricPath?: string;

  @prop({ required: true })
  public duration!: number;

  @prop({ type: () => [String] })
  public relatedVideoPath!: string[];

  @prop({ type: () => [SongQualitySource] })
  public sources!: SongQualitySource[];

  @prop()
  public singingTime?: Date;

  @prop({ type: () => [String], enum: ["Official", "Cut", "AI"] })
  public tag?: string[];

  @prop({ default: "Chinese", enum: ["Chinese", "English", "Japanese", "Other"] })
  public language?: string;

  @prop()
  public remark?: string;
}

@index({ id: 1, name: 1 })
class Artist {
  public _id!: ObjectId;

  @prop({ required: true })
  public name!: string;

  public get songs() {
    return SongModel.find({ "artist.id": this._id });
  }

  @prop({ default: false })
  public feat?: boolean;
}

@modelOptions({ schemaOptions: { _id: false } })
class SongQualitySource {
  @prop({ required: true, enum: ["Standard", "High", "Lossless"] })
  public quality!: string;

  @prop({ type: () => SongSource })
  public sources!: SongSource[];
}

@modelOptions({ schemaOptions: { _id: false } })
class SongSource {
  @prop({ required: true })
  public url!: string;

  /** 来源 eg.哔哩哔哩 TODO */
  @prop()
  public source?: string;
}

// 创建模型并导出
const SongModel = getModelForClass(Song);
const ArtistModel = getModelForClass(Artist);

async function createArtist() {
  await ArtistModel.create({
    name: "鹿野灸",
  });
}

async function createSong() {
  const artist = await ArtistModel.findOne({ name: "鹿野灸" });
  await SongModel.create({
    title: "大貔貅",
    originSinger: "佚名",
    artist: [new mongoose.Types.ObjectId(artist!.id)],
    duration: 1000,
    relatedVideoPath: "https://www.bilibili.com/video/BV1Wk4y1h7Ji",
    sources: [
      {
        quality: "Standard",
        sources: [
          {
            url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.mp3",
            source: "NetEase",
          },
        ],
      },
      {
        quality: "High",
        sources: [
          {
            url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88-hq.mp3",
            source: "NetEase",
          },
        ],
      },
      {
        quality: "Lossless",
        sources: [
          {
            url: "http://rtrx90goj.sabkt.gdipper.com/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.flac",
            source: "NetEase",
          },
        ],
      },
    ],
    singingTime: "2023-03-10 19:48:00",
    tag: ["Official"],
  });
}

const run = async (funcs: any[]) => {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "mongodb",
  });

  for (const fn of funcs) {
    await fn();
  }

  await mongoose.disconnect();
};

// run([createArtist, createSong]);
