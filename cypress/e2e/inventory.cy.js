const Inventory = require("../pages/InventoryPage");
const { InventoryPage } = Inventory;

describe("Inventory", () => {
  beforeEach(() => {
    cy.login("standard");
    Inventory.visit();
  });

  it("lists the six catalogue products", () => {
    Inventory.elements.items().should("have.length", 6);
  });

  it("sorts by name Z to A", () => {
    Inventory.sortBy("za");
    Inventory.elements.names().then(($names) => {
      const names = InventoryPage.texts($names);
      expect(names).to.deep.equal([...names].sort().reverse());
    });
  });

  it("sorts by price low to high", () => {
    Inventory.sortBy("lohi");
    Inventory.elements.prices().then(($prices) => {
      const prices = InventoryPage.texts($prices).map((p) => parseFloat(p.replace("$", "")));
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  });

  it("tracks the cart badge as items are added and removed", () => {
    Inventory.addToCart("sauce-labs-backpack").addToCart("sauce-labs-bike-light");
    Inventory.elements.cartBadge().should("have.text", "2");
    Inventory.removeFromCart("sauce-labs-backpack");
    Inventory.elements.cartBadge().should("have.text", "1");
  });

  it("logs out and returns to the login page", () => {
    Inventory.logOut();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.get('[data-test="login-button"]').should("be.visible");
  });
});
