describe("An e2e test", () => {
  it("runs an e2e test", () => {
    cy.visit("/").its("document").should("contain.text", "Hello Vue");
  });
});
