<template>
  <HeadlessMenu as="div" class="relative">
    <HeadlessMenuButton role="button" as="div" class="i-solar:menu-dots-square-outline transition hover:text-gray-900" />
    <Transition name="menu-panel">
      <HeadlessMenuItems
        as="div"
        class="absolute right-0 z-1 m-t-2 box-border min-w-50 select-none rounded-2 bg-gray-50 p-1 text-gray-900 shadow"
      >
        <HeadlessMenuItem as="div" class="menu-item">
          复制链接
        </HeadlessMenuItem>
        <HeadlessMenuItem as="div" class="menu-item">
          下载
        </HeadlessMenuItem>
      </HeadlessMenuItems>
    </Transition>
  </HeadlessMenu>
</template>

<script setup lang="ts">

</script>

<style scoped>
.menu-item {
  @apply flex items-center flex-gap-2 p-x-2 p-y-2 text-4 sm:text-4.5 hover-bg-gray-200 rounded-2 cursor-default;
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
