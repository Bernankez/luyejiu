import { defineVitestConfig } from "nuxt-vitest/config";

export default defineVitestConfig({
  test: {
    // nuxt using happy-dom
    environment: "nuxt",
  },
});
