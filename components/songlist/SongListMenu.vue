<template>
  <div class="flex flex-col">
    <UIInput placeholder="歌手、歌曲以及更多内容">
      <template #prefix>
        <div class="i-eva:search-outline text-5"></div>
      </template>
    </UIInput>
    <div class="flex flex-gap-4">
      <div class="box-border flex flex-1 cursor-default select-none items-center flex-gap-3 rounded-2 bg-gray-50 p-3 shadow-md">
        <div class="i-solar:music-note-slider-2-bold text-12 text-primary-600"></div>
        <div class="h-full flex flex-col justify-between text-4.5">
          全部歌曲
          <div class="text-4 text-gray-600">
            10首
          </div>
        </div>
      </div>
      <div class="box-border flex flex-1 cursor-default select-none items-center flex-gap-3 rounded-2 bg-gray-50 p-3 shadow-md">
        <div class="i-solar:music-note-slider-2-bold text-12 text-primary-600"></div>
        <div class="h-full flex flex-col justify-between text-4.5">
          全部歌曲
          <div class="text-4 text-gray-600">
            10首
          </div>
        </div>
      </div>
    </div>
    <div class="box-border rounded-2 bg-primary-50 p-2">
      <div class="box-border flex cursor-default select-none items-center flex-gap-3 rounded-2 bg-gray-50 p-3 shadow-md">
        <div class="i-solar:chat-round-like-bold text-12 text-red-500"></div>
        <div class="h-full flex flex-col justify-between text-4.5">
          我喜欢的歌曲
          <div class="text-4 text-gray-600">
            10首
          </div>
        </div>
      </div>
    </div>
    <div>
      我的歌单
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
