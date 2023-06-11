export const enum Playmode {
  "random" = "random",
  "loop" = "loop",
  "single" = "single",
  "sequence" = "sequence",
}

export interface Song {
  id: string;
  name: string;
  originSinger: string;
  singer: string;
  duration: number;
  // url
}

export interface Songlist {
  name: string;
  id: string;
  songs: string[];
}
