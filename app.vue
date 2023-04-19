<template>
  <div class="grid min-h-full">
    <Background />
    <Header class="fixed top-0 left-0" />
    <main class="h-full bg-primary-50 bg-opacity-40">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const { contentPaddingBottom, playerBarHeight } = storeToRefs(useAppStore());
const mainPaddingBottom = computed(() => contentPaddingBottom.value ? `${playerBarHeight.value}px` : "0");
</script>

<style scoped>
main {
  box-sizing: border-box;
  padding-top: 4rem;
  padding-bottom: v-bind(mainPaddingBottom);
}
</style>
