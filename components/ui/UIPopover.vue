<template>
  <CustomSlot />

  <DefineTemplate>
    <Transition name="fade">
      <div v-if="mergedModelValue && !disabled" ref="floatingRef" class="left-0 top-0 box-border w-max b-1 b-gray-100 rounded-1 b-solid bg-gray-50 p-x-2 shadow-md" :style="floatingStyles">
        <slot name="content">
          {{ content }}
        </slot>
        <div v-if="props.arrow" ref="arrowRef" :style="arrowStyle" class="h-2 w-2 rotate-45 bg-gray-50"></div>
      </div>
    </Transition>
  </DefineTemplate>

  <Teleport v-if="teleport" to="body">
    <ReuseTemplate />
  </Teleport>
  <ReuseTemplate v-else />
</template>

<script setup lang="ts">
import type { Placement, Side, Strategy } from "@floating-ui/vue";
import { arrow, autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";
import type { Fn } from "@vueuse/core";
import type { EffectScope } from "nuxt/dist/app/compat/capi";
import { createTextVNode } from "vue";
import type { ComponentPublicInstance, VNode } from "vue";

const props = withDefaults(defineProps<{
  trigger?: "click" | "hover" | "focus" | "manual";
  arrow?: boolean;
  delay?: number;
  placement?: Placement;
  strategy?: Strategy;
  disabled?: boolean;
  offset?: boolean;
  flip?: boolean;
  shift?: boolean;
  autoUpdate?: boolean;
  teleport?: boolean;
  content?: string;
  defaultValue?: boolean;
  modelValue?: boolean | typeof unhandledState;
  animationDuration?: number;
}>(), {
  trigger: "hover",
  arrow: false,
  delay: 0,
  placement: "top",
  strategy: "absolute",
  disabled: false,
  offset: true,
  flip: true,
  shift: true,
  autoUpdate: true,
  teleport: false,
  content: "",
  defaultValue: false,
  modelValue: unhandledState,
  animationDuration: 0,
});

const emit = defineEmits<{
  (event: "update:modelValue", show: boolean): void;
}>();

const { define: DefineTemplate, reuse: ReuseTemplate } = createReusableTemplate();

// get slot dom
const slots = useSlots();
const textVNodeType = createTextVNode("").type;
const referenceVNode = computed(() => {
  if (!slots.default) {
    consola.warn("UITooltip: slot[default] should not be empty");
    return h("span");
  }
  const defaults = flatten(slots.default());
  if (defaults.length > 1) {
    consola.warn("UITooltip: slot[default] should only have one exactly child");
  }
  const defaultSlot = defaults[0];
  if (defaultSlot.type === textVNodeType) {
    return h("span", defaultSlot);
  }
  return defaultSlot;
});
const referenceRef = ref<ComponentPublicInstance | HTMLElement>();
const createSlot = (vNode: VNode) => {
  return defineComponent(() => {
    return () => h(vNode, { ref: referenceRef });
  });
};
const CustomSlot = createSlot(referenceVNode.value);
const floatingRef = ref<HTMLDivElement>();

const arrowRef = ref<HTMLDivElement>();

// handle show/hide
const uncontrolledModelValue = ref(props.defaultValue);
const controlledModelValue = toRef(props, "modelValue");
const mergedModelValue = useMergedState(controlledModelValue, uncontrolledModelValue);
const showContent = (show: boolean) => {
  emit("update:modelValue", show);
  uncontrolledModelValue.value = show;
};
const openContent = () => {
  canceled.value = false;
  debouncedOpenContent.value?.();
};
const closeContent = () => {
  canceled.value = true;
  showContent(false);
};
const canceled = ref(false);
const debouncedOpenContent = ref<Fn>();
watch(() => props.delay, (delay) => {
  if (delay === 0) {
    debouncedOpenContent.value = () => showContent(true);
  } else {
    debouncedOpenContent.value = useDebounceFn(() => {
      if (canceled.value) {
        canceled.value = false;
        return;
      }
      showContent(true);
    }, delay);
  }
}, {
  immediate: true,
});
let triggerScope: EffectScope | undefined;
const dispose = () => {
  triggerScope && triggerScope.stop();
};
watch([() => props.trigger, () => props.disabled], ([trigger, disabled]) => {
  dispose();
  if (disabled) {
    return;
  }
  triggerScope = effectScope();
  if (trigger === "hover") {
    triggerScope.run(() => {
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
    triggerScope.run(() => {
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
    triggerScope.run(() => {
      const referenceEl = computed(() => unrefElement(referenceRef));
      useEventListener(referenceEl, "click", openContent);
      onClickOutside(referenceRef, () => {
        closeContent();
      });
    });
  } else if (trigger === "manual") {
    // do nothing
  } else {
    consola.warn(`UITooltip: trigger[${trigger}] is not supported`);
  }
}, { immediate: true });

const middleware = computed(() => {
  const arr = [];
  if (props.offset) {
    arr.push(offset(props.arrow ? 6 : 3));
  }
  if (props.flip) {
    arr.push(flip());
  }
  if (props.shift) {
    arr.push(shift());
  }
  if (props.arrow) {
    arr.push(arrow({
      element: arrowRef,
    }));
  }
  return arr;
});
const originPlacement = toRef(props, "placement");
const { floatingStyles, middlewareData, placement } = useFloating(referenceRef, floatingRef, {
  middleware,
  placement: originPlacement,
  whileElementsMounted(reference, floating, update) {
    if (props.autoUpdate) {
      return autoUpdate(reference, floating, update);
    }
    return noop;
  },
});
const arrowStyle = computed(() => {
  const { x, y } = middlewareData.value.arrow || {};

  const side = placement.value.split("-")[0] as Side;

  const arrowEl = arrowRef.value;
  let offset = 0;
  if (arrowEl) {
    if (x !== undefined) {
      offset = -arrowEl.offsetHeight / 2;
    } else if (y !== undefined) {
      offset = -arrowEl.offsetWidth / 2;
    }
  }
  const staticSide = {
    top: "bottom", right: "left", bottom: "top", left: "right",
  }[side];

  return {
    position: props.strategy,
    left: x === undefined ? "" : `${x}px`,
    top: y === undefined ? "" : `${y}px`,
    [staticSide]: `${offset}px`,
  };
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-timing-function: ease;
  transition-duration: v-bind("`${props.animationDuration}ms`");
  transition-property: opacity;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
