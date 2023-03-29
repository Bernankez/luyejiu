// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/eslint-module",
    "nuxt-typed-router",
    "@nuxt/devtools",
    "nuxt-vitest",
    "@vueuse/nuxt",
    // temporary use edge version, see https://github.com/nuxt-modules/i18n/issues/1954
    "@nuxtjs/i18n-edge",
    "@pinia/nuxt",
  ],
  pinia: {
    autoImports: [
      "defineStore",
    ],
  },
  i18n: {
    baseUrl: "https://luyejiu.live",
    lazy: true,
    langDir: "lang",
    defaultLocale: "zh",
    experimental: {
      jsTsFormatResource: true,
    },
    locales: [
      {
        code: "zh",
        iso: "zh-CN",
        file: "zh-CN.ts",
        name: "简体中文",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en-US.ts",
        name: "English",
      },
    ],
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    vueI18n: {
      fallbackLocale: "zh",
    },
  },
});
