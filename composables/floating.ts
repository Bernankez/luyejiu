import type { Fn, MaybeRef } from "@vueuse/core";
import type { EffectScope } from "nuxt/dist/app/compat/capi";
import type { ComponentPublicInstance } from "vue";

export type TriggerType = "hover" | "click" | "focus" | "manual";

export type TriggerFunctions = {
  [Fn in TriggerType]?: () => void;
};

export interface UseFloatingTriggerOptions extends TriggerFunctions {
  openContent?: Fn;
  closeContent?: Fn;
}

export function useFloatingTrigger<R extends MaybeRef<ComponentPublicInstance | HTMLElement | undefined>>(referenceRef: R, options: UseFloatingTriggerOptions = {}) {
  const { openContent = noop, closeContent = noop, hover, click, focus, manual } = options;

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
        if (hover) {
          hover();
        } else {
          const { isOutside } = useMouseInElement(referenceRef);
          watchEffect(() => {
            if (isOutside.value) {
              closeContent();
            } else {
              openContent();
            }
          });
        }
      });
    } else if (trigger === "focus") {
      triggerScope.value.run(() => {
        if (focus) {
          focus();
        } else {
          const { focused } = useFocusWithin(referenceRef);
          watchEffect(() => {
            if (focused.value) {
              openContent();
            } else {
              closeContent();
            }
          });
        }
      });
    } else if (trigger === "click") {
      triggerScope.value.run(() => {
        if (click) {
          click();
        } else {
          const referenceEl = computed(() => unrefElement(referenceRef));
          useEventListener(referenceEl, "click", openContent);
          onClickOutside(referenceRef, () => {
            closeContent();
          });
        }
      });
    } else if (trigger === "manual") {
    // do nothing
      if (manual) {
        manual();
      }
    } else {
      consola.warn(`trigger[${trigger}] is not supported`);
    }
  }

  return {
    triggerListener,
    dispose,
  };
}
