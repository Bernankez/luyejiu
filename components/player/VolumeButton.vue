<template>
  <div ref="wrapperRef" class="relative">
    <div ref="referenceRef" role="button" class="cursor-pointer text-7" :class="volumeIcon" @click="() => showContent = !showContent"></div>
    <Transition name="slide-fade">
      <div v-if="showContent" ref="floatingRef" :style="floatingStyles" class="absolute z-7">
        <div ref="railRef" class="h-22 w-10 flex flex-col-reverse overflow-hidden rounded-3 bg-primary-50 shadow shadow-primary-200 shadow-inset" @mousedown="onMouseDown" @touchstart="onMouseDown">
          <div class="slider bg-primary-300"></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Fn } from "@vueuse/core";
import { offset, useFloating } from "@floating-ui/vue";
import { useVolumeButtonDragging } from "./VolumeButton";

const { volume } = usePlayer();

const volumeIcon = computed(() => {
  if (volume.value > 0.5) {
    return "i-solar:volume-loud-bold";
  } else if (volume.value > 0) {
    return "i-solar:volume-small-bold";
  } else {
    return "i-solar:volume-cross-bold";
  }
});

const showContent = ref(false);
const wrapperRef = ref<HTMLDivElement>();
const referenceRef = ref<HTMLDivElement>();
const floatingRef = ref<HTMLDivElement>();
onClickOutside(wrapperRef, () => {
  showContent.value = false;
});

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  placement: "top",
  middleware: [offset(3)],
  transform: false,
});

const railRef = ref<HTMLDivElement>();
const dragging = useVolumeButtonDragging();

function getPointValue(e: MouseEvent | TouchEvent) {
  const railEl = railRef.value;
  if (!railEl) { return; }
  const touchEvent = isTouchEvent(e) ? e.touches[0] : e;
  const railRect = railEl.getBoundingClientRect();
  let percentage = 1 - (touchEvent.clientY - railRect.top) / railRect.height;
  if (percentage > 1) {
    percentage = 1;
  } else if (percentage < 0) {
    percentage = 0;
  }
  return percentage;
}

function onMouseDown(e: MouseEvent | TouchEvent) {
  // 0 means buttonLeft
  if (!isTouchEvent(e) && e.button !== 0) {
    return;
  }
  const pointValue = getPointValue(e);
  if (!isDefined(pointValue)) { return; }
  e.preventDefault();
  startDragging();
  volume.value = pointValue;
}

function onMouseMove(e: MouseEvent | TouchEvent) {
  if (!dragging.value) {
    stopDragging();
    return;
  }
  const pointValue = getPointValue(e);
  if (!isDefined(pointValue)) { return; }
  volume.value = pointValue;
}

function onMouseUp() {
  stopDragging();
}

const listenerCleanups = ref<Fn[]>([]);
function stopListeners() {
  listenerCleanups.value.forEach(fn => fn());
  listenerCleanups.value = [];
}

function startDragging() {
  if (!dragging.value) {
    dragging.value = true;
    listenerCleanups.value.push(
      useEventListener(document, "touchend", onMouseUp),
      useEventListener(document, "mouseup", onMouseUp),
      useEventListener(document, "touchmove", onMouseMove),
      useEventListener(document, "mousemove", onMouseMove),
    );
  }
}
function stopDragging() {
  if (dragging.value) {
    dragging.value = false;
    stopListeners();
  }
}
</script>

<style scoped>
.slider {
  height: calc(v-bind(volume) * 100%);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition-timing-function: ease-out;
  transition-duration: 0.15s;
  transition-property: opacity, transform, scale;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(15%);
  opacity: 0;
  scale: 0.9;
}
</style>
