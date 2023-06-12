<template>
  <!-- WIP -->
  <div v-for="i in 100" :key="i" :style="{ left: `${(i - 1) % 2 === 0 ? 0 : i * width}px` }" class="paw-wrapper absolute">
    <div class="paw"></div>
  </div>
</template>

<script setup lang="ts">
import pawSvg from "/icons/paw.svg";

const backgroundUrl = computed(() => `url(${pawSvg})`);
const ratio = 1.0619;
const height = ref(100);
const width = computed(() => height.value * ratio);
</script>

<style scoped>
.paw-wrapper {
  animation: paw 4s linear infinite;
}

.paw {
  width: v-bind(`${width}px`);
  height: v-bind(`${height}px`);
  background-image: v-bind(backgroundUrl);
  transform: rotate(-45deg);
}

@keyframes paw {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translateX(v-bind(`${width}px`)) translateY(v-bind(`${-height}px`));
  }
}
</style>
