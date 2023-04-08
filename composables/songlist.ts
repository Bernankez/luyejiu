import { v4 as uuid } from "uuid";
import type { Songlist } from "~/types/song";

const songlists = useLocalStorage(`${SONG_PREFIX}-songlist`, <Songlist[]>[]);

/** 歌单 */
export function useSonglists() {
  function add(songlist: Omit<Songlist, "id">, id?: string) {
    const _id = id || uuid();
    songlists.value.push({ ...songlist, id: _id });
  }

  function edit(id: string, songlist: Partial<Songlist>) {
    const { songs, ...left } = songlist;
    const index = songlists.value.findIndex(item => item.id === id);
    if (index > -1) {
      songlists.value[index] = { ...songlists.value[index], ...left };
    }
  }

  function remove(id: string) {
    const index = songlists.value.findIndex(item => item.id === id);
    if (index > -1) {
      songlists.value.splice(index, 1);
    }
  }

  function get(id: string) {
    return songlists.value.find(item => item.id === id);
  }

  return {
    songlists,

    add,
    edit,
    remove,
    get,
  };
}

export function useSonglist(id: string) {
  const { songlists, get } = useSonglists();
  const songlist = computed(() => get(id));

  function add(id: string) {
    if (songlist.value?.songs.includes(id)) {
      consola.warn("The song already exists in the songlist");
      return false;
    }
    songlist.value?.songs.push(id);
    return true;
  }

  function remove(id: string) {
    const index = songlist.value?.songs.indexOf(id);
    if (index && index > -1) {
      songlist.value?.songs.splice(index, 1);
    }
  }

  return {
    songlist,

    add,
    remove,
  };
}

export function useFavoriteList() {
  const { get, add: addSonglist } = useSonglists();
  if (!get(FAVORITE_SUFFIX)) {
    addSonglist({ name: "我喜欢", songs: [] }, FAVORITE_SUFFIX);
  }
  const { songlist: favoriteList, add, remove } = useSonglist(FAVORITE_SUFFIX);

  return {
    favoriteList,

    add,
    remove,
  };
}
