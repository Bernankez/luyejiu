import { Howl, Howler } from "howler";
import type { Song } from "~/types/song";
import { getSongById } from "~/api";

export function usePlayer() {
  const { volume: _volume, mute: _mute, belongingSonglistId, currentSongId } = storeToRefs(useSongStore());
  const { add: playlistAdd, next: playlistNext, prev: playlistPrev, insert: playlistInsert, change: playlistChange } = usePlaylist();

  const mute = computed({
    get() {
      return _mute.value;
    },
    set(value) {
      _mute.value = value;
      Howler.mute(value);
    },
  });

  const volume = computed({
    get() {
      return _volume.value;
    },
    set(value) {
      if (value !== 0) {
        mute.value = true;
      }
      _volume.value = value;
      Howler.volume(value);
    },
  });

  const loading = ref(false);

  const _playing = ref(false);
  const playing = computed({
    get() {
      return _playing.value;
    },
    set(value) {
      if (value) {
        play();
      } else {
        pause();
      }
    },
  });
  /** seconds */
  const duration = ref(0);
  const _played = ref(0);
  const played = computed({
    get() {
      return _played.value;
    },
    set(value) {
      if (currentSong.value?.player) {
        currentSong.value.player.seek(value);
        _played.value = value;
      }
    },
  });

  const currentSong = ref<Song & { player: Howl }>();

  /** 播放 */
  function play() {
    if (currentSong.value?.player) {
      currentSong.value.player.play();
      _playing.value = true;
    }
  }

  /** 暂停 */
  function pause() {
    if (currentSong.value?.player) {
      currentSong.value.player.pause();
      _playing.value = false;
    }
  }

  /** 切歌 */
  async function change(id: string, options?: { immediate?: boolean; songlistId?: string; playlist?: string[] }) {
    const { immediate = true, songlistId, playlist } = options || {};
    if (songlistId) {
      const { songlist } = useSonglist(songlistId);
      if (songlist.value?.songs) {
        belongingSonglistId.value = songlistId;
        playlistChange(songlist.value.songs);
      }
    } else if (playlist) {
      belongingSonglistId.value = undefined;
      playlistChange(playlist);
    }
    playlistAdd(id);

    loading.value = true;
    const song = getSongById(id);
    if (!song) {
      loading.value = false;
      return undefined;
    }
    // unload before changing
    unload();
    currentSongId.value = id;
    if (!howlCache.get(id)) {
      consola.info(`usePlayer:${currentSongId.value}: ready to create new Howl`);
      const newHowl = new Howl({
        // song.url
        src: "http://rslbkj11r.hn-bkt.clouddn.com/songs/%E9%B9%BF%E9%87%8E%E7%81%B8%20-%20%E5%A4%A7%E8%B2%94%E8%B2%85%C2%B7%E5%B0%8F%E5%B0%91%E5%B9%B4%E7%89%88.mp3",
        html5: true,
        onload() {
          consola.info(`usePlayer:${currentSongId.value}: new Howl loaded`);
          duration.value = newHowl.duration();
          loading.value = false;
        },
        onloaderror(_, e) {
          consola.error(`usePlayer:loaderror:${currentSongId}:`, e);
          loading.value = false;
        },
        onplayerror(_, e) {
          consola.error(`usePlayer:loaderror:${currentSongId}:`, e);
          loading.value = false;
        },
        onseek() {
          function getPlayed() {
            requestAnimationFrame(() => {
              if (playing.value) {
                _played.value = newHowl.seek();
                getPlayed();
              }
            });
          }
          getPlayed();
        },
        onend() {
          next(false);
        },
      });
      howlCache.add(id, newHowl);
    }
    currentSong.value = {
      ...song,
      player: howlCache.get(id)!,
    };
    if (immediate) {
      play();
    }

    return currentSong.value;
  }

  function next(manual = true) {
    const id = playlistNext(manual);
    if (id) {
      change(id);
    }
    return id;
  }

  function prev(manual = true) {
    const id = playlistPrev(manual);
    if (id) {
      change(id);
    }
    return id;
  }

  function insert(id: string) {
    playlistInsert(currentSongId.value, [id]);
  }

  function unload() {
    if (currentSong.value?.player) {
      currentSong.value.player.unload();
      consola.info(`usePlayer:${currentSongId.value}: before unloaded`);
      _playing.value = false;
    }
  }

  return {
    /** duration has been played */
    played,
    /** is playing */
    playing,
    volume,
    mute,
    /** change current song (with playlist) */
    change,
    /** insert song after current song in playlist */
    insert,
    next,
    prev,

    loading,
    duration,
    currentSong,
    currentSongId,
  };
}
