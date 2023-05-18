<template>
  <div :style="style" :class="[raw ? '' : 'cursor-default items-center flex-gap-2 rounded-2 p-x-2 p-y-1.5 hover-bg-gray-200']" @click="onClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";
import { OnItemClickKey } from "./injection-key";

const props = withDefaults(defineProps<{
  emitClick?: boolean; // emit on click
  value?: string | number; // unique key
  raw?: boolean; // without style
  style?: StyleValue; // custom style
}>(), {
  emitClick: true,
});

const emit = defineEmits<{
  (event: "click", value: typeof props.value): void;
}>();

const onItemClick = inject(OnItemClickKey, (..._: any[]) => {});

const onClick = () => {
  if (props.emitClick) {
    emit("click", props.value);
    onItemClick(props.value);
  }
};
</script>
