import type { MaybeComputedRef } from "@unhead/vue";
import type { AnyFn, Fn } from "@vueuse/core";
import { Howl } from "howler";
import { getSongById } from "~/api";
import type { Song } from "~/types/song";

export function useSong(id: MaybeComputedRef<string | undefined>) {
  const loading = ref(false);
  const playing = ref(false);
  const duration = ref(0);
  const timePlayed = ref(0);
  /**
   * 0 - 1
   */
  const bufferProgress = ref(0);
  const stopBufferProgressListenMap = new Map<string, Fn>();
  const song = ref<Song>();
  const howl = ref<Howl>();
  const _id = computed(() => song.value?.id);

  const onEnd = ref<AnyFn>();

  // registry howl onDispose callback
  howlCache.onDispose.value = (id) => {
    if (stopBufferProgressListenMap.has(id)) {
      // stop buffer progress listen on unload
      stopBufferProgressListenMap.get(id)?.();
      stopBufferProgressListenMap.delete(id);
    }
  };

  function unload() {
    playing.value = false;
    howl.value?.unload();
    resolveUnref(_id) && consola.info(`useSong:${resolveUnref(_id)}: unloaded`);
  }

  function stop() {
    howl.value?.stop();
    resolveUnref(_id) && consola.info(`useSong:${resolveUnref(_id)}: stop`);
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
      stop();
      bufferProgress.value = 0;
      if (!howlCache.get(id)) {
        // reset bufferProgress before creating new Howl
        // bufferProgress.value = 0;
        const newHowl = new Howl({
          // song.url
          src: "http://rslbkj11r.hn-bkt.clouddn.com/songs/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.mp3",
          /**
           * If setting html5 to false, musics cannot resume after locking the screen or switching to other apps.
           * @see https://github.com/goldfire/howler.js/issues/1309
           */
          html5: true,
          preload: "metadata",
          onload() {
            consola.info(`useSong:${id}: new Howl loaded`);
            duration.value = newHowl.duration();
            loading.value = false;
            const stop = handleBufferProgress(newHowl, (progress) => {
              bufferProgress.value = progress;
            });
            stopBufferProgressListenMap.set(id, stop);
          },
          onloaderror(_, e) {
            consola.error(`useSong:loaderror:${id}:`, e);
            loading.value = false;
          },
          onplayerror(_, e) {
            consola.error(`useSong:loaderror:${id}:`, e);
            loading.value = false;
            playing.value = false;
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
      } else {
        // cached howl's bufferProgress should be 1
        // bufferProgress.value = 1;
        loading.value = false;
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
    bufferProgress,

    song,
    howl,

    onEnd,
  };
}

function handleBufferProgress(howl: Howl, onProgress?: (progress: number) => void) {
  const audio: HTMLAudioElement = (howl as any)._sounds[0]._node;
  // this does not trigger after full loaded
  const stop = useEventListener(audio, "progress", () => {
    const duration = howl.duration();

    // https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges#Creating_our_own_Buffering_Feedback
    if (duration > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
          const bufferProgress = (audio.buffered.end(audio.buffered.length - 1 - i) / duration);
          onProgress?.(bufferProgress);
          break;
        }
      }
    }
  });

  if (getCurrentInstance()) {
    onUnmounted(stop);
  }

  return stop;
}
