import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import UnitSelector from "./UnitSelector.vue";
import { units } from "../lib/units";

describe("UnitSelector", () => {
  it("renders correctly", () => {
    const wrapper = mount(UnitSelector, {
      props: {
        units: units.length,
        modelValue: units.length[0],
      },
    });

    units.length.forEach((unit) => {
      expect(wrapper.text()).toContain(unit.name);
    });
  });

  it("emits 'update:modelValue' with the clicked 'unit' - when clicked", async () => {
    const wrapper = mount(UnitSelector, {
      props: {
        units: units.temperature,
        modelValue: units.temperature[0],
      },
    });

    await wrapper
      .find(`[data-test="unit-${units.temperature[1].name}"]`)
      .trigger("click");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(
      (wrapper.emitted("update:modelValue")![0] as string[])[0]
    ).toMatchObject(units.temperature[1]);
  });
});
