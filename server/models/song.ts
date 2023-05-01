import { index, modelOptions, prop } from "@typegoose/typegoose";
import { SongArtists, SongLanguage, SongQualitySource, SongTag } from "./song.types";
import { BaseClass } from "./base";

@index({ title: 1 })
@index({ artist: 1 })
@index({ createdAt: -1 })
@modelOptions({ schemaOptions: { collection: "song" } })
export class SongClass extends BaseClass {
  /**
   * @description 专辑封面url
   */
  @prop()
  public coverPath?: string;

  /**
   * @description 歌曲名
   */
  @prop({ required: true })
  public title!: string;

  /**
   * @description 原唱
   */
  @prop()
  public originSinger?: string;

  /**
   * @description 歌曲演唱者
   */
  @prop({ required: true, type: () => [SongArtists] })
  public artists!: SongArtists[];

  /**
   * @description 作词
   */
  @prop()
  public lyricist?: string;

  /**
   * @description 作曲
   */
  @prop()
  public songwritter?: string;

  /**
   * @description 专辑名
   */
  @prop()
  public album?: string;

  /**
   * @description 歌词
   */
  @prop()
  public lyric?: string;

  /**
   * @description 歌曲时长，单位秒（s）
   */
  @prop({ required: true })
  public duration!: number;

  /**
   * @description 相关视频url
   */
  @prop({ required: true, type: () => [String] })
  public relatedVideoPath!: string[];

  /**
   * 不同质量歌曲源
   */
  @prop({ required: true, type: () => [SongQualitySource] })
  public sources!: SongQualitySource[];

  /**
   * 演唱时间
   */
  @prop()
  public singingTime?: Date;

  /**
   * 歌曲标签
   */
  @prop({ type: () => [String], enum: SongTag })
  public tag?: SongTag[];

  /**
   * 歌曲语种
   */
  @prop({ default: "Chinese", enum: SongLanguage })
  public language?: SongLanguage;

  /**
   * 歌曲备注
   */
  @prop()
  public remark?: string;

  /**
   * 是否禁用
   */
  @prop({ default: false })
  public disabled?: boolean;
}

