// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/eslint-module",
    "nuxt-typed-router",
    "@nuxt/devtools",
    "nuxt-vitest",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore",
        ],
      },
    ],
  ],
});
