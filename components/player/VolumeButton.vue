<template>
  <HeadlessPopover class="relative">
    <Transition>
      <HeadlessPopoverPanel class="z-7 absolute bottom-100% left-50% -translate-x-50% m-b-1">
        <div class="h-22 w-10 rounded-3 bg-primary-500 text-white overflow-hidden">
          <div class="h-70% w-full bg-white">
            test
          </div>
        </div>
      </HeadlessPopoverPanel>
    </Transition>
    <HeadlessPopoverButton as="div" role="button" class="i-solar:volume-loud-bold text-7 cursor-pointer" />
  </HeadlessPopover>
</template>

<script setup lang="ts">

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
