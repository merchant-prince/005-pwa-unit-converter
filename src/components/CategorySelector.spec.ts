import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import CategorySelector from "./CategorySelector.vue";

describe("CategorySelector", () => {
  it("renders correctly", () => {
    const name = "length";
    const wrapper = mount(CategorySelector, {
      props: {
        name,
        modelValue: "",
      },
    });

    expect(wrapper.text()).toContain(name);
  });

  it("emits 'update:modelValue' with the passed-in 'name' prop when clicked", async () => {
    const name = "area";
    const wrapper = mount(CategorySelector, {
      props: {
        name,
        modelValue: "",
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect((wrapper.emitted("update:modelValue")![0] as string[])[0]).toBe(
      name
    );
  });
});
