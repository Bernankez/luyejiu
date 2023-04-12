<template>
  <div>
    Player Test
    <div>Progress</div>
    <PlayerProgress v-model:timePlayed="timePlayed" :duration="duration" />
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
      {{ timePlayed }}
    </div>
    <input v-model="seekTime" />
    <button @click="() => timePlayed = (Number(seekTime))">
      seek
    </button>
    <div>volume</div>
    <input :modelValue="volume" type="range" :min="0" :max="1" :step="0.1" @input="(e) => volume = Number((e.target as any).value)" />
    <div>mute</div>
    <input v-model="mute" type="checkbox" :truevalue="true" :falsevalue="false" />

    <div class="flex flex-col flex-gap-2">
      <div v-for="song in songs" :key="song.id" class="bg-green cursor-pointer" @click="() => change(song.id)">
        {{ song.name }}
      </div>
    </div>

    <ClientOnly>
      <div class="flex flex-col flex-gap-2">
        display playlist
        <div v-for="song in playlist" :key="song" class="bg-yellow">
          {{ song }}
        </div>
      </div>
      <div class="flex flex-col flex-gap-2">
        actual playlist
        <div v-for="song in actualPlaylist" :key="song" class="bg-yellow">
          {{ song }}
        </div>
      </div>
      <div class="flex flex-col flex-gap-2">
        favoriteList
        <div v-for="song in favoriteList?.songs" :key="song" class="bg-yellow">
          {{ song }}
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { getAllSongs } from "~/api";

const { playing, change, prev, next, duration, timePlayed, volume, mute } = usePlayer();

const { playlist, actualPlaylist } = usePlaylist();

const { favoriteList } = useFavoriteList();

const songs = getAllSongs();

const seekTime = ref(0);
</script>
