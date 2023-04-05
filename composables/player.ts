import { Howl } from "howler";
import type { Song } from "./song";

export function usePlayer() {
  const playing = ref(false);
  /** seconds */
  const duration = ref(0);
  const mute = ref(false);
  const volume = ref(0);
  const combinedVolume = computed(() => mute.value ? 0 : volume.value);

  const player = new Howl({
    src: ["http://rslbkj11r.hn-bkt.clouddn.com/songs/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.mp3"],
    format: ["webm", "mp3"],
    // Determine whether to use HTML5 player based on file size
    html5: true,
    preload: "metadata",
  });

  function isPlay() {
    return player.playing();
  }

  function play() {
    player.play();
    playing.value = true;
  }

  function pause() {
    player.pause();
    playing.value = false;
  }

  function stop() {
    player.stop();
    playing.value = false;
  }

  function unload() {
    player.unload();
    playing.value = false;
  }

  return {
    play,
    stop,
    pause,
    isPlay,
    unload,

    playing,
    duration,
    mute,
    volume,
    combinedVolume,
  };
}

export function usePlaylist() {
  const playlist = ref<Song[]>([]);
}
