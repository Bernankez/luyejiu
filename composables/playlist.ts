import { Playmode } from "~/types/song";

/** 历史列表 */
function _useHistoryList() {
  const max = 1000;
  const historyList = useLocalStorage(`${SONG_PREFIX}-history-list`, <string[]>[]);
  const songStore = useSongStore();

  function add(id: string) {
    const index = historyList.value.indexOf(id);
    if (index > -1) {
      historyList.value.splice(index, 1);
    }
    historyList.value.unshift(id);
    if (historyList.value.length > max) {
      historyList.value.splice(max);
    }
  }

  function remove(id: string) {
    const index = historyList.value.indexOf(id);
    if (index > -1) {
      historyList.value.splice(index, 1);
    }
  }

  function clear() {
    historyList.value = [];
  }

  watchEffect(() => {
    if (songStore.currentSongId) {
      add(songStore.currentSongId);
    }
  });

  return {
    historyList,

    add,
    remove,
    clear,
  };
}
/** 单例历史列表 */
export const useHistoryList = createSharedComposable(_useHistoryList);

/** 播放列表 */
function _usePlaylist() {
  const originPlaylist = useLocalStorage(`${SONG_PREFIX}-playlist`, <string[]>[]);
  const randomPlaylist = useLocalStorage(`${SONG_PREFIX}-playlist-random`, <string[]>[]);
  const songStore = useSongStore();

  const { currentSongId, playmode } = storeToRefs(songStore);
  const playlist = computed(() => {
    if (playmode.value === Playmode.random) {
      return randomPlaylist.value;
    }
    return originPlaylist.value;
  });
  watch([playmode, originPlaylist], ([mode, list]) => {
    if (mode === Playmode.random) {
      randomPlaylist.value = shuffle(list);
    }
  });

  function next(manual = false) {
    if (playlist.value.length === 0) {
      return undefined;
    }
    if (!currentSongId.value || !playlist.value.includes(currentSongId.value)) {
      return playlist.value[0];
    }
    if (playmode.value === Playmode.single) {
      if (!manual) { return currentSongId.value; }
    }
    const index = playlist.value.indexOf(currentSongId.value);
    if (playmode.value === Playmode.loop || manual) {
      return playlist.value[(index + 1) % playlist.value.length];
    }
    return playlist.value[index + 1];
  }

  function prev(manual = false) {
    if (playlist.value.length === 0) {
      return undefined;
    }
    if (!currentSongId.value || !playlist.value.includes(currentSongId.value)) {
      return playlist.value[0];
    }
    if (playmode.value === Playmode.single) {
      if (!manual) { return currentSongId.value; }
    }
    const index = playlist.value.indexOf(currentSongId.value);
    if (playmode.value === Playmode.loop || manual) {
      return playlist.value[(index - 1 + playlist.value.length) % playlist.value.length];
    }
    return playlist.value[index - 1];
  }

  function change(list: string[]) {
    originPlaylist.value = [...list];
  }

  function insert(after: string, ids: string[]) {
    const index = originPlaylist.value.indexOf(after);
    if (index > -1) {
      originPlaylist.value.splice(index + 1, 0, ...ids);
    }
  }

  function add(id: string) {
    if (!originPlaylist.value.includes(id)) {
      originPlaylist.value.unshift(id);
    }
  }

  return {
    playlist: originPlaylist,
    actualPlaylist: playlist,

    add,
    next,
    prev,
    change,
    insert,
  };
}
/** 单例播放列表 */
export const usePlaylist = createSharedComposable(_usePlaylist);
