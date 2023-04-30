import type { Ref } from "@typegoose/typegoose";
import { index, modelOptions, prop } from "@typegoose/typegoose";
import { ArtistClass } from "./artist";
import type { SongLanguage, SongTag } from "./song.types";
import { SongLanguageEnum, SongQualitySource, SongTagEnum } from "./song.types";
import { BaseClass } from "./base";

// TODO required? ? !
// https://typegoose.github.io/typegoose/docs/api/decorators/prop#required
@index({ title: 1 })
@index({ artist: 1 })
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
   * @description 歌手
   */
  @prop({ ref: () => ArtistClass })
  public artist!: Ref<ArtistClass>[];

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

