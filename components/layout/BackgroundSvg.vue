<template>
  <ClientOnly>
    <svg class="background" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <pattern
        id="paw"
        x="0" y="0" :width="2 * width" :height="3 * height"
        patternUnits="userSpaceOnUse"
        :fill="fill"
        patternTransform="rotate(-45)"
      >
        <svg x="0" y="0" :width="width" :height="height" v-html="paw" />
        <animateTransform attributeName="patternTransform" type="translate" from="0 0" :to="`${2 * width} 0`" dur="15s" repeatCount="indefinite" additive="sum" />
      </pattern>
      <pattern
        id="paw-reverse"
        x="0" y="0" :width="2 * width" :height="3 * height"
        patternUnits="userSpaceOnUse"
        :fill="fill"
        patternTransform="rotate(-45)"
      >
        <svg :x="width" :y="1.5 * height" :width="width" :height="height" v-html="paw" />
        <animateTransform attributeName="patternTransform" type="translate" :from="`${2 * width} 0`" to="0 0" dur="15s" repeatCount="indefinite" additive="sum" />
      </pattern>
      <rect fill="url(#paw)" x="0" y="0" width="100%" height="100%" />
      <rect fill="url(#paw-reverse)" x="0" y="0" width="100%" height="100%" />
    </svg>
  </ClientOnly>
</template>

<script setup lang="ts">
import { orange } from "~/styles/color";
import paw from "/icons/paw.svg?raw";

const fill = ref(orange[500]);
const ratio = 1.0619;
const height = ref(100);
const width = computed(() => height.value * ratio);
</script>

<style scoped>
svg {
  position: fixed;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
</style>
