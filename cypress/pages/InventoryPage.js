class InventoryPage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    items: () => cy.get('[data-test="inventory-item"]'),
    names: () => cy.get('[data-test="inventory-item-name"]'),
    prices: () => cy.get('[data-test="inventory-item-price"]'),
    sort: () => cy.get('[data-test="product-sort-container"]'),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
    menuButton: () => cy.get("#react-burger-menu-btn"),
    logout: () => cy.get('[data-test="logout-sidebar-link"]'),
  };

  visit() {
    // saucedemo is a single-page app served from a static host: a deep link renders correctly
    // but the host answers with HTTP 404, so don't let Cypress fail on the status code.
    cy.visit("/inventory.html", { failOnStatusCode: false });
    this.elements.title().should("have.text", "Products");
    return this;
  }

  sortBy(value) {
    // value: az | za | lohi | hilo
    this.elements.sort().select(value);
    return this;
  }

  addToCart(slug) {
    cy.get(`[data-test="add-to-cart-${slug}"]`).click();
    return this;
  }

  removeFromCart(slug) {
    cy.get(`[data-test="remove-${slug}"]`).click();
    return this;
  }

  openCart() {
    this.elements.cartLink().click();
    return this;
  }

  logOut() {
    this.elements.menuButton().click();
    this.elements.logout().click();
    return this;
  }

  /** Read a list of texts from a set of elements into a plain array. */
  static texts($els) {
    return [...$els].map((el) => el.innerText.trim());
  }
}

module.exports = new InventoryPage();
module.exports.InventoryPage = InventoryPage;
