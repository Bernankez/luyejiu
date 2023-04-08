import { Playmode } from "~/types/song";

export const useSongStore = defineStore("song", () => {
  const playmode = useLocalStorage<Playmode>(`${SONG_PREFIX}-playmode`, Playmode.sequence);
  const currentSongId = useLocalStorage(`${SONG_PREFIX}-current-song-id`, "");

  return {
    playmode,
    currentSongId,
  };
});
