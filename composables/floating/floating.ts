import type { FloatingElement, MaybeElement, ReferenceElement, UseFloatingOptions } from "@floating-ui/vue";
import { useFloating as originUseFloating } from "@floating-ui/vue";
import type { Fn } from "@vueuse/core";

export type Options< T extends ReferenceElement = ReferenceElement> = UseFloatingOptions<T> & {
  openContent?: Fn;
  closeContent?: Fn;
};

export type Styles = Record<string, string | undefined>;

/**
 * @see https://codesandbox.io/s/reverent-shannon-dp1byq?file=/src/Tooltip.tsx
 */
export function useFloatingAdaptor<T extends ReferenceElement = ReferenceElement>(reference: Readonly<Ref<MaybeElement<T>>>, floating: Readonly<Ref<MaybeElement<FloatingElement>>>, options: Options<T> = {}) {
  const transformOption = computed(() => options.transform);
  const floatingElement = computed(() => unwrapElement(floating.value));
  const { openContent, closeContent } = options;
  // force using left and top
  options.transform = false;

  const state = originUseFloating(reference, floating, options);
  const { strategy, x, y, isPositioned } = state;

  const isMounted = useMounted();

  // git initial position
  function position() {
    openContent?.();
    const stop = watch(isPositioned, (isPositioned) => {
      if (isPositioned) {
        closeContent?.();
        stop();
      }
    });
  }

  if (!isPositioned.value) {
    if (isMounted.value) {
      position();
    } else {
      tryOnMounted(() => {
        position();
      });
    }
  }

  const lastFloatingStyles = ref<Styles>({
    position: strategy.value,
    left: "0",
    top: "0",
  });

  const floatingStyles = computed(() => {
    if (!floatingElement.value) {
      return lastFloatingStyles.value;
    }

    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y.value);

    if (transformOption.value) {
      lastFloatingStyles.value = {
        ...lastFloatingStyles.value,
        transform: `translate(${xVal}px, ${yVal}px)`,
        ...(getDPR(floatingElement.value) >= 1.5 && { willChange: "transform" }),
      };
      return lastFloatingStyles.value;
    }

    lastFloatingStyles.value = {
      position: strategy.value,
      left: `${xVal}px`,
      top: `${yVal}px`,
    };
    return lastFloatingStyles.value;
  });

  watch(isPositioned, (isPositioned) => {
    if (isPositioned) {
      lastFloatingStyles.value = floatingStyles.value;
    }
  }, { immediate: true });

  return {
    ...state,
    floatingStyles,
  };
}
