import { Howler } from "howler";

function _usePlayer() {
  const { volume: _volume, mute: _mute, belongingSonglistId, currentSongId } = storeToRefs(useSongStore());
  const { add: playlistAdd, next: playlistNext, prev: playlistPrev, insert: playlistInsert, change: playlistChange } = usePlaylist();

  /** init */
  Howler.volume(_volume.value);
  Howler.mute(_mute.value);

  /**
   * 这里使用changableId的原因是，当通过change方法传入的id未找到歌曲信息时，不更新currentSongId
   * currentSongId会影响历史记录，所以需要一个临时变量
   */
  const changableId = ref(currentSongId);
  /**
   * 这里返回的id即为有效id，即有对应歌曲信息的id
   * 可以同步给currentSongId
   */
  const { loading, playing: _playing, duration, timePlayed: _timePlayed, song, howl, onEnd, id } = useSong(changableId);
  watchEffect(() => {
    if (id.value) {
      currentSongId.value = id.value;
    }
  });

  onEnd.value = () => {
    next(false);
  };

  const mute = computed({
    get() {
      if (volume.value === 0) {
        return true;
      }
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
        mute.value = false;
      }
      _volume.value = value;
      Howler.volume(value);
    },
  });

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

  const timePlayed = computed({
    get() {
      return _timePlayed.value;
    },
    set(value) {
      howl.value?.seek(value);
      _timePlayed.value = value;
    },
  });

  function play() {
    if (!playing.value) {
      // Prevent multiple audio tracks from playing at once.
      howl.value?.play();
    }
  }

  function pause() {
    howl.value?.pause();
  }

  function stop() {
    howl.value?.stop();
  }

  function next(manual = true) {
    const _id = playlistNext(manual);
    if (_id) {
      // has next song
      if (_id === id.value) {
        // replay current song
        timePlayed.value = 0;
        play();
      } else {
        change(_id);
      }
    }
    return _id;
  }

  function prev(manual = true) {
    const _id = playlistPrev(manual);
    if (_id) {
      // has prev song
      if (_id === id.value) {
        // replay current song
        timePlayed.value = 0;
        play();
      } else {
        change(_id);
      }
    }
    return id;
  }

  function change(id: string, options?: { immediate?: boolean; songlistId?: string; playlist?: string[] }) {
    const { immediate = true, songlistId, playlist } = options || {};
    if (songlistId) {
      const { songlist } = useSonglist(songlistId);
      if (songlist.value?.songs) {
        belongingSonglistId.value = songlistId;
        playlistChange(songlist.value.songs);
      }
    } else if (playlist) {
      belongingSonglistId.value = null;
      playlistChange(playlist);
    }
    playlistAdd(id);

    changableId.value = id;
    if (immediate) {
      watchOnce(howl, (newHowl) => {
        newHowl?.play();
      });
    }
  }

  return {
    mute,
    volume,
    playing,
    timePlayed,

    loading,
    duration,
    id,
    song,
    howl,

    next,
    prev,
    change,
  };
}
/** 全局单例播放器 */
export const usePlayer = createSharedComposable(_usePlayer);
