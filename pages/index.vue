<template>
  <NuxtLink v-for="loc in avaliableLocales" :key="loc.code" :to="switchLocalePath(loc.code)">
    {{ loc.name }}
  </NuxtLink>
  <p>{{ $t('welcome') }}</p>
  <NuxtWelcome />
</template>

<script setup lang="ts">
import type { LocaleObject } from "vue-i18n-routing";

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const avaliableLocales = computed(() => (locales.value as LocaleObject[]).filter(i => i.code !== locale.value));
</script>
