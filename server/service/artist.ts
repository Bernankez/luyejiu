import type { FilterOutFunctionKeys } from "@typegoose/typegoose/lib/types";
import { artist } from "../dao/artist";
import type { ArtistClass } from "../models/artist";

export class ArtistService {
  private _artist: typeof artist;

  constructor() {
    this._artist = artist;
  }

  get create() {
    return this._artist.create;
  }

  async find(filter: Partial<FilterOutFunctionKeys<ArtistClass>>) {
    const doc = await this._artist.find(filter).populate("songs");
    return doc.map(item => item.toObject());
  }
}
