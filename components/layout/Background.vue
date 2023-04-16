<template>
  <svg class="test1" xmlns="http://www.w3.org/2000/svg" version="1.1">

    <pattern
      id="pattern"
      x="0" y="0" width="224" height="220"
      patternUnits="userSpaceOnUse"
      :fill="orange[300]"
      patternTransform="rotate(-45)"
    >
      <svg transform="rotate(-45)" xmlns="http://www.w3.org/2000/svg" version="1.1" class="test" x="0" y="0" width="112" height="110" font-size="7rem" v-html="icon" />
      <animateTransform
        attributeName="patternTransform"
        type="translate"
        from="112 110"
        to="200 110"
        dur="5s"
        repeatCount="indefinite"
      />
      <!-- <text class="emoji-pattern" x="0" y="100" width="80" font-size="80">
          🥝
          👋
        </text>
        <text class="emoji-pattern" x="100" y="200" width="80" font-size="80">
          🥝
        </text> -->
    </pattern>
    <pattern
      id="pattern1"
      x="0" y="0" width="224" height="220"
      patternUnits="userSpaceOnUse"
      :fill="orange[300]"
      patternTransform="rotate(-45)"
    >
      <svg x="112" y="112" width="112" height="110" font-size="7rem" v-html="icon" />
      <animateTransform
        attributeName="patternTransform"
        type="translate"
        from="200 110"
        to="112 110"
        dur="5s"
        repeatCount="indefinite"
        additive="sum"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 56 55"
        to="360 56 55"
        dur="5s"
        repeatCount="indefinite"
        additive="sum"
      />
      <!-- <text class="emoji-pattern" x="0" y="100" width="80" font-size="80">
          🥝
          👋
        </text>
        <text class="emoji-pattern" x="100" y="200" width="80" font-size="80">
          🥝
        </text> -->
    </pattern>
    <rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
    <rect fill="url(#pattern1)" x="0" y="50" width="100%" height="100%" />
  </svg>
</template>

<script setup lang="ts">
import { orange } from "~/styles/color";

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
.test1 {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.test {
  transform: rotate(-45deg);
  transform-origin: 50px 50px;
  animation: snow 3s linear infinite;
}

@keyframes snow {
  0% {
    margin-top: 0;
  }

  100% {
    margin-top: -50px;
  }
}
</style>
