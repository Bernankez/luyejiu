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

const props = withDefaults(defineProps<{
  disabled?: boolean;
  strategy?: Strategy;
  placement?: Placement;
  trigger?: "click" | "hover";
}>(), {
  disabled: false,
  trigger: "hover",
});

const { strategy: _strategy, placement, trigger } = toRefs(props);

const triggerRef = ref<HTMLDivElement>();
const contentRef = ref<HTMLDivElement>();

const showContent = ref(false);

watch(trigger, (newTrigger, _, onCleanup) => {
  if (newTrigger === "hover") {
    const { isOutside, stop } = useMouseInElement(triggerRef);
    const stopEffect = watchEffect(() => {
      showContent.value = !isOutside.value;
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
    showContent.value = !showContent.value;
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
