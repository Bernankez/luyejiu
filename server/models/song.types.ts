import type { Ref } from "@typegoose/typegoose";
import { modelOptions, prop } from "@typegoose/typegoose";
import { ArtistClass } from "./artist";

/**
 * @description 歌曲标签
 */
export enum SongTag {
  Official = "Official",
  Cut = "Cut",
  AI = "AI",
}

/**
 * @description 歌曲语种
 */
export enum SongLanguage {
  Chinese = "Chinese",
  English = "English",
  Japanese = "Japanese",
}

/**
 * @description 歌曲质量
 */
export enum SongQuality {
  Standard = "Standard",
  High = "High",
  Lossless = "Lossless",
  HiRes = "Hi-Res",
}

/**
 * @description 相关音视频类型
 */
export enum SongRelatedSourceType {
  Video = "Video",
  Audio = "Audio",
  Other = "Other",
}

/**
 * @description 歌曲演唱者
 */
@modelOptions({ schemaOptions: { _id: false } })
export class SongArtists {
  /**
   * @description 歌手
   */
  @prop({ required: true, ref: () => ArtistClass })
  public artist!: Ref<ArtistClass>;

  /**
   * @description 是否伴唱
   */
  @prop({ default: false, type: () => Boolean })
  public feat?: boolean;
}

/**
 * @description 歌曲质量与url
 */
@modelOptions({ schemaOptions: { _id: false } })
export class SongQualitySource {
  /**
   * @description 歌曲质量
   */
  @prop({ required: true, enum: SongQuality, type: () => String })
  public quality!: SongQuality;

  /**
   * @description 歌曲url
   */
  @prop({ required: true, type: () => String })
  public url!: string;
}

/**
 * @description 相关视频/音频url
 */
@modelOptions({ schemaOptions: { _id: false } })
export class SongRelatedSource {
  /**
   * @description 相关音视频url
   */
  @prop({ required: true, type: () => String })
  public url!: string;

  /**
   * @description 相关音视频类型
   */
  @prop({ required: true, enum: SongRelatedSourceType, type: () => String })
  public type!: SongRelatedSourceType;
}
