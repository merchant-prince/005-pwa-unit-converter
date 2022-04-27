<script setup lang="ts">
import { toRefs } from "vue";
import { Unit } from "../lib/units";

const props = defineProps<{ modelValue: Unit; units: Unit[] }>();
const emit = defineEmits<{
  (eventName: "update:modelValue", value: Unit): void;
}>();

const { units, modelValue } = toRefs(props);
</script>

<template>
  <div
    class="w-full h-52 p-2 border-2 bg-white border-gray-800 rounded-md shadow-md overflow-y-auto hide-scrollbar"
  >
    <p
      v-for="unit in units"
      :key="unit.name"
      class="cursor-pointer px-2 py-1 rounded-md"
      :class="[
        modelValue.name === unit.name
          ? 'text-white bg-orange-400 shadow-md'
          : 'text-gray-800',
      ]"
      :data-test="`unit-${unit.name.split(' ').join('-')}`"
      @click="emit('update:modelValue', unit)"
    >
      {{ unit.name }}
    </p>
  </div>
</template>
