<template>
  <div class="grid min-h-full">
    <Background />
    <Header class="fixed top-0 left-0" />
    <main class="h-full bg-primary-50 bg-opacity-40">
      <NuxtPage />
    </main>
    <Transition name="player-bar">
      <div v-if="contentPaddingBottom" class="fixed bottom-0 left-0 w-full">
        <PlayerBar />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
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

.player-bar-enter-active,
.player-bar-leave-active {
  transition: all 0.2s ease-in;
}

.player-bar-enter-from,
.player-bar-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
