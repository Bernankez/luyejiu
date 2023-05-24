<template>
  <div class="box-border h-full flex flex flex-col flex-col flex-gap-4 bg-gray-100 p-4">
    <UIInput :placeholder="$t('playlistMenu.inputPlaceholder')">
      <template #prefix>
        <div class="i-solar:magnifer-linear text-5"></div>
      </template>
    </UIInput>
    <div class="box-border flex flex-col flex-gap-5 rounded-2 bg-white p-4">
      <PlaylistMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <PlaylistMenuItem icon-class="text-red-500" icon="i-solar:chat-round-like-bold" :count="11" title="我喜欢的歌曲" />
    </div>
    <div class="box-border flex flex-col flex-gap-5 rounded-2 bg-white p-4">
      <div class="text-5">
        我的歌单
      </div>
      <PlaylistMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <PlaylistMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <PlaylistMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <PlaylistMenuItem icon-class="text-primary-600" icon="i-solar:music-note-slider-2-bold" :count="4" title="全部歌曲" />
      <PlaylistMenuItem icon-class="text-primary-600" icon="i-solar:add-circle-broken" title="新建歌单" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
