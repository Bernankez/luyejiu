<template>
  <div class="flex flex-1 cursor-default select-none items-center flex-gap-3 rounded-2">
    <slot name="icon">
      <div class="text-12" :class="[icon, iconClass]" :style="iconStyle"></div>
    </slot>
    <div class="h-full flex flex-col justify-between text-4.5">
      {{ title }}
      <div class="text-4 text-gray-600">
        {{ count }}首
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from "nuxt/dist/app/compat/capi";

defineProps<{
  icon?: string;
  iconClass?: string;
  iconStyle?: StyleValue;
  count?: number;
  title?: string;
}>();
</script>
