<template>
  <div class="box-border flex items-center flex-gap-1 b-1 b-primary-100 rounded-2 b-solid p-x-2 p-y-1.5 text-4.5 text-primary-700 transition hover:cursor-text" :class="[focused ? 'bg-primary-50' : 'bg-white']" @mousedown.prevent="onClick">
    <div v-if="$slots.prefix" class="h-6 w-6 flex items-center justify-center">
      <slot name="prefix"></slot>
    </div>
    <input ref="inputRef" v-model="modelValue" :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { primary } from "~/styles/color";

const props = defineProps<{
  modelValue?: string | number;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string | number): void;
}>();

const { modelValue } = useVModels(props, emit);

const inputRef = ref<HTMLInputElement>();
const { focused } = useFocus(inputRef);
const onClick = () => {
  inputRef.value?.focus();
};

const caretColor = computed(() => primary[600]);
const placeholderColor = computed(() => primary[200]);

// TODO manually focus cannot trigger onFocus
function focus() {
  inputRef.value?.focus();
}

defineExpose({
  focus,
});
</script>

<style scoped>
input {
  all: unset;
  caret-color: v-bind(caretColor);
  width: 100%;
}

input::placeholder {
  color: v-bind(placeholderColor);
}
</style>
