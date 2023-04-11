<template>
  <div class="relative p-t-4 p-r-4 p-b-3 p-l-2 box-border bg-gray-50 text-primary-700">
    <PlayerProgress
      v-model:timePlayed="timePlayed" class="absolute w-full left-0 -top-1" :duration="duration"
      :disabled="loading"
    />
    <div class="flex items-center flex-gap-4">
      <div class="w-10 h-10 bg-gray">
        avatar
      </div>
      <div class="flex items-center flex-gap-2">
        <div class="i-solar:skip-previous-bold-duotone text-4.5 cursor-pointer" @click="() => prev()"></div>
        <div v-if="loading" class="i-svg-spinners:ring-resize text-7"></div>
        <div v-else-if="playing" class="i-solar:pause-bold text-7 cursor-pointer active:scale-90 transition" @click="() => playing = false"></div>
        <div v-else class="i-solar:play-bold text-7 cursor-pointer active:scale-90 transition" @click="() => playing = true"></div>
        <div class="i-solar:skip-next-bold-duotone text-4.5 cursor-pointer" @click="() => next()"></div>
      </div>
      <div class="flex-auto w-0 flex flex-col flex-gap-1">
        <div class="text-3.5 cursor-default truncate">
          {{ song?.name }}
        </div>
        <div class="flex justify-between items-center">
          <div class="shrink-0 text-3 text-primary-400">
            {{ song?.singer }}
          </div>
          <div class="flex sm:hidden items-center flex-gap-2">
            <div v-if="like" class="i-solar:heart-bold text-5 cursor-pointer active:scale-90 transition" @click="() => like = false"></div>
            <div v-else class="i-solar:heart-outline text-5 cursor-pointer active:scale-90 transition" @click="() => like = true"></div>
            <div class="i-solar:repeat-outline text-5 cursor-pointer"></div>
          </div>
        </div>
      </div>
      <div class="flex items-center flex-gap-2">
        <div class="hidden sm:flex items-center flex-gap-2">
          <div v-if="like" class="i-solar:heart-bold text-7 cursor-pointer active:scale-90 transition" @click="() => like = false"></div>
          <div v-else class="i-solar:heart-outline text-7 cursor-pointer active:scale-90 transition" @click="() => like = true"></div>
          <div class="i-solar:repeat-outline text-7 cursor-pointer"></div>
        </div>
        <div class="i-solar:playlist-2-bold text-7 cursor-pointer"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { duration, timePlayed, loading, playing, song, id, prev, next } = usePlayer();
const { add, remove, favoriteList } = useFavoriteList();
const like = computed({
  get() {
    return favoriteList.value?.songs.includes(id.value || "");
  },
  set(like) {
    if (!id.value) { return; }
    if (like) {
      add(id.value);
    } else {
      remove(id.value);
    }
  },
});
</script>
