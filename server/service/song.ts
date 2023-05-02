import type { SongDao } from "../dao/song";
import { song } from "../dao/song";

export class SongService {
  private _song: SongDao;

  constructor() {
    this._song = song;
  }

  async findById(id: string) {
    const doc = await this._song.findById(id).populate("artists.artist");
    return doc?.toObject();
  }
}
