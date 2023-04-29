import { modelOptions, prop } from "@typegoose/typegoose";

/**
 * @description 歌曲标签
 */
export const SongTagEnum = ["Official", "Cut", "AI"] as const;
export type SongTag = typeof SongTagEnum[number];

/**
 * @description 歌曲语种
 */
export const SongLanguageEnum = ["Chinese", "English", "Japanese"] as const;
export type SongLanguage = typeof SongLanguageEnum[number];

/**
 * @description 歌曲质量
 */
export const SongQualityEnum = ["Standard", "High", "Lossless", "Hi-Res"] as const;
export type SongQuality = typeof SongQualityEnum[number];

/**
 * @description 歌曲质量与url
 */
@modelOptions({ schemaOptions: { _id: false } })
export class SongQualitySource {
  /**
   * @description 歌曲质量
   */
  @prop({ required: true, enum: SongQualityEnum })
  public quality!: SongQuality;

  /**
   * @description 歌曲url
   */
  @prop({ required: true })
  public url!: string;
}
