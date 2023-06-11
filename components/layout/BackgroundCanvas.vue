<template>
  <canvas ref="canvasRef" class="fixed z-1"></canvas>
</template>

<script setup lang="ts">
import pawSvg from "~/assets/icons/paw.svg";

const canvasRef = ref<HTMLCanvasElement>();

const { width, height } = useWindowSize();
const maxWidth = ref(0);
const maxHeight = ref(0);
watchEffect(() => {
  if (width.value > maxWidth.value) {
    maxWidth.value = width.value;
  }
  if (height.value > maxHeight.value) {
    maxHeight.value = height.value;
  }
});
const { pixelRatio } = useDevicePixelRatio();

// redraw only when maxWidth/maxHeight changes
watch([canvasRef, maxWidth, maxHeight, pixelRatio], ([canvas, w, h, r]) => {
  if (canvas) {
    canvas.width = r * w;
    canvas.height = r * h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    draw(canvas);
  }
}, {
  immediate: true,
});

// watchEffect(() => {
//   const canvas = canvasRef.value;
//   if (canvas) {
//     canvas.width = pixelRatio.value * width.value;
//     canvas.height = pixelRatio.value * height.value;
//     canvas.style.width = `${width.value}px`;
//     canvas.style.height = `${height.value}px`;
//     draw(canvas);
//   }
// });

function draw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = pawSvg;
  image.onload = () => {
    // x方向间隔
    const xGap = 1;
    // y方向间隔
    const yGap = 1;
    const svgWidth = image.width * pixelRatio.value;
    const svgHeight = image.height * pixelRatio.value;
    // x方向最大可放置几张图
    const xLength = Math.ceil(width.value / (svgWidth * (1 + xGap)) * pixelRatio.value);
    // y方向最大可放置几张图
    const yLength = Math.ceil(height.value / (svgHeight * (1 + xGap)) * pixelRatio.value);

    for (let c = 0; c < xLength; c++) {
      for (let r = 0; r < yLength; r++) {
        const offsetXOdd = c * svgWidth * (1 + xGap);
        const offsetYOdd = r * svgHeight * (1 + yGap);
        ctx?.save();
        ctx?.translate(offsetXOdd + svgWidth / 2, offsetYOdd + svgHeight / 2);
        ctx?.rotate(45);
        ctx?.translate(-(offsetXOdd + svgWidth / 2), -(offsetYOdd + svgHeight / 2));
        ctx?.drawImage(image, offsetXOdd, offsetYOdd, svgWidth, svgHeight);
        ctx?.restore();

        const offsetXEven = c * svgWidth * (1 + xGap) + (xGap + 1) / 2 * svgWidth;
        const offsetYEven = r * svgHeight * (1 + yGap) + (yGap + 1) / 2 * svgHeight;
        ctx?.save();
        ctx?.translate(offsetXEven + svgWidth / 2, offsetYEven + svgHeight / 2);
        ctx?.rotate(45);
        ctx?.translate(-(offsetXEven + svgWidth / 2), -(offsetYEven + svgHeight / 2));
        ctx?.drawImage(image, offsetXEven, offsetYEven, svgWidth, svgHeight);
        ctx?.restore();
      }
    }
  };
}
</script>

<style scoped>
canvas {
  z-index: 0;
}
</style>
