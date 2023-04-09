<template>
  <div>
    Player Test
    <div class="i-uil:play cursor-pointer" @click="() => playing = true"></div>
    <div class="i-uil:pause cursor-pointer" @click="() => playing = false"></div>
    <div class="i-uil:angle-left-b cursor-pointer" @click="() => prev()"></div>
    <div class="i-uil:angle-right-b cursor-pointer" @click="() => next()"></div>
    <div>
      isPlaying: {{ playing }}
    </div>
    <div>
      {{ duration }}
    </div>
    <div>
      {{ played }}
    </div>

    <div class="flex flex-col flex-gap-2">
      <div v-for="song in songs" :key="song.id" class="bg-green cursor-pointer" @click="() => change(song.id)">
        {{ song.name }}
      </div>
    </div>

    <ClientOnly>
      <div class="flex flex-col flex-gap-2">
        playlist
        <div v-for="song in playlist" :key="song" class="bg-yellow">
          {{ song }}
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { getAllSongs } from "~/api";

const { playing, change, currentSongId, prev, next, duration, played } = usePlayer();
if (currentSongId.value) {
  change(currentSongId.value, { immediate: false });
}

const { playlist } = usePlaylist();

const songs = getAllSongs();
</script>
