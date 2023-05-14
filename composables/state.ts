import type { MaybeRefOrGetter } from "@vueuse/core";

export const unhandledState = Symbol("unhandledState");

export function useMergedState<T>(controlledRef: MaybeRefOrGetter<T | typeof unhandledState>, uncontrolledRef: Ref<T>) {
  watch(() => resolveUnref(controlledRef), (value) => {
    if (value !== unhandledState) {
      uncontrolledRef.value = value;
    }
  });

  return computed(() => {
    if (resolveUnref(controlledRef) === unhandledState) {
      return uncontrolledRef.value;
    }
    return resolveUnref(controlledRef);
  });
}
