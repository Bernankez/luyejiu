<template>
  <header class="flex justify-center p-y-6 box-border bg-gray-50 w-full bg-opacity-20 backdrop-blur backdrop-saturate-100">
    <div class="flex items-center flex-gap-4">
      <HeaderItem icon="i-solar:home-smile-bold" to="/">
        <template #icon>
          <NuxtIcon class="block h-1em w-1em text-4.3" name="paw" />
        </template>
        首页
      </HeaderItem>
      <HeaderItem icon="i-solar:music-note-3-bold" to="/song">
        留声机
      </HeaderItem>
      <HeaderItem icon="i-fa6-solid:dog" to="/preview">
        关于
      </HeaderItem>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>
