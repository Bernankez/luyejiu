import type { Howl } from "howler";
import LRU from "lru-cache";

export function useSongCache<T extends { id: string; player: Howl } = { id: string; player: Howl }>(max = 10) {
  const cache = new LRU<string, T>({
    max,
    dispose: (song) => {
      song.player.unload();
    },
  });

  function add(song: T) {
    cache.set(song.id, song);
    return song.id;
  }

  function get(id: string) {
    return cache.get(id);
  }

  onUnmounted(() => {
    cache.clear();
  });

  return {
    add,
    get,
  };
}
