<template>
  <div class="background grid w-full min-h-full">
    <div class="relative flex flex-col w-full h-full p-x-8 box-border bg-gray-800 bg-opacity-60 backdrop-blur-60 backdrop-saturate-80">
      <div class="absolute top-8 box-border text-8 text-gray-50">
        <div role="button" class="i-solar:reply-outline cursor-pointer"></div>
      </div>
      <div class="flex flex-col h-full w-full">
        <div class="flex flex-col md:flex-row md:flex-gap-8 h-full">
          <!-- cover image -->
          <div class="flex items-center justify-center h-full select-none">
            <img class="w-full max-w-100 md:w-100 object-fit rounded-3 shadow-lg transition-400 ease-in-out" :class="{ 'scale-70': !playing }" src="~/assets/demo1.png" alt="cover" />
          </div>
          <div class="md:flex md:flex-col md:justify-between md:p-y-8 box-border md:w-full">
            <!-- song info -->
            <div class="flex flex-col flex-gap-2 p-b-4 box-border cursor-default">
              <div class="text-5.5 md:text-8 text-gray-50">
                {{ song?.name }}
              </div>
              <div class="text-4.5 md:text-6 text-white">
                {{ song?.singer }}
              </div>
            </div>
            <div>
              <!-- volume bar -->
              <div v-if="!isIOS" class="flex justify-center">
                <div class="flex items-center flex-gap-2 w-full md:max-w-120">
                  <div class="i-solar:volume-small-bold text-5 text-gray-50"></div>
                  <VolumeProgress />
                  <div class="i-solar:volume-loud-bold text-5 text-gray-50"></div>
                </div>
              </div>
              <!-- action buttons -->
              <div class="flex justify-center">
                <div class="flex items-center justify-evenly p-y-3 w-full max-w-90 text-6 md:text-8 text-gray-50">
                  <div v-if="!like" role="button" class="i-solar:heart-outline cursor-pointer active:scale-90 transition" @click="like = true"></div>
                  <div v-if="like" role="button" class="i-solar:heart-bold text-red-500 cursor-pointer active:scale-90 transition" @click="like = false"></div>
                  <div role="button" class="i-solar:download-outline cursor-pointer active:scale-90 transition"></div>
                  <div role="button" class="i-solar:add-square-outline cursor-pointer active:scale-90 transition"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <!-- player progress -->
          <div>
            <PlayerProgress v-model:time-played="timePlayed" round :disabled="loading" :duration="duration" show-indicate="always" :buffer-progress="bufferProgress" @real-time="onRealTime" />
            <div class="flex items-center justify-between text-3 text-gray-50 cursor-default">
              <div>
                {{ dayjs.duration(realTime, 'seconds').format("mm:ss") }}
              </div>
              <div>
                {{ dayjs.duration(duration, 'seconds').format("mm:ss") }}
              </div>
            </div>
          </div>
          <!-- player control buttons -->
          <div class="flex justify-center">
            <div class="flex items-center justify-between p-b-5 p-t-3 box-border w-full max-w-90 text-7 text-gray-50">
              <PlaymodeButton />
              <div class="i-solar:skip-previous-bold-duotone cursor-pointer active:scale-90 transition" @click="() => prev()"></div>
              <div v-if="!playing" class="i-solar:play-circle-outline text-12 cursor-pointer active:scale-90 transition" @click="() => playing = true"></div>
              <div v-if="playing" class="i-solar:pause-circle-outline text-12 cursor-pointer active:scale-90 transition" @click="() => playing = false"></div>
              <div class="i-solar:skip-next-bold-duotone cursor-pointer active:scale-90 transition" @click="() => next()"></div>
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
</style>
