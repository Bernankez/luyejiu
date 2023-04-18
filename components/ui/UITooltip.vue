<template>
  <div ref="triggerRef" @click="onTrigger">
    <slot></slot>
  </div>
  <div v-if="showContent && !disabled" ref="contentRef" class="tooltip-content p-x-2 rounded-1 box-border shadow-md b-1 b-solid b-gray-100 bg-gray-50">
    <slot name="content">
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { Placement, Strategy } from "@floating-ui/vue";
import { offset, useFloating } from "@floating-ui/vue";
import type { Fn } from "@vueuse/core";

const props = withDefaults(defineProps<{
  disabled?: boolean;
  strategy?: Strategy;
  placement?: Placement;
  trigger?: "click" | "hover";
  delay?: number;
}>(), {
  disabled: false,
  trigger: "hover",
  delay: 0,
});

const { strategy: _strategy, placement, trigger, delay } = toRefs(props);

const triggerRef = ref<HTMLDivElement>();
const contentRef = ref<HTMLDivElement>();

const showContent = ref(false);

const canceled = ref(false);
const debouncedOpenContent = ref<Fn>();
watch(delay, (newDelay) => {
  if (newDelay === 0) {
    debouncedOpenContent.value = () => showContent.value = true;
  } else {
    debouncedOpenContent.value = useDebounceFn(() => {
      if (canceled.value) {
        canceled.value = false;
        return;
      }
      showContent.value = true;
    }, newDelay);
  }
}, {
  immediate: true,
});
const openContent = () => {
  canceled.value = false;
  debouncedOpenContent.value?.();
};
const closeContent = () => {
  showContent.value = false;
  canceled.value = true;
};

watch(trigger, (newTrigger, _, onCleanup) => {
  if (newTrigger === "hover") {
    const { isOutside, stop } = useMouseInElement(triggerRef);
    const stopEffect = watchEffect(() => {
      if (isOutside.value) {
        closeContent();
      } else {
        openContent();
      }
    });
    onCleanup(() => {
      stopEffect();
      stop();
    });
  }
}, {
  immediate: true,
});

const onTrigger = () => {
  if (trigger.value === "click") {
    if (showContent.value) {
      closeContent();
    } else {
      openContent();
    }
  }
};

const { x, y, strategy } = useFloating(triggerRef, contentRef, {
  strategy: _strategy,
  placement,
  middleware: [offset(3)],
});
</script>

<style scoped>
.tooltip-content {
  position: v-bind(strategy);
  top: v-bind(`${y ?? 0}px`);
  left: v-bind(`${x ?? 0}px`);
  width: max-content;
}
</style>
