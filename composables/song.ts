import { Howl } from "howler";
import type { HowlOptions } from "howler";

export interface Song {
  id: string;
  player?: Howl;
}

export interface SongOptions {
  howlOptions?: HowlOptions | ((song: Readonly<Song>) => HowlOptions);
}

export function getSong(id: string, options?: SongOptions) {
  // TODO get song info from remote or somewhere
  const song: Song = {
    id,
  };

  let howl = howlCache.get(id);
  if (!howl && options?.howlOptions) {
    const howlOptions = typeof options.howlOptions === "function"
      ? options.howlOptions(readonly(song))
      : options.howlOptions;
    howl = new Howl(howlOptions);
    howlCache.add(id, howl);
  }

  song.player = howl;

  return song;
}
