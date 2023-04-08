export const enum Playmode {
  "random" = "random",
  "loop" = "loop",
  "single" = "single",
  "sequence" = "sequence",
}

export interface Songlist {
  name: string;
  id: string;
  songs: string[];
}
