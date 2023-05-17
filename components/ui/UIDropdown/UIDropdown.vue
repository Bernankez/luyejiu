<template>
  <CustomSlot />
  <Transition name="menu">
    <div v-if="mergedModelValue" ref="floatingRef" :style="floatingStyles" class="absolute left-0 top-0 z-1 box-border min-w-50 w-max select-none rounded-2 bg-gray-50 p-1 text-gray-900 shadow">
      <slot name="content" :close-content="closeContent"></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Placement, Strategy } from "@floating-ui/vue";
import { flip, offset, shift, useFloating } from "@floating-ui/vue";

const props = withDefaults(defineProps<{
  modelValue?: boolean | typeof unhandledState;
  defaultValue?: boolean;
  trigger?: "click" | "hover" | "focus" | "manual";
  strategy?: Strategy;
  placement?: Placement;
}>(), {
  modelValue: unhandledState,
  defaultValue: false,
  trigger: "click",
  strategy: "absolute",
  placement: "bottom-start",
});

const emit = defineEmits<{
  (event: "update:modelValue", show: boolean): void;
}>();

const { placement, strategy, trigger } = toRefs(props);

const uncontrolledModelValue = ref(props.defaultValue);
const controlledModelValue = toRef(props, "modelValue");
const mergedModelValue = useMergedState(controlledModelValue, uncontrolledModelValue);

const showContent = (show: boolean) => {
  emit("update:modelValue", show);
  uncontrolledModelValue.value = show;
};
const openContent = () => {
  showContent(true);
};
const closeContent = () => {
  showContent(false);
};

const slots = useSlots();
const { slotRef: referenceRef, CustomSlot } = createSlot(slots.default, "default");
const floatingRef = ref<HTMLElement>();

const { triggerListener } = useFloatingTrigger(referenceRef, {
  openContent,
  closeContent,
  click() {
    const referenceEl = computed(() => unrefElement(referenceRef));
    useEventListener(referenceEl, "click", () => {
      if (mergedModelValue.value) {
        closeContent();
      } else {
        openContent();
      }
    });
    // TODO
    onClickOutside(referenceEl, (e) => {
      if (unrefElement(floatingRef)?.contains(e.target as Node)) {
        console.log(true);
      } else {
        console.log(false);
      }
    });
  },
  hover() {
    // useMouseInElement
    // offset
  },
});

watch(trigger, (trigger) => {
  triggerListener(trigger);
}, { immediate: true });

const middleware = ref([offset(5), flip(), shift()]);

const { floatingStyles } = useFloating(referenceRef, floatingRef, {
  placement,
  strategy,
  middleware,
  transform: false,
});
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition-timing-function: ease;
  transition-duration: 0.1s;
  transition-property: opacity, scale;
}

.menu-enter-from,
.menu-leave-to {
  z-index: -1;
  scale: 0.8;
  opacity: 0;
}
</style>
