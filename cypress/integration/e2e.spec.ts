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

  describe("length", () => {
    describe("input --> output", () => {
      before(() => {
        cy.visit("/");

        cy.get('[data-test="category-length"]').click();
      });

      it("converts cm to cm", () => {
        cy.get(
          '[data-test="input-units"] [data-test="unit-centimeter"]'
        ).click();
        cy.get(
          '[data-test="output-units"] [data-test="unit-centimeter"]'
        ).click();

        cy.get('[data-test="input"]').type("{selectAll}42");

        cy.get('[data-test="output"]').should("contain.value", 42);
      });

      // it("converts cm to m");
      // it("converts cm to km");

      // it("converts m to cm");
      // it("converts m to m");
      // it("converts m to km");

      // it("converts km to cm");
      // it("converts km to m");
      // it("converts km to km");
    });

    // describe("input <-- output", () => {
    //   it("converts cm to cm")
    //   it("converts cm to m")
    //   it("converts cm to km")

    //   it("converts m to cm")
    //   it("converts m to m")
    //   it("converts m to km")

    //   it("converts km to cm")
    //   it("converts km to m")
    //   it("converts km to km")
    // })
  });

  // tests for area, volume, temperature, weight, time
});
