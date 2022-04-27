import { describe, expect, it, test } from "vitest";
import { mount } from "@vue/test-utils";
import CategorySelector from "./CategorySelector.vue";

describe("CategorySelector", () => {
  it("can be rendered", () => {
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

  test("initial css classes", () => {
    const name = "weight";
    const wrapper = mount(CategorySelector, {
      props: {
        name,
        modelValue: "",
      },
    });

    ["text-gray-800", "border-gray-800"].forEach((cssClass) =>
      expect(wrapper.classes()).toContain(cssClass)
    );
  });

  test("selected css classes", async () => {
    const name = "temperature";
    const wrapper = mount(CategorySelector, {
      props: {
        name,
        modelValue: name,
      },
    });

    ["text-white", "border-orange-400", "bg-orange-400", "shadow-md"].forEach(
      (cssClass) => expect(wrapper.classes()).toContain(cssClass)
    );
  });
});
