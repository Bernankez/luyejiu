<template>
  favorites
</template>

<script setup lang="ts">
import { useFetch } from "#app";

// useFetch("/api/song/644e30e324bb3e92d0f27fc3");
useFetch("/api/songs");
</script>
