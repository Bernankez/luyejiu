import { modelOptions } from "@typegoose/typegoose";
import type { ObjectId } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true } })
export class BaseClass {
  public _id!: ObjectId;
  public createdAt!: Date;
  public updatedAt!: Date;
}
