<template>
  <MusicListItem v-for="i in 50" :key="i" />
</template>

<script setup lang="ts">
import { request } from "~/api/request";

const { data } = request("/songs", { method: "get" });
watchEffect(() => {
  console.log(data.value);
});
</script>
