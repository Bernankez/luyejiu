<template>
  <div role="button" :class="playmodeIcon" @click="switchPlaymode"></div>
</template>

<script setup lang="ts">
import { Playmode } from "~/types/song";

const { playmode } = storeToRefs(useSongStore());
const playmodeOrder = [
  Playmode.sequence,
  Playmode.loop,
  Playmode.single,
  Playmode.random,
];

function switchPlaymode() {
  const index = playmodeOrder.indexOf(playmode.value);
  playmode.value = playmodeOrder[(index + 1) % playmodeOrder.length];
}

// @unocss-include
const playmodeIcon = computed(() => ({
  [Playmode.sequence]: "i-solar:list-arrow-down-minimalistic-bold",
  [Playmode.loop]: "i-solar:repeat-outline",
  [Playmode.single]: "i-solar:repeat-one-outline",
  [Playmode.random]: "i-solar:shuffle-outline",
})[playmode.value]);
</script>
