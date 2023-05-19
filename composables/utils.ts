export function useDelayFn<T extends (...args: any[]) => void>(fn: T, delay?: number) {
  const isCanceled = ref(false);

  function cancel() {
    isCanceled.value = true;
  }

  const debouncedFn = useDebounceFn((...args: T[]) => {
    if (isCanceled.value) {
      isCanceled.value = false;
      return;
    }
    return fn(...args);
  }, delay);

  function delayFn(...args: Parameters<T>) {
    isCanceled.value = false;
    return debouncedFn(...args);
  }

  return {
    fn: delayFn,
    cancel,
  };
}
