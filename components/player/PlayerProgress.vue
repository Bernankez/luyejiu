<template>
  <!-- The layer was wrapped to increase the touch area. -->
  <div class="group p-y-1" :class="disabled ? 'cursor-not-allowed' : ''" @mousedown="onMouseDown" @touchstart="onMouseDown">
    <div ref="railRef" class="relative w-full h-1" :class="[{ rounded: round }, colorRail]">
      <div class="buffer absolute top-0 h-full" :class="[{ rounded: round }, colorBufferProgress]"></div>
      <div class="slider relative h-full" :class="[disabled ? colorDisabled : colorActive, { rounded: round }]">
        <div class="absolute left-100% top-50% -translate-x-50% -translate-y-50% w-2.5 h-2.5 rounded-2 transition-all" :class="[disabled ? colorDisabled : colorActive, { 'hidden group-hover:block group-active:block': !isDefined(showIndicate) }]"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Fn } from "@vueuse/core";

const props = withDefaults(defineProps<{
  duration?: number;
  timePlayed?: number;
  bufferProgress?: number;
  disabled?: boolean;
  showIndicate?: boolean;
  round?: boolean;
  theme?: "primary" | "white";
}>(), {
  duration: 0,
  timePlayed: 0,
  bufferProgress: 0,
  disabled: false,
  round: false,
  theme: "primary",
  showIndicate: undefined,
});

const emit = defineEmits<{
  (event: "update:timePlayed", timePlayed: number): void;
  (event: "realTime", realTime: number): void;
}>();

const { disabled, showIndicate, timePlayed, duration, bufferProgress, theme } = toRefs(props);

const colorDisabled = computed(() => {
  if (theme.value === "white") {
    return "bg-gray-500";
  }
  return "bg-primary-200";
});
const colorActive = computed(() => {
  if (theme.value === "white") {
    return "bg-gray-50";
  }
  return "bg-primary-500";
});
const colorBufferProgress = computed(() => {
  if (theme.value === "white") {
    return "bg-gray-200 bg-opacity-30";
  }
  return "bg-amber-100";
});
const colorRail = computed(() => {
  if (theme.value === "white") {
    return "bg-gray-200 bg-opacity-50";
  }
  return "bg-primary-50";
});

const dragging = ref(false);

const actualProgress = computed({
  get() {
    return !duration.value ? 0 : timePlayed.value / duration.value;
  },
  set(progress) {
    emit("update:timePlayed", duration.value * progress);
  },
});

const progress = useProxy(0, {
  set(v) {
    emit("realTime", duration.value * v);
  },
});
watchEffect(() => {
  if (!dragging.value) {
    progress.value = actualProgress.value;
  }
});

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
  // Synchronize progress only when dragging ends
  // Prevent dragging during playback from conflicting with the timePlayed
  actualProgress.value = progress.value;
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
  width: calc(v-bind(progress) * 100%);
}

.buffer {
  width: calc(v-bind(bufferProgress) * 100%);
}
</style>
