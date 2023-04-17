<template>
  <div class="grid min-h-full">
    <Background />
    <Header class="fixed" />
    <main class="h-full p-t-20" :class="[{ 'p-b-[71px]': contentPaddingBottom }]">
      <NuxtPage />
    </main>
    <div v-if="false" class="fixed bottom-0 w-full">
      <PlayerBar />
    </div>
  </div>
</template>

<script setup lang="ts">
const { contentPaddingBottom } = storeToRefs(useAppStore());
</script>
