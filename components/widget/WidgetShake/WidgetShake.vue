<template>
  <div ref="wrapperRef" class="pointer-events-none relative">
    <div ref="appRef" class="pointer-events-none relative">
      <div class="absolute bottom-0 left-50% -translate-x-50%">
        <WidgetShakeBase />
      </div>
      <canvas ref="canvasRef" class="pointer-events-none absolute left-50% top-50% z-10 -translate-50%"></canvas>
      <div ref="mainRef" class="pointer-events-none absolute z-20 flex flex-col items-center justify-between">
        <div ref="imageRef" class="widget-image pointer-events-auto relative cursor-pointer bg-cover bg-center bg-no-repeat"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWidgetShake } from "./WidgetShake";

const props = withDefaults(defineProps<{
  image?: string | string[];
  size?: number;
}>(), {
  image: () => [],
  size: 400,
});

const { image: images, size } = toRefs(props);
const image = computed(() => {
  if (Array.isArray(images.value)) {
    return pickRandom(images.value);
  }
  return images.value;
});
const backgroundImage = computed(() => `url('${image.value}')`);

const createStrokeStyle = (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement) => {
  const x = (canvas?.width || 2) / 2;
  const y = (canvas?.height || 27.5) - 27.5;
  // 画不好了 :(
  const gradient = ctx.createLinearGradient(0, x, y, 0);
  gradient.addColorStop(0, "#fff");
  gradient.addColorStop(1, "#888");
  return gradient;
};
const { wrapperRef, appRef, canvasRef, mainRef, imageRef } = useWidgetShake({ strokeStyle: createStrokeStyle, size, image });
</script>

<style scoped>
.widget-image {
  background-image: v-bind(backgroundImage);
}
</style>
