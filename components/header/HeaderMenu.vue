<template>
  <UIDropdown trigger="click" placement="bottom-end">
    <div role="button" class="i-solar:menu-dots-bold text-5"></div>
    <template #content="{ close }">
      <UIDropdownItem class="group" static :style="{ padding: 0 }">
        <select :value="locale" class="box-border h-full w-full rounded-1 bg-gray-50 p-x-2 p-y-1.5 text-4.5 group-hover:bg-gray-200 focus:outline-none" @change="(e) => onLocale(e, close)">
          <option v-for="item in locales" :key="item.code" :value="item.code" :selected="locale === item.code">
            {{ item.name }}
          </option>
        </select>
      </UIDropdownItem>
      <!-- <UIDropdownItem :style="{ padding: 0 }">
        <NuxtLink to="https://github.com/Bernankez/luyejiu" external target="_blank" class="w-full flex cursor-default items-center justify-between p-x-2 p-y-1.5">
          <div class="flex items-center flex-gap-2">
            <div class="i-fa:github text-5"></div>
            <div class="text-4.5">
              GitHub
            </div>
          </div>
          <div class="i-solar:square-top-down-outline"></div>
        </NuxtLink>
      </UIDropdownItem> -->
    </template>
  </UIDropdown>
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
select {
  appearance: none;
}

.menu-item {
  @apply flex items-center flex-gap-2 p-x-2 p-y-1.5 hover-bg-gray-200 rounded-2 cursor-default;
}

.menu-panel-enter-active,
.menu-panel-leave-active {
  transition: all 0.1s ease-in;
}

.menu-panel-enter-from,
.menu-panel-leave-to {
  transform: translateX(10%) translateY(-10%);
  scale: 0.9;
  opacity: 0;
}
</style>
