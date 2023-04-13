<template>
  <div ref="containerRef" class="relative">
    <PlayerProgress
      v-model:timePlayed="timePlayed" class="z-1 absolute w-full left-0 -top-1" :duration="duration"
      :disabled="loading"
    />
    <div ref="targetRef" :style="{ left }" class="absolute p-t-4 p-r-4 p-b-3 p-l-2 box-border w-full select-none bg-gray-50 text-primary-700" :class="{ 'transition-all duration-200 ease-linear': !isSwiping }">
      <div class="flex items-center flex-gap-4">
        <div class="w-10 h-10 bg-gray">
          avatar
        </div>
        <div class="flex-auto w-0 flex flex-col flex-gap-1">
          <div class="text-3.5 cursor-default truncate">
            {{ song?.name }}
          </div>
          <div class="flex items-center flex-gap-2 text-3 text-primary-400">
            <div class="shrink-0">
              {{ song?.singer }}
            </div>
            <div>
              {{ dayjs.duration(timePlayed, 'seconds').format("mm:ss") }}/{{ dayjs.duration(duration, 'seconds').format("mm:ss") }}
            </div>
          </div>
        </div>
        <div class="flex items-center flex-gap-2">
          <div class="lg:absolute lg:left-50% lg:-translate-x-50% flex items-center flex-gap-2 lg:flex-gap-5">
            <!-- like button -->
            <div v-if="sm && !like" role="button" class="i-solar:heart-outline text-6 cursor-pointer active:scale-90 transition" @click="() => like = true"></div>
            <div v-if="sm && like" role="button" class="i-solar:heart-bold text-6 cursor-pointer active:scale-90 transition" @click="() => like = false"></div>
            <!-- prev button -->
            <div v-if="sm" role="button" class="i-solar:skip-previous-bold-duotone text-4.5 cursor-pointer" @click="() => prev()"></div>
            <!-- play button -->
            <div v-if="loading" role="button" class="i-svg-spinners:ring-resize text-7"></div>
            <div v-else-if="playing" role="button" class="i-solar:pause-bold text-7 cursor-pointer active:scale-90 transition" @click="() => playing = false"></div>
            <div v-else role="button" class="i-solar:play-bold text-7 cursor-pointer active:scale-90 transition" @click="() => playing = true"></div>
            <!-- next button -->
            <div v-if="sm" role="button" class="i-solar:skip-next-bold-duotone text-4.5 cursor-pointer" @click="() => next()"></div>
            <!-- repeat button -->
            <PlaymodeButton v-if="sm" />
          </div>
          <!-- volume button -->
          <VolumeButton v-if="!isIOS" />
          <!-- playlist button -->
          <div role="button" class="i-solar:playlist-2-bold text-7 cursor-pointer"></div>
        </div>
      </div>
      <Transition name="fade">
        <div v-if="triggerPrev || triggerNext" class="absolute left-0 top-0 w-full h-full text-6 font-normal bg-gray-50 bg-opacity-60 backdrop-blur backdrop-saturate-50">
          <div v-if="triggerPrev" class="h-full flex items-center m-l-4">
            {{ $t('player.releaseToSwitchPrev') }}
          </div>
          <div v-if="triggerNext" class="h-full flex items-center justify-end m-r-4">
            {{ $t('player.releaseToSwitchNext') }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core";
import dayjs from "dayjs";
import dayjsDuration from "dayjs/plugin/duration";
import { UAParser } from "ua-parser-js";
import { usePlayerBarSwipe } from "./PlayerBar";

dayjs.extend(dayjsDuration);

const { duration, timePlayed, loading, playing, song, id, prev, next } = usePlayer();

/**
 * Volume is not working on iOS Safari with HTML5 Audio.
 * @see https://github.com/goldfire/howler.js/issues/1519
 */
const parser = new UAParser();
const isIOS = parser.getOS().name === "iOS";

// player bar swipe
const { containerRef, targetRef, triggerNext, triggerPrev, next: onNext, prev: onPrev, isSwiping, left } = usePlayerBarSwipe();
onNext.value = () => next();
onPrev.value = () => prev();
// breakpoints
const { sm } = useBreakpoints(breakpointsTailwind);

const { favoriteList, add, remove } = useFavoriteList();
const like = computed({
  get() {
    return id.value && favoriteList.value?.songs.includes(id.value);
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
