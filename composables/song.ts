import type { MaybeComputedRef } from "@unhead/vue";
import type { AnyFn } from "@vueuse/core";
import { Howl } from "howler";
import { getSongById } from "~/api";
import type { Song } from "~/types/song";

export function useSong(id: MaybeComputedRef<string | undefined>) {
  const loading = ref(false);
  const playing = ref(false);
  const duration = ref(0);
  const timePlayed = ref(0);
  const song = ref<Song>();
  const howl = ref<Howl>();
  const _id = computed(() => song.value?.id);

  const onEnd = ref<AnyFn>();

  function unload() {
    playing.value = false;
    howl.value?.unload();
    resolveUnref(_id) && consola.info(`useSong:${resolveUnref(_id)}: unloaded`);
  }

  watch(() => resolveUnref(id), async (id) => {
    if (id) {
      loading.value = true;
      const newSong = getSongById(id);
      if (!newSong) {
        loading.value = false;
        song.value = undefined;
        howl.value = undefined;
        return;
      }
      unload();
      if (!howlCache.get(id)) {
        const newHowl = new Howl({
          // song.url
          src: "http://rslbkj11r.hn-bkt.clouddn.com/songs/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.mp3",
          html5: true,
          onload() {
            consola.info(`useSong:${id}: new Howl loaded`);
            duration.value = newHowl.duration();
            loading.value = false;
          },
          onloaderror(_, e) {
            consola.error(`useSong:loaderror:${id}:`, e);
            loading.value = false;
          },
          onplayerror(_, e) {
            consola.error(`useSong:loaderror:${id}:`, e);
            loading.value = false;
          },
          onseek() {
            getTimePlayed();
          },
          onplay() {
            playing.value = true;
            getTimePlayed();
          },
          onpause() {
            playing.value = false;
          },
          onstop() {
            playing.value = false;
            timePlayed.value = 0;
          },
          onend() {
            playing.value = false;
            onEnd.value?.();
          },
        });
        howlCache.add(id, newHowl);
      }
      song.value = { ...newSong };
      howl.value = howlCache.get(id)!;
    }

    function getTimePlayed() {
      requestAnimationFrame(() => {
        if (playing.value && howl.value) {
          timePlayed.value = howl.value.seek();
          getTimePlayed();
        }
      });
    }
  }, {
    immediate: true,
  });

  return {
    id: _id,
    loading,
    playing,
    duration,
    timePlayed,
    song,
    howl,
    onEnd,
  };
}
