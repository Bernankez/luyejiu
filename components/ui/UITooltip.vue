<template>
  <UIPopover v-bind="props" class="text-4 leading-[1.5] text-dark">
    <slot></slot>
    <template #content>
      <slot name="content"></slot>
    </template>
  </UIPopover>
</template>

<script setup lang="ts">
import type { Placement } from "@floating-ui/vue";

const props = withDefaults(defineProps<{
  trigger?: "click" | "hover" | "focus";
  disabled?: boolean;
  delay?: number;
  placement?: Placement;
  strategy?: "fixed" | "absolute";
  teleport?: boolean;
}>(), {
  trigger: "hover",
  disabled: false,
  delay: 0,
  placement: "top",
  strategy: "absolute",
  teleport: false,
});
</script>
