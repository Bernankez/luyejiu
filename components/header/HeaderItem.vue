<template>
  <UITooltip :disabled="sm" :delay="100">
    <NuxtLink ref="LinkRef" :to="to" :target="props.target" class="flex items-center flex-gap-1 text-gray-900 cursor-pointer select-none transition">
      <slot name="icon" class="text-5">
        <div :class="icon" class="text-5"></div>
      </slot>
      <div class="hidden sm:block text-4 font-bold">
        <slot>
          {{ title }}
        </slot>
      </div>
    </NuxtLink>
    <template #content>
      <slot>
        {{ title }}
      </slot>
    </template>
  </UITooltip>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { breakpointsTailwind } from "@vueuse/core";
import { onActiveKey } from "./Header";

const props = withDefaults(defineProps<{
  icon?: string;
  to?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | string;
  title?: string;
  showTitle?: boolean;
}>(), {
  icon: "",
  to: "/",
  showTitle: undefined,
});

const onActive = inject(onActiveKey, undefined);
const { sm } = useBreakpoints(breakpointsTailwind);

const route = useRoute();
const router = useRouter();
const LinkRef = ref<ComponentPublicInstance>();
const active = computed(() => router.resolve(props.to).path === route.path);
watchEffect(() => {
  if (LinkRef.value?.$el && active.value) {
    onActive?.(LinkRef.value.$el);
  }
});
watch(sm, () => {
  if (active.value) {
    onActive?.(LinkRef.value?.$el);
  }
});
</script>
