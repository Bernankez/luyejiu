import type { Fn } from "@vueuse/core";
import { useVolumeButtonDragging } from "./VolumnButton";

export function usePlayerBarSwipe() {
  const containerRef = ref<HTMLDivElement>();
  const targetRef = ref<HTMLDivElement>();
  const containerWidth = computed(() => containerRef.value?.offsetWidth);

  const triggerNext = ref(false);
  const triggerPrev = ref(false);
  const prev = ref<Fn>();
  const next = ref<Fn>();

  const left = ref("0");

  const volumeButtonDragging = useVolumeButtonDragging();

  const { distanceX, isSwiping } = usePointerSwipe(targetRef, {
    pointerTypes: ["touch"],
    onSwipe() {
      if (containerWidth.value && !volumeButtonDragging.value) {
        /**
         * @description 触发阻尼距离
         * @see https://github.com/nolimits4web/swiper/blob/3fbec6e5a730f073575f57422262585471eaae5b/src/core/events/onTouchMove.js#L206
         */
        const minDistance = 30;
        const distance = Math.abs(distanceX.value);
        // 阻尼 越接近0阻尼越大
        const dampings = [0.8, 0.65];
        // 方向系数
        const coefficient = distanceX.value < 0 ? 1 : -1;
        // 大阻尼距离
        const appendDistance = (distance - minDistance) ** dampings[1];
        // 小阻尼距离
        const originDistance = distance ** dampings[0];

        if ((originDistance - appendDistance) > minDistance) {
          left.value = `${coefficient * (minDistance + appendDistance)}px`;
          triggerNext.value = coefficient < 0;
          triggerPrev.value = coefficient > 0;
        } else {
          left.value = `${coefficient * originDistance}px`;
          triggerNext.value = triggerPrev.value = false;
        }
      }
    },
    onSwipeEnd() {
      left.value = "0";
      if (triggerNext.value) {
        next.value?.();
      } else if (triggerPrev.value) {
        prev.value?.();
      }
      triggerNext.value = triggerPrev.value = false;
    },
  });

  return {
    containerRef,
    targetRef,

    triggerNext,
    triggerPrev,
    prev,
    next,
    left,
    isSwiping,
  };
}
