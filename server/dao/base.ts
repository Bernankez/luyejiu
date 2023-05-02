import type { ReturnModelType } from "@typegoose/typegoose";
import type { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import type { BaseClass } from "../models/base";
import type { ModelOmit } from "../utils/type";

export class BaseDao<T extends BaseClass> {
  constructor(protected model: ReturnModelType<AnyParamConstructor<T>>) {}

  ensureIndexes() {
    return this.model.ensureIndexes();
  }

  create(doc: ModelOmit<T>) {
    return this.model.create(doc);
  }

  get find() {
    return this.model.find.bind(this.model);
  }

  get findById() {
    return this.model.findById.bind(this.model);
  }

  findByIds(ids: string[]) {
    return this.model.find({ _id: { $in: ids } });
  }

  get update() {
    return this.model.findByIdAndUpdate.bind(this.model);
  }

  get delete() {
    return this.model.findByIdAndDelete.bind(this.model);
  }
}
