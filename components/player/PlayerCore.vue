<template>
  <div class="w-full h-full bg-green-50">
    背景色为gradient的主色调
    <div>
      <img src="~/assets/demo.png" />
    </div>
    <div>
      <div>{{ song?.name }}</div>
      <div>{{ song?.singer }}</div>
    </div>
    <div class="flex">
      <div class="i-solar:volume-small-bold"></div>
      <PlayerProgress v-model:time-played="timePlayed" class="w-full" :disabled="loading" :duration="duration" show-indicate="always" :buffer-progress="bufferProgress" />
      <div class="i-solar:volume-loud-bold"></div>
    </div>
    <div>
      <div role="button" class="i-solar:heart-outline active:scale-90 transition"></div>
    </div>
    <div>
      <PlayerProgress v-model:time-played="timePlayed" :disabled="loading" :duration="duration" show-indicate="always" :buffer-progress="bufferProgress" />
      <div class="flex items-center justify-between">
        <div>
          {{ dayjs.duration(timePlayed, 'seconds').format("mm:ss") }}
        </div>
        <div>
          {{ dayjs.duration(duration, 'seconds').format("mm:ss") }}
        </div>
      </div>
    </div>
    <div class="flex items-center justify-evenly text-7 bg-gray">
      <PlaymodeButton />
      <div class="i-solar:skip-previous-bold-duotone"></div>
      <div class="i-solar:play-circle-outline text-12"></div>
      <div class="i-solar:skip-next-bold-duotone"></div>
      <div class="i-solar:playlist-2-bold"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import dayjsDuration from "dayjs/plugin/duration";

dayjs.extend(dayjsDuration);

const { timePlayed, duration, loading, bufferProgress, song } = usePlayer();
</script>
