<template>
  <div class="background grid min-h-full w-full">
    <div class="relative box-border h-full w-full flex flex-col bg-gray-800 bg-opacity-60 p-x-8 backdrop-blur-60 backdrop-saturate-80">
      <div class="absolute top-8 z-1 box-border text-8 text-gray-50">
        <div role="button" class="i-solar:reply-outline cursor-pointer"></div>
      </div>
      <div class="h-full w-full flex flex-col">
        <div class="h-full flex flex-col md:flex-row md:flex-gap-8">
          <!-- cover image -->
          <div class="h-full flex select-none items-center justify-center">
            <img class="cover object-fit max-w-100 w-full rounded-3 shadow-lg transition-500 md:w-100" :class="{ 'cover--playing': playing }" src="~/assets/demo1.png" alt="cover" />
          </div>
          <div class="box-border md:w-full md:flex md:flex-col md:justify-between md:p-y-8">
            <!-- song info -->
            <div class="box-border flex flex-col cursor-default flex-gap-2 p-b-4">
              <div class="text-5.5 text-gray-50 md:text-8">
                {{ isHydrated ? song?.name : "" }}
              </div>
              <div class="text-4.5 text-white md:text-6">
                {{ isHydrated ? song?.singer : "" }}
              </div>
            </div>
            <div>
              <!-- volume bar -->
              <div v-if="!isIOS" class="flex justify-center">
                <div class="w-full flex items-center flex-gap-2 md:max-w-120">
                  <div class="i-solar:volume-small-bold text-5 text-gray-50"></div>
                  <VolumeProgress />
                  <div class="i-solar:volume-loud-bold text-5 text-gray-50"></div>
                </div>
              </div>
              <!-- action buttons -->
              <div class="flex justify-center">
                <div class="max-w-90 w-full flex items-center justify-evenly p-y-3 text-6 text-gray-50 md:text-8">
                  <div v-if="!like" role="button" class="i-solar:heart-outline cursor-pointer transition active:scale-90" @click="like = true"></div>
                  <div v-if="like" role="button" class="i-solar:heart-bold cursor-pointer text-red-500 transition active:scale-90" @click="like = false"></div>
                  <div role="button" class="i-solar:download-outline cursor-pointer transition active:scale-90"></div>
                  <div role="button" class="i-solar:add-square-outline cursor-pointer transition active:scale-90"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <!-- player progress -->
          <div>
            <PlayerProgress v-model:time-played="timePlayed" round :disabled="loading" :duration="duration" :show-indicate="true" theme="white" :buffer-progress="bufferProgress" @real-time="onRealTime" />
            <div class="flex cursor-default items-center justify-between text-3 text-gray-50">
              <div>
                {{ dayjs.duration(realTime, "seconds").format("mm:ss") }}
              </div>
              <div>
                {{ dayjs.duration(duration, "seconds").format("mm:ss") }}
              </div>
            </div>
          </div>
          <!-- player control buttons -->
          <div class="flex justify-center">
            <div class="box-border max-w-90 w-full flex items-center justify-between p-b-5 p-t-3 text-7 text-gray-50">
              <PlaymodeButton />
              <div class="i-solar:skip-previous-bold-duotone cursor-pointer transition active:scale-90" @click="() => prev()"></div>
              <div v-if="!playing" class="i-solar:play-circle-outline cursor-pointer text-12 transition active:scale-90" @click="() => playing = true"></div>
              <div v-if="playing" class="i-solar:pause-circle-outline cursor-pointer text-12 transition active:scale-90" @click="() => playing = false"></div>
              <div class="i-solar:skip-next-bold-duotone cursor-pointer transition active:scale-90" @click="() => next()"></div>
              <div class="i-solar:playlist-2-bold cursor-pointer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import dayjsDuration from "dayjs/plugin/duration";
import { UAParser } from "ua-parser-js";

dayjs.extend(dayjsDuration);

const { timePlayed, duration, loading, bufferProgress, song, playing, next, prev, id } = usePlayer();

const realTime = ref(0);
function onRealTime(time: number) {
  realTime.value = time;
}

/**
 * Volume is not working on iOS Safari with HTML5 Audio.
 * @see https://github.com/goldfire/howler.js/issues/1519
 */
const parser = new UAParser();
const isIOS = parser.getOS().name === "iOS";

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
.background {
  background-image: url("../../assets/demo1.png");
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-size: cover;
}

.cover {
  transform: scale(0.7);
  transition-timing-function: ease-in-out;
}

.cover--playing {
  transform: scale(1);
  transition-timing-function: cubic-bezier(0.52, 0.41, 0.45, 1.3);
}
</style>
