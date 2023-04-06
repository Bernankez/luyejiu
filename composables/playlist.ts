// TODO save in localStorage or indexedDB

export function useHistoryList(max = 1000) {
  const historyList = ref<string[]>([]);

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

  return {
    historyList,

    add,
    remove,
    clear,
  };
}

export function usePlaylist() {
  const playlist = ref<string[]>([]);

  function add(id: string) {
    if (!playlist.value.includes(id)) {
      playlist.value.unshift(id);
      return true;
    }
    console.warn("The song is already in the playlist");
    return false;
  }
}
