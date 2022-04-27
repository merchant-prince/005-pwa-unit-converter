<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import CategorySelector from "./components/CategorySelector.vue";
import UnitSelector from "./components/UnitSelector.vue";
import { units, Unit } from "./lib/units";

const categories = Object.keys(units);

const selectedCategory = ref(categories[0]);

const selectedInputUnit: Ref<Unit> = ref(units[selectedCategory.value][0]);
const selectedOutputUnit: Ref<Unit> = ref(units[selectedCategory.value][0]);

const input: Ref<number | null> = ref(null);
const output: Ref<number | null> = ref(null);

watch([input, selectedInputUnit, selectedOutputUnit], () => {
  output.value = selectedOutputUnit.value.fromBaseUnitToCurrentUnit(
    selectedInputUnit.value.fromCurrentUnitToBaseUnit(input.value ?? 0)
  );
});

watch([output, selectedInputUnit, selectedOutputUnit], () => {
  input.value = selectedInputUnit.value.fromBaseUnitToCurrentUnit(
    selectedOutputUnit.value.fromCurrentUnitToBaseUnit(output.value ?? 0)
  );
});

watch(selectedCategory, () => {
  selectedOutputUnit.value = selectedInputUnit.value =
    units[selectedCategory.value][0];
});
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
          data-test="input"
        />

        <div class="flex justify-center items-center">
          <p class="text-4xl text-slate-500">&equals;</p>
        </div>

        <input
          v-model.number="output"
          type="number"
          class="w-full p-2 border-2 border-gray-800 rounded-md bg-white shadow-md hide-controls"
          data-test="output"
        />
      </section>

      <section class="flex space-x-8 sm:space-x-14">
        <UnitSelector
          v-model="selectedInputUnit"
          :units="units[selectedCategory]"
          data-test="input-units"
        />
        <UnitSelector
          v-model="selectedOutputUnit"
          :units="units[selectedCategory]"
          data-test="output-units"
        />
      </section>
    </article>
  </main>
</template>
