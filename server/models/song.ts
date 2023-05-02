import { PropType, index, modelOptions, prop } from "@typegoose/typegoose";
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
  @prop({ type: () => String })
  public coverPath?: string;

  /**
   * @description 歌曲名
   */
  @prop({ required: true, type: () => String })
  public title!: string;

  /**
   * @description 原唱
   */
  @prop({ type: () => String })
  public originSinger?: string;

  /**
   * @description 歌曲演唱者
   */
  @prop({ required: true, type: () => [SongArtists] }, PropType.ARRAY)
  public artists!: SongArtists[];

  /**
   * @description 作词
   */
  @prop({ type: () => String })
  public lyricist?: string;

  /**
   * @description 作曲
   */
  @prop({ type: () => String })
  public songwritter?: string;

  /**
   * @description 专辑名
   */
  @prop({ type: () => String })
  public album?: string;

  /**
   * @description 歌词
   */
  @prop({ type: () => String })
  public lyric?: string;

  /**
   * @description 歌曲时长，单位秒（s）
   */
  @prop({ required: true, type: () => Boolean })
  public duration!: number;

  /**
   * @description 相关视频url
   */
  @prop({ required: true, type: () => [String] }, PropType.ARRAY)
  public relatedVideoPath!: string[];

  /**
   * 不同质量歌曲源
   */
  @prop({ required: true, type: () => [SongQualitySource] }, PropType.ARRAY)
  public sources!: SongQualitySource[];

  /**
   * 演唱时间
   */
  @prop({ type: () => Date })
  public singingTime?: Date;

  /**
   * 歌曲标签
   */
  @prop({ type: () => [String], enum: SongTag }, PropType.ARRAY)
  public tag?: SongTag[];

  /**
   * 歌曲语种
   */
  @prop({ default: "Chinese", enum: SongLanguage, type: () => String })
  public language?: SongLanguage;

  /**
   * 歌曲备注
   */
  @prop({ type: () => String })
  public remark?: string;

  /**
   * 是否禁用
   */
  @prop({ default: false, type: () => Boolean })
  public disabled?: boolean;
}

