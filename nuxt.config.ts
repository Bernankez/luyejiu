import { defineNuxtConfig } from "nuxt/config";
import { amber, gray, orange, yellow } from "./styles/color";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/stylelint-module",
    // may prompt error when building
    "nuxt-typed-router",
    /**
     * if @nuxt/devtools reports an error, please run `pnpm dlx nuxi@latest devtools enable` manually
     * @see https://github.com/nuxt/devtools/issues/50#issuecomment-1442572171
     */
    "@nuxt/devtools",
    "nuxt-vitest",
    "@vueuse/nuxt",
    /**
     * temporary use edge version
     * @see https://github.com/nuxt-modules/i18n/issues/1954
     */
    "@nuxtjs/i18n-edge",
    "@pinia/nuxt",
    "@unocss/nuxt",
    "nuxt-headlessui",
    "@vite-pwa/nuxt",
  ],
  components: [
    {
      // import all the components under ~/components recursively
      path: "~/components",
      extensions: [".vue"],
      // explicitly not using prefix
      pathPrefix: false,
      // on demand import, default is false
      // global: false,
    },
  ],
  imports: {
    dirs: [
      "./store",
    ],
  },
  hooks: {
    // global import
    "imports:sources": (sources) => {
      sources.push({
        from: "consola",
        imports: ["consola"],
      });
    },
  },
  eslint: {
    emitWarning: false,
  },
  stylelint: {
    emitWarning: false,
  },
  pinia: {
    autoImports: [
      "defineStore",
      "storeToRefs",
      "skipHydrate",
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
  unocss: {
    uno: true,
    icons: true,
    theme: {
      colors: {
        primary: orange,
        gray,
        amber,
        yellow,
      },
    },
    preflight: true,
    preflights: [
      {
        getCSS: () => `
          html, body {
            height: 100%;
          }

          #__nuxt {
            min-height: 100%;
            display: grid;
            overflow-x: hidden;
          }
        `,
      },
    ],
  },
  pwa: {
    // NOTE
  },
});
