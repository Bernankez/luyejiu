<template>
  <div class="box-border h-full flex flex flex-col flex-col flex-gap-4 bg-gray-100 p-4">
    <UIInput :placeholder="$t('playlistMenu.inputPlaceholder')">
      <template #prefix>
        <div class="i-solar:magnifer-linear text-5"></div>
      </template>
    </UIInput>
    <div class="box-border flex flex-col rounded-2 bg-white p-2">
      <SongListMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <SongListMenuItem icon-class="text-red-500" icon="i-solar:chat-round-like-bold" :count="11" title="我喜欢的歌曲" />
    </div>
    <div class="box-border flex flex-col rounded-2 bg-white p-2">
      <div class="box-border flex items-center justify-between p-3 p-b-1 text-5 font-bold">
        我的歌单
        <div v-if="mode === 'normal'" class="i-solar:clapperboard-edit-outline" @click="() => mode = 'edit'">
        </div>
        <div v-if="mode === 'edit'" class="i-ic:outline-check" @click="() => mode = 'normal'"></div>
      </div>
      <SongListMenuItem :editable="mode === 'edit'" icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <SongListMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲全部歌曲全部歌曲全部歌曲全部歌曲全部歌曲全部歌曲全部歌曲" />
      <SongListMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <SongListMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <SongListMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <SongListMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <SongListMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <SongListMenuAddItem />
    </div>
  </div>
</template>

<script setup lang="ts">
type Mode = "normal" | "edit";

const mode = ref<Mode>("normal");
</script>
