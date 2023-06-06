import type { FilterOutFunctionKeys } from "@typegoose/typegoose/lib/types";
import { song } from "../dao/song";
import type { SongClass } from "../models/song";

export class SongService {
  private _song: typeof song;

  constructor() {
    this._song = song;
  }

  get create() {
    return this._song.create.bind(this._song);
  }

  async find(filter?: Partial<FilterOutFunctionKeys<SongClass>>) {
    const doc = await this._song.find(filter as any).populate("artists.artist");
    return doc.map(item => item.toObject());
  }

  async findById(id: string) {
    const doc = await this._song.findById(id).populate("artists.artist");
    return doc?.toObject();
  }

  async findByIds(ids: string[]) {
    const doc = await this._song.findByIds(ids).populate("artists.artist");
    return doc.map(item => item.toObject());
  }

  async findByPage(options?: { page: number; size: number }) {
    const { page = 0, size = 10 } = options || {};
    const data = this._song.find({}).skip(page * size).limit(size).populate("artists.artist");
    const count = this._song.find({}).count();
    const [doc, totalElements] = await Promise.all([data, count]);
    return {
      page,
      size,
      totalElements,
      data: doc.map(item => item.toObject()),
    };
  }
}
