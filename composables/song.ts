import { Howl } from "howler";
import type { HowlOptions } from "howler";
import { useHowlCache } from "./cache";
import type { Optional } from "~/types/utils";

export interface Song {
  id: string;
  player: Howl;
}

export type UnstableSong = Optional<Song, "player">;

const howlCache = useHowlCache(20);
export function getSong(id: string, options?: { howlOptions?: HowlOptions | ((song: Readonly<UnstableSong>) => HowlOptions) }) {
  // TODO get song info from remote or somewhere
  const song: UnstableSong = {
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

  return song as Song;
}
