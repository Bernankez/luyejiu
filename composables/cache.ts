import type { Howl } from "howler";
import LRU from "lru-cache";

export const howlCache = useHowlCache(5);
export function useHowlCache<T extends Howl = Howl>(max = 10) {
  function beforeDelete(howl: T, key: string) {
    consola.info(`useHowlCache:${key}: ready to unload howl instance`);
    howl.unload();
  }

  const cache = max === 0
    ? useNoneCache<string, T>({
      dispose: beforeDelete,
    })
    : new LRU<string, T>({
      max,
      dispose: beforeDelete,
    });

  function add(id: string, howl: T) {
    cache.set(id, howl);
    return id;
  }

  function get(id: string) {
    return cache.get(id);
  }

  if (getCurrentInstance()) {
    onUnmounted(() => {
      cache.clear();
    });
  }

  return {
    add,
    get,
  };
}

export function useNoneCache<K, V>(options?: { dispose: (value: V, key: K) => void }) {
  const cache = new Map<K, V>();

  function set(key: K, value: V) {
    cache.set(key, value);
    return key;
  }

  function get(key: K) {
    return cache.get(key);
  }

  function clear() {
    for (const [key, value] of cache) {
      options?.dispose?.(value, key);
      cache.delete(key);
    }
  }

  return {
    set,
    get,
    clear,
  };
}
