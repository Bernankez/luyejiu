<template>
  <div ref="containerRef" class="relative">
    <PlayerProgress
      v-model:timePlayed="timePlayed" class="absolute left-0 z-1 w-full -top-1" :duration="duration" :buffer-progress="bufferProgress" :disabled="loading"
      @real-time="onRealTime"
    />
    <div ref="targetRef" :style="{ left }" class="box-border w-full select-none bg-gray-50 p-b-3 p-l-2 p-r-4 p-t-4 text-primary-700" :class="{ 'transition-all duration-200 ease-linear': !isSwiping }">
      <div class="flex items-center flex-gap-4">
        <div class="h-10 w-10 bg-gray">
          avatar
        </div>
        <div class="w-0 flex flex-auto flex-col flex-gap-1">
          <div class="cursor-default truncate text-3.5">
            {{ isHydrated ? song?.name : "" }}
          </div>
          <div class="flex items-center flex-gap-2 text-3 text-primary-400">
            <div class="shrink-0">
              {{ isHydrated ? song?.singer : "" }}
            </div>
            <div>
              {{ dayjs.duration(realTime, "seconds").format("mm:ss") }}/{{ dayjs.duration(duration, "seconds").format("mm:ss") }}
            </div>
          </div>
        </div>
        <div class="flex items-center flex-gap-2">
          <div class="flex items-center flex-gap-2 lg:absolute lg:left-50% lg:flex-gap-5 lg:-translate-x-50%">
            <!-- like button -->
            <div v-if="sm && !like" role="button" class="i-solar:heart-outline cursor-pointer text-6 transition active:scale-90" @click="() => like = true"></div>
            <div v-if="sm && like" role="button" class="i-solar:heart-bold cursor-pointer text-6 transition active:scale-90" @click="() => like = false"></div>
            <!-- prev button -->
            <div v-if="sm" role="button" class="i-solar:skip-previous-bold-duotone cursor-pointer text-4.5" @click="() => prev()"></div>
            <!-- play button -->
            <div v-if="loading" role="button" class="i-svg-spinners:ring-resize text-7"></div>
            <div v-else-if="playing" role="button" class="i-solar:pause-bold cursor-pointer text-7 transition active:scale-90" @click="() => playing = false"></div>
            <div v-else role="button" class="i-solar:play-bold cursor-pointer text-7 transition active:scale-90" @click="() => playing = true"></div>
            <!-- next button -->
            <div v-if="sm" role="button" class="i-solar:skip-next-bold-duotone cursor-pointer text-4.5" @click="() => next()"></div>
            <!-- repeat button -->
            <!-- TODO fix -->
            <PlaymodeButton v-if="sm" class="cursor-pointer text-6" />
          </div>
          <!-- volume button -->
          <VolumeButton v-if="!isIOS" />
          <!-- playlist button -->
          <div role="button" class="i-solar:playlist-2-bold cursor-pointer text-7"></div>
          <!-- close button -->
          <div role="button" class="i-solar:close-square-bold-duotone cursor-pointer text-7 transition active:scale-90" @click="() => showPlayerBar = false"></div>
        </div>
      </div>
      <Transition name="fade">
        <div v-if="triggerPrev || triggerNext" class="absolute left-0 top-0 h-full w-full bg-gray-50 bg-opacity-60 text-6 font-normal backdrop-blur backdrop-saturate-50">
          <div v-if="triggerPrev" class="m-l-4 h-full flex items-center">
            {{ $t("player.releaseToSwitchPrev") }}
          </div>
          <div v-if="triggerNext" class="m-r-4 h-full flex items-center justify-end">
            {{ $t("player.releaseToSwitchNext") }}
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

const { showPlayerBar } = storeToRefs(useAppStore());

const { duration, timePlayed, bufferProgress, loading, playing, song, id, prev, next } = usePlayer();

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

const realTime = ref(0);
function onRealTime(time: number) {
  realTime.value = time;
}

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
