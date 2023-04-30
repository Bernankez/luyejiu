import { modelOptions } from "@typegoose/typegoose";
import type { ObjectId } from "mongoose";

// TODO hide _id __v
@modelOptions({ schemaOptions: { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } } })
export class BaseClass {
  public _id!: ObjectId;
  /**
   * @description virtual id
   */
  public id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}
