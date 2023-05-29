<template>
  <div class="box-border flex cursor-default items-center bg-gray-50 p-y-2 p-r-3 transition hover:bg-gray-100" @pointerup="onPointerUp" @dblclick="onDoubleClick">
    <div class="w-12 flex items-center justify-center text-4.5 sm:text-5" :class="[playing ? 'text-primary-500' : 'text-gray-900 ']">
      <template v-if="!playing">
        {{ props.index }}
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
    <div class="flex items-center justify-end flex-gap-3 text-6 leading-[1] text-gray-700 sm:text-6.5">
      <UITooltip placement="bottom" :delay="700">
        <div role="button" class="i-solar:playlist-broken transition active:scale-90 hover:text-gray-900" @click.stop="onInsert"></div>
        <template #content>
          {{ $t("songListMenu.addNext") }}
        </template>
      </UITooltip>
      <SongListItemMenu />
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
