<script setup lang="ts">
import { Ref, ref } from "vue";
import CategorySelector from "./components/CategorySelector.vue";
import UnitSelector from "./components/UnitSelector.vue";

const categories = [
  "length",
  "area",
  "volume",
  "temperature",
  "weight",
  "time",
];

const units = {
  length: ["millimeter", "centimeter", "meter", "kilometer"],
};

const input: Ref<number | null> = ref(null);
const output: Ref<number | null> = ref(null);

const selectedCategory = ref(categories[0]);
const selectedInputUnit = ref(units[selectedCategory.value][0]);
const selectedOutputUnit = ref(units[selectedCategory.value][0]);

input.value = 232353.33;
output.value = input.value;
</script>

<template>
  <main class="w-full h-full grid place-content-center">
    <article class="space-y-4 p-2">
      <nav class="flex justify-between sm:space-x-4">
        <CategorySelector
          v-for="category in categories"
          :key="category"
          v-model="selectedCategory"
          :name="category"
        />
      </nav>

      <section class="flex space-x-2 sm:space-x-4">
        <input
          v-model.number="input"
          type="number"
          class="w-full p-2 border-2 border-gray-800 rounded-md bg-white shadow-md hide-controls"
          autofocus
        />

        <div class="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 sm:h-6 sm:w-6 text-slate-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>

        <input
          v-model.number="output"
          type="number"
          class="w-full p-2 border-2 border-gray-800 rounded-md bg-white shadow-md hide-controls"
          autofocus
          readonly
        />
      </section>

      <section class="flex space-x-8 sm:space-x-14">
        <UnitSelector
          v-model="selectedInputUnit"
          :units="units[selectedCategory]"
        />
        <UnitSelector
          v-model="selectedOutputUnit"
          :units="units[selectedCategory]"
        />
      </section>
    </article>
  </main>
</template>
