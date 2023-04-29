import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";
import type { ObjectId } from "mongoose";
import { SongModel } from "./song";

@index({ name: 1 })
@modelOptions({ schemaOptions: { collection: "artist", timestamps: true } })
export class ArtistClass {
  public _id!: ObjectId;
  public createdAt!: Date;
  public updatedAt!: Date;

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

export const ArtistModel = getModelForClass(ArtistClass);
