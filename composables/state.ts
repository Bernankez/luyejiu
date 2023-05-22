import type { MaybeRefOrGetter } from "@vueuse/core";

export function useMergedState<T>(controlledRef: MaybeRefOrGetter<T | undefined>, uncontrolledRef: Ref<T>) {
  watch(() => resolveUnref(controlledRef), (value) => {
    if (value !== undefined) {
      uncontrolledRef.value = value;
    }
  });

  return computed(() => {
    if (resolveUnref(controlledRef) === undefined) {
      return uncontrolledRef.value;
    }
    return resolveUnref(controlledRef);
  });
}
