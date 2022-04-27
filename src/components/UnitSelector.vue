<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{ modelValue: string; units: string[] }>();
const emit = defineEmits<{
  (eventName: "update:modelValue", value: string): void;
}>();

const { units, modelValue } = toRefs(props);
</script>

<template>
  <div
    class="w-full h-52 p-2 border-2 bg-white border-gray-800 rounded-md shadow-md overflow-y-auto hide-scrollbar"
  >
    <p
      v-for="unit in units"
      :key="unit"
      class="cursor-pointer px-2 py-1 rounded-md"
      :class="[
        modelValue === unit
          ? 'text-white bg-orange-400 shadow-md'
          : 'text-gray-800',
      ]"
      :data-test="`unit-${unit}`"
      @click="emit('update:modelValue', unit)"
    >
      {{ unit }}
    </p>
  </div>
</template>
