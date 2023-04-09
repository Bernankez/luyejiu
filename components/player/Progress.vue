<template>
  <div class="group w-full h-1 bg-primary-50" :class="disabled ? 'cursor-not-allowed' : ''">
    <div class="relative w-50% h-full " :class="disabled ? 'bg-primary-200' : 'bg-primary-500'">
      <div class="hidden group-hover:block absolute left-100% top-50% -translate-x-50% -translate-y-50% w-2.5 h-2.5 rounded-2 transition-all" :class="disabled ? 'bg-primary-200' : 'bg-primary-500'"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean;
}>(), {
  disabled: false,
});
</script>
