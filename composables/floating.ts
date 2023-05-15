import type { Fn } from "@vueuse/core";

/**
 * @see https://codesandbox.io/s/reverent-shannon-dp1byq?file=/src/Tooltip.tsx
 */
export interface UseInitialStyleOptions {
  openContent?: Fn;
  closeContent?: Fn;
  floatingStyles: Readonly<Ref<Record<string, string | undefined>>>;
  isPositioned: Readonly<Ref<boolean>>;
}

export function useInitialStyle(options: UseInitialStyleOptions) {
  const { openContent = noop, closeContent = noop, floatingStyles, isPositioned } = options;

  const initialStyle = ref<Record<string, string | undefined>>({});

  onMounted(() => {
    openContent();
    requestAnimationFrame(closeContent);
  });
  watch(isPositioned, (isPositioned) => {
    if (isPositioned) {
      initialStyle.value = floatingStyles.value;
    }
  }, { immediate: true });

  return {
    initialStyle,
  };
}
