<template>
  <HeadlessMenu as="div" class="relative">
    <HeadlessMenuButton role="button" as="div" class="i-solar:menu-dots-bold text-5" />
    <HeadlessMenuItems as="div" class="absolute right-0 min-w-50 m-t-2 p-1 box-border text-gray-900 rounded-2 bg-gray-50 shadow">
      <HeadlessMenuItem as="div" class="menu-item p-0! p-r-1.5!">
        <select v-model="locale" class="h-full w-full p-x-2 p-y-2 box-border text-4.5 rounded-1 bg-gray-50 hover:bg-gray-200 focus:outline-none" @click.stop>
          <option v-for="item in locales" :key="item.code" :value="item.code" :selected="locale === item.code">
            {{ item.name }}
          </option>
        </select>
      </HeadlessMenuItem>
      <HeadlessMenuItem as="div" class="menu-item">
        <NuxtLink to="https://github.com/Bernankez/luyejiu" external target="_blank" class="flex items-center justify-between w-full cursor-default">
          <div class="flex items-center flex-gap-2">
            <div class="i-fa:github text-5"></div>
            <div class="text-4.5">
              GitHub
            </div>
          </div>
          <div class="i-solar:square-top-down-outline"></div>
        </NuxtLink>
      </HeadlessMenuItem>
    </HeadlessMenuItems>
  </HeadlessMenu>
</template>

<script setup lang="ts">
import type { WritableComputedRef } from "vue";
import type { LocaleObject } from "#i18n";

const { locale: _locale, locales } = useI18n() as { locales: ComputedRef<LocaleObject[]>; locale: WritableComputedRef<string> };
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const locale = computed({
  get: () => _locale.value,
  set: code => router.push(switchLocalePath(code)),
});
</script>

<style scoped>
.menu-item {
  @apply flex items-center flex-gap-2 p-x-2 p-y-1.5 hover-bg-gray-200 rounded-2 cursor-default;
}
</style>
