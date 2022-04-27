<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{ name: string; modelValue: string }>();
const emit = defineEmits<{
  (eventName: "update:modelValue", value: string): void;
}>();

const { name, modelValue } = toRefs(props);
</script>

<template>
  <button
    class="border-2 p-2 rounded-full cursor-pointer uppercase"
    :class="[
      modelValue === name
        ? 'text-white border-orange-400 bg-orange-400 shadow-md'
        : 'text-gray-800 border-gray-800',
    ]"
    @click="emit('update:modelValue', name)"
  >
    {{ name[0] }}<span class="hidden sm:inline">{{ name.slice(1) }}</span>
  </button>
</template>
