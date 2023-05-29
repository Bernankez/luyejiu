<template>
  <div class="h-full flex justify-center">
    <div class="max-w-200 w-full flex bg-white">
      <PlaylistMenu class="w-80 shrink-0" />
      <div class="w-full">
        <SongListItem v-for="i in 50" :key="i" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const onClick = (value?: string | number) => {
  console.log(value);
};
</script>
