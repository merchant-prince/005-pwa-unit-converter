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

  const combinations = {
    length: [
      ["centimeter", "centimeter", 42, 42],
      ["centimeter", "meter", 200, 2],
      ["centimeter", "kilometer", 39, 0.00039],

      ["meter", "centimeter", 100, 10_000],
      ["meter", "meter", 543, 543],
      ["meter", "kilometer", 2400, 2.4],

      ["kilometer", "centimeter", 2, 200_000],
      ["kilometer", "meter", 432, 432_000],
      ["kilometer", "kilometer", 354.4, 354.4],
    ],
  };

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
                  `[data-test="input-units"] [data-test="unit-${inputUnitSelectorValue}"]`
                ).click();
                cy.get(
                  `[data-test="output-units"] [data-test="unit-${outputUnitSelectorValue}"]`
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
