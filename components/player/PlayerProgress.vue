<template>
  <!-- The layer was wrapped to increase the touch area. -->
  <div class="group p-y-1" :class="disabled ? 'cursor-not-allowed' : ''" @mousedown="onMouseDown" @touchstart="onMouseDown">
    <div ref="railRef" class="w-full h-1 bg-primary-50">
      <div class="slider relative h-full " :class="disabled ? 'bg-primary-200' : 'bg-primary-500'">
        <div class="hidden group-hover:block group-active:block absolute left-100% top-50% -translate-x-50% -translate-y-50% w-2.5 h-2.5 rounded-2 transition-all" :class="disabled ? 'bg-primary-200' : 'bg-primary-500'"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fn } from "@vueuse/core";

const props = withDefaults(defineProps<{
  disabled?: boolean;
}>(), {
  disabled: false,
});

// TODO v-model max min step
// 0 - 1
const progress = ref(0);

const { disabled } = toRefs(props);

const railRef = ref<HTMLDivElement>();
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
  if (disabled.value) { return; }
  // 0 means buttonLeft
  if (!isTouchEvent(e) && e.button !== 0) {
    return;
  }
  const pointValue = getPointValue(e);
  if (!isDefined(pointValue)) { return; }
  e.preventDefault();
  startDragging();
  progress.value = pointValue;
}

function onMouseMove(e: MouseEvent | TouchEvent) {
  if (!dragging.value) {
    stopDragging();
    return;
  }
  const pointValue = getPointValue(e);
  if (!isDefined(pointValue)) { return; }
  progress.value = pointValue;
}

function onMouseUp() {
  stopDragging();
}

const listenerCleanups = ref<Fn[]>([]);
function stopListeners() {
  listenerCleanups.value.forEach(fn => fn());
  listenerCleanups.value = [];
}

const dragging = ref(false);
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
  width: calc(v-bind(progress) * 100%);
}
</style>
