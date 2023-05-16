<template>
  <div ref="referenceRef" role="button" class="w-max select-none rounded-2 bg-white p-3" @click="showMenu = !showMenu">
    Menu
  </div>
  <Transition name="menu">
    <div v-if="showMenu" ref="floatingRef" :style="floatingStyles" class="absolute left-0 top-0 z-1 box-border min-w-50 w-max select-none rounded-2 bg-gray-50 p-1 text-gray-900 shadow">
      <div class="flex cursor-default items-center flex-gap-2 rounded-2 p-x-2 p-y-1.5 hover-bg-gray-200">
        teststt
      </div>
      <div ref="referenceRef2" class="w-full cursor-default items-center flex-gap-2 rounded-2 p-x-2 p-y-1.5 hover-bg-gray-200" @click="showMenu2 = !showMenu2">
        teststt
      </div>
      <div v-if="showMenu2" ref="floatingRef2" :style="floatingStyles2" class="absolute left-0 top-0 z-1 box-border w-max select-none rounded-2 bg-gray-50 p-1 text-gray-900 shadow">
        <div class="flex cursor-default items-center flex-gap-2 rounded-2 p-x-2 p-y-1.5 hover-bg-gray-200">
          teststt
        </div>
        <div class="flex cursor-default items-center flex-gap-2 rounded-2 p-x-2 p-y-1.5 hover-bg-gray-200">
          teststt
        </div>
        <div class="flex cursor-default items-center flex-gap-2 rounded-2 p-x-2 p-y-1.5 hover-bg-gray-200">
          teststt
        </div>
      </div>
      <div class="flex cursor-default items-center flex-gap-2 rounded-2 p-x-2 p-y-1.5 hover-bg-gray-200">
        teststt
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { flip, offset, shift, size, useFloating } from "@floating-ui/vue";

const showMenu = ref(false);

const referenceRef = ref<HTMLElement>();
const floatingRef = ref<HTMLElement>();

const showMenu2 = ref(false);

const referenceRef2 = ref<HTMLElement>();
const floatingRef2 = ref<HTMLElement>();

const middleware = ref([offset(5), flip(), shift(), size()]);

const { floatingStyles: floatingStyles2 } = useFloating(referenceRef2, floatingRef2, {
  placement: "right-start",
  strategy: "absolute",
  middleware,
  transform: false,
});

onClickOutside(floatingRef2, (e) => {
  if (e.target === referenceRef2.value) { return; }
  showMenu2.value = false;
});

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  placement: "bottom-start",
  strategy: "absolute",
  middleware,
  transform: false,
});

onClickOutside(floatingRef, (e) => {
  if (e.target === referenceRef.value) { return; }
  showMenu.value = false;
});
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition-timing-function: ease;
  transition-duration: 0.1s;
  transition-property: opacity, scale;
}

.menu-enter-from,
.menu-leave-to {
  z-index: -1;
  scale: 0.8;
  opacity: 0;
}
</style>
