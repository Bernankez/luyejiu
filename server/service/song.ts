import { song } from "../dao/song";

export class SongService {
  private song: typeof song;

  constructor() {
    this.song = song;
  }
}
