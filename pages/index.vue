<template>
  <NuxtLink v-for="loc in avaliableLocales" :key="loc.code" :to="switchLocalePath(loc.code)">
    {{ loc.name }}
  </NuxtLink>
  <div class="i-uil:android"></div>
  <p class="text-lg text-green font-bold">
    {{ $t('welcome') }}
  </p>
  <NuxtWelcome />
</template>

<script setup lang="ts">
import type { LocaleObject } from "vue-i18n-routing";

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const avaliableLocales = computed(() => (locales.value as LocaleObject[]).filter(i => i.code !== locale.value));
</script>