<template>
  <header class="z-609 flex justify-center items-center h-16 w-full bg-gray-50 bg-opacity-70 backdrop-blur backdrop-saturate-100">
    <div class="relative flex items-center flex-gap-4">
      <HeaderGroup>
        <HeaderItem icon="i-solar:home-smile-bold" to="/" aria-label="Homepage">
          <template #icon>
            <NuxtIcon class="block h-1em w-1em text-4.3" name="paw" />
          </template>
          {{ $t('header.homepageItem') }}
        </HeaderItem>
        <HeaderItem icon="i-solar:music-note-3-bold" to="/song" aria-label="Phonograph">
          {{ $t('header.phonographItem') }}
        </HeaderItem>
        <HeaderItem icon="i-fa6-solid:dog" to="/preview" aria-label="About">
          {{ $t('header.aboutItem') }}
        </HeaderItem>
      </HeaderGroup>
      <div class="w-2px h-4 bg-gray-500"></div>
      <HeaderGroup>
        <HeaderItem icon="i-fa6-brands:bilibili" to="https://space.bilibili.com/5659864" aria-label="Bilibili" :show-title="false" target="_blank">
          {{ $t("header.bilibiliItem") }}
        </HeaderItem>
      </HeaderGroup>
      <div class="w-2px h-4 bg-gray-500"></div>
      <!-- <HeaderGroup>
        <HeaderItem icon="i-heroicons-outline:translate" to="https://space.bilibili.com/5659864" aria-label="Bilibili" :show-title="false" target="_blank">
          {{ $t("header.bilibiliItem") }}
        </HeaderItem>
        <HeaderItem icon="i-fa:github" to="https://github.com/Bernankez/luyejiu" aria-label="Bilibili" :show-title="false" target="_blank">
          {{ $t("header.githubItem") }}
        </HeaderItem>
      </HeaderGroup> -->
      <HeaderItem icon="i-solar:menu-dots-bold" to="https://github.com/Bernankez/luyejiu" aria-label="Bilibili" :show-title="false" target="_blank">
        {{ $t("header.githubItem") }}
      </HeaderItem>
      <!-- TODO Translation github -->
      <div class="header-active-bar -z-1 absolute h-50% m-t-6% bg-yellow transition-all-300"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onActiveKey } from "./Header";

const activeOffsetLeft = ref(0);
const activeOffsetWidth = ref(0);
const onActive = (el: HTMLElement) => {
  activeOffsetLeft.value = el.offsetLeft;
  activeOffsetWidth.value = el.offsetWidth;
};

provide(onActiveKey, onActive);
</script>

<style scoped>
.header-active-bar {
  left: calc(v-bind(`${activeOffsetLeft}px`) - 2%);
  width: calc(v-bind(`${activeOffsetWidth}px`) + 4%);
}
</style>
