<template>
  <div class="grid min-h-full bg-primary-50">
    <!-- Can cause low performance due to so many SVGs -->
    <!-- <BackgroundSvg /> -->
    <!-- Displays too large on Safari, freezes on Firefox. -->
    <!-- <BackgroundCanvas /> -->
    <!-- Cannot perform animation on iOS -->
    <!-- <BackgroundCSS /> -->
    <Transition name="header">
      <Header v-if="showHeader" class="fixed left-0 top-0" />
    </Transition>
    <main class="z-0" :class="[lockScroll ? 'h-100vh overflow-hidden' : 'h-full']">
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
const { paddingBottom, paddingTop, showPlayerBar, showHeader, lockScroll } = storeToRefs(useAppStore());
</script>

<style scoped>
main {
  box-sizing: border-box;
  padding-top: v-bind(paddingTop);
  padding-bottom: v-bind(paddingBottom);
}

.header-enter-active,
.header-leave-active {
  transition: all 0.4s cubic-bezier(0.72, 0.3, 0.36, 0.86);
}

.header-enter-from,
.header-leave-to {
  transform: translateY(-100%);
  opacity: 0;
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
