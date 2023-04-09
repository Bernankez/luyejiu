import { Playmode } from "~/types/song";

export const useSongStore = defineStore("song", () => {
  const playmode = useLocalStorage<Playmode>(`${SONG_PREFIX}-playmode`, Playmode.sequence);
  const currentSongId = useLocalStorage(`${SONG_PREFIX}-current-song-id`, "");
  const belongingSonglistId = useLocalStorage<string | null>(`${SONG_PREFIX}-belonging-songlist-id`, null);
  const volume = useLocalStorage(`${SONG_PREFIX}-volume`, 1);
  const mute = useLocalStorage(`${SONG_PREFIX}-mute`, false);
  watchEffect(() => {
    consola.info(`songStore:${currentSongId.value}`);
  });

  return {
    // see https://stackoverflow.com/questions/72203619/nuxt3-pinia-vueuse-usestorage-not-working
    // https://pinia.vuejs.org/zh/cookbook/composables.html
    playmode: skipHydrate(playmode),
    currentSongId: skipHydrate(currentSongId),
    belongingSonglistId: skipHydrate(belongingSonglistId),
    volume: skipHydrate(volume),
    mute: skipHydrate(mute),
  };
});
