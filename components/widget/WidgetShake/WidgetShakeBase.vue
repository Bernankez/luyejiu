<template>
  <div class="base"></div>
</template>

<script setup lang="ts">
const width = ref("200px");
const height = ref("35px");
const diameter = ref("20px");
</script>

<style scoped>
.base {
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  border-radius: v-bind(width)/calc(v-bind(diameter) / 1);
  overflow: hidden;
  background-image: linear-gradient(to top, #bbb, #c8c8c8, #d4d4d4, #e1e1e1, #eee);
}

.base::before {
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind(width);
  height: v-bind(diameter);
  border-radius: v-bind(width)/calc(v-bind(diameter) / 1);
  background-image: linear-gradient(to top, #eee, #f0f0f0, #f3f3f3, #f5f5f5, #f8f8f8);
  content: "";
}

.base::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: v-bind(diameter);
  border-radius: v-bind(width)/calc(v-bind(diameter) / 0.7);
  content: "";
}
</style>
