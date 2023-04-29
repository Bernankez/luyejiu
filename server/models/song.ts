import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { BaseClass } from "./base";
import { ArtistClass } from "./artist";

const SongTagEnum = ["Official", "Cut", "AI"] as const;
export type SongTag = typeof SongTagEnum[number];

const SongLanguageEnum = ["Chinese", "English", "Japanese"] as const;
export type SongLanguage = typeof SongLanguageEnum[number];

// TODO mergeDefaultOptions
// 索引是不是太多
// ensureIndexes typegoose
@index({ title: 1 })
@index({ originSinger: 1 })
@index({ artist: 1 })
@index({ lyricist: 1 })
@index({ songwritter: 1 })
@index({ album: 1 })
@index({ lyric: 1 })
@index({ singingTime: 1 })
@index({ tag: 1 })
@index({ language: 1 })
@index({ remark: 1 })
@index({ disabled: 1 })
@modelOptions({ schemaOptions: { collection: "song" } })
export class SongClass extends BaseClass {
  /**
   * 专辑封面url
   */
  @prop()
  public coverPath?: string;

  /**
   * 歌曲名
   */
  @prop({ required: true })
  public title!: string;

  /**
   * 原唱
   */
  @prop()
  public originSinger?: string;

  /**
   * 歌手
   */
  @prop({ ref: () => ArtistClass })
  public artist!: Ref<ArtistClass>[];

  /**
   * 作词
   */
  @prop()
  public lyricist?: string;

  /**
   * 作曲
   */
  @prop()
  public songwritter?: string;

  /**
   * 专辑名
   */
  @prop()
  public album?: string;

  /**
   * 歌词
   */
  @prop()
  public lyric?: string;

  /**
   * 歌曲时长，单位秒（s）
   */
  @prop({ required: true })
  public duration!: number;

  /**
   * 相关视频url
   */
  @prop({ type: () => [String] })
  public relatedVideoPath!: string[];

  /**
   * 不同质量歌曲源
   */
  @prop({ type: () => [SongQualitySource] })
  public sources!: SongQualitySource[];

  /**
   * 演唱时间
   */
  @prop()
  public singingTime?: Date;

  /**
   * 歌曲标签
   */
  @prop({ type: () => [String], enum: SongTagEnum })
  public tag?: SongTag[];

  /**
   * 歌曲语种
   */
  @prop({ default: "Chinese", enum: SongLanguageEnum })
  public language!: SongLanguage;

  /**
   * 歌曲备注
   */
  @prop()
  public remark?: string;

  /**
   * 是否禁用
   */
  @prop({ default: false })
  public disabled!: boolean;
}

export const SongModel = getModelForClass(SongClass);

const SongQualityEnum = ["Standard", "High", "Lossless"] as const;
export type SongQuality = typeof SongQualityEnum[number];

@modelOptions({ schemaOptions: { _id: false } })
class SongQualitySource {
  /**
   * 歌曲质量
   */
  @prop({ required: true, enum: SongQualityEnum })
  public quality!: SongQuality;

  /**
   * 歌曲源
   */
  @prop({ type: () => SongSource })
  public source!: SongSource;
}

const SongProviderEnum = ["Upload", "NetEaseMusic", "QQMusic"] as const;
export type SongProvider = typeof SongProviderEnum[number];

@modelOptions({ schemaOptions: { _id: false } })
class SongSource {
  /**
   * 歌曲源url
   */
  @prop({ required: true })
  public url!: string;

  /**
   * 歌曲源所属服务
   */
  @prop()
  public provider?: SongProvider;
}
