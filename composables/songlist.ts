import { v4 as uuid } from "uuid";
import type { Songlist } from "~/types/song";

const songlists = useLocalStorage(`${SONG_PREFIX}-songlist`, <Songlist[]>[]);

/** 歌单 */
export function useSonglists() {
  function add(songlist: Omit<Songlist, "id">) {
    const id = uuid();
    songlists.value.push({ ...songlist, id });
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

  return {
    songlists,

    add,
    edit,
    remove,
  };
}

export function useSonglist(id: string) {
  const { songlists } = useSonglists();
  const songlist = computed(() => {
    return songlists.value.find(item => item.id === id);
  });

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

const favoriteSongs = useLocalStorage<string[]>(`${SONG_PREFIX}-${FAVORITE_SUFFIX}`, []);

export function useFavoriteList() {
  function add(id: string) {
    if (favoriteSongs.value.includes(id)) {
      consola.warn("The song already exists in the favorite list");
      return false;
    }
    favoriteSongs.value.push(id);
    return true;
  }

  function remove(id: string) {
    const index = favoriteSongs.value.indexOf(id);
    if (index && index > -1) {
      favoriteSongs.value.splice(index, 1);
    }
  }

  return {
    favoriteSongs,

    add,
    remove,
  };
}
