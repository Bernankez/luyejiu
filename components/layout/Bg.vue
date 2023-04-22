<template>
  <canvas ref="canvasRef" class="fixed z-1"></canvas>
</template>

<script setup lang="ts">
import pawSvg from "~/assets/icons/paw.svg";

const canvasRef = ref<HTMLCanvasElement>();

const { width, height } = useWindowSize();
const { pixelRatio } = useDevicePixelRatio();

watchEffect(() => {
  const canvas = canvasRef.value;
  if (canvas) {
    canvas.width = pixelRatio.value * width.value;
    canvas.height = pixelRatio.value * height.value;
    canvas.style.width = `${width.value}px`;
    canvas.style.height = `${height.value}px`;
    draw(canvas);
  }
});

function draw(canvas?: HTMLCanvasElement) {
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = pawSvg;
    image.onload = () => {
      ctx?.drawImage(image, 0, 0, 100, 100);
    };
  }
}

watchEffect(() => {
  const canvas = canvasRef.value;
  draw(canvas);
});
</script>
