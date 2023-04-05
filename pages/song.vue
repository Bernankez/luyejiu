<template>
  <div>
    Player Test
    <div class="i-uil:play cursor-pointer" @click="play"></div>
    <div class="i-uil:pause cursor-pointer" @click="pause"></div>
    <div class="i-uil:square-shape cursor-pointer" @click="stop"></div>
    <div>
      isPlaying: {{ playing }}
    </div>
    <br />
    <button @click="unload">
      unload
    </button>
  </div>
</template>

<script setup lang="ts">
const { play, stop, pause, unload, playing } = usePlayer();
</script>
