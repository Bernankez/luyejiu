import { modelOptions } from "@typegoose/typegoose";
import type { ObjectId } from "mongoose";

function hideProps(obj: Record<string, any>) {
  delete obj.__v;
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret, options) {
        hideProps(ret);
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret, options) {
        hideProps(ret);
      },
    },
  },
})
export class BaseClass {
  public _id!: ObjectId;
  /**
   * @description virtual id
   */
  public id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}
