import { Playmode } from "~/types/song";

export const useSongStore = defineStore("song", () => {
  const playmode = useLocalStorage<Playmode>(`${SONG_PREFIX}-playmode`, Playmode.sequence);
  const currentSongId = useLocalStorage(`${SONG_PREFIX}-current-song-id`, "");
  const activeSonglistId = useLocalStorage<string | null>(`${SONGLIST_PREFIX}-belonging-songlist-id`, null);
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
    activeSonglistId: skipHydrate(activeSonglistId),
    volume: skipHydrate(volume),
    mute: skipHydrate(mute),
  };
});
