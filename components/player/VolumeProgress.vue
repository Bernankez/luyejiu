<template>
  <div
    ref="railRef"
    class="h-2 w-full flex flex-col-reverse overflow-hidden rounded-99 bg-gray-200 bg-opacity-50 md:h-4"
    @mousedown="onMouseDown" @touchstart="onMouseDown"
  >
    <div class="slider h-full bg-white"></div>
  </div>
</template>

<script setup lang="ts">
import type { Fn } from "@vueuse/core";

const { volume } = usePlayer();

const railRef = ref<HTMLDivElement>();
const dragging = ref(false);

function getPointValue(e: MouseEvent | TouchEvent) {
  const railEl = railRef.value;
  if (!railEl) { return; }
  const touchEvent = isTouchEvent(e) ? e.touches[0] : e;
  const railRect = railEl.getBoundingClientRect();
  let percentage = (touchEvent.clientX - railRect.left) / railRect.width;
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
  width: calc(v-bind(volume) * 100%);
}
</style>
