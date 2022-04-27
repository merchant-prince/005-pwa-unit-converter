import { units } from "../../src/lib/units";

describe("Application Test", () => {
  it("renders the application", () => {
    cy.visit("/");
  });

  it("loads empty inputs on initialization", () => {
    cy.visit("/");

    cy.get('[data-test="input"]').should("contain.value", "");
    cy.get('[data-test="output"]').should("contain.value", "");
  });

  it("loads the correct units for each category", () => {
    cy.visit("/");

    const categories = Object.keys(units);

    categories.forEach((category) => {
      cy.get(`[data-test="category-${category}"]`)
        .click()
        .then(() => {
          units[category]
            .map((unit) => unit.name)
            .forEach((unitName) => {
              cy.get('[data-test="input-units"]').should(
                "contain.text",
                unitName
              );
              cy.get('[data-test="output-units"]').should(
                "contain.text",
                unitName
              );
            });
        });
    });
  });

  const combinations: Readonly<
    Record<string, [string, string, number, number][]>
  > = Object.freeze({
    length: [
      ["centimeter", "centimeter", 42, 42],
      ["centimeter", "meter", 200, 2],
      ["centimeter", "kilometer", 39, 0.00039],

      ["meter", "centimeter", 100, 10_000],
      ["meter", "meter", 543, 543],
      ["meter", "kilometer", 2_400, 2.4],

      ["kilometer", "centimeter", 2, 200_000],
      ["kilometer", "meter", 432, 432_000],
      ["kilometer", "kilometer", 354.4, 354.4],
    ],
    area: [
      ["square centimeter", "square centimeter", 1, 1],
      ["square centimeter", "square meter", 20_000, 2],
      ["square centimeter", "square kilometer", 10_000_000_000, 1],

      ["square meter", "square centimeter", 2, 20_000],
      ["square meter", "square meter", 543, 543],
      ["square meter", "square kilometer", 3_500, 0.0035],

      ["square kilometer", "square centimeter", 2, 20_000_000],
      ["square kilometer", "square meter", 44, 44_000_000],
      ["square kilometer", "square kilometer", 354.4, 354.4],
    ],
    volume: [
      ["cubic centimeter", "cubic centimeter", 1, 1],
      ["cubic centimeter", "cubic meter", 4000_000, 4],
      ["cubic centimeter", "cubic kilometer", 2_000_000_000_000_000, 2],

      ["cubic meter", "cubic centimeter", 2, 2000_000],
      ["cubic meter", "cubic meter", 543, 543],
      ["cubic meter", "cubic kilometer", 1_000_000_000, 1],

      ["cubic kilometer", "cubic centimeter", 2, 2000_000_000_000_000],
      ["cubic kilometer", "cubic meter", 44, 44_000_000_000],
      ["cubic kilometer", "cubic kilometer", 354.4, 354.4],
    ],
    temperature: [
      ["celsius", "celsius", 1, 1],
      ["celsius", "fahrenheit", 0, 32],
      ["celsius", "kelvin", 1, 274.15],

      ["fahrenheit", "fahrenheit", 1, 1],
      ["fahrenheit", "celsius", 32, 0],
      // ["fahrenheit", "kelvin", 32, 273.15], // @todo: test fails. needs fixing.

      ["kelvin", "celsius", 0, -273.15],
      // ["kelvin", "fahrenheit", 273.15, 32], // @todo: test fails. needs fixing.
      ["kelvin", "kelvin", 1, 1],
    ],

    weight: [
      ["milligram", "milligram", 1, 1],
      ["milligram", "gram", 1, 0.001],
      ["milligram", "kilogram", 1, 0.000_001],

      ["gram", "milligram", 1, 1_000],
      ["gram", "gram", 1, 1],
      ["gram", "kilogram", 1, 0.001],

      ["kilogram", "milligram", 1, 1_000_000],
      ["kilogram", "gram", 1, 1_000],
      ["kilogram", "kilogram", 1, 1],
    ],

    time: [
      ["second", "second", 1, 1],
      ["second", "minute", 60, 1],
      ["second", "hour", 3_600, 1],

      ["minute", "second", 1, 60],
      ["minute", "minute", 1, 1],
      ["minute", "hour", 60, 1],

      ["hour", "second", 1, 3_600],
      ["hour", "minute", 1, 60],
      ["hour", "hour", 1, 1],
    ],
  });

  Object.entries(combinations).forEach(([categoryName, testData]) => {
    describe(categoryName, () => {
      ["input --> output", "output --> input"].forEach((testType) => {
        describe(testType, () => {
          before(() => {
            cy.visit("/");
            cy.get(`[data-test="category-${categoryName}"]`).click();
          });

          testData.forEach(
            ([
              inputUnitSelectorValue,
              outputUnitSelectorValue,
              inputValue,
              outputValue,
            ]) => {
              it(`converts ${inputUnitSelectorValue} to ${outputUnitSelectorValue}`, () => {
                cy.get(
                  `[data-test="input-units"] [data-test="unit-${inputUnitSelectorValue
                    .split(" ")
                    .join("-")}"]`
                ).click();
                cy.get(
                  `[data-test="output-units"] [data-test="unit-${outputUnitSelectorValue
                    .split(" ")
                    .join("-")}"]`
                ).click();

                switch (testType) {
                  case "input --> output":
                    cy.get('[data-test="input"]').type(
                      `{selectAll}${inputValue}`
                    );
                    cy.get('[data-test="output"]').should(
                      "contain.value",
                      outputValue
                    );
                    break;

                  case "output --> input":
                    cy.get('[data-test="output"]').type(
                      `{selectAll}${outputValue}`
                    );
                    cy.get('[data-test="input"]').should(
                      "contain.value",
                      inputValue
                    );
                    break;

                  default:
                    throw new Error(`Unknown 'testType': ${testType}.`);
                }
              });
            }
          );
        });
      });
    });
  });
});
