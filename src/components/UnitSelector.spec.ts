import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import UnitSelector from "./UnitSelector.vue";

describe("UnitSelector", () => {
  it("renders correctly", () => {
    const units = ["millimeter", "centimeter", "meter", "kilometer"];
    const wrapper = mount(UnitSelector, {
      props: {
        units,
        modelValue: "",
      },
    });

    units.forEach((unit) => {
      expect(wrapper.text()).toContain(unit);
    });
  });

  it("emits 'update:modelValue' with the clicked 'unit' - when clicked", async () => {
    const units = ["millimeter", "centimeter", "meter", "kilometer"];
    const wrapper = mount(UnitSelector, {
      props: {
        units,
        modelValue: "",
      },
    });

    await wrapper.find(`[data-test="unit-${units[1]}"]`).trigger("click");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect((wrapper.emitted("update:modelValue")![0] as string[])[0]).toBe(
      units[1]
    );
  });
});
