import { modelOptions } from "@typegoose/typegoose";
import type { IModelOptions } from "@typegoose/typegoose/lib/types";
import type { ObjectId } from "mongoose";

export const defaultModelOptions: IModelOptions = {
  schemaOptions: {
    timestamps: true,
  },
};

@modelOptions(defaultModelOptions)
export abstract class BaseClass {
  public _id!: ObjectId;
  /**
   * 创建时间
   */
  public createdAt!: Date;
  /**
   * 更新时间
   */
  public updatedAt!: Date;

  static get modelName() {
    return this.name;
  }
}
