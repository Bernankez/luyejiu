<template>
  <NuxtLink :to="to" :target="props.target" :class="{ active }" class="relative flex items-center flex-gap-1 text-gray-900 cursor-pointer select-none transition">
    <slot name="icon" class="text-5">
      <div :class="icon" class="text-5"></div>
    </slot>
    <div class="text-4 font-bold">
      <slot>
        {{ title }}
      </slot>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { yellow } from "~/styles/color";

const props = withDefaults(defineProps<{
  icon?: string;
  to?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | string;
  title?: string;
}>(), {
  icon: "",
  to: "/",
});

const route = useRoute();
const router = useRouter();
const active = computed(() => {
  return router.resolve(props.to).path === route.path;
});

const activeColor = yellow[500];
</script>

<style scoped>
.active::before {
  position: absolute;
  top: 50%;
  bottom: 0;
  left: -5%;
  z-index: -1;
  display: block;
  width: 110%;
  background-color: v-bind(activeColor);
  content: " ";
}
</style>
