<template>
  <div class="relative">
    <div class="absolute h-full w-full flex justify-center">
      <div class="w-150 bg-white"></div>
    </div>
    <div class="overflow-hidden">
      <div class="description w-full flex flex-col items-center justify-evenly">
        <div class="flex flex-col items-center">
          <img ref="titleRef" class="max-w-100 w-70vw object-scale-down" :src="title" />
          <div
            ref="introRef"
            class="font-biantao max-w-90vw cursor-default text-center text-8 text-primary-500 sm:text-10"
          >
            {{ $t("homepage.introduction") }}
          </div>
        </div>
        <div ref="avatarRef">
          <ClientOnly>
            <WidgetShake :image="avatar" :size="widgetShakeSize" />
          </ClientOnly>
        </div>
      </div>
      <img ref="flightImgRef" class="m-x-auto scale-0 object-scale-down" :src="flightImgSrc" alt="luyejiu-flight" />
      <div class="h-100vh w-full"></div>
      <img
        ref="proudImgRef" class="m-x-auto max-h-90vh object-scale-down" src="/gsap/animation/lyj-proud.webp"
        alt="luyejiu-proud"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { breakpointsTailwind } from "@vueuse/core";

const flight0 = "/gsap/animation/lyj-flight-0.webp";
const flight1 = "/gsap/animation/lyj-flight-1.webp";
const flight2 = "/gsap/animation/lyj-flight-2.webp";

const titles = [
  "/gsap/title/luyejiu-0.webp",
  "/gsap/title/luyejiu-1.webp",
  "/gsap/title/luyejiu-2.webp",
  "/gsap/title/luyejiu-3.webp",
];
const avatars = ["/gsap/avatars/birthday.webp"];

const title = ref(pickRandom(titles));
const avatar = ref(avatars);

const { sm } = useBreakpoints(breakpointsTailwind);
const widgetShakeSize = computed(() => sm.value ? 400 : 300);

const { paddingTop, paddingBottom } = storeToRefs(useAppStore());

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const flightImgSrc = ref(flight0);
const flightImgRef = ref<HTMLImageElement>();
const proudImgRef = ref<HTMLImageElement>();
const titleRef = ref<HTMLImageElement>();
const introRef = ref<HTMLDivElement>();
const avatarRef = ref<HTMLDivElement>();

watch(titleRef, (titleImage) => {
  if (titleImage) {
    if (titleImage.complete) {
      avatarAnimation();
    } else {
      titleImage.onload = () => {
        avatarAnimation();
        titleImage.onload = noop;
      };
    }
  }
});

function avatarAnimation() {
  const title = titleRef.value!;
  const intro = introRef.value!;
  const avatar = avatarRef.value!;
  const tl = gsap.timeline(
    {
      scrollTrigger: {
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none restart none",
        markers: false,
      },
    },
  );
  tl.from(title, {
    ease: "elastic.out(1.5, 0.3)",
    yPercent: -100,
    opacity: 0,
    duration: 1,
  });
  tl.from(intro, {
    ease: "elastic.out(1.5, 0.3)",
    yPercent: -100,
    opacity: 0,
    duration: 1,
  }, "<=0.4");
  tl.from(avatar, {
    ease: "elastic.out(1, 0.3)",
    yPercent: 50,
    opacity: 0,
    duration: 1.5,
  }, "<=0.3");
}

watch(flightImgRef, (image) => {
  if (image) {
    if (image.complete) {
      initScrollTrigger();
    } else {
      image.onload = () => {
        initScrollTrigger();
        image.onload = noop;
      };
    }
  }
});

function initScrollTrigger() {
  const tl = gsap.timeline();
  tl.add(flightAnimation);
  tl.add(proudAnimation);
}

function flightAnimation() {
  const flightImg = flightImgRef.value!;
  const tl = gsap.timeline(
    {
      scrollTrigger: {
        trigger: flightImg,
        // 起始位置
        start: "center center",
        // 总滑动距离，相对于起点
        end: "+=5000",
        // 跟随滚轮，1秒延迟
        scrub: 1.5,
        // sticky
        pin: true,
        // 标记，dev only
        markers: false,
        onUpdate(self) {
          // 根据进度切换图片
          // 进度根据下面duration以及动画开始时间延迟计算
          if (self.progress > 0.5) {
            flightImgSrc.value = flight2;
          } else if (self.progress > 0.3) {
            flightImgSrc.value = flight1;
          } else {
            flightImgSrc.value = flight0;
          }
        },
        onLeave() {
          // 离开画面消失
          gsap.set(flightImg, {
            opacity: 0,
          });
        },
        onEnterBack() {
          gsap.set(flightImg, {
            opacity: 1,
          });
        },
      },
    },
  );
  tl.to(flightImg,
    {
      scale: 1.5,
      // 在总timeline中占8时间单位
      duration: 8,
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: -50, y: -50 },
          { x: 100, y: 0 },
          { x: 0, y: 0 },
        ],
        curviness: 1.25,
      },
    });
  // label标记时间点
  tl.addLabel("main");
  tl.to(flightImg, {
    rotate: -10,
  }, 0); // 起始位置开始rotate
  tl.to(flightImg, {
    rotate: 10,
  }, ">=1"); // 上一动画结束1时间单位后rotate
  tl.to(flightImg, {
    rotate: 0,
  }, ">=1");
  tl.to(flightImg, {
    yPercent: 150,
    duration: 5,
  }, "main+=3");
}

function proudAnimation() {
  const proudImg = proudImgRef.value!;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: proudImg,
      scrub: 3,
      pin: true,
      start: "bottom bottom",
      end: "bottom+=1000 bottom",
      markers: false,
    },
  });
  tl.to(proudImg, {
    yPercent: 5,
    ease: "elastic.out(1.5, 0.3)",
  });
}

onUnmounted(() => {
  ScrollTrigger.killAll();
});
</script>

<style scoped>
.description {
  min-height: calc(100vh - v-bind(paddingTop) - v-bind(paddingBottom));
}

.font-biantao {
  font-family: Biantao, Arial, sans-serif;
}
</style>
