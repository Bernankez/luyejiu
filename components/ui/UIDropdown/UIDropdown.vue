<template>
  <CustomSlot />
  <Transition name="menu">
    <div v-if="mergedModelValue" ref="floatingRef" :style="floatingStyles" class="absolute left-0 top-0 z-1 box-border min-w-50 w-max select-none rounded-2 bg-gray-50 p-1 text-gray-900 shadow">
      <slot name="content" :close="closeContent"></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Placement, Strategy } from "@floating-ui/vue";
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";
import { CloseContentKey, OnItemClickKey, SetCanceledKey } from "./injection-key";

const props = withDefaults(defineProps<{
  modelValue?: boolean | typeof unhandledState;
  defaultValue?: boolean;
  trigger?: "click" | "hover" | "focus" | "manual";
  strategy?: Strategy;
  placement?: Placement;
  autoUpdate?: boolean;
}>(), {
  modelValue: unhandledState,
  defaultValue: false,
  trigger: "hover",
  strategy: "absolute",
  placement: "bottom-start",
  autoUpdate: true,
});

const emit = defineEmits<{
  (event: "update:modelValue", show: boolean): void;
  (event: "click", value?: string | number): void;
}>();

// parent's onItemClick
// to pass to the nested parent menu
const parentOnItemClick = inject(OnItemClickKey, undefined);
provide(OnItemClickKey, onItemClick);

function onItemClick(value?: string | number) {
  if (parentOnItemClick) {
    parentOnItemClick(value);
  } else {
    emit("click", value);
  }
}

const parentCloseContent = inject(CloseContentKey, undefined);
provide(CloseContentKey, provideCloseContent);

function provideCloseContent() {
  if (parentCloseContent) {
    parentCloseContent();
  } else {
    closeContent();
  }
}

const parentSetCanceled = inject(SetCanceledKey, undefined);
provide(SetCanceledKey, setCanceled);

function setCanceled(isCanceled: boolean) {
  if (parentSetCanceled) {
    parentSetCanceled(isCanceled);
  } else {
    canceled.value = isCanceled;
  }
}

const { placement, strategy, trigger } = toRefs(props);

const uncontrolledModelValue = ref(props.defaultValue);
const controlledModelValue = toRef(props, "modelValue");
const mergedModelValue = useMergedState(controlledModelValue, uncontrolledModelValue);

const showContent = (show: boolean) => {
  emit("update:modelValue", show);
  uncontrolledModelValue.value = show;
};
const canceled = ref(false);
function openContent() {
  showContent(true);
}
function closeContent() {
  showContent(false);
}

const debouncedCloseContent = useDebounceFn(() => {
  if (canceled.value) {
    canceled.value = false;
    return;
  }
  closeContent();
}, 200);
function closeContentWithDelay() {
  canceled.value = false;
  debouncedCloseContent();
}

const slots = useSlots();
const { slotRef: referenceRef, CustomSlot } = createSlot(slots.default, "default");
const floatingRef = ref<HTMLElement>();
const referenceEl = computed(() => unrefElement(referenceRef));
const floatingEl = computed(() => unrefElement(floatingRef));

// TODO transition direction
const { triggerListener } = useFloatingTrigger(referenceRef, {
  openContent,
  closeContent,
  click() {
    useEventListener(referenceEl, "click", () => {
      if (mergedModelValue.value) {
        closeContent();
      } else {
        openContent();
      }
    });
    onClickOutside(referenceEl, (e) => {
      if (!floatingEl.value?.contains(e.target as Node)) {
        closeContent();
      }
    });
  },
  hover() {
    const { isOutside: isOutsideReferenceEl } = useMouseInElement(referenceRef);
    const { isOutside: isOutsideFloatingEl } = useMouseInElement(floatingRef);
    watchEffect(() => {
      if (!isOutsideReferenceEl.value || !isOutsideFloatingEl.value) {
        canceled.value = true;
        setCanceled(true);
        if (!mergedModelValue.value) {
          openContent();
        }
      } else {
        closeContentWithDelay();
      }
    });
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
  whileElementsMounted(reference, floating, update) {
    if (props.autoUpdate) {
      return autoUpdate(reference, floating, update);
    }
    return noop;
  },
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
  scale: 0.8;
  opacity: 0;
}
</style>
