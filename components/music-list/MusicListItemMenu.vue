<template>
  <UIDropdown teleport class="z-610" trigger="click" placement="bottom-end">
    <div role="button" class="i-solar:menu-dots-square-outline transition hover:text-gray-900"></div>
    <template #content>
      <UIDropdownItem class="menu-item flex items-center justify-between">
        {{ $t("songListMenu.addNext") }}
        <div class="i-solar:playlist-broken text-6"></div>
      </UIDropdownItem>
      <UIDropdownItem class="menu-item">
        {{ $t("songListMenu.copyLink") }}
      </UIDropdownItem>
      <UIDropdownItem class="menu-item">
        {{ $t("songListMenu.download") }}
      </UIDropdownItem>
    </template>
  </UIDropdown>
</template>

<script setup lang="ts">

</script>

<style scoped>
.menu-item {
  @apply text-4 sm:text-4.5;
}

.menu-panel-enter-active,
.menu-panel-leave-active {
  transition: all 0.1s ease-in;
}

.menu-panel-enter-from,
.menu-panel-leave-to {
  transform: translateX(10%) translateY(-10%);
  scale: 0.9;
  opacity: 0;
}
</style>
