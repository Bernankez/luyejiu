<template>
  <div class="group box-border flex flex-1 cursor-default select-none items-center flex-gap-3 rounded-2 p-3">
    <UIInput ref="inputRef" v-model="value" autofocus class="w-full" />
    <div class="box-border rounded-2 p-2 transition hover:bg-gray-50" @click="onConfirm">
      <div class="i-ic:outline-check text-6"></div>
    </div>
    <div class="box-border rounded-2 p-2 transition hover:bg-gray-50" @click="onCancel">
      <div class="i-ic:outline-close text-6"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UIInput from "~/components/ui/UIInput.vue";

const props = withDefaults(defineProps<{
  modelValue?: string | number;
}>(), {
  modelValue: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", input: string | number): void;
  (event: "cancel"): void;
}>();

const value = ref(props.modelValue);
watch(() => props.modelValue, (modelValue) => {
  value.value = modelValue;
});

const onConfirm = () => {
  emit("update:modelValue", value.value);
};

const onCancel = () => {
  emit("cancel");
};

const inputRef = ref<InstanceType<typeof UIInput>>();
const stop = watchEffect(() => {
  if (inputRef.value) {
    inputRef.value.focus();
    stop();
  }
});
</script>
