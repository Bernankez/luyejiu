<template>
  <header class="z-609 h-16 w-full flex items-center justify-center bg-gray-50 bg-opacity-70 backdrop-blur backdrop-saturate-100">
    <div class="relative flex items-center flex-gap-4">
      <!-- <HeaderGroup>
        <HeaderItem icon="i-solar:home-smile-bold" to="/" aria-label="Homepage">
          <template #icon>
            <NuxtIcon class="block h-1em w-1em text-4.3" name="paw" />
          </template>
          {{ $t("header.homepageItem") }}
        </HeaderItem>
        <HeaderItem icon="i-solar:music-note-3-bold" to="/phonograph" aria-label="Phonograph">
          {{ $t("header.phonographItem") }}
        </HeaderItem>
        <HeaderItem icon="i-fa6-solid:dog" to="/preview" aria-label="About">
          {{ $t("header.aboutItem") }}
        </HeaderItem>
      </HeaderGroup>
      <div class="h-4 w-2px bg-gray-500"></div>
      <HeaderGroup>
        <HeaderItem icon="i-fa6-brands:bilibili" to="https://space.bilibili.com/5659864" aria-label="Bilibili" :show-title="false" target="_blank">
          {{ $t("header.bilibiliItem") }}
        </HeaderItem>
      </HeaderGroup>
      <HeaderGroup>
        <HeaderItem icon="i-fa6-brands:tiktok" to="https://www.douyin.com/user/MS4wLjABAAAAoFd2tlG2BXnAxi1HyhUZk7hJ-VYUX_6DPwBaZfpvHQCnrsGrcvFMany2KvIDabR3" aria-label="TikTok" :show-title="false" target="_blank">
          {{ $t("header.tiktokItem") }}
        </HeaderItem>
      </HeaderGroup> -->
      <div class="h-4 w-2px bg-gray-500"></div>
      <HeaderMenu />
      <div class="header-active-bar absolute m-t-6% h-50% bg-yellow transition-all-300 -z-1"></div>
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
