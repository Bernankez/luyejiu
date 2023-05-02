import type { ReturnModelType } from "@typegoose/typegoose";
import type { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import type { BaseClass } from "../models/base";

export class BaseDao<T extends BaseClass> {
  constructor(protected model: ReturnModelType<AnyParamConstructor<T>>) {}

  ensureIndexes() {
    return this.model.ensureIndexes();
  }

  create(doc: T) {
    return this.model.create(doc);
  }

  get find() {
    return this.model.find;
  }

  get findById() {
    return this.model.findById;
  }

  findByIds(ids: string[]) {
    return this.model.find({ _id: { $in: ids } });
  }

  get update() {
    return this.model.findByIdAndUpdate;
  }

  get delete() {
    return this.model.findByIdAndDelete;
  }
}
