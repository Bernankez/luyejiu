<template>
  <UITooltip :disabled="sm" :delay="100">
    <NuxtLink ref="LinkRef" :to="targetPath!" :href="href" :target="props.target" :aria-label="ariaLabel" class="flex items-center flex-gap-1 text-gray-900 cursor-pointer select-none transition">
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
import { useLocalePath } from "vue-i18n-routing";
import { onActiveKey } from "./Header";

const props = withDefaults(defineProps<{
  icon?: string;
  to?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | string;
  title?: string;
  showTitle?: boolean;
  ariaLabel?: string;
}>(), {
  icon: "",
  showTitle: undefined,
  ariaLabel: "this is a default link",
});

const { to } = toRefs(props);

const onActive = inject(onActiveKey, undefined);
const { sm } = useBreakpoints(breakpointsTailwind);

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const targetPath = computed(() => {
  if (!to?.value) {
    return to?.value;
  }
  const p = localePath(to.value);
  if (p) {
    return p;
  }
  return to.value;
});
const LinkRef = ref<ComponentPublicInstance>();

const active = computed(() => {
  if (targetPath.value) {
    return router.resolve(targetPath.value).path === route.path;
  }
  return false;
});
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
