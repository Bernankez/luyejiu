import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import { BaseClass } from "./base";
import { SongModel } from "./song";

// TODO mergeDefaultOptions
@index({ disabled: 1 })
@index({ name: 1 })
@modelOptions({ schemaOptions: { collection: "artist" } })
export class ArtistClass extends BaseClass {
  /**
   * 歌手名
   */
  @prop({ required: true })
  public name!: string;

  /**
   * 歌手所有歌曲
   */
  public get songs() {
    return SongModel.find({ "artist.id": this._id });
  }

  /**
   * 歌手头像
   */
  @prop()
  public avatarPath?: string;

  /**
   * 是否禁用
   */
  @prop({ default: false })
  public disabled!: boolean;
}

export const ArtistModel = getModelForClass(ArtistClass);
