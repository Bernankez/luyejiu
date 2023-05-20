<template>
  <div :style="style" :class="[raw ? '' : 'cursor-default items-center flex-gap-2 rounded-2 p-x-2 p-y-1.5 hover-bg-gray-200']" @click="onClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { StyleValue } from "vue";
import { CloseContentKey, OnItemClickKey } from "./injection-key";

const props = withDefaults(defineProps<{
  static?: boolean; // static means not close on item
  nested?: boolean; // is nested item
  value?: string | number; // unique key
  raw?: boolean; // without style
  style?: StyleValue; // custom style
}>(), {
  static: false,
  nested: false,
  raw: false,
});

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
}>();

const onItemClick = inject(OnItemClickKey, (..._: any[]) => {});
const closeContent = inject(CloseContentKey, (..._: any[]) => {});

const onClick = (e: MouseEvent) => {
  if (!props.nested) {
    emit("click", e);
    onItemClick(props.value);
  }
  if (!props.static && !props.nested) {
    closeContent();
  }
};
</script>
