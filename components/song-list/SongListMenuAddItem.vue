<template>
  <div v-if="!showInput" class="group box-border flex flex-1 cursor-default select-none items-center flex-gap-3 rounded-2 p-3 hover:bg-gray-50" @click="onCreate">
    <div class="h-12 w-12 flex items-center justify-center">
      <div class="i-solar:add-square-outline text-11 text-primary-300 transition group-hover:text-primary-500"></div>
    </div>
    <div class="h-full flex items-center text-4.5 leading-[1] text-gray-500 transition group-hover:text-dark">
      新建歌单
    </div>
  </div>
  <SongListMenuItemInput v-else @cancel="() => showInput = false" />
</template>

<script setup lang="ts">
const showInput = ref(false);

const onCreate = () => {
  showInput.value = true;
};
</script>
