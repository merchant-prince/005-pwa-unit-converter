<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{ value: string; modelValue: string }>();
const emit = defineEmits<{
  (eventName: "update:modelValue", value: string): void;
}>();

const { value, modelValue } = toRefs(props);
</script>

<template>
  <div
    class="border-2 px-4 py-1 rounded-full"
    :class="[
      modelValue == value
        ? 'text-white border-orange-400 bg-orange-400 shadow-md'
        : 'text-black border-black',
    ]"
    @click="emit('update:modelValue', value)"
  >
    {{ value }}
  </div>
</template>
