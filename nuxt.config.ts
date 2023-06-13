import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/stylelint-module",
    // may prompt error when building
    "nuxt-typed-router",
    /**
     * if @nuxt/devtools reports an error, please run `pnpm dlx nuxi@latest devtools enable` manually
     * and clear the absolute path stored in `~/.nuxtrc`
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
    "nuxt-icons",
  ],
  app: {
    head: {
      title: "鹿野灸.live",
      viewport: "width=device-width,initial-scale=1,viewport-fit=cover",
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
      meta: [
        { name: "description", content: "luyejiu.live" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        // open graph social image
        { property: "og:title", content: "鹿野灸.live" },
        { property: "og:description", content: "luyejiu.live" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "鹿野灸" },
      ],
    },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        // typegoose compat
        experimentalDecorators: true,
      },
    },
  },
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
  css: [
    "@unocss/reset/tailwind.css",
    "~/styles/global.css",
  ],
  imports: {
    dirs: [
      "composables/**",
      "store",
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
  runtimeConfig: {
    public: {
      apiBase: "/api",
    },
    // mongodb config
    mongodbHost: undefined,
    mongodbPort: undefined,
    mongodbUser: undefined,
    mongodbPassword: undefined,
    mongodbDatabase: undefined,
    mongodbSRV: undefined,
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
  },
  pwa: {
    // NOTE
  },
});
