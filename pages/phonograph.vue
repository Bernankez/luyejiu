<template>
  <SongListItem v-for="i in 50" :key="i" :index="i" />
  <UIDropdown>
    <div role="button" class="w-max select-none rounded-2 bg-white p-3">
      Menu
    </div>
    <template #content>
      <UIDropdownItem>
        testfg
      </UIDropdownItem>
      <UIDropdown trigger="click" placement="right-start">
        <UIDropdownItem>
          test
        </UIDropdownItem>
        <template #content>
          fffff
        </template>
      </UIDropdown>
      <UIDropdownItem>
        test
      </UIDropdownItem>
    </template>
  </UIDropdown>
</template>

<script setup lang="ts">

</script>
