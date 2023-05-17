import type { Fn, MaybeRef } from "@vueuse/core";
import type { EffectScope } from "nuxt/dist/app/compat/capi";
import type { ComponentPublicInstance } from "vue";

export type TriggerType = "hover" | "click" | "focus" | "manual";

export interface UseFloatingTriggerOptions {
  openContent?: Fn;
  closeContent?: Fn;
}

export function useFloatingTrigger<R extends MaybeRef<ComponentPublicInstance | HTMLElement | undefined>>(referenceRef: R, options: UseFloatingTriggerOptions = {}) {
  const { openContent = noop, closeContent = noop } = options;

  const triggerScope = ref<EffectScope>();
  const dispose = () => {
    triggerScope.value?.stop();
    triggerScope.value = undefined;
  };

  function triggerListener<T extends TriggerType>(trigger: T) {
    dispose();
    triggerScope.value = effectScope();
    if (trigger === "hover") {
      triggerScope.value.run(() => {
        const { isOutside } = useMouseInElement(referenceRef);
        watchEffect(() => {
          if (isOutside.value) {
            closeContent();
          } else {
            openContent();
          }
        });
      });
    } else if (trigger === "focus") {
      triggerScope.value.run(() => {
        const { focused } = useFocusWithin(referenceRef);
        watchEffect(() => {
          if (focused.value) {
            openContent();
          } else {
            closeContent();
          }
        });
      });
    } else if (trigger === "click") {
      triggerScope.value.run(() => {
        const referenceEl = computed(() => unrefElement(referenceRef));
        useEventListener(referenceEl, "click", openContent);
        onClickOutside(referenceRef, () => {
          closeContent();
        });
      });
    } else if (trigger === "manual") {
    // do nothing
    } else {
      consola.warn(`trigger[${trigger}] is not supported`);
    }
  }

  return {
    triggerListener,
    dispose,
  };
}
