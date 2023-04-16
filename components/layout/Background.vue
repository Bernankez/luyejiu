<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <pattern
      id="pattern"
      x="0" y="0" width="80" height="300"
      patternUnits="userSpaceOnUse"
    >
      <svg x="0" y="75" width="80" font-size="80" v-html="icon" />
      <svg x="0" y="220" width="80" font-size="80" v-html="icon" />
      <!-- <text class="emoji-pattern" x="0" y="100" width="80" font-size="80">
          🥝
          👋
        </text>
        <text class="emoji-pattern" x="100" y="200" width="80" font-size="80">
          🥝
        </text> -->
    </pattern>
    <rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
  </svg>
</template>

<script setup lang="ts">
const icon = ref("");

const name = "paw";

watchEffect(async () => {
  try {
    const iconsImport = import.meta.glob("assets/icons/**/**.svg", {
      as: "raw",
      eager: false,
    });
    const rawIcon = await iconsImport[`/assets/icons/${name}.svg`]();
    icon.value = rawIcon;
  } catch {
    console.error(
      `[nuxt-icons] Icon '${name}' doesn't exist in 'assets/icons'`,
    );
  }
});
</script>

<style scoped>
svg {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
</style>
