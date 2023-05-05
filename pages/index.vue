<template>
  <div class="overflow-hidden">
    <div class="description flex flex-col justify-between items-center w-full">
      <div>
        <div ref="titleRef" class="font-bold text-10">
          luyejiu.live
        </div>
        <div ref="introRef">
          是一只由祥云化作的十岁柴犬少年vup！
        </div>
      </div>
      <img ref="avatarRef" class="max-h-60vh object-scale-down" src="~/assets/demo.png" />
    </div>
    <img ref="flightImgRef" class="m-x-auto scale-0 object-scale-down" :src="flightImgSrc" alt="luyejiu-flight" />
    <div class="w-full h-100vh"></div>
    <img ref="proudImgRef" class="m-x-auto max-h-90vh object-scale-down" src="~/assets/gsap/lyj-proud.png" alt="luyejiu-proud" />
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import flight0 from "~/assets/gsap/lyj-flight-0.png";
import flight1 from "~/assets/gsap/lyj-flight-1.png";
import flight2 from "~/assets/gsap/lyj-flight-2.png";

const { paddingTop, paddingBottom } = storeToRefs(useAppStore());

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const flightImgSrc = ref(flight0);
const flightImgRef = ref<HTMLImageElement>();
const proudImgRef = ref<HTMLImageElement>();
const titleRef = ref<HTMLDivElement>();
const introRef = ref<HTMLDivElement>();
const avatarRef = ref<HTMLDivElement>();

onMounted(() => {
  avatarAnimation();
});

// TODO random avatar
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
        markers: true,
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
  }, "<=0.3");
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
        markers: true,
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
    y: "100vh",
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
      markers: true,
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
  height: calc(100vh - v-bind(paddingTop) - v-bind(paddingBottom));
}
</style>
