<template>
  <div class="box-border flex cursor-default items-center bg-gray-50 p-y-2 p-r-3 transition hover:bg-gray-100" @pointerup="onPointerUp" @dblclick="onDoubleClick">
    <div class="w-12 flex items-center justify-center text-4.5 sm:text-5" :class="[playing ? 'text-primary-500' : 'text-gray-900 ']">
      <template v-if="!playing">
        {{ props.index }}1
      </template>
      <div v-else class="i-svg-spinners:bars-scale-middle text-5 sm:text-6"></div>
    </div>
    <div class="w-0 flex-auto truncate">
      <div class="truncate text-4 sm:text-4.5" :class="[playing ? 'text-primary-500' : 'text-gray-900 ']">
        大貔貅大貔貅大貔貅大貔貅大貔貅大貔貅大貔貅大貔貅大貔貅
      </div>
      <div class="truncate text-3.5 sm:text-4" :class="[playing ? 'text-primary-300' : 'text-gray-600']">
        鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸
      </div>
    </div>
    <div class="m-l-3 flex flex-col self-stretch justify-between">
      <div class="flex items-center justify-end flex-gap-3 text-5 leading-[1] text-gray-700 sm:text-6">
        <div v-if="!like" role="button" class="i-solar:heart-outline cursor-pointer transition active:scale-90 hover:text-gray-900" @click="like = true"></div>
        <div v-if="like" role="button" class="i-solar:heart-bold cursor-pointer text-red-500 transition active:scale-90" @click="like = false"></div>
        <div role="button" class="i-solar:playlist-broken transition active:scale-90 hover:text-gray-900" @click.stop="onInsert"></div>
        <div role="button" class="i-solar:menu-dots-square-outline transition hover:text-gray-900" @click.stop="onMenu"></div>
      </div>
      <div class="flex items-center text-3 text-gray-600">
        26:26
        <div class="m-x-2 h-80% w-1px bg-gray-600"></div>
        2023/03/10
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Song } from "~/types/song";

const props = defineProps<{
  index?: number;
  song?: Song;
  playing?: boolean;
}>();

const emit = defineEmits<{
  (event: "click", song: Song): void;
  (event: "insert", song: Song): void;
}>();

const id = computed(() => props.song?.id);
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

function onPointerUp(event: PointerEvent) {
  // pointerType: touch | mouse
  if (event.pointerType === "touch") {
    props.song && emit("click", props.song);
  }
}

function onDoubleClick() {
  props.song && emit("click", props.song);
}

function onInsert() {
  if (props.song) {
    emit("insert", props.song);
  }
}

function onMenu() {
  // TODO popup menu
}
</script>
