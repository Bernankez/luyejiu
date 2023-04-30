import { index, modelOptions, prop } from "@typegoose/typegoose";
import { BaseClass } from "./base";
import { SongModel } from ".";

@index({ name: 1 })
@modelOptions({ schemaOptions: { collection: "artist" } })
export class ArtistClass extends BaseClass {
  /**
   * @description 歌手名
   */
  @prop({ required: true })
  public name!: string;

  /**
   * @description 歌手所有歌曲
   */
  public get songs() {
    return SongModel.find({ "artist.id": this._id });
  }

  /**
   * @description 歌手头像
   */
  @prop()
  public avatarPath?: string;

  /**
   * @description 是否禁用
   */
  @prop({ default: false })
  public disabled!: boolean;
}
