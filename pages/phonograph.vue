<template>
  <div class="box-border h-full sm:p-l-80">
    <div v-if="sm || showPlaylistPanel" class="playlist-menu fixed left-0 z-1 box-border w-full shrink-0 sm:w-80">
      <SongListMenu class="overflow-auto" />
    </div>
    <div class="w-full">
      <MusicListItem v-for="i in 50" :key="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core";

const onClick = (value?: string | number) => {
  console.log(value);
};

const { paddingTop, paddingBottom, lockScroll } = storeToRefs(useAppStore());

const { sm } = useBreakpoints(breakpointsTailwind);

const showPlaylistPanel = ref(true);
watchEffect(() => {
  if (isHydrated.value) {
    lockScroll.value = showPlaylistPanel.value && !sm.value;
  }
});
</script>

<style scoped>
.playlist-menu {
  top: v-bind(paddingTop);
  bottom: v-bind(paddingBottom);
}
</style>
