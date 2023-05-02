import type { Ref } from "@typegoose/typegoose";
import { index, modelOptions, prop } from "@typegoose/typegoose";
import { BaseClass } from "./base";
import { SongClass } from "./song";

@index({ name: 1 })
@modelOptions({ schemaOptions: { collection: "artist" } })
export class ArtistClass extends BaseClass {
  /**
   * @description 歌手名
   */
  @prop({ required: true, type: () => String })
  public name!: string;

  /**
   * @description 歌手所有歌曲
   */
  @prop({ ref: () => SongClass, foreignField: "artists.artist", localField: "_id" })
  public songs?: Ref<SongClass>[];

  /**
   * @description 歌手头像
   */
  @prop({ type: () => String })
  public avatarPath?: string;

  /**
   * @description 是否禁用
   */
  @prop({ default: false, type: () => Boolean })
  public disabled?: boolean;
}
