<template>
  <div class="box-border flex cursor-default bg-gray-50 p-x-3 p-y-2 transition hover:bg-gray-100" @pointerup="onPointerUp" @dblclick="onDoubleClick">
    <div class="w-0 flex-auto truncate">
      <div class="truncate text-4 text-gray-900 sm:text-4.5">
        大貔貅大貔貅大貔貅大貔貅大貔貅大貔貅大貔貅大貔貅大貔貅
      </div>
      <div class="truncate text-3.5 text-gray-700 sm:text-4">
        鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸鹿野灸
      </div>
    </div>
    <div class="m-l-5 flex items-center flex-gap-3 text-gray-700">
      <div role="button" class="i-ic:baseline-queue-play-next text-6 transition sm:text-7 hover:text-gray-900" @click.stop="onInsert"></div>
      <div role="button" class="i-solar:menu-dots-square-outline text-6 transition sm:text-7 hover:text-gray-900" @click.stop="onMenu"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Song } from "~/types/song";

const props = defineProps<{
  song?: Song;
}>();

const emit = defineEmits<{
  (event: "click", song: Song): void;
}>();

const { id } = usePlayer();
const { insert } = usePlaylist();

function onPointerUp(event: PointerEvent) {
  // touch | mouse
  if (event.pointerType === "touch") {
    props.song && emit("click", props.song);
  }
}

function onDoubleClick() {
  props.song && emit("click", props.song);
}

function onInsert() {
  if (props.song && id.value) {
    insert(id.value, [props.song.id]);
    // Toast
  }
}

function onMenu() {
  // TODO popup menu
}
</script>
