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
// keeping player instance
const player = usePlayer();

const { contentPaddingTop, headerHeight, contentPaddingBottom, playerBarHeight } = storeToRefs(useAppStore());
const mainPaddingBottom = computed(() => contentPaddingBottom.value ? playerBarHeight.value : "0");
const mainPaddingTop = computed(() => contentPaddingTop.value ? headerHeight.value : "0");
</script>

<style scoped>
main {
  box-sizing: border-box;
  padding-top: v-bind(mainPaddingTop);
  padding-bottom: v-bind(mainPaddingBottom);
}
</style>
