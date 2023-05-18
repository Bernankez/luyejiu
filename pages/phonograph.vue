<template>
  <SongListItem v-for="i in 50" :key="i" :index="i" />
  <UIDropdown trigger="click" @click="onClick">
    <div role="button" class="w-max select-none rounded-2 bg-white p-3">
      Menu
    </div>
    <template #content>
      <UIDropdownItem value="tttt">
        testfg
      </UIDropdownItem>
      <UIDropdown placement="right-start">
        <UIDropdownItem nested>
          test
        </UIDropdownItem>
        <template #content>
          <UIDropdownItem value="ffff">
            fffff
          </UIDropdownItem>
        </template>
      </UIDropdown>
      <UIDropdownItem static>
        test
      </UIDropdownItem>
    </template>
  </UIDropdown>
</template>

<script setup lang="ts">
const onClick = (value?: string | number) => {
  console.log(value);
};
</script>
