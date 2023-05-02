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
}
