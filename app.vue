<template>
  <div class="grid min-h-full bg-primary-50">
    <!-- Too many SVGs occupy resources, which can easily cause lagging. -->
    <!-- <BackgroundSvg /> -->
    <!-- Displays too large on Safari, freezes on Firefox. -->
    <!-- <BackgroundCanvas /> -->
    <Transition name="header">
      <Header v-if="showHeader" class="fixed top-0 left-0" />
    </Transition>
    <main class="z-0 h-full">
      <NuxtPage />
    </main>
    <Transition name="player-bar">
      <div v-if="showPlayerBar" class="fixed bottom-0 left-0 w-full">
        <PlayerBar />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { paddingBottom, paddingTop, showPlayerBar, showHeader } = storeToRefs(useAppStore());
</script>

<style scoped>
main {
  box-sizing: border-box;
  padding-top: v-bind(paddingTop);
  padding-bottom: v-bind(paddingBottom);
}

.header-enter-active,
.header-leave-active {
  /* TODO animation */
  transition: all 0.2s ease-in;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.player-bar-enter-active,
.player-bar-leave-active {
  /* TODO animation */
  transition: all 0.2s ease-in;
}

.player-bar-enter-from,
.player-bar-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
