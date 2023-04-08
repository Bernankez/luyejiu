<template>
  <div>
    Player Test
    <div class="i-uil:play cursor-pointer" @click="() => playing = true"></div>
    <div class="i-uil:pause cursor-pointer" @click="() => playing = false"></div>
    <div class="i-uil:angle-left-b cursor-pointer" @click="() => prev"></div>
    <div class="i-uil:angle-right-b cursor-pointer" @click="() => next"></div>
    <div>
      isPlaying: {{ playing }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { playing, change, currentSongId, prev, next } = usePlayer();
currentSongId.value = "test";
if (currentSongId.value) {
  change(currentSongId.value, { immediate: false });
}
</script>
