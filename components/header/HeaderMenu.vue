<template>
  <HeadlessMenu v-slot="{ close }" as="div" class="relative">
    <HeadlessMenuButton role="button" as="div" class="i-solar:menu-dots-bold text-5" />
    <Transition name="menu-panel">
      <HeadlessMenuItems as="div" class="absolute right-0 m-t-2 box-border min-w-50 select-none rounded-2 bg-gray-50 p-1 text-gray-900 shadow">
        <HeadlessMenuItem as="div" class="menu-item p-0! p-r-1.5!">
          <select :value="locale" class="box-border h-full w-full rounded-1 bg-gray-50 p-x-2 p-y-2 text-4.5 hover:bg-gray-200 focus:outline-none" @change="(e) => onLocale(e, close)" @click.stop>
            <option v-for="item in locales" :key="item.code" :value="item.code" :selected="locale === item.code">
              {{ item.name }}
            </option>
          </select>
        </HeadlessMenuItem>
        <HeadlessMenuItem as="div" class="menu-item">
          <NuxtLink to="https://github.com/Bernankez/luyejiu" external target="_blank" class="w-full flex cursor-default items-center justify-between">
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
    </Transition>
  </HeadlessMenu>
</template>

<script setup lang="ts">
import type { WritableComputedRef } from "vue";
import type { Fn } from "@vueuse/core";
import type { LocaleObject } from "#i18n";

const { locale, locales } = useI18n() as { locales: ComputedRef<LocaleObject[]>; locale: WritableComputedRef<string> };
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const onLocale = (e: Event, close: Fn) => {
  close();
  const target = e.target as HTMLSelectElement;
  const locale = target.value;
  router.push(switchLocalePath(locale));
};
</script>

<style scoped>
.menu-item {
  @apply flex items-center flex-gap-2 p-x-2 p-y-1.5 hover-bg-gray-200 rounded-2 cursor-default;
}

.menu-panel-enter-active,
.menu-panel-leave-active {
  transition: all 0.1s ease-in;
}

.menu-panel-enter-from,
.menu-panel-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
