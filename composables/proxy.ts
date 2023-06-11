import type { MaybeRef } from "@vueuse/core";
import type { UnwrapRef } from "vue";

export function useProxy<T>(value: MaybeRef<T>, options?: { get?: (value: T | UnwrapRef<T>) => any; set?: (value: T | UnwrapRef<T>) => any }) {
  const originValue = ref(value);

  return computed({
    get() {
      const result = originValue.value;
      options?.get?.(result);
      return result;
    },
    set(v) {
      originValue.value = v;
      options?.set?.(v);
    },
  });
}
