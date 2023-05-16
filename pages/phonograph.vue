<template>
  <SongListItem v-for="i in 50" :key="i" :index="i" />
  <UIDropdown>
    <div role="button" class="w-max select-none rounded-2 bg-white p-3">
      Menu
    </div>
  </UIDropdown>
</template>

<script setup lang="ts">

</script>
