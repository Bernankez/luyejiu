import { Playmode } from "~/types/song";

export const useSongStore = defineStore("song", () => {
  const playmode = useLocalStorage<Playmode>(`${SONG_PREFIX}-playmode`, Playmode.sequence);
  const currentSongId = useLocalStorage(`${SONG_PREFIX}-current-song-id`, "");
  const belongingSonglistId = useLocalStorage<string | undefined>(`${SONG_PREFIX}-belonging-songlist-id`, undefined);
  const volume = useLocalStorage(`${SONG_PREFIX}-volume`, 1);
  const mute = useLocalStorage(`${SONG_PREFIX}-mute`, false);
  watchEffect(() => {
    consola.info(`songStore:${currentSongId.value}`);
  });

  return {
    playmode,
    currentSongId,
    belongingSonglistId,
    volume,
    mute,
  };
});
