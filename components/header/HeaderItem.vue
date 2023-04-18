<template>
  <NuxtLink ref="LinkRef" :to="to" :target="props.target" class="flex items-center flex-gap-1 text-gray-900 cursor-pointer select-none transition">
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
import type { ComponentPublicInstance } from "vue";
import { onActiveKey } from "./Header";

const props = withDefaults(defineProps<{
  icon?: string;
  to?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | string;
  title?: string;
}>(), {
  icon: "",
  to: "/",
});

const onActive = inject(onActiveKey, undefined);

const route = useRoute();
const router = useRouter();
const LinkRef = ref<ComponentPublicInstance>();
watchEffect(() => {
  const active = router.resolve(props.to).path === route.path;
  if (LinkRef.value?.$el && active) {
    onActive?.(LinkRef.value.$el);
  }
});
</script>
