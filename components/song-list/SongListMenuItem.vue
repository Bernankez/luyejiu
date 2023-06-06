<template>
  <div v-if="!showInput" class="box-border flex flex-1 cursor-default select-none items-center justify-between rounded-2 p-3 transition hover:bg-gray-50">
    <div class="flex items-center flex-gap-3 truncate">
      <div class="h-12 w-12 flex items-center justify-center">
        <slot name="icon">
          <div class="text-12" :class="[icon, iconClass]" :style="iconStyle"></div>
        </slot>
      </div>
      <div class="h-full flex flex-col justify-between truncate text-4.5">
        <div class="truncate">
          {{ title }}
        </div>
        <div class="text-4 text-gray-600">
          {{ count }}首
        </div>
      </div>
    </div>
    <div v-if="editable" class="i-solar:pen-2-outline shrink-0 text-5 text-gray-600" @click="() => showInput = true"></div>
  </div>
  <SongListMenuItemInput v-else :model-value="title" @update:model-value="onEdit" @cancel="() => showInput = false" />
</template>

<script setup lang="ts">
import type { StyleValue } from "nuxt/dist/app/compat/capi";

defineProps<{
  icon?: string;
  iconClass?: string;
  iconStyle?: StyleValue;
  count?: number;
  title?: string | number;
  editable?: boolean;
}>();

const emit = defineEmits<{
  (event: "edit", title: string | number): void;
}>();

const showInput = ref(false);

const onEdit = (title: string | number) => {
  emit("edit", title);
};
</script>
